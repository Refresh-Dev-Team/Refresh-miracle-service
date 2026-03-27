// "use client";

// import { motion } from "motion/react";
// import Link from "next/link";
// import { useState } from "react";

// // const navItems = [];

// function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
//   e.preventDefault();
//   const element = document.querySelector(href);
//   if (element) {
//     element.scrollIntoView({ behavior: "smooth" });
//   }
// }

// // export function Navigation() {
// //   return (
// //     <motion.nav
// //       className="hidden lg:flex gap-6 items-center"
// //       initial={{ opacity: 0, y: -20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
// //     >
// //       {navItems.map((item, index) => (
// //         <motion.div
// //           key={item.label}
// //           initial={{ opacity: 0, y: -10 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
// //         >
// //           <Link
// //             href={item.href}
// //             onClick={(e) => handleNavClick(e, item.href)}
// //             className="flex items-center p-2.5 text-[16px] text-white uppercase transition-all hover:text-[#ffae3d] cursor-pointer"
// //           >
// //             {item.label}
// //           </Link>
// //         </motion.div>
// //       ))}
// //     </motion.nav>
// //   );
// // }

// export function MobileNavigation({
//   isOpen,
//   onClose,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
// }) {
//   return (
//     <motion.div
//       className="lg:hidden bg-[rgba(18,1,36,0.98)] backdrop-blur-md overflow-hidden"
//       initial={false}
//       animate={{ height: isOpen ? "auto" : 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <nav className="flex flex-col gap-2 p-4">
//         {navItems.map((item) => (
//           <Link
//             key={item.label}
//             href={item.href}
//             onClick={(e) => {
//               handleNavClick(e, item.href);
//               onClose();
//             }}
//             className="text-white text-[16px] uppercase py-3 px-4 hover:bg-[rgba(255,174,61,0.1)] hover:text-[#ffae3d] transition-all rounded-lg"
//           >
//             {item.label}
//           </Link>
//         ))}
//       </nav>
//     </motion.div>
//   );
// }

// export function MobileMenuButton({
//   isOpen,
//   onClick,
// }: {
//   isOpen: boolean;
//   onClick: () => void;
// }) {
//   return (
//     <button
//       className="lg:hidden text-white p-2"
//       onClick={onClick}
//       aria-label="Toggle menu"
//     >
//       <svg
//         className="w-6 h-6"
//         fill="none"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         {isOpen ? (
//           <path d="M6 18L18 6M6 6l12 12" />
//         ) : (
//           <path d="M4 6h16M4 12h16M4 18h16" />
//         )}
//       </svg>
//     </button>
//   );
// }