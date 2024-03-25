import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../features/cartSlice";

const Shipping = () => {
    const { shippingAddress } = useSelector(store => store.cart);

    const [address, setAddress] = useState(shippingAddress?.address || "");
    const [city, setCity] = useState(shippingAddress?.city || "");
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "");
    const [country, setCountry] = useState(shippingAddress?.country || "");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const shippingHandler = (e) => {
        e.preventDefault()
        console.log("shipping info");

        dispatch(saveShippingAddress({ address, city, postalCode, country }));

        navigate("/payment")

    }

    return <FormContainer>
        <CheckoutSteps step1 step2 />

        <h1>Shipping</h1>

        <Form onSubmit={shippingHandler}>
            <Form.Group controlId="address" className="my-2">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter your address ..." value={address} onChange={(e)=>setAddress(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="city" className="my-2">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Enter your city ..." value={city} onChange={(e)=>setCity(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="postalCode" className="my-2">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type="text" placeholder="Enter your postal code ..." value={postalCode} onChange={(e)=>setPostalCode(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="country" className="my-2">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" placeholder="Enter your country ..." value={address} onChange={(e)=>setCountry(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-2">
                Continue
            </Button>
        </Form>
    </FormContainer>;
};
export default Shipping;
