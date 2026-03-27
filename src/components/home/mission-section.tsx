"use client";

import { motion } from "motion/react";
import svgPaths from "./imports/svg-ypbhcovueh";

export default function MissionSection() {
  return (
    <div className="min-h-[80vh] bg-[#fffef0] overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <section className="relative min-h-[80vh] flex items-center justify-center px-6 md:px-12 lg:px-20 py-12 md:py-16">
          {/* Main content container */}
          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Decorative line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "90px", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-4 mx-auto"
            >
              <svg className="block w-[90px] h-[3px]" fill="none" preserveAspectRatio="none" viewBox="0 0 90 3">
                <line stroke="#FFAE3D" strokeWidth="3" x2="90" y1="1.5" y2="1.5" />
              </svg>
            </motion.div>

            {/* Mission statement */}
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-semibold text-[#0b0215] text-center uppercase leading-tight px-4 text-2xl md:text-3xl lg:text-4xl xl:text-5xl max-w-3xl mx-auto"
            >
              Our Mission is to spread the fire of revival across the nation of the world
            </motion.h1>
          </div>

          {/* Large decorative fire element - top right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -9.84 }}
            animate={{ 
              opacity: 0.22, 
              scale: 1, 
              rotate: -9.84,
              y: [0, -20, 0]
            }}
            transition={{ 
              opacity: { duration: 1, delay: 0.8 },
              scale: { duration: 1, delay: 0.8 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
            }}
            className="absolute right-[-30px] top-5 w-[200px] h-[200px] md:right-0 md:top-8 md:w-[250px] md:h-[250px] lg:right-5 lg:top-10 lg:w-[300px] lg:h-[300px] xl:right-10 xl:top-12 xl:w-[350px] xl:h-[350px] pointer-events-none"
          >
            <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 376 376">
              <g>
                <path d={svgPaths.p1de4abc0} fill="#FFB957" fillOpacity="0.22" />
              </g>
            </svg>
          </motion.div>

          {/* Small decorative fire element - bottom left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -170.16 }}
            animate={{ 
              opacity: 0.22, 
              scale: 1, 
              rotate: -170.16,
              y: [0, 15, 0]
            }}
            transition={{ 
              opacity: { duration: 1, delay: 1 },
              scale: { duration: 1, delay: 1 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }
            }}
            className="absolute left-[-20px] top-[35%] w-[60px] h-[60px] md:left-0 md:top-[40%] md:w-[80px] md:h-[80px] lg:left-3 lg:top-[42%] lg:w-[90px] lg:h-[90px] pointer-events-none -scale-y-100"
          >
            <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 109.856 109.856">
              <g clipPath="url(#clip0_1_84)">
                <path d={svgPaths.p38fdac00} fill="#FFB957" fillOpacity="0.22" />
              </g>
              <defs>
                <clipPath id="clip0_1_84">
                  <rect fill="white" height="109.856" width="109.856" />
                </clipPath>
              </defs>
            </svg>
          </motion.div>

          {/* Additional small fire element - top left for balance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 25 }}
            animate={{ 
              opacity: 0.15, 
              scale: 1, 
              rotate: 25,
              y: [0, -15, 0]
            }}
            transition={{ 
              opacity: { duration: 1, delay: 1.2 },
              scale: { duration: 1, delay: 1.2 },
              y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.5 }
            }}
            className="hidden lg:block absolute left-5 top-12 w-[70px] h-[70px] xl:left-10 xl:top-16 xl:w-[90px] xl:h-[90px] pointer-events-none"
          >
            <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 109.856 109.856">
              <g clipPath="url(#clip0_fire_top)">
                <path d={svgPaths.p38fdac00} fill="#FFB957" fillOpacity="0.15" />
              </g>
              <defs>
                <clipPath id="clip0_fire_top">
                  <rect fill="white" height="109.856" width="109.856" />
                </clipPath>
              </defs>
            </svg>
          </motion.div>

          {/* Additional medium fire element - bottom right for balance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
            animate={{ 
              opacity: 0.18, 
              scale: 1, 
              rotate: -45,
              y: [0, 20, 0]
            }}
            transition={{ 
              opacity: { duration: 1, delay: 1.4 },
              scale: { duration: 1, delay: 1.4 },
              y: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 3 }
            }}
            className="hidden md:block absolute right-3 bottom-12 w-[80px] h-[80px] lg:right-5 lg:bottom-16 lg:w-[100px] lg:h-[100px] pointer-events-none"
          >
            <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 109.856 109.856">
              <g clipPath="url(#clip0_fire_bottom)">
                <path d={svgPaths.p38fdac00} fill="#FFB957" fillOpacity="0.18" />
              </g>
              <defs>
                <clipPath id="clip0_fire_bottom">
                  <rect fill="white" height="109.856" width="109.856" />
                </clipPath>
              </defs>
            </svg>
          </motion.div>
        </section>
      </motion.div>
    </div>
  );
}