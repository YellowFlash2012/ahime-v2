import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useProfileMutation } from "../features/authApiSlice";
import { setCredentials } from "../features/authSlice";

const Profile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpw, setCpw] = useState("");

    const dispatch = useDispatch();

    const { userInfo } = useSelector(store => store.auth);

    const [profile, {data, isLoading }] = useProfileMutation();

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
            <Col md={9}></Col>
        </Row>
    );
};
export default Profile;
