import { Button, Card, Col, Image, ListGroup, Row, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDeliverOrderMutation, useGetPaypalClientIDQuery, useGetSingleOrderDetailsQuery, usePayOrderMutation } from "../features/orders/ordersApiSlice";

const Order = () => {
    const { id } = useParams();

    // console.log(id);

    const { data, refetch, isLoading, error } =
        useGetSingleOrderDetailsQuery(id);
    
    // console.log(data?.data.isPaid);

    const [payOrder, { isLoading: loadingPay }] 
        = usePayOrderMutation();
    
    // console.log(updatedOrderToPaid);

    const [
        deliverOrder,
        { data: updatedOrderToDelivered, isLoading: loadingDeliver },
    ] = useDeliverOrderMutation();

    // console.log(updatedOrderToDelivered?.message);

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const {
        data: paypal,
        isLoading: paypalClientIDLoading,
        error: paypalClientIDError,
    } = useGetPaypalClientIDQuery();

    const { userInfo } = useSelector((store) => store.auth);

    // console.log(data);

    function createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value:data.totalPrice
                    }
                }
            ]
        }).then(id => { return id; })
    }
    
    function onApprove(actions, data) {
        return actions.order.capture().then(async function (details) {
            try {
                const res = await payOrder({ id, details }).unwrap();

                refetch()

                toast.success(res?.message);
            } catch (error) {
                toast.error(error?.data?.message || error?.message);
            }
        })
    }

    async function onApproveTest() {
        const res = await payOrder({ id, details: { payer: {} } });

        refetch();

        toast.success(res?.data?.message);
    }
    
    function onError(error) {
        toast.error(error.message);
    }

    const deliverOrderHandler = async () => {
        try {
    
            const res = await deliverOrder(id);

            refetch()

            toast.success(res?.data?.message);
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }

    useEffect(() => {
        if (!paypalClientIDError && !paypalClientIDLoading && paypal.clientID) {
            const loadPaypalScript = async () => {
                paypalDispatch({
                    type: "resetOptions",
                    value: {
                        "client-id": paypal.clientID,
                        currency: "USD",
                    },
                });
                paypalDispatch({ type: "setLoadingStatus", value: "pending" });
            };

            if (data && !data.isPaid) {
                if (!window.paypal) {
                    loadPaypalScript();
                }
            }
        }
    }, [
        paypal,
        paypalClientIDError,
        paypalClientIDLoading,
        data,
        paypalDispatch,
    ]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error?.data?.message}</Message>
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

                                    {!data?.data.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}
                                            {isPending ? (
                                                <Loader />
                                            ) : (
                                                <>
                                                    <Button
                                                        onClick={onApproveTest}
                                                        style={{
                                                            marginBottom:
                                                                "10px",
                                                            width:"100%"
                                                        }}
                                                    >
                                                        Test Pay Order
                                                    </Button>
                                                    <PayPalButtons
                                                        createOrder={
                                                            createOrder
                                                        }
                                                        onApprove={onApprove}
                                                        onError={onError}
                                                    ></PayPalButtons>
                                                </>
                                            )}
                                        </ListGroup.Item>
                                    )}

                                    {userInfo &&
                                        userInfo.isAdmin &&
                                        data?.data?.isPaid &&
                                        !data?.data?.isDelivered && (
                                            <ListGroup.Item>
                                                <Button
                                                style={{width:"100%"}}
                                                    type="button"
                                                    className="btn btn-block"
                                                    onClick={
                                                        deliverOrderHandler
                                                    }
                                                
                                                >
                                                    {loadingDeliver ? (
                                                        <Spinner
                                                            animation="border"
                                                            role="status"
                                                        />
                                                    ) : (
                                                        "Mark As Delivered"
                                                    )}
                                                </Button>
                                            </ListGroup.Item>
                                        )}
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
