export function QuoteSection() {
  return (
    <section className="w-full bg-black py-16 md:py-20 lg:pt-0 lg:pb-24 px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-24">
      <div className="w-full flex flex-col lg:flex-row items-start lg:items-center gap-10 md:gap-12 lg:gap-24 2xl:gap-32">
        
        {/* Left Side (Image) */}
        <div className="w-full lg:w-5/12 shrink-0">
          <div className="relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] bg-[#d3bca3] overflow-hidden">
            {/* Using a standard img tag to avoid Next.js domain config requirements for the placeholder */}
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" 
              alt="Julie Sweet"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Right Side (Quote) */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center">
          <h2 className="text-white text-2xl md:text-4xl lg:text-[32px] xl:text-4xl 2xl:text-5xl font-bold leading-tight mb-6 md:mb-8 2xl:mb-12">
            “Companies will have a greater technology landscape, but we need to completely change the narrative to inspire people to paint the future. It is human in the lead, not human in the loop.”
          </h2>
          <p className="text-[#ff5a00] text-base md:text-lg lg:text-xl 2xl:text-3xl font-bold uppercase tracking-widest">
            Julie Sweet
          </p>
        </div>

      </div>
    </section>
  );
}
