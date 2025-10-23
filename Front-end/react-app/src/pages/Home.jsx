import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:9999/api/products");
        // ✅ API trả về { data: [ ... ], total, page, limit }
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
        setError("Không thể tải danh sách sản phẩm.");
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container className="my-4">
      <h3 className="text-center mb-4">Danh sách sản phẩm</h3>
      {error ? (
        <p className="text-center text-danger">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center">Không có sản phẩm nào.</p>
      ) : (
        <Row>
          {products.map((p) => (
            <Col md={3} sm={6} key={p._id}>
              <ProductCard product={p} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Home;
