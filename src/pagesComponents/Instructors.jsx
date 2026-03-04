import React from "react";

const instructors = [
  { name: "json jhonson", role: "full stack developer", img: "https://i.postimg.cc/rmpq4WKv/smartboy.jpg" },
  { name: "orobindu neel", role: "prompt engineer", img: "https://i.postimg.cc/FHtF67BL/aifemale.jpg" },
  { name: "alex homonis", role: "blockchain developer", img: "https://i.postimg.cc/6pd6xtk1/handsome.jpg" },
];

const InstructorCard = ({ item }) => {
  return (
    <div className="group overflow-hidden rounded-xl shadow-lg" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
      <div className="h-[280px] w-full overflow-hidden">
        <img
          src={item.img}
          alt={item.name}
          className="h-full w-full object-cover origin-center group-hover:scale-110 duration-500 transition-transform"
        />
      </div>

      <div className="h-0 grid grid-cols-4 group-hover:h-12 duration-300 overflow-hidden" style={{ background: 'var(--bg)' }}>
        <a href="#" className="w-full h-full flex justify-center items-center hover:opacity-80 transition" style={{ borderRight: '1px solid var(--border)', color: 'var(--text)' }}>
          <i className="fa-brands fa-x-twitter text-lg"></i>
        </a>
        <a href="#" className="w-full h-full flex justify-center items-center hover:opacity-80 transition" style={{ borderRight: '1px solid var(--border)', color: 'var(--text)' }}>
          <i className="fa-brands fa-facebook-f text-lg"></i>
        </a>
        <a href="#" className="w-full h-full flex justify-center items-center hover:opacity-80 transition" style={{ borderRight: '1px solid var(--border)', color: 'var(--text)' }}>
          <i className="fa-brands fa-linkedin-in text-lg"></i>
        </a>
        <a href="#" className="w-full h-full flex justify-center items-center hover:opacity-80 transition" style={{ color: 'var(--text)' }}>
          <i className="fa-brands fa-discord text-lg"></i>
        </a>
      </div>

      <div className="py-4 space-y-1 text-center capitalize" style={{ background: 'var(--accent)', color: 'white' }}>
        <h3 className="text-lg sm:text-xl font-bold">{item.name}</h3>
        <span className="text-sm opacity-90">{item.role}</span>
      </div>
    </div>
  );
};

const Instructors = () => {
  return (
    <section id="instructor" className="pt-16 sm:pt-24 pb-12 space-y-12">
      <div className="space-y-4 text-center px-4 sm:px-8 lg:px-16">
        <span className="text-lg capitalize font-semibold" style={{ color: 'var(--accent)' }}>instructor</span>
        <h2 className="text-2xl md:text-4xl lg:text-5xl capitalize font-bold" style={{ color: 'var(--text)' }}>course instructor</h2>
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
