import React, { useEffect, useState } from "react";
import axios from "axios";

function Inventory() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const API_URL = "http://localhost:5000/api/inventory";

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get(API_URL);
    setItems(res.data.data);
  };

  const addItem = async () => {
    if (!name || !quantity) return;
    await axios.post(API_URL, { name, quantity: parseInt(quantity) });
    setName("");
    setQuantity("");
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchItems();
  };

  return (
    <div>
      <h2>Inventory List</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.quantity} 
            <button onClick={() => deleteItem(item.id)} style={{ marginLeft: "10px" }}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Add New Item</h3>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Quantity" type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

export default Inventory;
