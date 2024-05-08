import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [downloadable, setDownloadable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setProducts(
          response.data.filter(
            (product) => product.creator === localStorage.getItem("userId")
          )
        );
      } catch (err) {
        alert("You are not authorized. Please log in.");
        navigate("/login");
      }
    };
    fetchProducts();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/products",
        { title, description, price, fileUrl, downloadable },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      window.location.reload();
    } catch (err) {
      alert("Error creating product");
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <input
          type="url"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          placeholder="File URL"
        />
        <label>
          Downloadable:
          <input
            type="checkbox"
            checked={downloadable}
            onChange={() => setDownloadable(!downloadable)}
          />
        </label>
        <button type="submit">Create Product</button>
      </form>
      <h3>My Products</h3>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <Link to={`/products/${product._id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
