import React from "react";

const Contact = () => {
  return (
    <div className="mt-32 mb-8 bg-[url('https://i.postimg.cc/tJW6W3TT/child.jpg')] bg-no-repeat bg-cover bg-center min-h-[350px] relative">
      <div className="absolute h-full w-full bg-[#00000099] flex flex-col justify-center items-center gap-6 px-4 text-gray-50">
        <h3 className="capitalize text-2xl md:text-3xl font-bold text-center">we are always wating for your response</h3>

        <div className="space-x-2 text-2xl md:text-3xl">
          <span className="capitalize font-bold">email:</span>
          <a href="mailto:info@elarning.com" className="font-bold">info@elarning.com</a>
        </div>

        <div className="space-x-2 text-2xl md:text-3xl">
          <span className="capitalize font-bold">call:</span>
          <a href="#" className="font-bold tracking-wide">+11 01258745896</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
