"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const AWARDS = [
  {
    id: "orange",
    title: "A Leader in Reinvention",
    description: "Recognized by leading industry analysts as a top company for digital innovation, reflecting the talent and agility that make Joy IT Solutions the trusted transformation partner for clients worldwide.",
    color: "bg-[#f97316]",
    scrollRange: [0.10, 0.45],
    baseXOffset: -250, // Left
  },
  {
    id: "lightblue",
    title: "A Great Place To Work",
    description: "We are very proud to be recognized as a Great Place To Work®, highlighting our commitment to fostering an inclusive, innovative, and supportive environment.\n\nThis recognition is especially meaningful because it is based on feedback from our people worldwide.",
    color: "bg-[#0152d7]",
    scrollRange: [0.35, 0.75],
    baseXOffset: 250, // Right
  },
  {
    id: "darkgray",
    title: "A Trusted Industry Leader",
    description: "Joy IT Solutions is a Leader in Global Cloud Transformation Services. We placed highest on the Ability to Execute axis in recent industry reports.",
    color: "bg-[#015d27]",
    scrollRange: [0.65, 1.0],
    baseXOffset: -200, // Left
  }
];

export function AwardsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track window width for responsive offsets
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Removed useSpring to prevent physics lag from causing cards to bleed out of the sticky container when scrolling fast.
  // Using raw scrollYProgress ensures 1:1 synchronization with the exact pixel boundaries of the section.
  const smoothProgress = scrollYProgress;

  // Text fades in at the very beginning (0 to 0.1) but NEVER fades out.
  // It will naturally fly out of the screen when the section unpins!
  const textOpacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);

  return (
    <section ref={containerRef} className="relative w-full bg-black h-[400vh]">
      
      {/* 
        Unified Sticky Container. 
      */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        
        {/* Center Text (Pinned in background) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <motion.div 
            style={{ opacity: textOpacity }}
            className="text-center px-6 w-full max-w-[1200px] 2xl:max-w-[70vw]"
          >
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Global recognition and<br/>awards
            </h2>
          </motion.div>
        </div>

        {/* Floating Cards Sequence (1, 2, 3) */}
        {AWARDS.map((award, index) => {
          const isHovered = hoveredCard === award.id;
          
          const isMobileOrTablet = windowWidth > 0 && windowWidth < 1024;
          const isMobile = windowWidth > 0 && windowWidth < 768;

          // Calculate dynamic X offset based on screen size so cards don't fly offscreen on mobile
          // On 4K screens (windowWidth > 1440), the offset dynamically multiplies so the cards spread out properly!
          const dynamicXOffset = windowWidth === 0 ? 0 
                                : isMobile ? 0 // Mobile: no offset, fly straight up
                                : isMobileOrTablet ? award.baseXOffset * 0.4 // Tablet: slight offset
                                : windowWidth > 1440 ? award.baseXOffset * (windowWidth / 1440) // Ultrawide: scale infinitely
                                : award.baseXOffset; // Standard desktop

          // On mobile, compress the scroll ranges so the cards fly up closer together (0.12 gap instead of 0.20)
          const dynamicScrollRange = isMobile 
            ? [0.1 + (index * 0.12), 0.6 + (index * 0.12)]
            : award.scrollRange;

          // Continuous scroll flow using viewport units so it perfectly adapts to any screen height!
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const cardY = useTransform(
            smoothProgress, 
            dynamicScrollRange, 
            ["120vh", "-120vh"] 
          );
            
            // Fade in and fade out smoothly during the continuous scroll
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const cardOpacity = useTransform(
              smoothProgress, 
              [
                dynamicScrollRange[0], 
                dynamicScrollRange[0] + 0.1, 
                dynamicScrollRange[1] - 0.1, 
                dynamicScrollRange[1]
              ], 
              [0, 1, 1, 0]
            );
            
            return (
              <div key={award.id} className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <motion.div
                  style={{ y: cardY, x: dynamicXOffset, opacity: cardOpacity }}
                  className="pointer-events-auto"
                >
                  <motion.div
                    onMouseEnter={() => setHoveredCard(award.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={cn(
                      "cursor-pointer overflow-hidden shadow-2xl flex flex-col justify-end relative rounded-sm w-[75vw] md:w-[60vw] lg:w-[420px] 2xl:w-[28vw] min-h-[400px] lg:aspect-square",
                      award.color
                    )}
                  >
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <circle cx="20" cy="80" r="30" stroke="white" strokeWidth="0.5" fill="none" />
                        <path d="M 0 50 Q 50 0 100 50" stroke="white" strokeWidth="0.5" fill="none" />
                      </svg>
                    </div>

                    <div className="relative z-10 p-6 md:p-8 2xl:p-12 h-full flex flex-col justify-end">
                      <h3 className={cn(
                        "text-white font-medium font-serif transition-all duration-300",
                        (isHovered || isMobileOrTablet) ? "text-xl md:text-2xl mb-4 2xl:mb-6" : "text-2xl md:text-3xl"
                      )}>
                        {award.title}
                      </h3>
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: (isHovered || isMobileOrTablet) ? 1 : 0, 
                          height: (isHovered || isMobileOrTablet) ? "auto" : 0 
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="text-white text-base md:text-lg leading-relaxed opacity-90 space-y-4 whitespace-pre-line">
                          {award.description}
                        </div>
                        <a href="#" className="group flex items-center font-bold text-white text-sm pt-6 md:pt-8 2xl:pt-10">
                          See related awards <ChevronRight className="w-4 h-4 2xl:w-6 2xl:h-6 text-white ml-2 2xl:ml-4" />
                        </a>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}

        </div>
    </section>
  );
}
