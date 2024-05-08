import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );
      setProduct(response.data);
    };
    fetchProduct();
  }, [id]);

  return product ? (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {product.downloadable && (
        <a href={product.fileUrl} download>
          Download
        </a>
      )}
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default ProductDetails;
