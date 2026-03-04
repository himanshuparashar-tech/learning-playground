import React from "react";

const posts = [
  { img: "https://i.postimg.cc/tJW6W3TT/child.jpg", category: "science", title: "Crafting Effective Learning Guide Line", date: "15, nov 2024", comments: 0 },
  { img: "https://i.postimg.cc/JhzjvHT6/laptop.jpg", category: "technology", title: "Exploring Learning Landscapes in Academic", date: "15, nov 2024", comments: 0 },
  { img: "https://i.postimg.cc/Y25f0990/pupil.jpg", category: "learning", title: "Voices from the Learning Education Hub", date: "15, nov 2024", comments: 0 },
];

const Blog = () => {
  return (
    <section id="blog" className="py-16 sm:py-24 space-y-12">
      <div className="space-y-4 text-center px-4">
        <span className="text-lg capitalize font-semibold" style={{ color: 'var(--accent)' }}>latest articles</span>
        <h2 className="text-2xl md:text-4xl lg:text-5xl capitalize font-bold" style={{ color: 'var(--text)' }}>get news with e-learning</h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 w-full px-4 sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 mx-auto">
        <div className="rounded-xl overflow-hidden space-y-6" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
          <img src={posts[0].img} alt="article" className="w-full h-[300px] object-cover" />
          <div className="space-y-4 p-6">
            <div className="space-y-2">
              <span className="capitalize text-base font-semibold" style={{ color: 'var(--accent)' }}>{posts[0].category}</span>
              <h4 className="text-xl font-bold" style={{ color: 'var(--text)' }}>{posts[0].title}</h4>
              <p className="text-base" style={{ color: 'var(--text-secondary)' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet doloribus nam veniam rem soluta delectus.</p>
            </div>
            <div className="flex gap-x-6 gap-y-3 items-center" style={{ color: 'var(--text-muted)' }}>
              <div className="space-x-2 flex items-center"><i className="fa-solid fa-calendar-days" style={{ color: 'var(--accent)' }}></i><span>{posts[0].date}</span></div>
              <div className="space-x-2 flex items-center"><i className="fa-regular fa-comments" style={{ color: 'var(--accent)' }}></i><span>com {posts[0].comments}</span></div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {posts.slice(1).map((p, i) => (
            <div key={i} className="rounded-xl overflow-hidden grid gap-4 sm:grid-cols-2 items-center p-4 transition-all hover:shadow-lg" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
              <img src={p.img} alt="article" className="w-full min-h-[140px] lg:h-[120px] object-cover rounded-lg" />
              <div>
                <div className="space-y-1">
                  <span className="capitalize text-sm font-semibold" style={{ color: 'var(--accent)' }}>{p.category}</span>
                  <h4 className="text-lg font-bold" style={{ color: 'var(--text)' }}>{p.title}</h4>
                </div>
                <div className="flex gap-x-6 gap-y-3 items-center mt-3" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <div className="space-x-2 flex items-center"><i className="fa-solid fa-calendar-days" style={{ color: 'var(--accent)' }}></i><span>{p.date}</span></div>
                  <div className="space-x-2 flex items-center"><i className="fa-regular fa-comments" style={{ color: 'var(--accent)' }}></i><span>com {p.comments}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
