"use client";

import Image from "next/image";
import { Play, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const SPOTLIGHTS = [
  {
    title: "Strengthening the foundation behind every McDonald's feel-good moment",
    link: "#"
  },
  {
    title: "Bristol Myers Squibb puts AI to work at scale",
    link: "#"
  },
  {
    title: "Commonwealth Bank rewires everyday banking",
    link: "#"
  },
  {
    title: "UNICEF's GenU transforms learning into earning",
    link: "#"
  }
];

export function ClientSpotlightSection() {
  return (
    <section className="w-full bg-black py-24 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
      <div className="w-full flex flex-col xl:flex-row gap-16 2xl:gap-24 items-start relative">
        
        {/* Left Column (Title + Video Card) */}
        <div className="w-full xl:w-[65%] flex flex-col xl:sticky xl:top-24 2xl:top-32">
          <h2 className="text-white text-5xl md:text-6xl 2xl:text-7xl font-bold mb-12 2xl:mb-16 tracking-tight">
            Client spotlight
          </h2>
          
          <div className="group cursor-pointer">
            <div className="relative aspect-[16/9] overflow-hidden bg-zinc-900 rounded-sm w-full">
              {/* Background Image */}
              <Image 
                src="/client.webp" 
                alt="Client Spotlight Video"
                fill
                unoptimized
                className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
              />

              {/* Play Button Icon Overlay (Optional visual cue) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                  <div className="w-0 h-0 border-y-8 border-y-transparent border-l-[14px] border-l-white ml-1"></div>
                </div>
              </div>
              
              {/* Desktop/Tablet Text Overlay */}
              <div className="hidden sm:flex absolute bottom-0 left-0 right-0 p-8 2xl:p-12 pt-24 bg-gradient-to-t from-black via-black/80 to-transparent flex-row justify-between items-end gap-6 2xl:gap-10">
                
                {/* Person 1 */}
                <div className="w-1/2 relative border-t-2 border-[#ff5a00] pt-4 2xl:pt-6">
                  <h3 className="text-white text-3xl 2xl:text-4xl font-bold mb-1 2xl:mb-3">Sri Silpa Polisetti</h3>
                  <p className="text-gray-300 text-sm 2xl:text-lg">Chairman & Chief Executive Officer, Joy IT Solutions</p>
                </div>
                
                {/* Person 2 */}
                <div className="w-1/2 relative border-t-2 border-[#ff5a00] pt-4 2xl:pt-6">
                  <h3 className="text-white text-3xl 2xl:text-4xl font-bold mb-1 2xl:mb-3">Chris Kempczinski</h3>
                  <p className="text-gray-300 text-sm 2xl:text-lg">Chair & Chief Executive Officer, Oberoi World</p>
                </div>

              </div>
            </div>

            {/* Mobile Text (Below Image) */}
            <div className="flex sm:hidden flex-col gap-6 mt-6 pl-2">
              <div className="relative border-t-2 border-[#ff5a00] pt-4">
                <h3 className="text-white text-2xl font-bold mb-1">Chris Kempczinski</h3>
                <p className="text-gray-300 text-xs">Chairman & Chief Executive Officer, McDonald's</p>
              </div>
              <div className="relative border-t-2 border-[#ff5a00] pt-4">
                <h3 className="text-white text-2xl font-bold mb-1">Julie Sweet</h3>
                <p className="text-gray-300 text-xs">Chair & Chief Executive Officer, Joy IT Solutions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (List) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full xl:w-[35%] flex flex-col pt-12 xl:pt-[108px] 2xl:pt-[132px]"
        >
          <div className="flex flex-col">
            {SPOTLIGHTS.map((spotlight, index) => (
              <div 
                key={index} 
                className="flex flex-col gap-6 2xl:gap-8 group cursor-pointer border-t border-gray-800 py-8 2xl:py-10 last:border-b"
              >
                <h3 className="text-white text-[22px] 2xl:text-[28px] font-medium leading-snug group-hover:text-[#ff5a00] transition-colors">
                  {spotlight.title}
                </h3>
                <div className="flex items-center text-white text-sm 2xl:text-lg font-bold tracking-wide">
                  Explore <ChevronRight className="w-4 h-4 2xl:w-6 2xl:h-6 ml-2 2xl:ml-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
