import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../features/authApiSlice";
import { setCredentials } from "../features/authSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading}] = useLoginMutation();

    const { userInfo } = useSelector(store => store.auth);

    // redirect after login to the appropriate page
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    },[redirect,userInfo, navigate])

    const loginHandler = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return toast.error("Those fields can NOT be empty!")
        }

        try {
            const res = await login({ email, password }).unwrap();

            dispatch(setCredentials({ ...res.data }))
            
            toast.success(res.message)

            navigate(redirect)
        } catch (error) {
            toast.error(error?.data?.message || error?.error)
        }

        
    };
    return (
        <FormContainer>
            <h1>Log in</h1>

            <Form onSubmit={loginHandler}>
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

            
                <Button type="submit" variant="primary" size="lg" className="mt-2" disabled={isLoading} style={{width:"100%"}}>
                    {isLoading ? <Spinner animation="border" role="status" /> : "Log in"}
                </Button>
            
            </Form>

            <Row className="py-3">
                <Col>
                New customer? <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Create an account</Link>
                </Col>
            </Row>
        </FormContainer>
    );
};
export default Login;
