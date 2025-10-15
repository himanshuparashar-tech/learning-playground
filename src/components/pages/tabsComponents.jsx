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
export const CustomCard = ({ title, description, image, children }) => {
    return (
        <div className="bg-white shadow-lg rounded-2xl p-4 w-64 text-center hover:scale-105 transition-transform duration-300">
            {image && (
                <img src={image} title={title} className='border border-2 border-' />
            )}
        </div>
    )
}