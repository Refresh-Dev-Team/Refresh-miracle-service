"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";

// Replace these with your real images
const imgFrame11 = "/images/crowd.jpg";
const imgFrame12 = "/images/first lady.jpg";
const imgFrame13 = "images/impartation.jpg";

export function CommunitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imagesY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#fdf9ff] py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-12 md:mb-16 px-4 md:px-8 lg:px-20"
      >
        <div className="flex flex-col gap-2">
          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 90 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="h-[3px] bg-[#FFAE3D]"
          />

          {/* Main Title */}
          <h1 className="font-['Inter'] font-semibold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#120124] uppercase">
            Our community
          </h1>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="px-4 md:px-8 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
          {/* Left Content */}
          <motion.div
            style={{ y: textY }}
            className="flex flex-col gap-5 w-full lg:w-[450px]"
          >
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="font-['Inter'] font-normal text-base md:text-lg leading-relaxed text-[#463e4e]"
            >
              Refresh Global cells spreads across the world from within Benin to other state expanding internationally from countries across.
            </motion.p>

            {/* Buttons Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col gap-4"
            >
              {/* Benin-Based Cell Button */}
              <motion.button
                onHoverStart={() => setHoveredButton("benin")}
                onHoverEnd={() => setHoveredButton(null)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative bg-white h-[50px] md:h-[60px] lg:h-[65px] px-5 md:px-6 rounded-[67px] border-2 border-[#120124] w-full lg:w-fit transition-all duration-300 hover:shadow-lg group overflow-hidden text-sm md:text-base"
              >
                <motion.div
                  className="absolute inset-0 bg-[#120124] rounded-[67px]"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: hoveredButton === "benin" ? 1 : 0, opacity: hoveredButton === "benin" ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.p
                  className="font-['Inter'] font-medium whitespace-nowrap relative z-10"
                  animate={{ color: hoveredButton === "benin" ? "#ffffff" : "#120124" }}
                  transition={{ duration: 0.3 }}
                >
                  BENIN -BASED CELL
                </motion.p>
              </motion.button>

              {/* Join Volunteer Button */}
              <motion.button
                onHoverStart={() => setHoveredButton("volunteer")}
                onHoverEnd={() => setHoveredButton(null)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative bg-[#ffae3d] h-[50px] md:h-[60px] lg:h-[65px] px-5 md:px-6 rounded-[67px] w-full lg:w-fit transition-all duration-300 hover:shadow-xl overflow-hidden text-sm md:text-base"
              >
                <motion.div
                  className="absolute inset-0 bg-[#ff9e1d] rounded-[67px]"
                  initial={{ scale: 0 }}
                  animate={{ scale: hoveredButton === "volunteer" ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <p className="font-['Inter'] font-medium text-white whitespace-nowrap relative z-10">
                  JOIN VOLUNTEER
                </p>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Image Grid */}
          <motion.div
            style={{ y: imagesY }}
            className="flex flex-col md:flex-row gap-5 w-full lg:flex-1"
          >
            {/* Large Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: -30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative h-[280px] md:h-[350px] lg:h-[400px] w-full md:w-[55%] lg:w-[380px] rounded-xl overflow-hidden shadow-lg group"
            >
              <motion.div className="absolute inset-0" whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }}>
                <img alt="Community gathering" className="absolute h-full left-[-2.69%] max-w-none top-0 w-[175%] object-cover" src={imgFrame11} />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

            {/* Small Images Stack */}
            <div className="flex flex-row md:flex-col gap-5 w-full md:w-[45%] lg:w-[240px]">
              {/* Top Small Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative h-[160px] md:h-[180px] w-full rounded-xl overflow-hidden shadow-lg group"
              >
                <motion.div className="absolute inset-0" whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }}>
                  <img alt="Community member" className="absolute inset-0 w-full h-full object-cover" src={imgFrame12} />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              {/* Bottom Small Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative h-[160px] md:h-[180px] w-full rounded-xl overflow-hidden shadow-lg group"
              >
                <motion.div className="absolute inset-0" whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }}>
                  <img alt="Worship moment" className="absolute inset-0 w-full h-full object-cover" src={imgFrame13} />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
