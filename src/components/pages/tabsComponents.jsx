import { h1 } from 'framer-motion/client';
import React from 'react';

// dynamic values computed when the module loads (you can also turn these into functions if you want fresh values each call)
export const greetMessage = 'Hello, Welcome to World of R';
export const currentDateTime = new Date().toLocaleString();
export const currentDateInString = new Date().toDateString();
export const currentDateInNumber = new Date().toLocaleDateString();

// Example 1 dynamic values
export const example1MyName = 'Heller';
export const example1Multiply = (a, b) => a * b;
export const example1dynaClass = 'MustBeRed';

// Example for Map method
export const userInfo = [
    { username: 'Alice', email: 'alice@example.com', age: 28 },
    { username: 'Bob', email: 'bob@example.com', age: 34 },
    { username: 'Charlie', email: 'charlie@example.com', age: 25 }
];
// Map Array
export const mapArray = [1, 2, 3, 4, 5];

// Difference Between forEach and map method (table data)
export const data = [
    {
        section: '🧠 Purpose',
        rows: [
            { method: 'forEach()', description: 'Used to loop through an array and perform an action for each element.' },
            { method: 'map()', description: 'Used to loop through an array and create a new array by transforming each element.' }
        ]
    },
    {
        section: '💻 Return Value',
        rows: [
            { method: 'forEach()', description: 'Nothing (undefined)' },
            { method: 'map()', description: 'A new array with modified values' }
        ]
    }
];

// Map Array Method with Destructuring
export const destructureArray = [
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
]

// export Props related content
export const ParentProps = () => {
    return (
        <>
            <ChildProps
                name="W/O Destructuring"
                age={28}
                isLoggedIn={true}
                img="https://media.istockphoto.com/id/615422436/photo/demo-sign-cubes.jpg?s=612x612&w=0&k=20&c=HHOLIiF8SmbIssxKv3G480EgTVub_v9cc1QME3Dn6XU="
                hobbies={['Reading', 'Traveling', 'Coding']}
                alt="User Image"
            />
        </>
    )
}

export const ChildProps = (props) => {
    return (
        <>
            <h4> Name : {props.name}</h4>
            <p> Age : {props.age}</p>
            <p> Status : {props.isLoggedIn}</p>
            <img src={props.img} alt={props.alt} width={100} />

        </>
    )
}

// Props with Destructuring
export const ParentPropsDestructring = () => {
    return (
        <>
            <ChildProps
                name="With Destructuring"
                age={28}
                isLoggedIn={true}
                img="https://media.istockphoto.com/id/615422436/photo/demo-sign-cubes.jpg?s=612x612&w=0&k=20&c=HHOLIiF8SmbIssxKv3G480EgTVub_v9cc1QME3Dn6XU="
                hobbies={['Reading', 'Traveling', 'Coding']}
                alt="User Image"
            />
        </>
    )
}

export const ChildPropsDestructuring = ({ name, age, isLoggedIn, img, alt }) => {
    return (
        <>
            <h4> Name : {name}</h4>
            <p> Age : {age}</p>
            <p> Status : {isLoggedIn ? 'Online' : 'Offline'}</p>
            <img src={img} alt={alt} width={100} />
        </>
    )
}

// Person props from parent to child
export const PersonParentProps = () => {
    return (
        <>
            <PersonProps name="James" age={22} />
        </>
    )
}

export const PersonProps = (props) => {
    return (
        <>
            <h2>{props.name}</h2>
            <p>{props.age}</p>
        </>
    )
}

// Product Props from parent to child with Destructuring
export const ProductParentProps = () => {
    return (
        <>
            <ProductChildProps name="James Child" age={15} />
        </>
    )
}

export const ProductChildProps = ({ name, age }) => {
    return (
        <>
            <h2>{name}</h2>
            <p>{age}</p>
        </>
    )
}

// Card Component
export const cards = [
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
];
export const CustomCard = ({
    title = "Reusable Components",
    description = "Create and reuse components like cards, modals and form controls.",
    image = "https://media.istockphoto.com/id/615422436/photo/demo-sign-cubes.jpg?s=612x612&w=0&k=20&c=HHOLIiF8SmbIssxKv3G480EgTVub_v9cc1QME3Dn6XU=",
    children }) => {
    return (
        <div className="bg-white shadow-lg rounded-2xl p-4 w-64 text-center hover:scale-105 transition-transform duration-300">
            {image && (
                <img src={image} title={title} className='w-full h-40 object-cover rounded-xl mb-3' />
            )}
            <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
            <p className='text-sm text-gray-500'>{description}</p>

            {/* {Extra JSX Passed from Parent} */}
            <div className='mt-3'>
                {children}
            </div>
        </div>
    )
}

export const CustomCardMap = ({ title, description, image, children }) => {
    return (
        <div className="w-full bg-white shadow-lg rounded-2xl p-4 text-center hover:scale-105 transition-transform duration-300">
            {image && (
                <img src={image} title={title} className='w-full h-40 object-cover rounded-xl mb-3' />
            )}
            <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
            <p className='text-sm text-gray-500'>{description}</p>

            {/* {Extra JSX Passed from Parent} */}
            <div className='mt-3'>
                {children}
            </div>
        </div>
    )
}

// Conditional Rendering Components
export const ValidPassword = () => { return (<h1>Valid Password</h1>) }
export const InvalidPassword = () => { return (<h1>InValid Password</h1>) }

export const Password = ({ isvalid }) => {
    if (isvalid) {
        return (
            <h1>Valid Password</h1>
        )
    }

    return (
        <h1> InValid Password</h1 >
    )
}

// Conditional Rendering with Ternary Operator
export const PasswordTernary = ({ isValid }) => {
    return (
        isValid ? <ValidPassword /> : <InvalidPassword />
    )
}