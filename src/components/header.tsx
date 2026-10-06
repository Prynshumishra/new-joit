"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ChevronRight, Search, Globe, ArrowRight, Menu, X } from "lucide-react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    if (latest > previous && latest > 150) {
      setHidden(true); // scrolling down
    } else {
      setHidden(false); // scrolling up
    }
  });

  return (
    <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "w-full fixed top-0 left-0 text-white z-50 py-2 2xl:py-4 transition-colors duration-300",
        scrolled ? "bg-black/85" : "bg-transparent"
      )}
    >
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <div className="shrink-0 mr-8 flex items-center">
          <Link href="/">
            <Image src="/logoo.png" alt="Logo" width={180} height={34} priority />
          </Link>
        </div>

        {/* Navigation - Desktop */}
        <div className="hidden lg:flex flex-1 items-center">
          <NavigationMenu className="max-w-full" delay={999999}>
            <NavigationMenuList className="space-x-1">
              
              <NavigationMenuItem>
                <NavigationMenuLink 
                  render={<Link href="/services" />}
                  className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:bg-transparent hover:text-gray-300 focus:bg-transparent focus:text-gray-300 data-[active]:bg-transparent data-[state=open]:bg-transparent text-base lg:text-lg ")}
                >
                  Services
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink 
                  render={<Link href="/industries" />}
                  className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:bg-transparent hover:text-gray-300 focus:bg-transparent focus:text-gray-300 data-[active]:bg-transparent data-[state=open]:bg-transparent text-base lg:text-lg ")}
                >
                  Industries
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-transparent hover:text-gray-300 focus:bg-transparent focus:text-gray-300 data-[state=open]:bg-transparent data-[state=open]:text-white text-base lg:text-lg ">
                  Solutions
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-full bg-[#1a1a1a]">
                    <div className="w-full px-8 lg:px-24 pt-12 pb-16 flex flex-col items-start">
                      <div className="mb-12 flex items-center group cursor-pointer w-fit">
                        <h2 className="text-4xl font-bold mr-4 group-hover:underline text-white tracking-tight">Solutions</h2>
                        <ArrowRight className="w-8 h-8 text-white transition-transform group-hover:translate-x-2" />
                      </div>
                      
                      <div className="flex w-full text-left justify-between">
                        {/* Column 1: Business & Enterprise */}
                        <div className="w-1/3 pr-8">
                          <h3 className="text-zinc-400 font-normal mb-6 text-lg xl:text-xl">Business & Enterprise</h3>
                          <ul className="flex flex-col space-y-4">
                            <ListItem href="#" className="whitespace-nowrap">Product Information Management</ListItem>
                            <ListItem href="#" className="whitespace-nowrap">GRC Solutions</ListItem>
                            <ListItem href="#" className="whitespace-nowrap">Enterprise Data Solutions</ListItem>
                            <ListItem href="#" className="whitespace-nowrap">AI & Automation Solutions</ListItem>
                          </ul>
                        </div>

                        {/* Column 2: IT & Infrastructure */}
                        <div className="w-1/3 pr-8">
                          <h3 className="text-zinc-400 font-normal mb-6 text-lg xl:text-xl">IT & Infrastructure</h3>
                          <ul className="flex flex-col space-y-4">
                            <ListItem href="#" className="whitespace-nowrap">Cloud Solutions</ListItem>
                            <ListItem href="#" className="whitespace-nowrap">System Integration</ListItem>
                            <ListItem href="#" className="whitespace-nowrap">Unified Communication</ListItem>
                            <ListItem href="#" className="whitespace-nowrap">ELV System</ListItem>
                          </ul>
                        </div>

                        {/* Column 3: Security Solutions */}
                        <div className="w-1/3 pr-8">
                          <h3 className="text-zinc-400 font-normal mb-6 text-lg xl:text-xl">Security Solutions</h3>
                          <ul className="flex flex-col space-y-4">
                            <ListItem href="#" className="whitespace-nowrap">Cybersecurity Consulting</ListItem>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-transparent hover:text-gray-300 focus:bg-transparent focus:text-gray-300 data-[state=open]:bg-transparent data-[state=open]:text-white text-base lg:text-lg ">
                  Who We Are
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-full bg-[#1a1a1a] shadow-2xl">
                    <div className="w-full px-8 lg:px-24 pt-12 pb-12 flex flex-col items-start">
                       <div className="mb-12 flex items-center group cursor-pointer w-fit">
                        <h2 className="text-4xl font-bold mr-4 group-hover:underline text-white tracking-tight">Who we are</h2>
                        <ArrowRight className="w-10 h-10 text-white transition-transform group-hover:translate-x-2" />
                      </div>
                      
                      <div className="flex w-full text-left">
                        <div className="w-1/2 pr-12">
                          <h3 className="text-zinc-400 font-normal mb-8 text-lg xl:text-xl">Company Overview</h3>
                          <ul className="flex flex-col space-y-4">
                            <ListItem href="#" className="whitespace-nowrap">About us</ListItem>
                            <ListItem href="#" className="whitespace-nowrap">What we do</ListItem>
                            <ListItem href="#" className="whitespace-nowrap">Alliances and partnerships</ListItem>
                            <ListItem href="#" className="whitespace-nowrap">Our leadership</ListItem>
                            <ListItem href="#" className="whitespace-nowrap">Careers</ListItem>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink 
                  render={<Link href="/insights" />}
                  className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:bg-transparent hover:text-gray-300 focus:bg-transparent focus:text-gray-300 data-[active]:bg-transparent data-[state=open]:bg-transparent text-base lg:text-lg ")}
                >
                  Insights
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink 
                  render={<Link href="/hire" />}
                  className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:bg-transparent hover:text-gray-300 focus:bg-transparent focus:text-gray-300 data-[active]:bg-transparent data-[state=open]:bg-transparent text-base lg:text-lg ")}
                >
                  Hire
                </NavigationMenuLink>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        {/* Right side actions - Desktop */}
        <div className="hidden lg:flex shrink-0 items-center space-x-6 ml-4">
          <button className="bg-white text-black px-3 py-3 2xl:px-4 text-base font-semibold tracking-widest hover:bg-gray-200 transition-colors">
            Contact Us
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="text-white p-2 hover:bg-white/10 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-[#1a1a1a] flex flex-col p-6 overflow-y-auto z-40 border-t border-white/10">
          <div className="flex flex-col space-y-6 pb-20">
            <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold hover:text-gray-300 transition-colors">Services</Link>
            <Link href="/industries" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold hover:text-gray-300 transition-colors">Industries</Link>
            
            <div className="flex flex-col space-y-4 pt-2">
              <h3 className="text-zinc-400 font-medium text-sm uppercase tracking-wider">Solutions</h3>
              <div className="flex flex-col space-y-3 pl-4 border-l border-white/10">
                <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-lg hover:text-gray-300 transition-colors">Business & Enterprise</Link>
                <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-lg hover:text-gray-300 transition-colors">IT & Infrastructure</Link>
                <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-lg hover:text-gray-300 transition-colors">Security Solutions</Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 pt-2">
              <h3 className="text-zinc-400 font-medium text-sm uppercase tracking-wider">Who We Are</h3>
              <div className="flex flex-col space-y-3 pl-4 border-l border-white/10">
                <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-lg hover:text-gray-300 transition-colors">About us</Link>
                <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-lg hover:text-gray-300 transition-colors">What we do</Link>
                <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-lg hover:text-gray-300 transition-colors">Alliances and partnerships</Link>
                <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-lg hover:text-gray-300 transition-colors">Our leadership</Link>
                <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-lg hover:text-gray-300 transition-colors">Careers</Link>
              </div>
            </div>

            <Link href="/insights" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold hover:text-gray-300 transition-colors">Insights</Link>
            <Link href="/hire" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold hover:text-gray-300 transition-colors">Hire</Link>
            
            <div className="pt-6">
              <button className="w-full bg-white text-black px-4 py-2 text-center font-bold hover:bg-gray-200 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink
        render={<Link href={href || "#"} ref={ref as any} />}
        className={cn(
          "block select-none rounded-sm leading-snug no-underline outline-none transition-colors hover:text-white hover:underline focus:text-white text-lg font-medium text-gray-200",
          className
        )}
        {...props}
      >
        {children}
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
