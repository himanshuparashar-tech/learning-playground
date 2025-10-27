import { div, h1, h3, h4, p, select } from 'framer-motion/client';
import React, { useState } from 'react';
import { FcHome } from "react-icons/fc";


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

// Conditional Rendering With Cart
export const CartRender = () => {
    const items = ["Wireless Mouse", "Keyboard", "HDMI Cable"];
    return (
        <div>
            <h1> Cart 🛒 </h1>
            {items.length > 0 && <h2>You have {items.length} items in your cart.</h2>}

            <ul>
                <h3>Products</h3>
                {items.map((item, index) => {
                    return (
                        <li key={index}>
                            {item}
                        </li>
                    )
                })}

            </ul>
        </div >

    )
}

// Exercise Conditional Rendering
export const ExerciseWeather = ({ temprature }) => {
    if (temprature < 15) {
        return <h1> It's Cold Outside ❄️ </h1>;
    }
    else if (temprature >= 15 && temprature <= 25) {
        return (
            <h1> It's Normal Weather 🌤️ </h1>
        )
    }
    else {
        return (
            <h1> It's Hot Outside 🔥 </h1>
        )
    }
}

// Exercise Weather with Ternary Operator
export const ExerciseWeatherTernary = ({ temprature }) => {
    return (
        (temprature < 15) ? <h1>`It's Cold Outside `</h1> :
            (temprature >= 15 && temprature <= 25) ? <h1>`It's Normal Weather `</h1> :
                <h1>`It's Hot Outside `</h1>
    )
}


// Excercise UserStatus with the && Operator
export const UserStatus = ({ isLoggedIn, isAdmin }) => {
    return (
        (isLoggedIn && isAdmin) ? <h1>Welcome Admin</h1> : <h1>Welcome User</h1>
    )
}

// Excercise Morning Day Status
export const DayStatus = ({ timeOfDay }) => {
    return (
        (timeOfDay === 'morning') ? <h1>Good Morning!</h1> :
            (timeOfDay === 'afternoon') ? <h1>Good Afternoon!</h1> :
                (timeOfDay === 'evening') ? <h1>Good Evening!</h1> :
                    <h1>Good Night!</h1>
    )
}

// Inline Styles in React
export const InlineStyles = () => {
    const styles = { color: 'red', fontSize: '2rem', fontWeight: 'bold', backgroundColor: 'black', padding: '1rem', borderRadius: '0.5rem' }
    return (
        <div>
            <h6 className='mb-2'><strong>Styles with constant styles</strong></h6>
            <div style={styles}>Inline Styles</div>
            {/* OR */}
            <br />
            <h6 className='mb-2'><strong>Styles with inline styles</strong></h6>
            <div style={{
                color: 'white',
                fontSize: '2rem',
                fontWeight: 'bold',
                backgroundColor: 'maroon',
                padding: '1rem',
                borderRadius: '0.5rem'
            }}> Inline Styles</div >
        </div>
    )
}

// React Icons in React
export const ReactIcons = () => {
    return (
        <h3 className='flex justify-center align-items-center p-2'> This is home Icon :  <FcHome /> </h3>
    )
}

// Exercise with Style Card

export const StyleCard = () => {
    return (
        <>

            <div style={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '10px', color: 'white' }}>
                <h2 style={{ fontSize: '20px' }} >Inline Styled</h2 >
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ex repudiandae tempore tempora iste. Iure eum architecto dicta dolorem adipisci est quisquam, reiciendis dolorum voluptatum quos eaque minus, amet animi.</p>
            </div>
        </>
    )
}

export const ProfileCard = () => {
    const styles1 = { backgroundColor: 'lightblue', padding: '15px', borderRadius: '8px', color: 'black', marginTop: '20px' }
    return (
        <>
            <div style={styles1}>
                <h2 style={{ fontSize: '20px' }} >style by Object</h2 >
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ex repudiandae tempore tempora iste. Iure eum architecto dicta dolorem adipisci est quisquam, reiciendis dolorum voluptatum quos eaque minus, amet animi.</p>
            </div>
        </>
    )
}

// Events on Elements - Click
export const AddEvents = () => {
    const handleClick = () => {
        const showMessage1 = document.getElementById('message1');
        if (showMessage1) {
            showMessage1.textContent = 'Yes Button is Clicked';
        } else {
            showMessage1.textContent = '';
        }
        console.log(Math.round(Math.random() * 10));
    }
    return (
        <>
            <button className='cstm' onClick={handleClick}>Click</button>
            <p id='message1'></p>
        </>
    )
}

// Events on Elements - Copy
export const Copy = () => {
    const copyHandler = () => {
        return (
            console.log('Please stop copying my text')
        )
    }
    return (
        <div className="event-style">
            <p onCopy={copyHandler}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos consequuntur rerum officia non quae, placeat reiciendis inventore ducimus ullam quibusdam sunt aliquam unde magni laboriosam praesentium repudiandae similique amet alias!
            </p>
        </div>
    )
}

// Events on Elements - Select
export const Select = () => {
    const selectHandler = () => {
        const selection = window.getSelection().toString();
        const messageEl = document.getElementById('select-message');
        if (selection) {
            messageEl.innerHTML = `Your selected content is : <strong> ${selection}</strong>`;
        }
        else {
            messageEl.innerHTML = '';
        }
    }
    return (
        <div className="event-style">
            <p
                onMouseUp={selectHandler}
                onKeyUp={selectHandler}
                onSelect={selectHandler}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ad culpa distinctio ipsa cupiditate aliquam! Perferendis, nulla id eum, veniam commodi reiciendis laudantium facere tempore temporibus, maxime atque nesciunt qui!
            </p>
            <p className='showMessage' id='select-message'></p>
        </div >
    )
}

// Events on Elements - Move
export const Move = () => {
    const moveHandler = () => {
        const messageElement = document.getElementById('msg'); // 
        messageElement.textContent = 'Do not move mouse here!';
    }

    const leaveHandler = () => {
        const messageElement = document.getElementById('msg');
        messageElement.textContent = '';
    }
    return (
        <div className="event-style">
            <p
                onMouseMove={moveHandler}
                onMouseLeave={leaveHandler}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem facilis mollitia quibusdam quaerat pariatur iste, excepturi, provident ut distinctio corporis porro doloribus. Quibusdam quasi quae itaque, in vero distinctio dignissimos?
            </p>
            <p className='showMessage' id='msg' >

            </p>
        </div>
    )
}

// Use State
export const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    return (
        <div className='counter-card'>
            <h1>{count}</h1>
            <div className='flex gap-2 mt-2'>
                <button className='cstm' style={{minWidth: '35px'}} onClick={decrement}>-</button>
                <button className='cstm' style={{minWidth: '35px'}} onClick={increment}>+</button>
            </div>
        </div>
    )
}