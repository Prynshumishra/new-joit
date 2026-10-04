"use client";
import * as React from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react"; // Using lucide-react instead of raw SVG as requested

export interface WorksWheelItem {
  /** Project name. Shown beside the front card and in the index. */
  title: string;
  /** Cover art. Any src an <img> takes. */
  image: string;
  /** Where the card links to. Omit for a wheel that only browses. */
  href?: string;
}

export interface WorksWheelProps extends Omit<
  React.ComponentPropsWithoutRef<"section">,
  "children"
> {
  items: WorksWheelItem[];
  /** Sits in the middle of the ring. @default undefined */
  label?: string;
  /** Label on the card's hover affordance. Omit to drop it. @default undefined */
  action?: string;
}

/* Geometry. The card is measured against the stage; everything else is measured
   against the card, so a narrow stage - where the card is capped by width, not
   height - scales the whole wheel down with it instead of leaving a small card
   swinging on a huge drum. The three that matter are tuned together: STEP
   against DRUM sets how hard the neighbours rotate away, and DRUM against LENS
   decides whether they land inside the frame or run off it. */
const CARD_H = 0.38; // front card height, of the stage
const CARD_MAX_W = 0.34; // ... but never wider than this much of the stage
const CARD_RATIO = 1.45; // card width / height
const STEP = 40; // degrees between cards on the drum
const DRUM = 2.22; // drum radius, in card heights - and everything below likewise
const LENS = 2.7; // perspective distance
const RING_R = 1.14; // ring radius
/* The drum alone hangs the work on a plumb line. It isn't one: the strip curves
   away round an arc whose centre sits off to the LEFT, so the piece at the front
   is at the arc's near point - dead centre - and its neighbours have already
   swung back left as well as up and down. BOW is that arc's radius; nothing else
   makes the difference between a stack of cards and a wheel seen side on. */
const BOW = 1.82;
const TITLE = 0.124; // ring label and front-card title
const INDEX = 0.04; // the index down the right-hand side
/** Items either side of the front still worth drawing. Past this a card is
    edge-on, and further round it would stack up on the vanishing point. */
const CULL = 1.6;

/** How much of a wheel-notch or a dragged pixel counts as one item. */
const WHEEL_UNITS = 900;
const DRAG_UNITS = 420;
/** Quiet time after the last wheel event before the wheel settles on an item. */
const SETTLE = 140;
/** Fraction of the remaining distance closed each frame. 1 = no smoothing. */
const EASE = 0.12;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Stage = { w: number; h: number };

const rad = (deg: number) => (deg * Math.PI) / 180;

/** How far left the arc has carried something that has turned `drumDeg` off the
    front. Zero at the front, so the piece being read stays centred. */
const bowAt = (drumDeg: number, bow: number) =>
  -bow * (1 - Math.cos(rad(drumDeg)));

/** Both states in one chain: the ring terms fall away as `m` reaches the drum,
    and the drum terms are still zero while the ring is up. The bow is applied
    first, in the wheel's own plane, so it slides the card sideways rather than
    turning with it - and perspective still shrinks it with distance. */
