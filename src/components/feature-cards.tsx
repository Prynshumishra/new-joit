import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function FeatureCards() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollXProgress } = useScroll({ container: scrollRef });
  
  const thumbLeft = useTransform(scrollXProgress, (p) => {
    const clampedP = Math.max(0, Math.min(1, p));
    return `calc(${clampedP * 100}% - ${clampedP * 30}px)`;
  });

  const cards = [
    {
      id: 1,
      type: "Announcement",
      title: "Joy IT Solutions launches Joy Cloud Fabric to accelerate digital transformation",
      desc: "Joy Cloud Fabric brings together cloud engineering, cybersecurity, and DevOps to orchestrate enterprise migration from strategy through execution.",
      cta: "Expand",
      bg: "bg-[#f97316]",
      text: "text-white",
      image: null
    },
    {
      id: 2,
      type: "Perspective",
      title: "How CTOs can turn legacy systems into AI-powered value",
      desc: "Explore how IT leaders can modernize infrastructure, accelerate data workflows, and reinvent core systems so people and AI work together.",
      cta: "Expand",
      bg: "bg-[#f4f4f4]",
      text: "text-black",
      image: "/perspective.jpg"
    },
    {
      id: 3,
      type: "Research Report",
      title: "The CIO's guide to scalable Cloud architectures",
      desc: "How to see, control and optimize your cloud infrastructure spend at scale.",
      cta: "Explore",
      bg: "bg-[#f4f4f4]",
      text: "text-black",
      image: "https://i.pinimg.com/736x/27/56/46/2756465dc952728758a71358bdc765f7.jpg",
      fullImage: true
    },
    {
      id: 4,
      type: "Case Study",
      title: "Next-gen AI for customer service",
      desc: "See how Joy IT Solutions helped a global e-commerce brand automate 40% of their inquiries using custom LLMs.",
      cta: "Read Story",
      bg: "bg-[#f4f4f4]",
      text: "text-black",
      image: null
    },
    {
      id: 5,
      type: "Client Stories",
      title: "Navigating the future of supply chain tech",
      desc: "Building resilience and agility into global supply chains with Joy IT Solutions' advanced data analytics platforms.",
      cta: "Expand",
      bg: "bg-[#0ea5e9]",
      text: "text-white",
      image: null
    },
    {
      id: 6,
      type: "Blog",
      title: "The future of custom software in operations",
      desc: "Bespoke software solutions are moving into complex, integrated enterprise ecosystems. Here is how they will reshape agility.",
      cta: "Expand",
      bg: "bg-[#f4f4f4]",
      text: "text-black",
      image: "/perspective.jpg",
      isGrayscale: true
    },
    {
      id: 7,
      type: "Event",
      title: "Joy Tech Vision 2024",
      desc: "Join us for an exclusive look at the technology trends shaping the next decade of software development and IT infrastructure.",
      cta: "Register",
      bg: "bg-[#f97316]",
      text: "text-white",
      image: null
    },
    {
      id: 8,
      type: "Perspective",
      title: "Cloud-Native Infrastructure in the enterprise",
      desc: "How serverless technologies and Kubernetes are finally ready for widespread enterprise adoption.",
      cta: "Expand",
      bg: "bg-[#f4f4f4]",
      text: "text-black",
      image: "https://i.pinimg.com/736x/27/56/46/2756465dc952728758a71358bdc765f7.jpg",
      fullImage: true
    }
  ];

  return (
    <section className="w-full bg-black py-16 pl-8 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24 overflow-hidden relative">
      <div 
        ref={scrollRef}
        className="flex gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 pr-8 md:pr-0 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, i) => (
          <div key={card.id} className={`group relative w-[75vw] sm:w-[60vw] md:w-full shrink-0 snap-center aspect-[2/3] md:aspect-[2/3] xl:aspect-[2/3] [perspective:1000px] cursor-pointer ${i >= 4 ? 'mt-4 xl:mt-0' : ''}`}>
            <div className={`w-full h-full flex flex-col ${card.bg} ${card.text} overflow-hidden relative`}>
              
              {/* Full Card Image (if applicable) - Slides away */}
              {card.fullImage && card.image && (
                <div className={`absolute inset-0 z-0 transition-transform duration-100 ease-out ${card.id % 2 === 0 ? 'translate-x-0 group-hover:translate-x-full' : 'translate-y-0 group-hover:-translate-y-full'}`}>
                  <Image 
                    src={card.image}
                    alt={card.title} 
                    fill 
                    unoptimized
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
              )}
              
              {/* Top Section (Static) */}
              <div className={`p-6 xl:p-8 pb-0 shrink-0 z-10 ${card.fullImage ? 'bg-transparent' : card.bg}`}>
                <div className="text-[10px] xl:text-xs font-bold tracking-wider uppercase mb-2 xl:mb-4">{card.type}</div>
                <h3 className="text-lg md:text-[22px] font-bold leading-snug">
                  {card.title}
                </h3>
              </div>
              
              {/* Bottom Section (Slides Sideways) */}
              <div className="flex-1 mt-4 xl:mt-6 relative w-full overflow-hidden">
                
                {/* Back (Text) - Starts hidden, slides in */}
                <div className={`absolute inset-0 ${card.bg} p-6 xl:p-8 pt-0 flex flex-col justify-between z-0 transition-transform duration-100 ease-out ${card.id % 2 === 0 ? '-translate-x-full group-hover:translate-x-0' : 'translate-y-full group-hover:translate-y-0'}`}>
                  <p className="text-sm xl:text-[17px] leading-relaxed md:line-clamp-none line-clamp-6">
                    {card.desc}
                  </p>
                  <div className="flex items-center gap-2 font-bold uppercase text-xs xl:text-sm mt-auto pt-2">
                    {card.cta} <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Front (Half Image) - Only for non-fullImage cards */}
                {!card.fullImage && (
                  <div className={`absolute inset-0 ${card.bg} z-10 transition-transform duration-100 ease-out ${card.id % 2 === 0 ? 'translate-x-0 group-hover:translate-x-full' : 'translate-y-0 group-hover:-translate-y-full'}`}>
                    {card.image && (
                      <Image 
                        src={card.image}
                        alt={card.title} 
                        fill 
                        unoptimized
                        className={`object-contain object-bottom ${card.isGrayscale ? 'grayscale' : ''}`}
                      />
                    )}
                  </div>
                )}

              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="md:hidden w-[85vw] sm:w-[70vw] mx-auto mt-8 h-1 bg-white/20 rounded-full relative">
        <motion.div 
          className="absolute top-0 left-0 bottom-0 w-[30px] bg-white rounded-full"
          style={{ left: thumbLeft }}
        />
      </div>
    </section>
  );
}
