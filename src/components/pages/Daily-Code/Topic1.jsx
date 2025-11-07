import React, { useState } from 'react';


// Make a array of objects for products
const products = [
    { id: 1, name: 'mouse', price: 20 },
    { id: 2, name: 'keyboard', price: 25 },
    { id: 3, name: 'monitor', price: 30 },
    { id: 4, name: 'headphones', price: 40 }
];


const Topic1 = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase())
    });


    return (
        <div>
            <div className="">
                <h2>Product List</h2>
                <input
                    type="text"
                    value={searchTerm}
                    placeholder='Search'
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='cstm-input'
                />
                <ul>
                    {filteredProducts.map((product) => {
                     return   <li key={product.id}>{product.name} - {product.price}</li>
                    })}
                </ul>
            </div>

            <br />
            <br />
            <h4>Searchable Product List</h4>
            <p><strong>Description: </strong>We create a list of products that can be filtered by search input. This demonstrates <b>state management controlled components</b> and <b>array filtering</b></p>

            <ul>
                <li>
                    <h6><strong>Step 1: Start with the products array
                        Imagine we have an array:</strong></h6>
                    <ul>
                        <li>products is an array of objects.</li>
                        <li>Each object has properties like name and price.</li>
                    </ul>
                </li>
                <li>
                    <h6><strong>Step 2: Call .filter()</strong></h6>
                    <p><i>products.filter(...)</i></p>
                    <ul>
                        <li>.filter() is an array method.</li>
                        <li>It goes through each element in the array one by one.</li>
                        <li>For each element (product), it runs the function you pass.</li>
                        <li>If the function returns true, the element is kept in the new array.</li>
                        <li>If it returns false, the element is ignored.</li>
                    </ul>
                </li>
                <li>
                    <h6><strong>Step 3: Arrow function execution</strong></h6>
                    <p><i>{`
                        product => {
                            return product.name.toLowerCase().includes(searchTerm.toLowerCase());
                        `}
                    </i></p>
                    <ul>
                        <li>For each product, the function executes these steps:</li>
                        <li>Take product.name → e.g., "Mouse"</li>
                        <li>Convert it to lowercase → "mouse"</li>
                        <li>Take searchTerm (input from user) → e.g., "mo"</li>
                        <li>Convert searchTerm to lowercase → "mo"</li>
                        <li>Check if product.name.toLowerCase() includes searchTerm.toLowerCase()</li>
                        <li>"mouse".includes("mo") → true</li>
                        <li>return true → keeps this product in the filtered array</li>
                        <li>If it returned false, this product would be excluded</li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default Topic1