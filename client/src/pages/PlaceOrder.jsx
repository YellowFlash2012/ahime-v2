import { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { clearCartAfterPlacingOrder } from "../features/cartSlice";
import { useCreateNewOrderMutation } from "../features/orders/ordersApiSlice";

const PlaceOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        itemsPrice,
        shippingPrice,taxPrice, totalPrice,cartItems,
        shippingAddress,
        paymentMethod,
    } = useSelector((store) => store.cart);

    // console.log(cartItems);

    const [createNewOrder, { isLoading, error }] = useCreateNewOrderMutation();

    const placeOrderHandler = async () => {
        console.log("order placed!");

        try {
            const res = await createNewOrder({
                orderItems: cartItems,
                shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice
            }).unwrap();

            toast.success(res.message)

            dispatch(clearCartAfterPlacingOrder())

            navigate(`/orders/${res?.data?._id}`)
        } catch (error) {
            toast.error(error)
        }

    }

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate("/shipping");
        } else if (!paymentMethod) {
            navigate("/payment");
        }
    }, [navigate, paymentMethod, shippingAddress.address]);
    
    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />

            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>

                            <p>
                                <strong>Address: </strong>
                                {shippingAddress.address},{" "}
                                {shippingAddress.city},{" "}
                                {shippingAddress.postalCode},{" "}
                                {shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>

                            <strong>Method: </strong>

                            {paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>

                            {cartItems.length === 0 ? (
                                <Message>Your cart is empty...</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>

                                                <Col>
                                                    <Link
                                                        to={`/products/${item._id}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} x ${item.price} ={" "}
                                                    <strong>
                                                        ${item.qty * item.price}
                                                    </strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items: </Col>
                                    <Col>
                                        <strong>${itemsPrice}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping Price: </Col>
                                    <Col>
                                        <strong>${shippingPrice}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>
                                        <strong>${taxPrice}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>
                                        <strong>${totalPrice}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && (
                                    <Message variant="danger">{error}</Message>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                        

                                <Button
                                    type="button"
                                    className="btn-block"
                                    variant="success"
                                    disabled={cartItems.length === 0 || isLoading}
                                        onClick={placeOrderHandler}
                                    size="lg"
                                    
                                >
                                    {isLoading ? (
                                        <Spinner
                                        animation="border"
                                            role="status"
                                        />
                                    ) : (
                                        "Place Order"
                                    )}
                                </Button>
        
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
export default PlaceOrder;
