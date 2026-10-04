"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { FeatureCards } from "@/components/feature-cards";
import { QuoteSection } from "@/components/quote-section";
import OurClients from "@/components/our-clients";
import { CareersSection } from "@/components/careers-section";
import { AwardsSection } from "@/components/awards-section";
import { ClientSpotlightSection } from "@/components/client-spotlight-section";
import { WorksWheelSection } from "@/components/works-wheel-section";
import { motion, useScroll, useTransform } from "framer-motion";

import { useEffect, useRef } from "react";

export default function Home() {
  const { scrollY } = useScroll();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      // Slow down the hero background video
      videoRef.current.playbackRate = 0.5;
    }
  }, []);
  
  // Parallax scroll effects: slide out and fade as user scrolls down
  const leftX = useTransform(scrollY, [0, 400], [0, -300]);
  const rightX = useTransform(scrollY, [0, 400], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="w-full flex flex-col overflow-x-clip">
      <section className="relative w-full min-h-[70vh] pb-16 overflow-clip flex items-center bg-black">
      {/* Background Video & Overlay */}
      <div className="absolute inset-0 px-4 md:px-8 lg:px-8 xl:px-16 2xl:px-24">
        <div className="relative w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="hero_custom__background min-h-full min-w-full object-cover min-h-[850px]"
          >
            <source src="/VIDEO.mp4" type="video/mp4" />
          </video>
          
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/50 z-10" />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center h-full pt-24 xl:pt-32">
        
        {/* Left Side (Massive Headline) - Scroll wrapper */}
        {/* Expanded to 8 columns to give the massive text room to breathe! */}
        <motion.div style={{ x: leftX, opacity: heroOpacity }} className="lg:col-span-8 mt-12 md:mt-0">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col text-white font-bold tracking-tight uppercase leading-[0.9] w-full"
          >
            {/* Tuned VW scaling so the 15-letter word 'TRANSFORMATION' perfectly fits its grid column on 1440px screens */}
            <h1 className="text-[8.5vw] sm:text-[7.5vw] md:text-[7vw] lg:text-[5vw] 2xl:text-[5.5vw] mb-2 whitespace-nowrap">TECHNOLOGY.</h1>
            <h1 className="text-[8.5vw] sm:text-[7.5vw] md:text-[7vw] lg:text-[5vw] 2xl:text-[5.5vw] mb-2 whitespace-nowrap">TALENT.</h1>
            <h1 className="text-[8.5vw] sm:text-[7.5vw] md:text-[7vw] lg:text-[5vw] 2xl:text-[5.5vw] mb-2 whitespace-nowrap">TRANSFORMATION.</h1>
          </motion.div>
        </motion.div>

        {/* Right Side (Subtext & Actions) - Scroll wrapper */}
        <motion.div style={{ x: rightX, opacity: heroOpacity }} className="lg:col-span-4 flex justify-end">
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="flex flex-col items-start text-left text-white lg:pl-8 w-[90%] sm:w-[80%] md:w-[450px] lg:w-fit ml-auto"
          >
            {/* Orange Accent Line */}
            <div className="w-12 h-1 2xl:w-16 2xl:h-2 bg-[#ff5a00] mb-4" />
            
            <h3 className="text-2xl xl:text-3xl 2xl:text-5xl font-bold mb-2 2xl:mb-4 w-full">Shaping tomorrow, today</h3>
            
            <p className="text-[17px] xl:text-xl 2xl:text-2xl text-gray-200 mb-2 2xl:mb-4 leading-relaxed max-w-md 2xl:max-w-2xl w-full text-justify">
              We help businesses solve complex technology challenges through expert services, intelligent solutions, and the right talent.
            </p>
            
            <div className="flex flex-col items-start space-y-3 w-fit mt-2">
              <Link 
                href="#contact" 
                className="group flex items-center justify-between px-6 py-3 2xl:px-8 2xl:py-4 bg-[#ff5a00] text-white text-xs 2xl:text-sm font-bold uppercase tracking-widest hover:bg-[#e04f00] transition-colors w-auto"
              >
                Talk to an Expert
                <ChevronRight className="w-4 h-4 text-white ml-8 2xl:ml-12 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
              
              <Link 
                href="#services" 
                className="group flex items-center justify-between px-6 py-3 2xl:px-8 2xl:py-4 bg-transparent border border-white/30 text-white text-xs 2xl:text-sm font-bold uppercase tracking-widest hover:border-white/80 hover:bg-white/5 transition-all w-auto"
              >
                Explore Our Services
                <ChevronRight className="w-4 h-4 text-white ml-8 2xl:ml-12 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
            </div>
          </motion.div>
        </motion.div>
        
      </div>
      </section>
      
      {/* Featured Cards Section */}
      <FeatureCards />

      {/* Client Spotlight Section */}
      <ClientSpotlightSection />

       {/* Floating Awards Section */}
      <AwardsSection />

      {/* Quote Section */}
      <QuoteSection /> 

     

      

      {/* Works Wheel Section */}
      <WorksWheelSection />

      {/* Our Clients Section */}
      <OurClients />

      {/* Careers Interactive Scroll Section */}
      <CareersSection />
    </div>
  );
}
