import React from "react";
const Banner = () => {
    return (
        <section className="h-screen md:h-[600px] relative bg-[url('https://i.postimg.cc/Y25f0990/pupil.jpg')] bg-center bg-cover">
            <div className="h-full w-full bg-[#00000099] flex flex-col gap-6 justify-center items-center px-4 md:px-12">
                <h1 className="text-center text-3xl sm:text-5xl lg:text-6xl text-white font-extrabold w-8/12">
                    The Best Program to Enroll for Exchange
                </h1>

                <p className="text-gray-50 text-xl sm:text-2xl text-center w-5/12">
                    Excepteur sint occaecat cupidatat non provident sunt in culpa.
                </p>

                <a href="https://ecommerce-phi-lilac.vercel.app/" className="bg-green-600 px-12 py-4 rounded-lg text-lg text-white flex gap-2 items-center hover:bg-green-700 duration-300">
                    <span>explore</span>
                    <i className="fa-solid fa-arrow-right-long"></i>
                </a>
            </div>
        </section>
    );
};

export default Banner;
