import React from "react";
import Images from "../assets/images/images";

const About = () => {
  // Example sections with illustration + title + description
  const sections = [
    {
      title: "Learning React",
      description:
        "React is a powerful JavaScript library for building interactive user interfaces. It allows you to create reusable components and manage state efficiently.",
      img: Images.illustration1, 
    },
    {
      title: "Components",
      description:
        "Components are the building blocks of React. They let you split the UI into independent, reusable pieces and think about each piece in isolation.",
      img: Images.react1,
    },
    {
      title: "State & Props",
      description:
        "State allows components to remember data, while props let you pass data from parent to child components. Together, they make your UI dynamic and interactive.",
      img: Images.react2,
    },
    {
      title: "Routing",
      description:
        "With React Router, you can navigate between different pages of your app without refreshing the browser. It makes your app feel like a single-page application.",
      img: Images.react3,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-10 px-4" style={{maxHeight: 'calc(100vh - 275px)'}}>
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
        About React JS Learning
      </h1>

      <div className="max-w-6xl mx-auto space-y-16">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center md:justify-between ${
              index % 2 === 0 ? "" : "md:flex-row-reverse"
            } gap-8`}
          >
            <img
              src={section.img}
              alt={section.title}
              className="w-full md:w-1/2 rounded-md shadow-lg"
            />
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{section.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
