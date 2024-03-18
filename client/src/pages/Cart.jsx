import { useState } from "react";
import { Button, Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../features/cartSlice";

const Cart = () => {
    const [qty, setQty] = useState(1);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cartItems } = useSelector(store => store.cart);
    // console.log(cartItems);

    const updateCartHandler = async(product,qty) => {
        dispatch(addToCart({ ...product, qty }));
    }

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id))
    }

    const moveToCheckoutHandler = () => {
        navigate("/login?redirect=/shipping")
    }

    return (
        <Row>
            <Col md={8}>
                <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty! <Link to="/">Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item._id}>
                                <Row>
                                    <Col md={2}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fluid
                                            rounded
                                        />
                                    </Col>

                                    <Col md={3}>
                                        <Link to={`/products/${item._id}`}>
                                            {item.name}
                                        </Link>
                                    </Col>

                                    <Col md={2}>${item.price}</Col>

                                    <Col md={2}>
                                        <Form.Control
                                            as="select"
                                            value={item.qty}
                                            onChange={(e) =>
                                                updateCartHandler(
                                                    item,
                                                    Number(e.target.value)
                                                )
                                            }
                                        >
                                            {[
                                                ...Array(
                                                    item.countInStock
                                                ).keys(),
                                            ].map((x) => (
                                                <option
                                                    key={x + 1}
                                                    value={x + 1}
                                                >
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>

                                    <Col md={2}>
                                        <Button
                                            type="button"
                                            variant="danger"
                                            onClick={() =>
                                                removeFromCartHandler(item._id)
                                            }
                                        >
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>
                                Subtotal:{" "}
                                <strong>
                                    (
                                    {cartItems.reduce(
                                        (acc, item) => acc + item.qty,
                                        0
                                    )}
                                    )
                                </strong>{" "}
                                items
                            </h2>
                            $
                            {cartItems.reduce(
                                (acc, item) => acc + item.qty * item.price,
                                0
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button
                                type="button"
                                className="btn- btn-block"
                                disabled={cartItems.length === 0}
                                onClick={moveToCheckoutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};
export default Cart;
