import React from "react";
import { Container, Table, Button } from "react-bootstrap";

const Cart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const handleRemove = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.location.reload();
  };

  return (
    <Container className="my-4">
      <h3>Giỏ hàng của bạn</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.price.toLocaleString()}₫</td>
              <td>1</td>
              <td>
                <Button variant="danger" onClick={() => handleRemove(item._id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Cart;
