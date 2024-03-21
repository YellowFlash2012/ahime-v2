import {LinkContainer} from "react-router-bootstrap"

import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import { useSelector } from "react-redux";


const Header = () => {
    const { cartItems } = useSelector(store => store.cart);
    const { userInfo } = useSelector(store => store.auth);

    const logoutHandler = () => {
        console.log("logged out");
    }

    return <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">

                <Navbar.Brand>
                    Ahime
                </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to="/cart">

                        <Nav.Link>
                                <FaShoppingCart /> Cart
                                
                                {cartItems.length > 0 && (
                                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                                        {cartItems.reduce((a,c)=>a+c.qty,0)}
                                    </Badge>
                                )}
                        </Nav.Link>
                        </LinkContainer>


                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id="username">
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>
                                        Profile
                                    </NavDropdown.Item>
                                </LinkContainer>

                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (<LinkContainer to="/login">
                        <Nav.Link>
                            <FaUser/> Login
                        </Nav.Link>
                        </LinkContainer>)} 
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>;
};
export default Header;
