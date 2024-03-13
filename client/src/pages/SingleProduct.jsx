import { Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { useGetOneProductQuery } from "../features/productSlice";


const SingleProduct = () => {
    const { id } = useParams();

    const { data, error, isLoading } = useGetOneProductQuery(id);

    console.log(data);

    let product=data?.data;

    return (
        <>
            <Link to="/" className="btn btn-light my-3">
                Go Back
            </Link>

            {isLoading ? (
                <Row className="mt-3">
                    <Loader/>
                </Row>
            ) : error ? (
                <Row className="mt-3">
                    <Message variant="danger">
                        {error?.data?.message || error.error}
                    </Message>
                </Row>
            ) : (
                <Row>
                    <Col md={5}>
                        <Image src={product?.image} alt={product?.name} fluid />
                    </Col>

                    <Col md={4}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product?.name}</h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Rating
                                    value={product?.rating}
                                    text={`${product?.numReviews} reviews`}
                                />
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Price: ${product?.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product?.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>

                                        <Col>
                                            <strong>${product?.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>

                                        <Col>
                                            <strong>
                                                $
                                                {product?.countInStock > 0
                                                    ? "In Stock"
                                                    : "Out of Stock"}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Button
                                        className="btn-block"
                                        type="button"
                                        variant="success"
                                        disabled={product?.countInStock === 0}
                                    >
                                        Add To Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
};
export default SingleProduct;
