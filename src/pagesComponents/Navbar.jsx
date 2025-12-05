// src/components/Navbar.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Framer motion variants
  const floatVariant = {
    initial: { y: 0 },
    animate: {
      y: [0, -6, 0], // gentle float
      transition: { duration: 2.4, ease: "easeInOut", repeat: Infinity },
    },
  };

  const pulseVariant = {
    initial: { boxShadow: "0 0 0px rgba(16,185,129,0.0)" },
    animate: {
      boxShadow: [
        "0 0 0px rgba(16,185,129,0.0)",
        "0 0 18px rgba(16,185,129,0.12)",
        "0 0 28px rgba(16,185,129,0.08)",
        "0 0 0px rgba(16,185,129,0.0)",
      ],
      transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const underlineVariant = {
    hover: { width: "100%", transition: { duration: 0.32, ease: "easeOut" } },
    initial: { width: "0%" },
  };

  return (
    <header className="relative">
      {/* Top header */}
      <section className="h-full w-full flex items-center gap-4 justify-center">



        <div className="h-full w-full flex items-center gap-4 justify-center bg-gradient-to-r from-indigo-400 to-purple-400">

          {/* HIGHLIGHTED START URL */}
          <motion.a
            href="https://ecommerce-phi-lilac.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open ecommerce demo in a new tab - start here"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            className="
    relative overflow-hidden 
    inline-flex items-center gap-4 
    px-5 py-3 rounded-2xl 
    text-white shadow-xl 
    bg-gray-900
    bg-gradient-to-r from-indigo-600 to-purple-600
    border border-white/10 
    backdrop-blur-xl
  "
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {/* BACKGROUND SHINE AURA */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-40 rounded-2xl"
              animate={{ opacity: [0.25, 0.5, 0.25] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* FLOATING ORBS */}
            <motion.div
              className="absolute w-28 h-28 bg-indigo-400/10 rounded-full blur-2xl"
              animate={{ x: [-25, 25, -25], y: [10, -10, 10] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
              className="absolute w-24 h-24 bg-purple-400/10 rounded-full blur-3xl"
              animate={{ x: [20, -20, 20], y: [-20, 20, -20] }}
              transition={{ duration: 7, repeat: Infinity }}
            />

            {/* ICON */}
            <motion.span
              className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <i className="fa-solid fa-link text-lg text-black"></i>

              <motion.span
                className="absolute inset-0 rounded-xl border border-white/20"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2.1, repeat: Infinity }}
              />
            </motion.span>

            {/* TEXT */}
            <div className="flex flex-col items-start z-10">
              <span className="text-sm font-semibold font-serif">E-commerce App</span>
              <span className="text-[11px] text-white/90 truncate max-w-[220px]">
                ecommerce-phi-lilac.vercel.app
              </span>
            </div>

            {/* BADGE */}
            <motion.div
              className="
      z-10 ml-2 px-2 py-1 text-[11px] font-semibold 
      rounded-md bg-white/20 backdrop-blur-md 
      text-white border border-white/10
    "
              whileHover={{ scale: 1.12 }}
            >
              Start Here
            </motion.div>

            {/* LIQUID SLIDE SHINE */}
            <motion.div
              className="absolute top-0 left-[-100%] w-full h-full bg-white/10"
              animate={{ left: ["-100%", "100%"] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 3,
              }}
            />

            {/* HOVER RIPPLE */}
            <motion.span
              className="absolute inset-0 rounded-2xl bg-white/5 opacity-0"
              whileHover={{ opacity: 0.15 }}
              transition={{ duration: 0.28 }}
            />
          </motion.a>



        </div>
      </section>
    </header>
  );
};

export default Navbar;
