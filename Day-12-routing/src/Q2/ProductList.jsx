import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setFiltered(data.products);
        const uniqueCats = [...new Set(data.products.map(p => p.category))];
        setCategories(uniqueCats);
      });
  }, []);

  const handleFilter = (category) => {
    if (category === "all") setFiltered(products);
    else setFiltered(products.filter(p => p.category === category));
  };

  const handleSort = (order) => {
    const sorted = [...filtered].sort((a, b) => 
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setSortOrder(order);
    setFiltered(sorted);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 All Products</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>Filter by Category: </label>
        <select onChange={(e) => handleFilter(e.target.value)}>
          <option value="all">All</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label style={{ marginLeft: "20px" }}>Sort by Price: </label>
        <select onChange={(e) => handleSort(e.target.value)}>
          <option value="">None</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {filtered.map(prod => (
          <div key={prod.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
            <Link to={`/product/${prod.id}`} style={{ textDecoration: "none", color: "black" }}>
              <img src={prod.thumbnail} alt={prod.title} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
              <h3>{prod.title}</h3>
              <p>₹{prod.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
