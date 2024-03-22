import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { useRegisterMutation } from "../features/authApiSlice";
import { setCredentials } from "../features/authSlice";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((store) => store.auth);

    const [register, { isLoading }] = useRegisterMutation()

    // redirect after login to the appropriate page
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [redirect, userInfo, navigate]);

    const registerHandler = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            return toast.error("Those fields can NOT be empty!");
        }
        
        if (password!==cpassword) {
            return toast.error("The password fields do NOT match!");
        }

        try {
            const res = await register({name, email, password }).unwrap();

            dispatch(setCredentials({ ...res.data }));

            toast.success(res.message);

            navigate(redirect);
        } catch (error) {
            toast.error(error?.data?.message || error?.error);
        }
    };

    return (
        <FormContainer>
            <h1>Create an account</h1>

            <Form onSubmit={registerHandler}>
                <Form.Group controlId="name" className="my-3">
                    <Form.Label>Your username</Form.Label>

                    <Form.Control
                        type="text"
                        placeholder="Enter your username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                
                <Form.Group controlId="email" className="my-3">
                    <Form.Label>Your email address</Form.Label>

                    <Form.Control
                        type="email"
                        placeholder="Enter your best email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="password" className="my-3">
                    <Form.Label>Your password</Form.Label>

                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                
                <Form.Group controlId="cpassword" className="my-3">
                    <Form.Label>Confirm your password</Form.Label>

                    <Form.Control
                        type="password"
                        placeholder="Confirm your password"
                        value={cpassword}
                        onChange={(e) => setCPassword(e.target.value)}
                    />
                </Form.Group>

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="mt-2"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Spinner animation="border" role="status" />
                    ) : (
                        "Register"
                    )}
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Already a customer?{" "}
                    <Link
                        to={
                            redirect
                                ? `/login?redirect=${redirect}`
                                : "/login"
                        }
                    >
                        Log into your account
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};
export default Register;
