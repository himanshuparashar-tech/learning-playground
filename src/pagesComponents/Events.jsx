import React from "react";

const events = [
  {
    time: "7:00 pm - 9:00 pm",
    img: "https://i.postimg.cc/kg9QNpWd/education-1.jpg",
    title: "Creative Teaching Seminar Master Class",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo perferendis culpa officia sequi nostrum quas.",
    location: "torento, canada",
  },
  {
    time: "7:00 pm - 9:00 pm",
    img: "https://i.postimg.cc/Y25f0990/pupil.jpg",
    title: "Learn English in Ease Basic to Advance",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo perferendis culpa officia sequi nostrum quas.",
    location: "torento, canada",
  },
  {
    time: "7:00 pm - 9:00 pm",
    img: "https://i.postimg.cc/mD0MPXTJ/books.jpg",
    title: "Navigating the Future of Business Education",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo perferendis culpa officia sequi nostrum quas.",
    location: "torento, canada",
  },
];

const EventCard = ({ e }) => (
  <div className="bg-green-50 shadow-sm rounded-md relative overflow-hidden">
    <div className="absolute top-3 left-3 bg-green-500 text-gray-100 px-2 py-1 rounded-md z-30">
      <i className="fa-regular fa-clock text-sm"></i>
      <span className="text-sm capitalize">{e.time}</span>
    </div>

    <img src={e.img} className="h-[250px] w-full object-cover" alt={e.title} />

    <div className="bg-inherit space-y-4 p-6">
      <h3 className="capitalize text-2xl font-semibold">{e.title}</h3>
      <p className="text-gray-600 text-lg">{e.desc}</p>
      <div className="space-x-3">
        <i className="fa-solid fa-location-dot text-green-600"></i>
        <span className="capitalize">{e.location}</span>
      </div>
      <a className="bg-green-600 px-6 py-2 rounded-lg text-lg text-gray-50 flex gap-2 items-center hover:bg-green-700 duration-300 w-fit" href="#">
        <span className="capitalize text-nowrap">learn more</span>
        <i className="fa-solid fa-arrow-right-long"></i>
      </a>
    </div>
  </div>
);

const Events = () => {
  return (
    <section id="news" className="pt-32 pb-8 space-y-16">
      <div className="space-y-4 text-center px-4">
        <span className="text-xl capitalize text-green-600 font-semibold">events & news</span>
        <h2 className="text-2xl md:text-4xl lg:text-5xl capitalize font-bold">Popular Events & News</h2>
      </div>

      <div className="w-full px-4 sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 mx-auto grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {events.map((e, i) => <EventCard key={i} e={e} />)}
      </div>
    </section>
  );
};

export default Events;
