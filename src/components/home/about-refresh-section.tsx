"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import svgPaths from "./imports/svg-1vghu8if0s";

export function AboutRefreshSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const leftY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rightY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const lineRotate = useTransform(scrollYProgress, [0, 1], [-90.15, -88]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen w-full bg-white py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Left Section */}
      <motion.div
        style={{ y: leftY }}
        className="absolute left-4 md:left-16 lg:left-20 top-16 md:top-24 w-full max-w-[90%] md:max-w-[340px] z-20"
      >
        {/* Decorative Line */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 90 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="h-[3px] bg-[#FFAE3D] mb-3 relative"
        />

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-6 md:gap-8"
        >
          <h1 className="font-['Inter'] font-semibold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#120124] uppercase tracking-tight">
            Welcome to refresh!
          </h1>

          {/* Connect Button */}
          <motion.button
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative bg-white px-5 md:px-6 py-2.5 md:py-3 rounded-full border-2 border-[#120124] w-fit group transition-all duration-300 hover:shadow-lg text-sm md:text-base"
          >
            <motion.div
              className="absolute inset-0 bg-[#120124] rounded-full -z-10"
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.p
              className="font-['Inter'] font-medium italic whitespace-nowrap relative z-10"
              animate={{ color: isHovered ? '#ffffff' : '#463e4e' }}
              transition={{ duration: 0.3 }}
            >
              Connect
            </motion.p>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Decorative Vertical Line */}
      <motion.div
        style={{ rotate: lineRotate }}
        className="absolute left-1/2 md:left-[60%] lg:left-[70%] top-0 md:top-[-11px] hidden md:flex items-center justify-center h-[300px] lg:h-[392px] w-[1.002px] origin-center"
      >
        <div className="flex-none">
          <div className="h-0 relative w-[300px] lg:w-[392.001px]">
            <motion.div
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="absolute inset-0"
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 393.35 6.90098"
              >
                <motion.path
                  d={svgPaths.pf0cd300}
                  fill="#120124"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Right Section */}
      <motion.div
        style={{ y: rightY }}
        className="absolute left-4 md:left-[45%] lg:left-[calc(40%+13px)] top-[380px] md:top-[88px] w-full max-w-[90%] md:max-w-[500px] lg:max-w-[600px] flex flex-col gap-5 md:gap-8 z-10"
      >
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-3 font-['Inter'] font-normal text-base md:text-lg lg:text-xl text-[#0b0215]"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="leading-relaxed"
          >
            Looking for place where where the supernatural is a natural phenomenon
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="leading-relaxed"
          >
            <span>We want to help you make it a lot easier, hit that "</span>
            <span className="font-light italic">connect</span>
            <span>
              " button and I will personally put you in touch with a pastor and
              get all your questioned answered
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-sm md:text-base mt-1"
          >
            ~Pastor Mercy Joy
          </motion.p>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ y: -5 }}
          className="bg-[#f5e7ff] rounded-md p-5 md:p-6 shadow-sm hover:shadow-xl transition-all duration-300"
        >
          <div className="bg-[#f9f1ff] rounded-md p-5 md:p-6 lg:p-7">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="font-['Inter'] font-semibold text-lg md:text-xl leading-relaxed text-[#0b0215] mb-2 md:mb-3"
            >
              What is Refresh ?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="font-['Inter'] font-normal text-sm md:text-base leading-relaxed text-[#0b0215]"
            >
              <span>
                Refresh is an interdenominational program that hold every last{" "}
              </span>
              <span className="font-bold">Saturday</span>
              <span>, of the month </span>
              <span className="font-bold">11 am at DAVIC CENTER.</span>
              <span>
                {" "}
                It is parked with powerful messages, fervent worship. It is a
                program you don't want to miss. See you there
              </span>
              <span className="text-lg md:text-xl">!!</span>
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}