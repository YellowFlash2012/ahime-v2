import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrder = () => {
    const navigate = useNavigate();
    const { shippingAddress, paymentMethod } = useSelector(
        (store) => store.cart
    );

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate("/shipping");
        } else if (!paymentMethod) {
            navigate("/payment");
        }
    }, [navigate, paymentMethod, shippingAddress.address]);
    
    return <>
        <CheckoutSteps step1 step2 step3 step4 />
        
        <Row>
            <Col md={8}>Col1</Col>
            <Col md={4}>Col2</Col>
        </Row>
    </>;
};
export default PlaceOrder;
