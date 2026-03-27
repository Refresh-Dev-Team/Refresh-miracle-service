"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Logo } from "@/components/logo";
// import { Navigation, MobileNavigation, MobileMenuButton } from "@/components/navigation";
import { Button } from "@/components/ui/button";

function HeroContent() {
  return (
    <div className="flex flex-col gap-6 items-center z-10">
      <motion.div
        className="flex flex-col gap-4 items-start text-center text-white max-w-[600px]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        <motion.h1
          className="font-semibold text-[clamp(32px,5vw,56px)] uppercase w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          Refresh miracle service
        </motion.h1>
        <motion.p
          className="font-normal text-[clamp(14px,1.5vw,18px)] w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          Empowered By faith and lead by Grace Experience the life of Revival,
          Miracles upon miracles
        </motion.p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
      >
        <Button size="md">Join us</Button>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
      data-name="Hero"
    >
      {/* Parallax Background */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-[#120124]" />
        <div className="absolute bg-[rgba(0,0,0,0.6)] inset-0" />
      </motion.div>

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          className={`flex gap-4 lg:gap-[145px] items-center justify-between px-4 md:px-[80px] py-3.5 transition-all duration-300 ${
            scrolled
              ? "bg-[rgba(18,1,36,0.95)] backdrop-blur-md shadow-lg"
              : "bg-[#120124]"
          }`}
        >
          <Logo />

          {/* Desktop Navigation */}
          {/* <Navigation /> */}

          {/* Mobile Menu Button */}
          {/* <MobileMenuButton
            isOpen={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          /> */}
        </div>

        {/* Mobile Menu */}
        {/* <MobileNavigation
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        /> */}
      </motion.header>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <HeroContent />
      </div>
    </section>
  );
}