"use client";

import { motion } from "motion/react";
import { useState } from "react";
import svgPaths from "./imports/svg-zvuad252jo";

// Replace with your real logo image
const imgLogo = "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=100&h=100&fit=crop&crop=face";

export function Footer() {
  const [email, setEmail] = useState("");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [isSubscribeHovered, setIsSubscribeHovered] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribe:", email);
  };

  const columnOneLinks = [
    { name: "ABOUT US", href: "#about" },
    { name: "CONNECT", href: "#connect" },
    { name: "OUR VALUES", href: "#values" },
    { name: "PARTNERHIP", href: "#partnership" },
  ];

  const columnTwoLinks = [
    { name: "NEW HERE?", href: "#new", bold: true },
    { name: "EVENTS", href: "#events" },
    { name: "OUR SERMONS", href: "#sermons" },
    { name: "VOLUNTEER", href: "#volunteer" },
  ];

  const socialLinks = [
    { name: "instagram", path: svgPaths.p258a300, href: "#instagram", viewBox: "0 0 47 47" },
    { name: "youtube", path: svgPaths.p1972e6f2, href: "#youtube", viewBox: "0 0 47 47" },
    { name: "facebook", path: svgPaths.p25027600, href: "#facebook", viewBox: "0 0 47 47" },
  ];

  return (
    <footer className="relative bg-[#120124] w-full py-10 md:py-12 lg:py-14 px-4 md:px-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>

      <div className="relative max-w-[1280px] mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-10 mb-8 lg:mb-10">
          {/* Left Section - Links */}
          <div className="flex flex-col gap-5">
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-['Inter'] font-bold text-white text-[20px] md:text-[24px] uppercase"
            >
              WHO WE ARE
            </motion.h2>

            {/* Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 lg:gap-12">
              {/* Column 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col gap-2"
              >
                {columnOneLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onHoverStart={() => setHoveredLink(link.name)}
                    onHoverEnd={() => setHoveredLink(null)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative group w-fit"
                  >
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-[#ffae3d]"
                      initial={{ width: 0 }}
                      animate={{ width: hoveredLink === link.name ? "100%" : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span
                      className="font-['Inter'] text-white text-[14px] md:text-[16px] block pb-1"
                      animate={{ x: hoveredLink === link.name ? 5 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.name}
                    </motion.span>
                  </motion.a>
                ))}
              </motion.div>

              {/* Column 2 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col gap-2"
              >
                {columnTwoLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onHoverStart={() => setHoveredLink(link.name)}
                    onHoverEnd={() => setHoveredLink(null)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative group w-fit"
                  >
                    <div className={`absolute bottom-0 left-0 right-0 ${link.bold ? "h-[3px]" : "h-[2px]"} bg-white`} />
                    <motion.div
                      className={`absolute bottom-0 left-0 ${link.bold ? "h-[3px]" : "h-[2px]"} bg-[#ffae3d]`}
                      initial={{ width: 0 }}
                      animate={{ width: hoveredLink === link.name ? "100%" : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span
                      className={`font-['Inter'] ${link.bold ? "font-semibold" : "font-normal"} text-white text-[14px] md:text-[16px] block pb-1`}
                      animate={{ x: hoveredLink === link.name ? 5 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.name}
                    </motion.span>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Right Section - Social Media */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3 w-full lg:w-[200px]"
          >
            {/* Logo and Title */}
            <div className="flex items-end gap-3">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="relative size-[40px]">
                <img alt="Refresh Logo" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full rounded-full" src={imgLogo} />
              </motion.div>
              <h3 className="font-['Arial'] text-white text-[18px] md:text-[22px]">FOLLOW US</h3>
            </div>

            {/* Subtitle */}
            <p className="font-['Arial'] text-white text-[12px]">On all our social media</p>

            {/* Social Icons */}
            <div className="flex gap-3 items-center">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  onHoverStart={() => setHoveredSocial(social.name)}
                  onHoverEnd={() => setHoveredSocial(null)}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative size-[36px] cursor-pointer"
                >
                  <motion.div
                    className="absolute inset-0 bg-[#ffae3d] rounded-full"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: hoveredSocial === social.name ? 0.3 : 0, scale: hoveredSocial === social.name ? 1.5 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <svg className="block size-full relative z-10" fill="none" preserveAspectRatio="none" viewBox={social.viewBox}>
                    <path d={social.path} fill="white" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Subscription Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-8 lg:mb-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Left - Stay Connected */}
            <div className="flex flex-col gap-1">
              <h3 className="font-['Arial'] font-bold text-white text-[16px] md:text-[18px]">Stay connected</h3>
              <p className="font-['Arial'] text-[#d9d9d9] text-[12px] md:text-[14px]">Subscribe for updates, devotionals and event announcements</p>
            </div>

            {/* Right - Email Form */}
            <form onSubmit={handleSubscribe} className="flex flex-col gap-1">
              <label htmlFor="email" className="font-['Arial'] text-white text-[12px]">Email</label>
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <div className="relative flex-1 h-[42px] rounded-lg border border-[rgba(0,0,0,0.15)] overflow-hidden">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Anastasia@gmail.com"
                    className="w-full h-full px-3 bg-[rgba(255,255,255,0.1)] text-white placeholder:text-[#959595] font-['Arial'] text-[14px] outline-none focus:bg-[rgba(255,255,255,0.15)] transition-colors"
                  />
                </div>
                <motion.button
                  type="submit"
                  onHoverStart={() => setIsSubscribeHovered(true)}
                  onHoverEnd={() => setIsSubscribeHovered(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative bg-[#ffae3d] h-[42px] px-6 rounded-[36px] border border-[#9c9b9b] overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-[#ff9e1d]"
                    initial={{ scale: 0 }}
                    animate={{ scale: isSubscribeHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="font-['Inter'] font-medium text-white text-[14px] relative z-10">Subscribe</span>
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-['Arial'] text-white text-[12px] md:text-[14px]">@ 2026 Refresh. All rights reserved</p>
        </motion.div>
      </div>
    </footer>
  );
}