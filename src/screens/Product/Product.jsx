import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 

const Product = () => {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imgCover, setImgCover] = useState(null);
  const [images, setImages] = useState([]);
  const [catigory, setCatigory] = useState("");
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://project-model.onrender.com/api/v1/categories", {
        headers: { token: token },
      });
      setCategories(response.data.categories || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("catigory", catigory);
    if (imgCover) formData.append("imgCover", imgCover);

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await axios.post("https://project-model.onrender.com/api/v1/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });
      toast.success("Product added successfully!");
    } catch (err) {
      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        console.error("Error response headers:", err.response.headers);
        const errorMessage = err.response.data.message || "Unknown error from server.";
        toast.error(`Error adding product: ${errorMessage}`);
      } else if (err.request) {
        console.error("No response received:", err.request);
        toast.error("No response received from server.");
      } else {
        console.error("Error setting up request:", err.message);
        toast.error(`Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h1 className="py-2">Manage Products</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label htmlFor="title">Product Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="catigory">Select Category</label>
          <select
            className="form-control"
            id="catigory"
            value={catigory}
            onChange={(e) => setCatigory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="imgCover">Cover Image</label>
          <input
            type="file"
            className="form-control"
            id="imgCover"
            onChange={(e) => setImgCover(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-success my-2">Add Product</button>
      </form>

      <button 
        className="btn btn-primary my-1" 
        onClick={() => navigate('/updateProduct')} 
      >
       Update Product
      </button>
    </div>
  );
};

export default Product;