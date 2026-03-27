"use client";

import { motion } from "motion/react";
import svgPaths from "./home/imports/svg-0dek47v1wv";

function NotoFire() {
  return (
    <motion.div
      className="relative shrink-0 size-[47px]"
      data-name="noto:fire"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 47 47"
      >
        <g id="noto:fire">
          <path d={svgPaths.p13c77c80} fill="url(#paint0_radial)" id="Vector" />
          <path d={svgPaths.p22d633f0} fill="url(#paint1_radial)" id="Vector_2" />
        </g>
        <defs>
          <radialGradient
            cx="0"
            cy="0"
            gradientTransform="matrix(-25.9187 -0.112487 -0.1848 42.5273 22.8449 45.6417)"
            gradientUnits="userSpaceOnUse"
            id="paint0_radial"
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
            id="paint1_radial"
            r="1"
          >
            <stop offset="0.214" stopColor="#FFF176" />
            <stop offset="0.328" stopColor="#FFF27D" />
            <stop offset="0.487" stopColor="#FFF48F" />
            <stop offset="0.672" stopColor="#FFF7AD" />
            <stop offset="0.793" stopColor="#FFF9C4" />
            <stop offset="0.822" stopColor="#FFF8BD" stopOpacity="0.804" />
            <stop offset="0.863" stopColor="#FFF6AB" stopOpacity="0.529" />
            <stop offset="0.91" stopColor="#FFF38D" stopOpacity="0.209" />
            <stop offset="0.941" stopColor="#FFF176" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

export function Logo() {
  return (
    <motion.div
      className="flex gap-2 items-center shrink-0"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <NotoFire />
      <p className="font-semibold text-[28px] text-white uppercase whitespace-nowrap">
        Refresh
      </p>
    </motion.div>
  );
}