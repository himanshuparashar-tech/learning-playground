import React from "react";

const instructors = [
  { name: "json jhonson", role: "full stack developer", img: "https://i.postimg.cc/rmpq4WKv/smartboy.jpg" },
  { name: "orobindu neel", role: "prompt engineer", img: "https://i.postimg.cc/FHtF67BL/aifemale.jpg" },
  { name: "alex homonis", role: "blockchain developer", img: "https://i.postimg.cc/6pd6xtk1/handsome.jpg" },
];

const InstructorCard = ({ item }) => {
  return (
    <div className="group overflow-hidden rounded-md">
      <div className="h-[300px] w-full overflow-hidden">
        <img
          src={item.img}
          alt={item.name}
          className="h-full w-full object-fill origin-center group-hover:scale-150 duration-1000"
        />
      </div>

      <div className="bg-white h-0 grid grid-cols-4 group-hover:h-14 duration-300 overflow-hidden">
        <a href="#" className="border-r w-full h-full flex justify-center items-center group hover:bg-gray-950 hover:text-white duration-300">
          <i className="fa-brands fa-x-twitter text-xl"></i>
        </a>
        <a href="#" className="border-r w-full h-full flex justify-center items-center group hover:bg-gray-950 hover:text-white duration-300">
          <i className="fa-brands fa-facebook-f text-xl"></i>
        </a>
        <a href="#" className="border-r w-full h-full flex justify-center items-center group hover:bg-gray-950 hover:text-white duration-300">
          <i className="fa-brands fa-linkedin-in text-xl"></i>
        </a>
        <a href="#" className="border-r w-full h-full flex justify-center items-center group hover:bg-gray-950 hover:text-white duration-300">
          <i className="fa-brands fa-discord text-xl"></i>
        </a>
      </div>

      <div className="py-4 bg-gray-950 space-y-4 text-center text-gray-100 capitalize">
        <h3 className="text-lg sm:text-2xl font-bold">{item.name}</h3>
        <span className="text-xl">{item.role}</span>
      </div>
    </div>
  );
};

const Instructors = () => {
  return (
    <section id="instructor" className="pt-32 pb-8 space-y-16">
      <div className="space-y-4 text-center px-4 sm:px-8 lg:px-16">
        <span className="text-lg capitalize text-green-600 font-semibold">instructor</span>
        <h2 className="text-2xl md:text-4xl lg:text-5xl capitalize font-bold">course instructor</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full px-4 sm:px-8 sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 mx-auto capitalize overflow-hidden">
        {instructors.map((inst, i) => (
          <InstructorCard key={i} item={inst} />
        ))}
      </div>
    </section>
  );
};

export default Instructors;
