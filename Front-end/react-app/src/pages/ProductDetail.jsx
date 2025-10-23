import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { Container, Row, Col, Button, Image, Badge } from "react-bootstrap";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => {
        // ✅ Kiểm tra dữ liệu trả về có nằm trong res.data hay res.data.product
        const data = res.data.product || res.data;
        setProduct(data);
      })
      .catch((err) => {
        console.error("Lỗi tải sản phẩm:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center my-4">Đang tải...</div>;
  if (!product) return <div className="text-center text-danger">Không tìm thấy sản phẩm.</div>;

  return (
    <Container className="my-4">
      <Row>
        <Col md={6} className="text-center">
          <Image
            src={product.image || product.images?.[0]}
            alt={product.name}
            fluid
            rounded
          />
          <div className="mt-3 d-flex justify-content-center gap-2 flex-wrap">
            {product.images?.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`${product.name}-${idx}`}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </Col>

        <Col md={6}>
          <h3>{product.name}</h3>
          <Badge bg="info" className="mb-2">{product.category}</Badge>
          <p>{product.description}</p>

          <h4 className="text-success">
            {(product.price * (1 - (product.discount || 0) / 100)).toLocaleString()}₫
          </h4>
          {product.discount > 0 && (
            <p>
              <del>{product.price.toLocaleString()}₫</del>{" "}
              <Badge bg="danger">-{product.discount}%</Badge>
            </p>
          )}

          <p>
            <strong>Thương hiệu:</strong> {product.brand}
          </p>
          <p>
            <strong>Kho hàng:</strong> {product.stock} sản phẩm
          </p>
          <p>
            <strong>Đã bán:</strong> {product.sold}
          </p>

          <Button variant="success">🛒 Thêm vào giỏ hàng</Button>
        </Col>
      </Row>

      {/* Phần đánh giá */}
      <Row className="mt-5">
        <Col>
          <h5>Đánh giá sản phẩm ({product.reviews?.length || 0})</h5>
          {product.reviews?.length ? (
            product.reviews.map((rev, i) => (
              <div key={i} className="border-bottom py-2">
                <strong>{rev.username}</strong> ⭐{rev.rating}/5
                <p className="mb-0">{rev.comment}</p>
              </div>
            ))
          ) : (
            <p>Chưa có đánh giá nào.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
