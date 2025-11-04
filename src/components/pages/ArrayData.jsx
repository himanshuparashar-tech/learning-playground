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
};
