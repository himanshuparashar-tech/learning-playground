import React from "react";

const posts = [
  { img: "https://i.postimg.cc/tJW6W3TT/child.jpg", category: "science", title: "Crafting Effective Learning Guide Line", date: "15, nov 2024", comments: 0 },
  { img: "https://i.postimg.cc/JhzjvHT6/laptop.jpg", category: "technology", title: "Exploring Learning Landscapes in Academic", date: "15, nov 2024", comments: 0 },
  { img: "https://i.postimg.cc/Y25f0990/pupil.jpg", category: "learning", title: "Voices from the Learning Education Hub", date: "15, nov 2024", comments: 0 },
];

const Blog = () => {
  return (
    <section id="blog" className="py-32 space-y-16">
      <div className="space-y-4 text-center px-4">
        <span className="text-xl capitalize text-green-600 font-semibold">latest articles</span>
        <h2 className="text-2xl md:text-4xl lg:text-5xl capitalize font-bold">get news with e-learning</h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 w-full px-4 sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 mx-auto">
        <div className="rounded-md overflow-hidden space-y-6">
          <img src={posts[0].img} alt="article" className="w-full h-[350px] rounded-md" />

          <div className="space-y-4">
            <div className="space-y-2">
              <span className="capitalize text-lg text-green-600 font-semibold">{posts[0].category}</span>
              <h4 className="text-2xl font-bold text-gray-700">{posts[0].title}</h4>
              <p className="text-lg text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet doloribus nam veniam rem soluta delectus.</p>
            </div>

            <div className="flex gap-x-6 gap-y-3 items-center">
              <div className="space-x-2 text-lg"><i className="fa-solid fa-calendar-days text-green-600"></i><span>{posts[0].date}</span></div>
              <div className="space-x-2 text-lg"><i className="fa-regular fa-comments text-green-600"></i><span>com {posts[0].comments}</span></div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {posts.slice(1).map((p, i) => (
            <div key={i} className="rounded-md overflow-hidden grid gap-4 sm:grid-cols-2 lg:grid-cols-none xl:grid-cols-2 items-center">
              <img src={p.img} alt="article" className="w-full max-h-fit min-h-[200px] lg:h-[150px] object-cover rounded-md" />
              <div>
                <div className="space-y-2">
                  <span className="capitalize text-lg text-green-600 font-semibold">{p.category}</span>
                  <h4 className="text-2xl font-bold text-gray-700">{p.title}</h4>
                </div>

                <div className="flex gap-x-6 gap-y-3 items-center mt-4">
                  <div className="space-x-2 text-lg"><i className="fa-solid fa-calendar-days text-green-600"></i><span>{p.date}</span></div>
                  <div className="space-x-2 text-lg"><i className="fa-regular fa-comments text-green-600"></i><span>com {p.comments}</span></div>
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
