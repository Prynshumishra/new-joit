import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const footerLinks = [
    "Services",
    "Solutions",
    "Industries",
    "Careers",
    "About Us",
    "Insights",
    "Contact Us",
    "Preference Center",
    "Privacy Statement",
    "Terms & Conditions",
    "Cookie Policy",
  ];

  return (
    <footer className="w-full bg-black py-8 2xl:py-12 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
      <div className="w-full flex flex-col gap-4 2xl:gap-6">
        
        {/* Logo Section */}
        <div className="flex flex-col items-start">
          <Link href="/">
            <Image src="/logoo.png" alt="Logo" width={220} height={64} priority />
          </Link>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 2xl:gap-x-10 2xl:gap-y-4">
          {footerLinks.map((link) => (
            <Link 
              key={link} 
              href="#" 
              className="text-gray-100 hover:text-[#f97316] hover:underline text-sm 2xl:text-base font-medium transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Copyright Section */}
        <div className="text-gray-300 text-sm 2xl:text-base font-medium">
          © {new Date().getFullYear()} Joy IT Solutions. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
