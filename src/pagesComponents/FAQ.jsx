import React, { useState, useRef, useEffect } from "react";

const faqs = [
  {
    q: "how can i contact a moderate directly?",
    a: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cupiditate, eos ea ratione perspiciatis voluptatem incidunt assumenda placeat id eaque sequi sed quaerat laborum exercitationem dignissimos dolor hic fugiat quo?`,
  },
  {
    q: "what is the best payment method?",
    a: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ab non ipsum labore, deleniti inventore nemo, dignissimos tempora eius ex numquam accusantium, corporis nostrum quae exercitationem autem doloribus reiciendis!`,
  },
  {
    q: "what is the refund policy?",
    a: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur cupiditate, eos ea ratione perspiciatis voluptatem.`,
  },
];

const FAQItem = ({ idx, openIndex, setOpenIndex, faq }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      if (openIndex === idx) {
        contentRef.current.style.maxHeight = contentRef.current.scrollHeight + "px";
      } else {
        contentRef.current.style.maxHeight = "0px";
      }
    }
  }, [openIndex, idx]);

  const toggle = () => setOpenIndex(openIndex === idx ? -1 : idx);

  return (
    <div className="bg-green-50 border rounded-lg overflow-hidden">
      <div
        className={`flex justify-between items-center px-8 cursor-pointer accordion-header ${
          openIndex === idx ? "text-gray-100 bg-green-600" : "text-gray-950"
        }`}
        onClick={toggle}
      >
        <h4 className="capitalize md:text-xl font-bold py-6">{faq.q}</h4>
        <i className={`fa-solid fa-chevron-down transition-transform duration-300 ${openIndex === idx ? "rotate-[180deg]" : ""}`}></i>
      </div>

      <div
        ref={contentRef}
        className="overflow-hidden max-h-0 transition-[max-height] duration-300 ease-in-out accordion-content"
      >
        <p className="px-8 pb-6 pt-4 text-lg sm:text-xl text-gray-600 text-justify md:text-left">{faq.a}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className="pt-32 pb-8 space-y-16">
      <div className="space-y-4 text-center px-4">
        <span className="text-xl capitalize text-green-600 font-semibold">FAQ’S</span>
        <h2 className="text-2xl md:text-4xl lg:text-5xl capitalize font-bold">
          learn form <span className="text-green-600">e-learning</span>
        </h2>
        <p className="tex-lg sm:text-xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </div>

      <div className="w-full px-4 sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 mx-auto capitalize space-y-8">
        {faqs.map((f, i) => (
          <FAQItem key={i} idx={i} openIndex={openIndex} setOpenIndex={setOpenIndex} faq={f} />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
