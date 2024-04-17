import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {FaTimes} from "react-icons/fa"


import Loader from "../components/Loader";
import Message from "../components/Message";
import { useProfileMutation } from "../features/authApiSlice";
import { setCredentials } from "../features/authSlice";
import { useGetAllMyOrdersQuery } from "../features/orders/ordersApiSlice";
import { LinkContainer } from "react-router-bootstrap";

const Profile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpw, setCpw] = useState("");

    const dispatch = useDispatch();

    const { userInfo } = useSelector(store => store.auth);

    const [profile, { data, isLoading }] = useProfileMutation();
    
    const { data: myOrders, isLoading: getMyOrdersLoading, error } = useGetAllMyOrdersQuery();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    }, [userInfo])
    
    const updateProfileHandler = async(e) => {
        e.preventDefault()

        if (password!==cpw) {
            toast.error("Passwords don't Match!");
        } else {
            try {
                const res = await profile({ _id: userInfo._id, name, email, password }).unwrap();
                
                dispatch(setCredentials(res));

                toast.success(data?.message)
            } catch (error) {
                toast.error(error?.data?.message || error?.message);
            }
        }
    }
    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>

                <Form onSubmit={updateProfileHandler}>
                    <Form.Group controlId="name" className="my-2">
                        <Form.Label>Name</Form.Label>

                        <Form.Control
                            type="text"
                            placeholder="Enter a new name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="email" className="my-2">
                        <Form.Label>Email</Form.Label>

                        <Form.Control
                            type="email"
                            placeholder="Enter a new email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="password" className="my-2">
                        <Form.Label>Password</Form.Label>

                        <Form.Control
                            type="password"
                            placeholder="Enter a new password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="cpw" className="my-2">
                        <Form.Label>Confirm Password</Form.Label>

                        <Form.Control
                            type="password"
                            placeholder="Re-enter your password..."
                            value={cpw}
                            onChange={(e) => setCpw(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button
                        style={{ width: "100%" }}
                        type="submit"
                        className="btn-block my-2"
                        variant="primary"
                        disabled={isLoading}
                        onClick={updateProfileHandler}
                        size="lg"
                    >
                        {isLoading ? (
                            <Spinner animation="border" role="status" />
                        ) : (
                            "Update Profile"
                        )}
                    </Button>
                </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>

                {getMyOrdersLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Table striped hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {myOrders?.data.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>

                                    <td>{order.createdAt.substring(0, 10)}</td>

                                    <td>{order.totalPrice}</td>

                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <FaTimes style={{ color: "red" }} />
                                        )}
                                    </td>

                                    <td>
                                        {order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <FaTimes style={{ color: "red" }} />
                                        )}
                                    </td>

                                    <td>
                                        <LinkContainer
                                            to={`/orders/${order._id}`}
                                        >
                                            <Button
                                                className="btn-sm"
                                                variant="light"
                                            >
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    );
};
export default Profile;
