import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Img
        variant="top"
        src={product.image || product.images?.[0]}
        alt={product.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.price.toLocaleString()}₫</Card.Text>
        <Button
          variant="primary"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          Xem chi tiết
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
