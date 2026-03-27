"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import svgPaths from "./imports/svg-xwsgdf9v0g";

// Replace these with your real images
const imgVideo = "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=462&fit=crop";
const imgVideo1 = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=734&fit=crop";
const imgFrame22 = "https://images.unsplash.com/photo-1511795409834-432f7b1728d2?w=400&h=272&fit=crop";
const imgFrame26 = "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=462&fit=crop";

interface PlayButtonProps {
  className?: string;
}

function PlayButton({ className = "" }: PlayButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`size-[68px] cursor-pointer ${className}`}
    >
      <svg
        className="block size-full drop-shadow-lg"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 68 68"
      >
        <motion.path
          clipRule="evenodd"
          d={svgPaths.pa111980}
          fill="white"
          fillRule="evenodd"
          initial={{ opacity: 0.9 }}
          whileHover={{ opacity: 1 }}
        />
      </svg>
    </motion.div>
  );
}

interface VideoCardProps {
  image: string;
  title: string;
  description: string;
  isLarge?: boolean;
  delay?: number;
}

function VideoCard({
  image,
  title,
  description,
  isLarge = false,
  delay = 0,
}: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-50px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      className={`relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer ${
        isLarge ? "h-[734px]" : "h-[462px]"
      } w-full`}
    >
      <div className="absolute inset-0 rounded-2xl">
        <motion.img
          alt="Testimonial video"
          className={`absolute ${
            isLarge
              ? "h-full left-[-39.93%] max-w-none top-0 w-[194.44%]"
              : "max-w-none object-cover size-full"
          }`}
          src={image}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          className="absolute bg-black inset-0"
          initial={{ opacity: 0.1 }}
          animate={{ opacity: isHovered ? 0.2 : 0.1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <PlayButton />
      </div>

      {/* Hover overlay with text */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="font-['Inter'] font-semibold text-white text-lg mb-2">
          {title}
        </h3>
        <p className="font-['Inter'] font-normal text-white/90 text-sm line-clamp-2">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
}

interface TextTestimonialCardProps {
  title: string;
  description: string;
  delay?: number;
}

function TextTestimonialCard({
  title,
  description,
  delay = 0,
}: TextTestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-[#f9f1ff] rounded-2xl p-5 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer w-full"
    >
      <h3 className="font-['Inter'] font-semibold text-[#0b0215] text-base md:text-lg mb-2.5">
        {title}
      </h3>
      <p className="font-['Inter'] font-normal text-[#463e4e] text-sm md:text-base leading-6">
        {description}
      </p>
    </motion.div>
  );
}

interface VideoTextCardProps {
  image: string;
  title: string;
  description: string;
  delay?: number;
}

function VideoTextCard({
  image,
  title,
  description,
  delay = 0,
}: VideoTextCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5 }}
      className="bg-[#f9f1ff] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 w-full"
    >
      <div
        className="relative h-[272px] rounded-lg overflow-hidden m-5 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.img
          alt="Testimonial thumbnail"
          className="absolute max-w-none object-cover rounded-lg size-full"
          src={image}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          className="absolute bg-black inset-0 rounded-lg"
          initial={{ opacity: 0.1 }}
          animate={{ opacity: isHovered ? 0.2 : 0.1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayButton />
        </div>
      </div>

      <div className="px-5 pb-8">
        <h3 className="font-['Inter'] font-semibold text-[#0b0215] text-base md:text-lg mb-2.5">
          {title}
        </h3>
        <p className="font-['Inter'] font-normal text-[#463e4e] text-sm md:text-base leading-6">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function TestimonialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showMoreHovered, setShowMoreHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const testimonialData = [
    {
      title: "God healed me of 10 year of body pain",
      description:
        "It has been so long that and i can't remember a time when my back didn't hurt, but as i was praying and believing God for supernatural healing.....",
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen w-full bg-white py-12 px-4 md:py-16 lg:py-24 overflow-hidden"
    >
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-12 md:mb-16 lg:mb-20 px-4 md:px-8 lg:px-20"
      >
        <div className="flex flex-col gap-2.5">
          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 90 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="h-[3px] bg-[#FFAE3D]"
          />

          {/* Main Title */}
          <h1 className="font-['Inter'] font-semibold text-[32px] md:text-[40px] lg:text-[48px] leading-tight text-[#0b0215] uppercase">
            Testimonial
          </h1>
        </div>
      </motion.div>

      {/* Testimonial Grid */}
      <motion.div
        style={{ opacity }}
        className="px-4 md:px-8 lg:px-20 mb-12 md:mb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-auto">
          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            <TextTestimonialCard
              title={testimonialData[0].title}
              description={testimonialData[0].description}
              delay={0.1}
            />
            <VideoCard
              image={imgVideo}
              title={testimonialData[0].title}
              description={testimonialData[0].description}
              delay={0.2}
            />
          </div>

          {/* Column 2 - Large Video */}
          <div className="flex flex-col">
            <VideoCard
              image={imgVideo1}
              title={testimonialData[0].title}
              description={testimonialData[0].description}
              isLarge
              delay={0.3}
            />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6">
            <VideoTextCard
              image={imgFrame22}
              title={testimonialData[0].title}
              description="It has been so long that and i can't remember a time when my back didn't hurt, but as i was pray....."
              delay={0.4}
            />
            <TextTestimonialCard
              title={testimonialData[0].title}
              description={testimonialData[0].description}
              delay={0.5}
            />
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-6">
            <TextTestimonialCard
              title={testimonialData[0].title}
              description={testimonialData[0].description}
              delay={0.6}
            />
            <VideoCard
              image={imgFrame26}
              title={testimonialData[0].title}
              description={testimonialData[0].description}
              delay={0.7}
            />
          </div>
        </div>
      </motion.div>

      {/* Bottom Gradient Mask and Show More Button */}
      <div className="relative">
        {/* Gradient Mask */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-[100px] md:h-[130px] w-full bg-gradient-to-t from-white via-white to-transparent pointer-events-none"
        />

        {/* Show More Button */}
        <div className="flex justify-center mt-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onHoverStart={() => setShowMoreHovered(true)}
            onHoverEnd={() => setShowMoreHovered(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative bg-white h-[65px] md:h-[71px] px-12 md:px-20 rounded-full border border-[#0b0017]/30 hover:border-[#0b0017]/60 transition-all duration-300 hover:shadow-lg"
          >
            <motion.div
              className="absolute inset-0 bg-[#120124] rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: showMoreHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.p
              className="font-['Inter'] font-normal text-base relative z-10"
              animate={{ color: showMoreHovered ? "#ffffff" : "#000000" }}
              transition={{ duration: 0.3 }}
            >
              SHOW MORE
            </motion.p>
          </motion.button>
        </div>
      </div>
    </div>
  );
}