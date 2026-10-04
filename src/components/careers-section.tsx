"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

export function CareersSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let targetPadding = "24px"; // mobile
  if (windowWidth >= 1536) targetPadding = "96px"; // 2xl:px-24
  else if (windowWidth >= 1280) targetPadding = "64px"; // xl:px-16
  else if (windowWidth >= 1024) targetPadding = "48px"; // lg
  else if (windowWidth >= 768) targetPadding = "40px"; // tablet

  const isMobile = windowWidth > 0 && windowWidth < 1024;
  const isUltrawide = windowWidth >= 1920;
  const desktopImageTargetWidth = isUltrawide ? "45%" : "50%"; // Keep it wider on 4K so it's not a tiny strip

  // On desktop: width shrinks 100% -> 50% (or 45% on ultrawide), height shrinks 100vh -> 70vh
  // On mobile: width stays 100%, height shrinks 100vh -> 45vh
  const imageWidth = useTransform(scrollYProgress, [0, 0.8], ["100%", isMobile ? "100%" : desktopImageTargetWidth]);
  const imageHeight = useTransform(scrollYProgress, [0, 0.8], ["100vh", isMobile ? "55vh" : "70vh"]);
  const containerPadding = useTransform(scrollYProgress, [0, 0.8], ["0px", targetPadding]);
  
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.9], [0, 1]);
  // Slide up from bottom on mobile, slide left on desktop
  const textY = useTransform(scrollYProgress, [0.4, 0.9], [isMobile ? 30 : 40, 0]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-black w-full" id="careers">
      <div className="sticky top-0 h-auto lg:h-screen w-full flex items-start lg:items-center justify-center overflow-hidden bg-black">
        
        {/* Full width container, animates padding to create the "grid" effect */}
        <motion.div 
          className="w-full h-auto lg:h-full flex flex-col lg:flex-row items-center justify-start flex-nowrap pb-10 lg:pb-0"
          style={{ paddingLeft: containerPadding, paddingRight: containerPadding }}
        >
            
            {/* Left: Image Container */}
            <motion.div 
              className="flex-shrink-0 relative z-20 transition-all duration-75 overflow-hidden shadow-2xl"
              style={{ width: imageWidth, height: imageHeight }}
            >
              <img 
                src="/career.jpg" 
                alt="Careers team" 
                className="w-full h-full object-cover object-center"
              />
            </motion.div>

            {/* Right: Text Container */}
            {/* Uses flex-1 to perfectly and dynamically fill whatever space the image leaves behind! */}
            <motion.div 
              className="w-full flex-1 flex flex-col justify-start lg:justify-center relative z-10 pt-8 md:pt-12 pb-2 lg:py-0 lg:pl-8 xl:pl-16 2xl:pl-24"
              style={{ opacity: textOpacity, y: textY }}
            >
              <div className="text-[12px] md:text-sm 2xl:text-[16px] font-bold tracking-wider uppercase mb-4 2xl:mb-6 text-[#ff5a00]">
                Careers
              </div>
              <h3 className="text-white text-3xl md:text-5xl lg:text-[32px] xl:text-[40px] 2xl:text-[4vw] font-bold leading-[1.1] mb-4 md:mb-6 2xl:mb-8 tracking-tight">
                Build a career that's as exciting as the world we're shaping
              </h3>
              <p className="text-gray-300 text-base md:text-xl lg:text-[17px] 2xl:text-3xl mb-8 md:mb-10 2xl:mb-16 leading-relaxed font-serif pr-2 lg:pr-8 2xl:pr-16">
                Grow personally and professionally in a global company that helps you unlock your full potential.
              </p>
              <a href="#" className="group flex items-center font-bold text-white w-fit text-sm 2xl:text-xl uppercase tracking-widest">
                Join us 
                <span className="bg-[#ff5a00] p-1.5 2xl:p-3 ml-3 2xl:ml-5 flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ChevronRight className="w-4 h-4 2xl:w-6 2xl:h-6 text-white" strokeWidth={3} />
                </span>
              </a>
            </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
