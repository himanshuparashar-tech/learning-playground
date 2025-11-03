// src/data.js

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

    featuredProducts: [
        { id: 101, name: "iPhone 15", price: 999, inStock: true },
        { id: 102, name: "MacBook Pro", price: 2500, inStock: true },
    ],

    products: [
        { id: 1, name: "Mouse", price: 25, inStock: true, image: 'https://media.istockphoto.com/id/615422436/photo/demo-sign-cubes.jpg?s=612x612&w=0&k=20&c=HHOLIiF8SmbIssxKv3G480EgTVub_v9cc1QME3Dn6XU=' },
        { id: 2, name: "Keyboard", price: 45, inStock: false },
        { id: 3, name: "Monitor", price: 200, inStock: true },
        { id: 4, name: "Laptop", price: 1200, inStock: true },
        { id: 5, name: "Headphones", price: 50, inStock: false },
    ],

    accessories: [
        { id: 201, name: "USB Cable", price: 10, inStock: true },
        { id: 202, name: "Mouse Pad", price: 15, inStock: false },
    ],
};
