import Image from 'next/image';

const clients = [
  { name: "Beyond", logo: "https://www.digitalgravity.ae/assets/svg/client/our-client/beyond.svg", text: "We helped them with a responsive yet attractive web design development." },
  { name: "GBM", logo: "https://www.digitalgravity.ae/assets/svg/client/our-client/gbm.svg", text: "Provided a fully customized Website aiming to make their business thrive." },
  { name: "SkillBridge", logo: "https://www.digitalgravity.ae/assets/svg/client/our-client/skillbridge-academy.svg", text: "Created a website for their streamlined education process." },
  { name: "Emdad", logo: "https://www.digitalgravity.ae/assets/svg/client/our-client/imdaad.svg", text: "Developed a fully customized website for an unbeatable UX." },
  { name: "Media Pro", logo: "https://www.digitalgravity.ae/assets/svg/client/our-client/media-pro.svg", text: "Interactive web design and development to enhance UX." },
  { name: "Sanad", logo: "https://www.digitalgravity.ae/assets/svg/client/our-client/sanad-abu-dhabi.svg", text: "Helped them to showcase their brand seamlessly." },
  { name: "Sharjah FDI", logo: "https://www.digitalgravity.ae/assets/svg/client/our-client/sharjah-fdi-forum.svg", text: "Created a website that 10X their web experience." },
  { name: "Atmosphere", logo: "https://www.digitalgravity.ae/assets/svg/client/our-client/atmosphere-burj-khalifa.svg", text: "A bespoke website design and web development for them." },
  { name: "EXA Porcelain", logo: "https://www.digitalgravity.ae/assets/svg/client/our-client/exa-porcelain.svg", text: "Designed a dependable website for their better brand image." },
  { name: "Terra Nexus", logo: "https://www.digitalgravity.ae/assets/svg/client/our-client/terra-nexus.svg", text: "Maximized their brand value with robust IT solutions." },
  { name: "America ae", logo: "https://www.digitalgravity.ae/assets/svg/client/our-client/america-ae.svg", text: "Created a well-crafted website for better brand development." },
];

export default function OurClients() {
  return (
    <section className="bg-black py-40 min-h-[80vh] flex items-center relative overflow-hidden text-white" id="clients">
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 z-0"></div>
      
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 max-w-7xl mx-auto">
          <h6 className="text-[#f97316] font-bold tracking-widest uppercase text-sm mb-4 2xl:mb-6">
            Our Clients
          </h6>
          <h2 className="text-4xl md:text-5xl lg:text-6xl max-w-5xl mx-auto font-bold leading-tight">
            Brands Across the Globe Choose Joy IT Solutions
          </h2>
        </div>

        {/* Client Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-t border-l border-gray-800">
          
          {clients.map((client, idx) => (
            <div 
              key={idx}
              className="group relative h-48 2xl:h-64 border-b border-r border-gray-800 bg-transparent overflow-hidden cursor-pointer transition-all duration-300 hover:bg-gray-900/50"
            >
              {/* Default State: Logo */}
              <div className="absolute inset-0 flex items-center justify-center p-8 2xl:p-12 transition-all duration-500 group-hover:-translate-y-full group-hover:opacity-0">
                {client.logo ? (
                  <img src={client.logo} alt={client.name} className="w-full h-full object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <span className="text-xl 2xl:text-3xl font-bold text-gray-400 text-center tracking-wide">
                    {client.name}
                  </span>
                )}
              </div>

              {/* Hover State: Text */}
              <div className="absolute inset-0 flex items-center justify-center p-8 2xl:p-12 translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 bg-gray-900/80 backdrop-blur-sm">
                <p className="text-sm md:text-base 2xl:text-xl text-gray-300 text-center leading-relaxed font-medium">
                  {client.text}
                </p>
              </div>
            </div>
          ))}

          {/* Special Last Item: 500+ Clients */}
          <div className="group relative h-48 2xl:h-64 border-b border-r border-gray-800 bg-transparent flex flex-col items-center justify-center p-6 overflow-hidden">
            {/* Animated Globe GIF */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
               <img src="https://www.digitalgravity.ae/assets/gif/globe2.gif" alt="World" className="w-full h-full object-contain opacity-50 group-hover:opacity-20 transition-opacity duration-500" />
            </div>
            
            <div className="relative z-10 text-center translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300 block mb-1">
                500+
              </span>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Clients Worldwide
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}   
