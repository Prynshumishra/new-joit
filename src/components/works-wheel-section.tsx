"use client";

import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";

// Using verified Unsplash stock images instead of the crafterui CDN
const INDUSTRIES: WorksWheelItem[] = [
  {
    title: "Financial Services",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1600",
    href: "#financial-services",
  },
  {
    title: "Healthcare",
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=1600",
    href: "#healthcare",
  },
  {
    title: "Retail & Consumer",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1600",
    href: "#retail",
  },
  {
    title: "Manufacturing",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600",
    href: "#manufacturing",
  },
  {
    title: "Telecommunications",
    image: "https://images.unsplash.com/photo-1558470598-a5dda9640f68?auto=format&fit=crop&q=80&w=1600",
    href: "#telecom",
  },
  { 
    title: "Public Service", 
    image: "https://images.unsplash.com/photo-1550684848-76ce242ce1cd?auto=format&fit=crop&q=80&w=1600", 
    href: "#public-service" 
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
