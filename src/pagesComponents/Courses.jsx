import React from "react";
const Courses = () => {
  const courseList = [
    {
      price: "$49",
      title: "Grow Personal Financial Security Thinking & Principles",
      img: "https://i.postimg.cc/kg9QNpWd/education-1.jpg",
      weeks: "12 weeks",
    },
    {
      price: "$49",
      title: "The Complete Guide to Build RESTful API Application",
      img: "https://i.postimg.cc/tJW6W3TT/child.jpg",
      weeks: "12 weeks",
    },
    {
      price: "$89",
      title: "Competitive Strategy Law for Management Consultants",
      img: "https://i.postimg.cc/Y25f0990/pupil.jpg",
      weeks: "12 weeks",
    },
    {
      price: "$100",
      title: "The Authentic Confidence and Self-Esteem Masterclass",
      img: "https://i.postimg.cc/mD0MPXTJ/books.jpg",
      weeks: "12 weeks",
    },
  ];

  return (
    <section id="course" className="pt-16 sm:pt-24 pb-12 space-y-12">
      <div className="space-y-4 text-center px-4">
        <span className="text-lg font-semibold capitalize" style={{ color: 'var(--accent)' }}>popular courses</span>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold capitalize" style={{ color: 'var(--text)' }}>Pick A Course To Get Started.</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 w-full px-4 sm:w-11/12 md:w-10/12 lg:w-9/12 2xl:w-8/12 mx-auto">
        {courseList.map((item, i) => (
          <div key={i} className="group shadow-md rounded-xl p-6 grid gap-6 md:grid-cols-2 xl:grid-cols-5 items-center duration-300 transition-all hover:shadow-xl" style={{ border: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
            <div className="relative h-full xl:col-span-2">
              <div className="absolute top-2 left-2 text-white px-2 py-1 rounded-lg text-sm" style={{ background: 'var(--accent)' }}>
                <i className="fa-regular fa-clock text-sm"></i>
                <span className="text-sm">{item.weeks}</span>
              </div>
              <img src={item.img} alt="course" className="w-full max-h-[300px] md:h-full object-cover rounded-md" />
            </div>

            <div className="space-y-4 xl:col-span-3" style={{ color: 'var(--text)' }}>
              <span className="text-xl font-bold" style={{ color: 'var(--accent)' }}>{item.price}</span>

              <a className="text-xl sm:text-2xl font-semibold block hover:opacity-90">
                {item.title}
              </a>

              <div className="flex gap-6 items-center" style={{ color: 'var(--text-secondary)' }}>
                <div>
                  <i className="fa-regular fa-star" style={{ color: 'var(--accent)' }}></i>
                  <i className="fa-regular fa-star" style={{ color: 'var(--accent)' }}></i>
                  <i className="fa-regular fa-star" style={{ color: 'var(--accent)' }}></i>
                  <i className="fa-regular fa-star-half-stroke" style={{ color: 'var(--accent)' }}></i>
                </div>
                <p>(5.0/2 ratings)</p>
              </div>

              <div className="flex gap-6 items-center" style={{ color: 'var(--text-secondary)' }}>
                <div className="space-x-1">
                  <i className="fa-solid fa-chart-simple" style={{ color: 'var(--accent)' }}></i>
                  <span>8 lessons</span>
                </div>

                <div className="space-x-1">
                  <i className="fa-solid fa-users" style={{ color: 'var(--accent)' }}></i>
                  <span>952 students</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <a className="px-12 py-4 rounded-xl text-lg text-white font-semibold flex gap-2 items-center w-fit transition-all hover:opacity-90 hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))' }}>
          <span>browse more courses</span>
          <i className="fa-solid fa-arrow-right-long"></i>
        </a>
      </div>
    </section>
  );
};

export default Courses;
