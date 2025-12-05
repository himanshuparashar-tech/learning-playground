import React from "react";

const Footer = () => {
  return (
    <footer className="py-24 bg-gray-950 text-gray-100">
      <section className="w-full px-4 sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 mx-auto grid gap-x-4 lg:gap-x-10 xl:gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-12 justify-between">
        {/* about */}
        <div className="space-y-4 xl:col-span-4">
          <a href="#" className="space-x-2 text-green-600">
            <i className="fa-solid fa-graduation-cap text-2xl lg:text-3xl"></i>
            <span className="text-2xl capitalize font-extrabold">e-learning</span>
          </a>

          <div className="space-y-4">
            <p className="text-lg leading-snug">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam praesentium quos necessitatibus similique unde maxime.</p>

            <div className="space-y-1">
              <p><span className="capitalize">address: </span>70-80 Upper St Norwich NR2</p>
              <p><span className="capitalize">call:</span><a href="#" className="text-green-600">+11 01258745896</a></p>
              <p><span className="capitalize">email:</span><a href="#" className="text-green-600">info@elearning.com</a></p>
            </div>
          </div>
        </div>

        {/* online platform */}
        <div className="space-y-4 xl:col-span-2">
          <h3 className="text-xl capitalize font-bold">online platform</h3>
          <ul className="space-y-2">
            {["about","course","instructor","events","instructor details","purchase guide"].map((l,i) => (
              <li key={i}><a href="#" className="capitalize text-lg text-gray-400 hover:text-green-600 duration-300">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* links */}
        <div className="space-y-4 xl:col-span-2">
          <h3 className="text-xl capitalize font-bold">links</h3>
          <ul className="space-y-2">
            {["contact us","gallery","news & articles","FAQ'S","signin/registration"].map((l,i) => (
              <li key={i}><a href="#" className="capitalize text-lg text-gray-400 hover:text-green-600 duration-300">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* contact form */}
        <div className="space-y-4 lg:col-span-2 xl:col-span-4">
          <h3 className="text-xl capitalize font-bold">contact</h3>
          <p className="text-lg">Enter your email address to register to our newsletter subscription</p>

          <div className="h-12 grid gap-2 sm:grid-cols-6">
            <input type="email" name="email" id="email" placeholder="enter email" className="h-full sm:col-span-4 border-none bg-gray-50 px-4 rounded-sm text-gray-950 placeholder:text-gray-950 placeholder:capitalize" />
            <input type="submit" value="subscribe" className="h-full sm:col-span-2 bg-green-600 text-gray-100 capitalize text-lg cursor-pointer rounded-sm" />
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
