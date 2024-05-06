import {LinkContainer} from "react-router-bootstrap"

import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../features/authApiSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";
import { toast } from "react-toastify";
import SearchBox from "./SearchBox";


const Header = () => {
    const { cartItems } = useSelector(store => store.cart);
    const { userInfo } = useSelector(store => store.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall, { data, isLoading }] = useLogoutMutation();

    const logoutHandler = async () => {
        console.log("logged out");

        try {
            const res = await logoutApiCall().unwrap();
            dispatch(logout())

            toast.success(res.message)
        } catch (error) {
            toast.error(error?.data?.message || error?.error);
        }
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Ahime</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">

                            <SearchBox />
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <FaShoppingCart /> Cart
                                    {cartItems.length > 0 && (
                                        <Badge
                                            pill
                                            bg="success"
                                            style={{ marginLeft: "5px" }}
                                        >
                                            {cartItems.reduce(
                                                (a, c) => a + c.qty,
                                                0
                                            )}
                                        </Badge>
                                    )}
                                </Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id="username"
                                >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    {/* admin user config */}
                                    {userInfo.isAdmin && (
                                        <>
                                            <LinkContainer to="/admin/products-list">
                                                <NavDropdown.Item>
                                                    Products
                                                </NavDropdown.Item>
                                            </LinkContainer>
                                            
                                            <LinkContainer to="/admin/users-list">
                                                <NavDropdown.Item>
                                                    Users
                                                </NavDropdown.Item>
                                            </LinkContainer>
                                            
                                            <LinkContainer to="/admin/orders-list">
                                                <NavDropdown.Item>
                                                    Orders
                                                </NavDropdown.Item>
                                            </LinkContainer>
                                        </>
                                    )}

                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <FaUser /> Login
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};
export default Header;
