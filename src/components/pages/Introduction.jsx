import React, { useState, useEffect, useRef } from "react";
import ReusableButton from '../ReusableButton/ReusableButton'
import { BiLoader } from 'react-icons/bi'
import Banner from "../../pagesComponents/Banner";
import Categories from "../../pagesComponents/Categories";
import Courses from "../../pagesComponents/Courses";
import Partners from "../../pagesComponents/Partners";
import Instructors from "../../pagesComponents/Instructors";
import Events from "../../pagesComponents/Events";
import Contact from "../../pagesComponents/Contact";
import FAQ from "../../pagesComponents/FAQ";
import Blog from "../../pagesComponents/Blog";
import Footer from "../shared/Footer";
import Navbar from "../../pagesComponents/Navbar";

const Introduction = () => {

  return (
    <div className="relative min-h-screen font-['League_Spartan']">
      <Navbar />
      <main>
        <Banner />
        <Categories />
        <Courses />
        <Partners />
        <Instructors />
        {/* <FAQ /> */}
        <Events />
        <Contact />
        <Blog />
      </main>
      {/* <Footer />   */}
    </div>
  );
};

export default Introduction