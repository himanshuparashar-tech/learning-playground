import React, { useState } from 'react'

// List of QA in Aray
const accordionData = [
    {
        question: '👉 What is React.js, and why do we use it?',
        answer: (
            <>
                <strong>Define: </strong>React JS is a Javascript Library used for building User Interface (UI), especially for single page applications (SPA).
                <br /><br />
                It allows developers to create reusable UI components, manage state efficiently and update only the parts of UI that change(thanks to Virtual DOM)
                <br /><br />
                <strong>Logic: </strong> Without React, updating the UI manually everytime data changes is complex. React makes it easy by automatically updating the components when data(state) changes.
            </>
        )

    },
    {
        question: '👉 What is a Component in React?',
        answer: (
            <>
                <strong>Define: </strong>A component is a reusable piece of UI that you can think of as a small building block
                It can be Function Component or the Class Component
                <br /><br />
                <strong>example: </strong>
                <code>
                    {
                        `function Welcome() {
                            return <h1>Hello</h1>;
                        }`
                    }
                </code>
                <br /><br />
                <strong>logic: </strong> Components make code reusable and easier to maintain. You can make multiple components and combine them like LEGO blocks to build complex UIs
            </>
        )
    },
    {
        question: '👉 What is JSX and why is it used in React?',
        answer: (
            <>
                <strong>Define: </strong> JSX(Javascript XML) lets you write the HTML inside Javascript.
                It is not required to use React but it makes the code more readable & easier to write.
                <br /><br />
                <strong>Example: </strong>
                <code>
                    {
                        `const element = <h2>Welcome to React!</h2>`
                    }
                </code>
                <br /><br />
                <strong>Logic: </strong> JSX is a template language but with full power of Javascript.
                Behind the scenes, JSX is converted into the Javascript using a tool like BABEL.
            </>
        )

    }
];

// Icon for the Accordion
const AccordionIcon = ({ isOpen }) => {
    return (
        <svg className={`w-6 h-6 text-zinc-500 dark:text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    )
}

// Item list for the Accordion
const AccordionItem = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-zinc-200 dark:border-zinc-700 last:border-b-0">
            <button className="w-full flex justify-between items-center text-left py-4 px-5 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-opacity-75 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors duration-200" onClick={onClick} aria-expanded={isOpen}>
                <span className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                    {item.question}
                </span>
                <AccordionIcon isOpen={isOpen} />
            </button>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"}`}>
                <div className="p-5 pt-0 text-zinc-600 dark:text-zinc-300">
                    <p className='whitespace-pre-line'>{item.answer}</p>
                </div>
            </div>
        </div>
    )
};



// Component Start
const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const handleItemClick = index => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return <div className="flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 ">
        <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-lg dark:shadow-zinc-900/20 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-1">
                    Frequently Asked Questions
                </h1>
                <p className="text-center text-zinc-500 dark:text-zinc-400 mb-6">
                    Here are some of our most asked questions.
                </p>
            </div>
            <div style={{ maxHeight: 'calc(100vh - 275px)', overflow: 'auto' }}>
                {
                    accordionData.map((item, index) =>
                        <AccordionItem
                            key={index}
                            item={item}
                            isOpen={openIndex === index}
                            onClick={() => handleItemClick(index)}
                        />
                    )
                }
            </div>
        </div>
    </div>;
}
export default Faq

