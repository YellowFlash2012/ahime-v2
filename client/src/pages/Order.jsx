import { Button, Card, Col, Image, ListGroup, Row, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetSingleOrderDetailsQuery } from "../features/orders/ordersApiSlice";

const Order = () => {
    const { id } = useParams();

    const { data, refetch, isLoading, error } = useGetSingleOrderDetailsQuery(id);

    // console.log(data);

    const payOrderHandler=(e)=>{}

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <h1>{data?.data?._id}</h1>

                    <Row>
                        <Col md={8}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>Shipping</h2>

                                    <p>
                                        <strong>Name: </strong>{" "}
                                        {data?.data?.user?.name}
                                    </p>

                                    <p>
                                        <strong>Email: </strong>{" "}
                                        {data?.data?.user?.email}
                                    </p>

                                    <p>
                                        <strong>Address: </strong>{" "}
                                        {data?.data?.shippingAddress?.address},{" "}
                                        {data?.data?.shippingAddress?.city},{" "}
                                        {
                                            data?.data?.shippingAddress
                                                ?.postalCode
                                        }
                                        , {data?.data?.shippingAddress?.country}
                                    </p>

                                    {data?.data?.isDelivered ? (
                                        <Message variant="success">
                                            Delivered on{" "}
                                            {data?.data?.deliveredAt}
                                        </Message>
                                    ) : (
                                        <Message variant="danger">
                                            Not delivered
                                        </Message>
                                    )}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Payment Method</h2>

                                    <p>
                                        <strong>Method: </strong>{" "}
                                        {data?.data?.paymentMethod}
                                    </p>

                                    {data?.data?.isPaid ? (
                                        <Message variant="success">
                                            Paid at {data?.data?.paidAt}
                                        </Message>
                                    ) : (
                                        <Message variant="danger">
                                            Not paid
                                        </Message>
                                    )}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Order Items</h2>

                                    {data?.data?.orderItems.map(
                                        (item, index) => (
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
                                                        {item.qty} x $
                                                        {item.price} ={" "}
                                                        <strong>
                                                            $
                                                            {item.qty *
                                                                item.price}
                                                        </strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )
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
                                                <strong>
                                                    ${data?.data?.itemsPrice}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping Price: </Col>
                                            <Col>
                                                <strong>
                                                    ${data?.data?.shippingPrice}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax: </Col>
                                            <Col>
                                                <strong>
                                                    ${data?.data?.taxPrice}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total: </Col>
                                            <Col>
                                                <strong>
                                                    ${data?.data?.totalPrice}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        {error && (
                                            <Message variant="danger">
                                                {error}
                                            </Message>
                                        )}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Button
                                            type="button"
                                            className="btn-block"
                                            variant="success"
                                            disabled={
                                                data?.data?.length === 0 ||
                                                isLoading
                                            }
                                            onClick={payOrderHandler}
                                            size="lg"
                                        >
                                            {isLoading ? (
                                                <Spinner
                                                    animation="border"
                                                    role="status"
                                                />
                                            ) : (
                                                "Pay Order"
                                            )}
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};
export default Order;
