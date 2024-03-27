import { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../features/cartSlice";

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState("Paypal");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { shippingAddress } = useSelector(store => store.cart);

    const paymentHandler = (e) => {
        e.preventDefault()

        dispatch(savePaymentMethod(paymentMethod))

        navigate("/place-order")


    }

    useEffect(() => {
        if (!shippingAddress) {
            navigate("/shipping")
        }
    },[navigate, shippingAddress])

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <h1>Payment Method</h1>

            <Form onSubmit={paymentHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>

                    <Col>
                        <Form.Check
                            type="radio"
                            className="my-2"
                            label="Paypal or Credit Card"
                            id="paypal"
                            name="paymentMethod"
                            value="Paypal"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>

                        <Button type="submit" variant="primary">
                            Continue
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </FormContainer>
    );
};
export default Payment;
