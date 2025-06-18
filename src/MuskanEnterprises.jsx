import React, { useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";

const products = [
  { id: 1, name: "Pepsi 400ml – MRP ₹20 / Wholesale ₹18", price: 18 },
  { id: 2, name: "Pepsi 750ml – MRP ₹40 / Wholesale ₹36.67", price: 36.666 },
  { id: 3, name: "Pepsi 2.25ltr – MRP ₹100 / Wholesale ₹91", price: 91 },
  { id: 4, name: "7UP 400ml – MRP ₹20 / Wholesale ₹18", price: 18 },
  { id: 5, name: "7UP 750ml – MRP ₹40 / Wholesale ₹36.67", price: 36.666 },
  { id: 6, name: "7UP 2.25ltr – MRP ₹100 / Wholesale ₹91", price: 91 },
  { id: 7, name: "Mountain Dew 400ml – MRP ₹20 / Wholesale ₹18", price: 18 },
  { id: 8, name: "Mountain Dew 750ml – MRP ₹40 / Wholesale ₹36.67", price: 36.666 },
  { id: 9, name: "Mountain Dew 2.25ltr – MRP ₹100 / Wholesale ₹91", price: 91 },
  { id: 10, name: "Mirinda 400ml – MRP ₹20 / Wholesale ₹18", price: 18 },
  { id: 11, name: "Mirinda 750ml – MRP ₹40 / Wholesale ₹36.67", price: 36.666 },
  { id: 12, name: "Mirinda 2.25ltr – MRP ₹100 / Wholesale ₹91", price: 91 },
  { id: 13, name: "Slice 400ml – MRP ₹20 / Wholesale ₹18", price: 18 },
  { id: 14, name: "Slice 750ml – MRP ₹40 / Wholesale ₹36.67", price: 36.666 },
  { id: 15, name: "Slice 2.25ltr – MRP ₹100 / Wholesale ₹91", price: 91 },
  { id: 16, name: "Kesar Badam – MRP ₹20 / Wholesale ₹18", price: 18 },
  { id: 17, name: "Choco – MRP ₹30 / Wholesale ₹27", price: 27 },
  { id: 18, name: "Coffee – MRP ₹30 / Wholesale ₹27", price: 27 },
];

export default function MuskanEnterprises() {
  const [cart, setCart] = useState({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const addToCart = (id) => {
    setCart({ ...cart, [id]: (cart[id] || 0) + 1 });
  };

  const removeFromCart = (id) => {
    if (!cart[id]) return;
    const updated = { ...cart };
    updated[id]--;
    if (updated[id] <= 0) delete updated[id];
    setCart(updated);
  };

  const getTotal = () =>
    Object.entries(cart).reduce((total, [id, qty]) => {
      const product = products.find((p) => p.id === parseInt(id));
      return total + product.price * qty;
    }, 0);

  const handleSubmit = () => {
    if (!name || !phone || !address) {
      alert("Please fill out all customer details.");
      return;
    }

    alert("Order submitted! We'll contact you shortly.");
    setCart({});
    setName("");
    setPhone("");
    setAddress("");
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h1>Muskan Enterprises</h1>
      <p>Wholesale Ordering System</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: 10 }}>
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button onClick={() => removeFromCart(product.id)}>-</button>
              <span>{cart[product.id] || 0}</span>
              <button onClick={() => addToCart(product.id)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <hr style={{ margin: "20px 0" }} />
      <h2>Cart</h2>
      {Object.keys(cart).length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {Object.entries(cart).map(([id, qty]) => {
            const product = products.find((p) => p.id === parseInt(id));
            return (
              <li key={id}>
                {product.name} × {qty} = ₹{(product.price * qty).toFixed(2)}
              </li>
            );
          })}
        </ul>
      )}
      <p><strong>Total: ₹{getTotal().toFixed(2)}</strong></p>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br />
      <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} /><br />
      <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} /><br />
      <button onClick={handleSubmit}>Submit Order</button>
    </div>
  );
}
