"use client";

import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";

// Using verified Unsplash stock images instead of the crafterui CDN
const INDUSTRIES: WorksWheelItem[] = [
  {
    title: "Fintech Services",
    image: "/fintech.webp",
    href: "#financial-services",
  },
  {
    title: "Healthcare",
    image: "/healthcare.webp",
    href: "#healthcare",
  },
  {
    title: "Retail & Consumer",
    image: "/consumer.png",
    href: "#retail",
  },
  {
    title: "Manufacturing",
    image: "/manufacturing.png",
    href: "#manufacturing",
  },
  {
    title: "Telecommunications",
    image: "/telecommunications.jpg",
    href: "#telecom",
  },
  { 
    title: "Transportation", 
    image: "/transport.png", 
    href: "#transportation" 
  }
];

export function WorksWheelSection() {
  return (
    <section className="w-full bg-black relative">
      <div className="w-full bg-black">
        <WorksWheel 
          items={INDUSTRIES} 
          label="Industries" 
          action="Explore" 
          className="!bg-black !overflow-visible" 
        />
      </div>
    </section>
  );
}
