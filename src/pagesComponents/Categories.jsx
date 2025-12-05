import React from "react";
const Categories = () => {
  const items = [
    { icon: "fa-palette", text: "management", bg: "bg-blue-100", hover: "group-hover:bg-blue-600", color: "text-blue-600" },
    { icon: "fa-user", text: "art & design", bg: "bg-orange-100", hover: "group-hover:bg-orange-600", color: "text-orange-600" },
    { icon: "fa-code", text: "development", bg: "bg-indigo-100", hover: "group-hover:bg-indigo-600", color: "text-indigo-600" },
    { icon: "fa-pills", text: "health & fitness", bg: "bg-pink-100", hover: "group-hover:bg-pink-600", color: "text-pink-600" },
    { icon: "fa-database", text: "data science", bg: "bg-amber-100", hover: "group-hover:bg-amber-600", color: "text-amber-600" },
    { icon: "fa-pencil-ruler", text: "design", bg: "bg-red-100", hover: "group-hover:bg-red-600", color: "text-red-600" },
    { icon: "fa-bullhorn", text: "marketing", bg: "bg-lime-100", hover: "group-hover:bg-lime-600", color: "text-lime-600" },
    { icon: "fa-laptop", text: "computer science", bg: "bg-rose-100", hover: "group-hover:bg-rose-600", color: "text-green-600" },
    { icon: "fa-camera", text: "photography", bg: "bg-purple-100", hover: "group-hover:bg-purple-600", color: "text-green-600" },
    { icon: "fa-headphones", text: "music class", bg: "bg-violet-100", hover: "group-hover:bg-violet-600", color: "text-green-600" },
  ];

  return (
    <section className="pt-32 pb-8 space-y-16" id="categories">
      <div className="space-y-4 text-center px-4">
        <span className="text-xl capitalize text-green-600 font-semibold">categories</span>
        <h2 className="text-2xl md:text-4xl lg:text-5xl capitalize font-bold">
          Online <span className="text-green-500">Classes</span> For Remote Learning.
        </h2>
        <p className="text-lg md:text-xl">Consectetur adipiscing elit sed do eiusmod tempor.</p>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full px-4 sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 mx-auto capitalize">
        {items.map((c, i) => (
          <div key={i} className="rounded-md flex justify-center items-center flex-col shadow-sm border h-52 space-y-2 group hover:shadow-md duration-300">
            <div className={`w-[80px] h-[80px] flex justify-center items-center rounded-full ${c.bg} ${c.hover} duration-300`}>
              <i className={`fa-solid ${c.icon} text-3xl ${c.color} group-hover:text-white duration-300`}></i>
            </div>
            <span className="text-xl font-semibold capitalize">{c.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
