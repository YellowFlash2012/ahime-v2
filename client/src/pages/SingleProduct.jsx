import { useState } from "react";
import { Button, Card, Col, Form, FormGroup, Image, ListGroup, Row, Spinner} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { addToCart } from "../features/cartSlice";
import { useAddAReviewMutation, useGetOneProductQuery } from "../features/productSlice";


const SingleProduct = () => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    // console.log(rating);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { id } = useParams();

    const { data, refetch, error, isLoading } = useGetOneProductQuery(id);

    const { userInfo } = useSelector(store => store.auth);

    // console.log(data);

    let product = data?.data;

    const [addAReview, { isLoading: reviewLoading}] = useAddAReviewMutation();
    
    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }))
        
        toast.success(`${qty} of ${product.name} added to cart`)

        navigate("/cart")
    }

    const submitReviewHandler = async (e) => {
        e.preventDefault()

        const data = { rating, comment };

        try {

            const res = await addAReview({ id, data }).unwrap();


            refetch()

            toast.success(res?.message)

            setRating(0)
            setComment("")
        } catch (error) {
            toast.error(error?.data?.message || error?.message)
        }
    }

    return (
        <>
            <Link to="/" className="btn btn-light my-3">
                Go Back
            </Link>

            {isLoading ? (
                <Row className="mt-3">
                    <Loader />
                </Row>
            ) : error ? (
                <Row className="mt-3">
                    <Message variant="danger">
                        {error?.data?.message || error.error}
                    </Message>
                </Row>
            ) : (
                <>
                    <Row>
                        <Col md={5}>
                            <Image
                                src={product?.image}
                                alt={product?.name}
                                fluid
                            />
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
                                                <strong>
                                                    ${product?.price}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>

                                            <Col>
                                                <strong>
                                                    {product?.countInStock > 0
                                                        ? "In Stock"
                                                        : "Out of Stock"}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>

                                                <Col>
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) =>
                                                            setQty(
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.countInStock
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
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button
                                            className="btn-block"
                                            type="button"
                                            variant="success"
                                            disabled={
                                                product?.countInStock === 0
                                            }
                                            onClick={addToCartHandler}
                                        >
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>

                    {/* reviews section */}
                    <Row className="review">
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && (
                                <Message>No reviews</Message>
                            )}

                            <ListGroup variant="flush">
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>

                                        <Rating value={review.rating} />

                                        <p>
                                            {review.createdAt.substring(0, 10)}
                                        </p>

                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}

                                <ListGroup.Item>
                                    <h2>Write your review</h2>

                                    {userInfo ? (
                                        <Form onSubmit={submitReviewHandler}>
                                            <FormGroup
                                                controlId="rating"
                                                className="my-2"
                                            >
                                                <Form.Label>Rating</Form.Label>

                                                <Form.Control
                                                    as="select"
                                                    value={rating}
                                                    onChange={(e) =>
                                                        setRating(
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Select...
                                                    </option>

                                                    <option value="1">
                                                        1 - Poor
                                                    </option>

                                                    <option value="2">
                                                        2 - Fair
                                                    </option>

                                                    <option value="3">
                                                        3 - Good
                                                    </option>

                                                    <option value="4">
                                                        4 - Very Good
                                                    </option>

                                                    <option value="5">
                                                        5 - Excellent
                                                    </option>
                                                </Form.Control>
                                            </FormGroup>

                                            <FormGroup
                                                controlId="comment"
                                                className="my-2"
                                            >
                                                <Form.Label>Comment</Form.Label>

                                                <Form.Control
                                                    as="textarea"
                                                    row="3"
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                ></Form.Control>
                                            </FormGroup>

                                            <Button
                                                variant="primary"
                                                disabled={reviewLoading}
                                                        style={{ width: "100%" }}
                                                        type="submit"
                                            >
                                                {reviewLoading ? (
                                                    <Spinner
                                                        animation="border"
                                                        role="status"
                                                    />
                                                ) : (
                                                    "Submit Your review"
                                                )}
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message variant="danger">
                                            <Link to="/login">Login</Link> to
                                            submit a review
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};
export default SingleProduct;
