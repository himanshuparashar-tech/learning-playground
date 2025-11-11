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
    },
    {
        question: '👉 What is the difference between a functional component and a class component in React?',
        answer: (
            <>
                <p><b>Functional components</b> are simple Javascript functions that return JSX.</p>
                <p><b>Class components</b> use ES6 classes and extends React.Component</p>

                <br />
                <p><b>Example: (Functional)</b></p>
                <p>
                    <code>
                        <small className='relative left-3'>
                            {
                                `function Hello() {
                                    return <h2>Hello Guys</h2>
                                }`
                            }
                        </small>
                    </code>
                </p>
                <p><b>Example: (Class)</b></p>
                <p>
                    <code>
                        {
                            `class Hello extends React.Component{
                                return(
                                    <h2>Hello Guys</h2>
                                )
                            }`
                        }
                    </code>
                </p>
                <br />
                <p><b>Logic:</b></p>
                <p>Functional Components are cleaner and faster.</p>
                <p>Most mordern React apps are now using <b>functional components</b> with <b>Hooks</b> like <b>(useState, useEffect)</b></p>
            </>
        )
    },
    {
        question: '👉 How do you render a React component on the screen?',
        answer: (
            <>
                <p>You render a component using <b>ReactDOM.render()</b> method or with <b>root.render()</b> method in modern React</p>

                <p><b>Example:🥇 Old React 17 and below (legacy way):</b></p>
                <p>
                    <code>
                        {
                            `
                                import React from 'react';
                                import ReactDOM from 'react-dom/client';

                                function Welcome(){
                                    return <h2>Hello</h2>
                                }

                                const root  = ReactDOM.createRoot(document.getElementById('root'));
                                root.render(<Welcome />)

                                
                            `
                        }
                    </code>

                    <b>OR NOW A DAYS :🥈 New React 18+ (modern way):</b>

                    <code>
                        {
                            `
                                import React, {StrictMode} from 'react';
                                import {createRoot} from 'react-dom/client';

                                createRoot(documen.getElementById('root')).render(
                                    <StrictMode>
                                        <App />
                                    </StrictMode>
                                )
                            `
                        }
                    </code>

                </p>

            </>
        )
    },
    {
        question: '👉 What is the difference between old and new React JS i.e 17 and 18+ ?',
        answer: (
            <>
                <p>
                    <code>
                        {
                            `🔍 Step-by-Step Difference Explanation
                        1. React 18 introduced a new rendering system — “Concurrent Mode”

                        React 18 brought a new internal engine (called Concurrent Rendering) that makes the UI smoother and faster by:

                        Letting React pause, resume, and even cancel renders.

                        Preparing updates in the background.

                        Avoiding UI freezes during heavy operations.

                        🧩 To enable this, React introduced a new API:
                        createRoot from 'react-dom/client'

                        ✅ This new API replaces the old ReactDOM.render() or old style ReactDOM.createRoot() that didn’t fully support concurrency.

                        2. The StrictMode wrapper

                        StrictMode is not required, but highly recommended.

                        It helps:

                        Detect side effects.

                        Warn about deprecated APIs.

                        Double-invokes some functions in dev mode to help you write safe code (but only in dev, not in production).

                        Think of it like a safety helmet for your React app 🪖 
                        
                        `
                        }

                    </code>
                </p>
            </>
        )
    },
    {
        question: '👉 What \'s new in React 19?',
        answer: (
            <>
                <p className='max-h-screen overflow-auto'>
                    <code>
                        {`

                        Here are some of the major additions and changes:

                        ✅ New “Actions” API

                        React 19 introduces a concept called Actions — essentially async functions that describe work (e.g., form submission, data updates) and integrate with React’s state/transition system.
                        React
                        +1

                        This reduces boilerplate: you don’t have to manually handle “pending”, “error”, “success”, etc, in many cases.
                        React
                        +1

                        ✅ New hooks like useActionState, useOptimistic

                        These hooks help you manage the state of these Actions — whether they’re pending, error, completed — and support optimistic updates (showing UI updates before server confirms) more easily.
                        React
                        +1

                        ✅ Improved Server Components & SSR/hydration

                        React 19 enhances support for server-side rendering (SSR), better hydration of components, and more seamless integration of client + server logic.
                        GeeksforGeeks
                        +1

                        For example, features like “partial pre-rendering” in 19.2 allow parts of the app to be pre-rendered and resumed later.
                        React

                        ✅ Other improvements

                        Better handling of custom elements/web components.
                        DEV Community
                        +1

                        Enhanced error messages and debugging tools.
                        eLuminous Technologies

                        More control over metadata (title/meta tags) and resources like scripts/stylesheets.

                        🍳 Cooking Analogy

                        Imagine you’re running a restaurant kitchen:

                        React 18 is like having a smart stove that can cook many dishes at once (concurrent rendering, automatic batching).

                        React 19 upgrades the kitchen further:

                        You now have a smart order system (Actions) — when an order comes in, it tracks “preparing”, “cooking”, “served” automatically.

                        You have efficient backup chefs (optimistic updates) who start prepping while the main dish is cooking.

                        The delivery system (SSR/hydration) is improved — some dishes come partially prepared from the back-kitchen and finish in front of the customer.

                        And you have better kitchen tools & diagnostics (error messages, debug tools) so you can spot mistakes instantly.

                        So, upgrading from React 18 to React 19 is like upgrading your kitchen gear and workflow — you can cook faster, handle more orders simultaneously, reduce delays, and handle mistakes more gracefully.
                        `
                        }

                    </code>
                    <p><b>Logic : </b></p>
                    <p>React takes your JSX and injects it into the real DOM (the div with id "root")</p>
                    <p>THis is how React mounts your App into the web page</p>
                </p>
            </>
        )
    },
    {
        question: '👉 What are the props in the ReactJS?',
        answer: (
            <>
                <p><b>Define:</b></p>
                <p>Props are short for "properties" are used to pass <b>data from the one component to another, </b> like function parameters</p>
                {
                    `
                        function Greeting(props){
                            return <h3>{props.name}</h3>
                        }

                        function App(){
                            return <Greeting name="Titu" />
                        }
                    `
                }

                <p><b>Logic: </b></p>
                <p>Props make components <b>dynamic</b> and <b>reusable</b>.</p>
                <p>Here is the Greeting component can greet anyone just by changing a prop value.   </p>
            </>
        )
    },
    {
        question: '👉 What is useState in React?',
        answer: (
            <>
                <p><b>Define:</b></p>
                <p>useState is a Hook that lets you add state to functional components.</p>
                <p>State is like a variable that React keeps track of, and when it changes, React re-renders the component to reflect the new state.</p>
                <br />
                <p><b>Code:</b></p>
                {
                    `
                        import React, {useState} from "react"

                        function Counter() {
                            const [count, setCount] = useState() // count is state & setCount update it.

                            return(
                                <div>
                                    <h2>Count : {count}</h2>
                                    <button onClick={() => setCount(count + 1)}> Increase </button>
                                </div>
                            );
                        }
                    `
                }
                <p><b>Logic:</b></p>
                <p>Count holds the current value</p>
                <p>setCount updates the value & react automatically rerender the component when state changes</p>
            </>
        )
    },
    {
        question: '👉 How do you handle events in React?',
        answer: (
            <>
                <p><b>Define:</b></p>
                <p>Events in React are handled using event handlers, which are functions that get called when a specific event occurs, like a button click or form submission.</p>
                <br />
                <p><b>Code:</b></p>
                {`
                    function clickMeButton() {
                        const handleClick = () => {
                            alert("Button Clicked");    
                        }
                        
                        return (
                            <button onClick={handleClick}>Click Me</button>
                        )
                    }
                `}
                <br />
                <p><b>Logic:</b></p>
                <p>In this example, when the button is clicked, the handleClick function is called, which shows an alert.</p>
                <p>React uses camelCase for event names (onClick instead of onclick) and you pass a function as the event handler.</p>
            </>
        )
    },
    {
        question: '👉 How can you update state based on the previous state?',
        answer: (
            <>
                <p><b>Define:</b></p>
                <p>Sometimes you need a current state value to calculate the next step</p>
                <p>In such case use a function inside in setState</p>
                <br />
                <p><b>Code:</b></p>

                {`
                    const [count, setCount] = useState(0);

                    function increment(){
                        setCount(prevCount => prevCount + 1) // prevCount is the previous state
                    }
                `}
                <br />
                <p><b>Logic:</b></p>
                <p>This ensures your updates are safe even if multiple state updates at the same time.</p>
            </>
        )
    },
    {
        question: '👉 How can you toggle boolean state in React?',
        answer: (
            <>
                <p><b>Define:</b></p>
                <p>We can use the previous state to toggle between true and false using useState</p>
                <br />
                <p><b>Code:</b></p>
                {`
                    import React, {useState} from 'react';

                    const [isOn, setIsOn] = useState(false);

                    const toggle = () => {
                        setIsOn(prevState = !prevState) // switches true ➡️ false or false ➡️ true     
                    }
                `}
                <br />
                <p><b>Logic:</b></p>
                <p>Using the previous state ensure that the toggle works reliably, even if multiple click happens quickly</p>
            </>
        )
    },
    {
        question: '👉 Can you have multiple state variables in the one component?',
        answer: (
            <>
                <p><b>Define:</b></p>
                <p>Yes, we can use multiple useState hooks for different piece of state </p>
                <br />
                <p><b>Code:</b></p>
                {`
                    const [likes, setLikes] = useState(0);
                    const [liked, setLiked] = useState(false);
                `}
                <br />
                <p><b>Logic:</b></p>
                <p>Each state is independent to one state changes doesn't affect other state</p>
            </>
        )
    },
    {
        question: '👉 Can we use multiple useState in one piece of hook?',
        answer: (
            <>
                <p><b>Define:</b></p>
                <p>Absolutely! ✅ We can use multiple useState hooks in a single component, or we can combine them into one state object depending on how we want to organize our state.</p>
                <br />
                <p><b>Code: 1️⃣ Multiple useState hooks (Separate Ingredients)</b></p>
                {`
                    import React, { useState } from "react";

                    const Counter = () => {
                    const [count, setCount] = useState(0);        // Ingredient 1: count
                    const [color, setColor] = useState("blue");   // Ingredient 2: color

                    const handleClick = () => {
                        setCount(count + 1);
                        setColor(color === "blue" ? "red" : "blue");
                    };

                    return (
                        <div>
                        <h1 style={{ color }}>{count}</h1>
                        <button onClick={handleClick}>Click Me!</button>
                        </div>
                    );
                    };

                    export default Counter;

                `}
                <br />
                <p><b>Code: 1️⃣ Single useState with Object (One Big Mixing Bowl)</b></p>
                {`
                    import React, { useState } from "react";

                    const Counter = () => {
                    const [state, setState] = useState({ count: 0, color: "blue" });

                    const handleClick = () => {
                        setState(prev => ({
                        count: prev.count + 1,
                        color: prev.color === "blue" ? "red" : "blue"
                        }));
                    };

                    return (
                        <div>
                        <h1 style={{ color: state.color }}>{state.count}</h1>
                        <button onClick={handleClick}>Click Me!</button>
                        </div>
                    );
                    };

                    export default Counter;
                `}
                <br />
                <p><b>Logic:</b></p>
                <p>Each state is independent to one state changes doesn't affect other state</p>
            </>
        )
    },
    {
        question: '👉 How do you apply dynamic styles based on state?',
        answer: (
            <>
                <p><b>Define:</b></p>
                <p>We can change styles dynamically using inline styles or conditional class names based on the state values.</p>
                <br />
                <p><b>Code:</b></p>
                {`
                    import React, { useState } from "react";
                    const ColorfulText = () => {
                        const [isRed, setIsRed] = useState(false);  
                        const toggleColor = () => {
                            setIsRed(prev => !prev);  
                        }
                        return (
                            <div>
                                <p style={{ color: isRed ? "red" : "blue" }}>
                                    This text changes color!
                                </p>
                                <button onClick={toggleColor}>Toggle Color</button>
                            </div>
                        );
                    }
                    export default ColorfulText;
                `}
                <br />
                <p><b>Logic:</b></p>
                <p>When the button is clicked, the text color toggles between red and blue based on the isRed state.</p>
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
    return <div className="flex items-center justify-center p-1 lg:p-4 bg-zinc-50 dark:bg-zinc-950 ">
        <div className="w-full max-w-full mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-lg dark:shadow-zinc-900/20 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-1">
                    Frequently Asked Questions
                </h1>
                <p className="text-center text-zinc-500 dark:text-zinc-400 mb-1">
                    Here are some of our most asked questions.
                </p>
            </div>
            <div style={{ maxHeight: 'calc(100vh - 280px)', overflow: 'auto' }}>
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

