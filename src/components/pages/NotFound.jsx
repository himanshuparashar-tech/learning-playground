import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  // Define floating animation for background bubbles
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 overflow-hidden text-center px-4">
      {/* Animated bubbles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-indigo-500/20 dark:bg-indigo-400/10"
          style={{
            width: `${Math.random() * 100 + 40}px`,
            height: `${Math.random() * 100 + 40}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          variants={floatingVariants}
          animate="animate"
        />
      ))}

      {/* 404 text content */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 drop-shadow-lg"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-4"
      >
        Oops! Page not found
      </motion.p>

      <motion.p
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 dark:text-gray-400 mt-2 mb-6"
      >
        The page you’re looking for doesn’t exist or may have been moved.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          to="/home"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-200"
        >
          Go Back Home
        </Link>
      </motion.div>

    </div>
  );
};

export default NotFound;
