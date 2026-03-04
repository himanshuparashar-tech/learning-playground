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
  <div className="shadow-lg rounded-xl relative overflow-hidden transition-all hover:shadow-xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
    <div className="absolute top-3 left-3 text-white px-3 py-1.5 rounded-lg z-30 text-sm" style={{ background: 'var(--accent)' }}>
      <i className="fa-regular fa-clock mr-1"></i>
      <span className="capitalize">{e.time}</span>
    </div>

    <img src={e.img} className="h-[220px] w-full object-cover" alt={e.title} />

    <div className="space-y-4 p-6">
      <h3 className="capitalize text-xl font-semibold" style={{ color: 'var(--text)' }}>{e.title}</h3>
      <p className="text-base" style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>{e.desc}</p>
      <div className="space-x-3 flex items-center" style={{ color: 'var(--text-secondary)' }}>
        <i className="fa-solid fa-location-dot" style={{ color: 'var(--accent)' }}></i>
        <span className="capitalize">{e.location}</span>
      </div>
      <a className="px-6 py-2.5 rounded-xl text-base font-semibold text-white flex gap-2 items-center w-fit transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))' }} href="#">
        <span className="capitalize text-nowrap">learn more</span>
        <i className="fa-solid fa-arrow-right-long"></i>
      </a>
    </div>
  </div>
);

const Events = () => {
  return (
    <section id="news" className="pt-16 sm:pt-24 pb-12 space-y-12">
      <div className="space-y-4 text-center px-4">
        <span className="text-lg capitalize font-semibold" style={{ color: 'var(--accent)' }}>events & news</span>
        <h2 className="text-2xl md:text-4xl lg:text-5xl capitalize font-bold" style={{ color: 'var(--text)' }}>Popular Events & News</h2>
      </div>

      <div className="w-full px-4 sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 mx-auto grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {events.map((e, i) => <EventCard key={i} e={e} />)}
      </div>
    </section>
  );
};

export default Events;
