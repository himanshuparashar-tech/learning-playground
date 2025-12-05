import React from "react";
const Partners = () => {
    const imgs = [
        "https://i.postimg.cc/Vv8vy3ff/brand-01.png",
        "https://i.postimg.cc/1t6Xj9Z7/brand-02.png",
        "https://i.postimg.cc/s2b1mMbZ/brand-03.png",
        "https://i.postimg.cc/FKY70yC4/brand-04.png",
        "https://i.postimg.cc/W1bD1LMt/brand-05.png",
        "https://i.postimg.cc/VkGJSGRg/brand-06.png",
        "https://i.postimg.cc/65h2K54D/brand-07.png",
        "https://i.postimg.cc/MKwMgjH7/brand-08.png",
    ];

    return (
        <section className="pt-32 pb-8">
            <div className="space-y-16 grid xl:grid-cols-5 gap-x-20 items-center sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 mx-auto">

                <div className="space-y-4 xl:col-span-2 text-center xl:text-left">
                    <span className="text-xl text-green-600 font-semibold capitalize">our partners</span>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold capitalize">
                        learn with our partners
                    </h2>
                    <p className="text-xl font-bold">Consectetur adipiscing elit sed do eiusmod tempor.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-0 xl:col-span-3">
                    {imgs.map((img, i) => (
                        <div key={i} className="border flex justify-center items-center h-[150px]">
                            <img src={img} alt="partner" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
