// src/data.js

import React from "react";


export const ArrayData = {
    greetMessage: 'Hello, Welcome to World of R',

    // dynamic values computed when the module loads (you can also turn these into functions if you want fresh values each call)
    currentDateTime: new Date().toLocaleString(),
    currentDateInString: new Date().toDateString(),
    currentDateInNumber: new Date().toLocaleDateString(),

    // Example 1 dynamic values
    example1MyName: 'Heller',
    example1Multiply: (a, b) => a * b,
    example1dynaClass: 'MustBeRed',

    // Example for Map method
    userInfo: [
        { username: 'Alice', email: 'alice@example.com', age: 28 },
        { username: 'Bob', email: 'bob@example.com', age: 34 },
        { username: 'Charlie', email: 'charlie@example.com', age: 25 }
    ],

    // Map Array
    mapArray: [1, 2, 3, 4, 5],

    // Difference Between forEach and map method (table data)
    data: [
        {
            section: '🧠 Purpose',
            rows: [
                { method: 'forEach()', description: 'Used to loop through an array and perform an action for each element.' },
                { method: 'map()', description: <> Used to loop through an array and<strong> create a new array</strong> by transforming each element.</> }
            ]
        },
        {
            section: '💻 Return Value',
            rows: [
                { method: 'forEach()', description: 'Nothing (undefined)' },
                { method: 'map()', description: 'A new array with modified values' }
            ]
        }
    ],

    // Map Array Method with Destructuring
    destructureArray: [
        {
            id: 1,
            name: 'Artech',
            age: 28,
        },
        {
            id: 2,
            name: 'Bacany',
            age: 34,
        },
        {
            id: 3,
            name: 'Charli',
            age: 25,
        }
    ],
    // Card Component
    cards: [
        {
            id: 1,
            title: "Getting Started",
            description: "Introductory card explaining JSX basics and how to create components.",
            image: "https://media.istockphoto.com/id/615422436/photo/demo-sign-cubes.jpg?s=612x612&w=0&k=20&c=HHOLIiF8SmbIssxKv3G480EgTVub_v9cc1QME3Dn6XU=",
            features: ["JSX syntax", "Component structure", "Rendering"]
        },
        {
            id: 2,
            title: "Props & State",
            description: "Overview of passing data to components and managing local state.",
            image: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2069",
            features: ["Props", "State", "Lifting state"]
        },
        {
            id: 3,
            title: "Lists & Keys",
            description: "How to render lists with map() and why keys are important.",
            image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
            features: ["map()", "keys", "Performance tips"]
        },
        {
            id: 4,
            title: "Reusable Components",
            description: "Create and reuse components like cards, modals and form controls.",
            image: "https://images.unsplash.com/photo-1633621412960-6df85eff8c85?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=627",
            features: ["Props", "Composition", "Children"]
        },
        {
            id: 5,
            title: "Advanced Patterns",
            description: "Composition patterns, render props, and hooks best practices.",
            image: "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1025",
            features: ["Hooks", "Context", "Performance"]
        }
    ],
    featuredProducts: [
        { id: 101, name: "iPhone 15", price: 999, inStock: true },
        { id: 102, name: "MacBook Pro", price: 2500, inStock: true },
    ],

    products: [
        { id: 1, name: "Mouse", price: 25, inStock: true, image: 'https://media.istockphoto.com/id/615422436/photo/demo-sign-cubes.jpg?s=612x612&w=0&k=20&c=HHOLIiF8SmbIssxKv3G480EgTVub_v9cc1QME3Dn6XU=' },
        { id: 2, name: "Keyboard", price: 45, inStock: false, image: 'https://m.media-amazon.com/images/I/71DYlRN51tL._AC_SL1500_.jpg' },
        { id: 3, name: "Monitor", price: 200, inStock: true, image: 'https://images-na.ssl-images-amazon.com/images/G/01/aplusautomation/vendorimages/45136854-41e0-4b0b-9c72-0ee7659f1a17.jpg._CB298616946_.jpg' },
        { id: 4, name: "Laptop", price: 1200, inStock: true, image: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000' },
        { id: 5, name: "Headphones", price: 50, inStock: false, image: 'https://static.vecteezy.com/system/resources/previews/024/558/827/original/blue-wireless-headphones-isolated-on-transparent-background-ai-generated-png.png' },
    ],

    accessories: [
        { id: 201, name: "USB Cable", price: 10, inStock: true },
        { id: 202, name: "Mouse Pad", price: 15, inStock: false },
    ],

    // Projects
    projects: [
        {
            id: 'todo',
            title: 'Todo App',
            description: 'A Simple Task Manager'
        },
        {
            id: 'simpletodo',
            title: 'Simple Todo App With Add',
            description: 'A Simple Todo App'
        },
        {
            id: 'simpletodowithtoaster',
            title: 'Simple Todo With Add, Toaster',
            description: 'A simple Todo App With Toaster'
        },
        {
            id: 'simpletodowithdelete',
            title: 'Simple Todo With Add, Toaster, Delete Task ',
            description: 'A simple Todo App With Toaster & Delete Task individually'
        },
        {
            id: 'simpletodowithedit',
            title: 'Simple Todo With Add, Edit, Delete, Toaster ',
            description: 'A simple Todo App with Add, Edit, Delete, Toaster'
        },
        {
            id: 'simpletodowithlocalstorage',
            title: 'Simple Todo With Add, Edit, Delete, Toaster, Local Storage',
            description: 'A simple Todo App with Add, Edit, Delete, Toaster'
        },
        {
            id: 'minichallenge1',
            title: 'Mini Challenge on the questions',
            description: 'handle events, useState and the current state change on previous state'
        },
        {
            id: 'minichallenge2',
            title: 'Mini Challenge on the questions',
            description: 'We can combine them how we want to organize our state'
        },
        {
            id: 'minichallenge3',
            title: 'Mini Challenge on the questions',
            description: 'We can change dynamic styles based on state values'
        },
        {
            id: 'minichallenge4',
            title: 'Mini Challenge on the questions',
            description: 'Here we can change light mode and dark mode'
        },
        {
            id: 'bootstrap_projects',
            title: 'Bootstrap Projects',
            description: 'List of Bootstrap projects'
        },
        {
            id: 'reactjs_projects',
            title: 'React Js Projects',
            description: 'List of React js Projects.'
        }
    ],
    bs_projects: [
        {
            id: 'bs_singleopenaccordion',
            title: 'Single Accordion ',
            description: 'Single Accordion'
        },
        {
            id: 'bs_multipleopenaccordion',
            title: 'Multiple Accordion',
            description: 'Multiple Accordion'
        }
    ],
    rjs_projects: [
        {
            id: 'rjs_singleopenaccordion',
            title: 'Single Accordion ',
            description: 'Single Accordion'
        },
    ],

    
    myRecipe: [
        {
            name: 'Spicy Pasta',
            description: 'A delicious pasta with chili and herbs.',
            ingredients: ['Pasta', 'Chili', 'Tomato', 'Garlic', 'Basil'],
        }
    ],
    // Faq React and Js

    // List of React QA in Array
    accordionData1: [
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
                    <div className='max-h-screen overflow-auto'>
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
                    </div>
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
    ],

    // List of Javascript QA in Array
    accordionData2: [
        {
            question: '👉 What is Javascript & where it is used?',
            answer: (
                <>
                    <strong>Define: </strong>
                    <br /><br />
                    <p>Javascript is versatile and widely used programming language that plays a crucial role in Web Development. It enables developers to create interactive and dynamic elements within web pages, enhancing the user experience by adding functionality that responds to the user actions. Javascript is primarly executed in web browsers, but it is also used in other environments like server side applications. (Node.js)  </p>
                    <br />
                    <strong>We can use js in</strong>

                    <ul>
                        <li>In the browser (Frontend)</li>
                        <li>On the server using Node Js (Backend)</li>
                        <li>For Mobile Apps(React Native)</li>
                        <li>For Desktop Apps (Electron)</li>
                        <li>For Game Development</li>
                    </ul>
                    <br />
                    <strong>Logic: </strong>
                    <p>Html provides structure, css provides styling and Javascript adds brain/logic to the webpage.</p>
                    <p>Examples : Popups, sliders, animations, dropdowns, API calls - all use Javascript</p>
                </>
            )

        },
        {
            question: '👉 What is a Variable in Javascript?',
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
            question: '👉 ',
            answer: (
                <>
                    <strong>Define: </strong>
                    <p></p>
                    <br /><br />
                    <strong>Example: </strong>
                    <code>
                        {
                            `
                            `
                        }
                    </code>
                    <br /><br />
                    <strong>Logic: </strong>
                    <p></p>
                </>
            )
        },
    ]
};
