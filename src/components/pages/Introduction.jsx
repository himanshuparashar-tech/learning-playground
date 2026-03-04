import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiSparkles, HiArrowRight, HiCube } from "react-icons/hi2";
import { BiCalculator } from "react-icons/bi";
import Categories from "../../pagesComponents/Categories";
import Courses from "../../pagesComponents/Courses";
import Partners from "../../pagesComponents/Partners";
import Instructors from "../../pagesComponents/Instructors";
import Events from "../../pagesComponents/Events";
import Blog from "../../pagesComponents/Blog";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const Introduction = () => {
  return (
    <div className="intro-page min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, var(--gradient-from), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, var(--gradient-to), transparent)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: "color-mix(in srgb, var(--accent) 15%, transparent)",
                color: "var(--accent)",
                border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
              }}
            >
              <HiSparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">React Learning • Projects • Tools</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-6"
              style={{ color: "var(--text)", lineHeight: 1.1 }}
            >
              Learn React,
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, var(--gradient-from), var(--gradient-to))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Build Projects
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl max-w-2xl mx-auto mb-10"
              style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}
            >
              A collection of React demos, practice projects (Todo, Accordion), and the HBC Electric & Water Bill Calculator—built while learning React.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg, var(--gradient-from), var(--gradient-to))",
                }}
              >
                View Projects
                <HiArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/hbc"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all hover:scale-[1.02]"
                style={{
                  color: "var(--accent)",
                  border: "2px solid var(--accent)",
                  background: "transparent",
                }}
              >
                <BiCalculator className="w-5 h-5" />
                HBC Calculator
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="py-8 border-y"
        style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "React", label: "Framework" },
              { value: "10+", label: "Projects" },
              { value: "HBC", label: "Bill Calculator" },
              { value: "Learn", label: "Tabs & Demos" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--accent)" }}>
                  {stat.value}
                </div>
                <div className="text-sm font-medium mt-1" style={{ color: "var(--text-secondary)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* What I Built - Quick Links */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-16 sm:py-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4" style={{ color: "var(--text)" }}>
            What I Built
          </h2>
          <p className="text-center mb-12 max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            React learning demos, practice projects, and a real-world bill calculator.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <Link
              to="/projects"
              className="group flex items-center gap-4 p-6 rounded-2xl transition-all hover:scale-[1.02] hover:shadow-xl"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "color-mix(in srgb, var(--accent) 20%, transparent)" }}
              >
                <HiCube className="w-7 h-7" style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1" style={{ color: "var(--text)" }}>Projects</h3>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Todo App, Accordions (Bootstrap & React), and more practice projects.
                </p>
              </div>
              <HiArrowRight className="w-5 h-5 ml-auto flex-shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{ color: "var(--accent)" }} />
            </Link>
            <Link
              to="/hbc"
              className="group flex items-center gap-4 p-6 rounded-2xl transition-all hover:scale-[1.02] hover:shadow-xl"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "color-mix(in srgb, var(--accent) 20%, transparent)" }}
              >
                <BiCalculator className="w-7 h-7" style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1" style={{ color: "var(--text)" }}>HBC Calculator</h3>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Electric & water bill splitter—4 sub-meters + motor, pay by your units.
                </p>
              </div>
              <HiArrowRight className="w-5 h-5 ml-auto flex-shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{ color: "var(--accent)" }} />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto">
        <Categories />
        <Courses />
        <Partners />
        <Instructors />
        <Events />
        <Blog />
      </div>
    </div>
  );
};

export default Introduction;
