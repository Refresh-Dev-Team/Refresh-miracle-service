"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import svgPaths from "./home/imports/svg-0dek47v1wv";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#120124] flex items-center justify-center z-[200]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Animated Fire Icon */}
            <motion.div
              className="relative size-[80px]"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                className="absolute block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 47 47"
              >
                <g>
                  <path
                    d={svgPaths.p13c77c80}
                    fill="url(#paint0_radial_loading)"
                  />
                  <path
                    d={svgPaths.p22d633f0}
                    fill="url(#paint1_radial_loading)"
                  />
                </g>
                <defs>
                  <radialGradient
                    cx="0"
                    cy="0"
                    gradientTransform="matrix(-25.9187 -0.112487 -0.1848 42.5273 22.8449 45.6417)"
                    gradientUnits="userSpaceOnUse"
                    id="paint0_radial_loading"
                    r="1"
                  >
                    <stop offset="0.314" stopColor="#FF9800" />
                    <stop offset="0.662" stopColor="#FF6D00" />
                    <stop offset="0.972" stopColor="#F44336" />
                  </radialGradient>
                  <radialGradient
                    cx="0"
                    cy="0"
                    gradientTransform="matrix(-0.273917 27.1178 20.4082 0.206116 24.3005 19.8496)"
                    gradientUnits="userSpaceOnUse"
                    id="paint1_radial_loading"
                    r="1"
                  >
                    <stop offset="0.214" stopColor="#FFF176" />
                    <stop offset="0.328" stopColor="#FFF27D" />
                    <stop offset="0.487" stopColor="#FFF48F" />
                    <stop offset="0.672" stopColor="#FFF7AD" />
                    <stop offset="0.793" stopColor="#FFF9C4" />
                    <stop
                      offset="0.822"
                      stopColor="#FFF8BD"
                      stopOpacity="0.804"
                    />
                    <stop
                      offset="0.863"
                      stopColor="#FFF6AB"
                      stopOpacity="0.529"
                    />
                    <stop
                      offset="0.91"
                      stopColor="#FFF38D"
                      stopOpacity="0.209"
                    />
                    <stop
                      offset="0.941"
                      stopColor="#FFF176"
                      stopOpacity="0"
                    />
                  </radialGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Loading Text */}
            <motion.p
              className="font-semibold text-[32px] text-white uppercase"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Refresh
            </motion.p>

            {/* Loading Dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-[#ffae3d] rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}