import React, { useState } from 'react'

const ReactJs_ArrayOfObjects = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !quantity) return;


    const newItem = {
      name, quantity: parseInt(quantity)
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setName("");
    setQuantity("");
  }
  return (
    <div>
      <h3>Shopping List</h3>
      <form onSubmit={handleSubmit}>
        <input className='cstm-input' type="text" placeholder='item name' value={name} onChange={(e) => setName(e.target.value)} />
        <input  className='cstm-input'type="number" placeholder='Quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <button  className='cstm'type='submit'>Add Item</button>
      </form>

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name} - Quantity: {item.quantity}</li>
        ))}
      </ul>
    </div>
  )
}

export default ReactJs_ArrayOfObjects