function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number,
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export function WorksWheel({
  items,
  label = "Works '26",
  action = "View",
  className,
  ...props
}: WorksWheelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  // The wheel's position, and where it is heading. Only `active` is state -
  // everything else is written to the DOM, so turning the wheel is not a render.
  const turn = React.useRef(0);
  const target = React.useRef(0);
  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });

  const count = items.length;
  const last = Math.max(count - 1, 0);

  // Read after mount, not during render: the server has no matchMedia, and
  // branching on it inline is a hydration mismatch. Reduced motion drops the
  // easing, so the wheel lands where it is put instead of gliding there.
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => {
      setStage({ w: el.clientWidth, h: el.clientHeight });
      setIsMobile(el.clientWidth < 1024);
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    
    // Detailed responsive breakpoints for card sizing constraints
    let maxW = 0.5;
    let maxH = 0.5;
    let mobileLens = LENS; // default 2.7
    
    if (w < 480) {
      // Intense perspective (1.8) makes the camera very close, so side cards shrink aggressively!
      maxW = 0.85; maxH = 0.35; mobileLens = 1.8; 
    } else if (w < 768) {
      maxW = 0.80; maxH = 0.40; mobileLens = 2.0;
    } else if (w < 1024) {
      maxW = 0.70; maxH = 0.45; mobileLens = 2.4;
    } else if (w < 1440) {
      maxW = 0.50; maxH = 0.55;
    } else if (w < 1920) {
      maxW = 0.45; maxH = 0.65;
    } else if (w < 2560) {
      maxW = 0.40; maxH = 0.75;
    } else { // 2560+
      maxW = 0.35; maxH = 0.80;
    }

    const cardW = Math.min(h * maxH * CARD_RATIO, w * maxW);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * RING_R;
    
    // Shrink the ring's cards until the circle reads as a closed loop rather
    // than beads on a wire, however many pieces the wheel is given.
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1;
      
    // Calculate the dynamic shift needed on desktop when it turns into a drum.
    // Instead of arbitrary percentages, we calculate this so the right margin
    // of the card EXACTLY matches the left margin of the title text!
    let drumShiftX = 0;
    if (w >= 1024) {
      // The left margin used for the text is 64px on lg, 128px on xl, 192px on 2xl
      const margin = w >= 1536 ? 192 : w >= 1280 ? 128 : 64; 
      
      // Right edge of card = (w / 2) + drumShiftX + (cardW / 2).
      // We want this right edge to equal (w - margin).
      // So: drumShiftX = (w / 2) - margin - (cardW / 2)
      drumShiftX = (w / 2) - margin - (cardW / 2);
    }

    // Dynamically adjust font size, but strictly cap it lower to prevent massive single-words
    // EXCEPT on massive ultrawide monitors, where it should scale dynamically so it doesn't look tiny.
    const calculatedTitleSize = h * TITLE;
    const finalTitleSize = w < 768 
      ? clamp(24, calculatedTitleSize, 32) 
      : clamp(32, calculatedTitleSize, w < 1280 ? 46 : w < 1536 ? 56 : (w * 0.04));

    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      drumShiftX,
      bow: cardH * BOW,
      depth: cardH * mobileLens,
      title: finalTitleSize,
      index: cardH * INDEX,
    };
  }, [stage, count]);

  // One pass per frame: ease toward the target, then write every transform.
  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR, drumShiftX, bow, cardH, cardW } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      // Calculate if the ring is too large to fit on screen vertically.
      const maxAllowedRingHeight = stage.h * 0.85; // 15% padding
      const currentRingHeight = 2 * (ringR + (cardH * ringScale) / 2);
      const safeScaleY = maxAllowedRingHeight / currentRingHeight;
      
      // Calculate if the ring is too large to fit on screen horizontally (crucial for mobile!)
      const maxAllowedRingWidth = stage.w * 0.95; // 5% padding on sides
      const currentRingWidth = 2 * ringR + cardW; 
      const safeScaleX = maxAllowedRingWidth / currentRingWidth;
      
      // Pick the smallest scale required to fit it on screen!
      const safeScale = Math.min(1, safeScaleY, safeScaleX);
      
      // Smoothly zoom the entire 3D space from the safe ring size up to the massive desktop drum size
      const currentGlobalScale = lerp(safeScale, 1, m);

      // The drum is pulled back so its front face lands on the picture plane.
      // Additionally, on desktop we dynamically shift the entire drum to the right
      // as it opens so that it leaves room for the title text on the left!
      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateX(${m * drumShiftX}px) translateZ(${-m * drumR}px) scale(${currentGlobalScale})`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(
            d * (360 / count),
            drumDeg,
            ringR,
            drumR,
            bow,
            m,
          );
          // Smoothly fade out cards as they rotate away from the center to prevent 
          // them from peeking onto the top and bottom edges of the screen.
          // Cards stay fully visible in the center (d <= 0.5), then fade to 0 by d = 0.8.
          let targetOpacity = 1;
          if (m > 0.5) {
            targetOpacity = Math.max(0, 1 - Math.max(0, Math.abs(d) - 0.5) * 3.33);
          }
          card.style.opacity = String(targetOpacity);
          
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);
      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  
  // Replace buggy wheel scroll-jacking with native framer-motion scroll progress

  
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // The wheel math uses t=0 for the ring, and t=1 for the first card.
    // So the final card is at t = last + 1.
    // To make it pause at the end, we multiply by (last + 2) but clamp it at (last + 1).
    target.current = Math.min(last + 1, latest * (last + 2));
  });

  return (
    <div ref={wrapperRef} className="w-full relative" style={{ height: `${(last + 2) * 80}vh` }}>
      <section
        aria-label={label}
        className={cn(
          "bg-background text-foreground sticky top-0 h-[100dvh] w-full select-none overflow-clip",
          className,
        )}
        {...props}
      >
        <div
          ref={stageRef}
          tabIndex={0}
          role="listbox"
          aria-label={label}
          aria-activedescendant={`works-wheel-${active}`}
          className="focus-visible:outline-foreground absolute inset-0 outline-none focus-visible:outline-2 focus-visible:-outline-offset-4"
          style={{ perspective: `${metrics.depth}px` }}
        >
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            const Tag = (item.href ? "a" : "div") as "a";
            return (
              <React.Fragment key={item.title}>
                <Tag
                  id={`works-wheel-${i}`}
                  role="option"
                  aria-selected={i === active}
                  href={item.href}
                  ref={(node: HTMLElement | null) => {
                    cardRefs.current[i] = node;
                  }}
                  className="group absolute [backface-visibility:hidden]"
                  style={{
                    width: metrics.cardW,
                    height: metrics.cardH,
                    marginLeft: -metrics.cardW / 2,
                    marginTop: -metrics.cardH / 2,
                  }}
                >
                  <span className="bg-muted shadow-foreground/12 relative block size-full overflow-hidden rounded-lg shadow-[0_18px_40px_-18px_var(--tw-shadow-color)]">
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      className="size-full object-cover"
                    />
                    {action && item.href ? (
                      <span className="bg-background/80 text-foreground pointer-events-none absolute right-3 bottom-3 flex translate-y-1 items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] opacity-0 backdrop-blur-sm transition group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowUpRight className="size-3" />
                        {action}
                      </span>
                    ) : null}
                  </span>
                </Tag>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Ring title and front-card title trade places across the transition.
          Type is sized off the measured stage, not vh, so the wheel keeps its
          proportions inside a card as well as at full bleed. */}
      <div
        ref={labelRef}
        className="pointer-events-none absolute inset-0 grid place-items-center tracking-tight"
        style={{ fontSize: metrics.title }}
      >
        {label}
      </div>
      <div
        ref={titleRef}
        className="pointer-events-none absolute tracking-tight opacity-0 font-bold top-[15%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-[90vw] px-4 lg:top-1/2 lg:left-8 xl:left-16 2xl:left-32 lg:translate-x-0 lg:text-left lg:w-[45%] xl:w-[50%] 2xl:w-[50%] pr-4 lg:whitespace-nowrap"
        style={{ fontSize: metrics.title }}
      >
        {items[active]?.title}
      </div>
    </section>
  </div>
  );
}

export default WorksWheel;
