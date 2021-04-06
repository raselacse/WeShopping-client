import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/home">WeShopping</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
                        <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
                        <Nav.Link as={Link} to="/deals">Deals</Nav.Link>
                        {
                            loggedInUser.email ? 
                            <Nav.Link as={Link} to="/login">
                                <img className="photoURL" src={loggedInUser.photoURL} alt=""/></Nav.Link>:
                            <Nav.Link className="login" as={Link} to="/login">Login</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};
{/* <img className="photoURL" src={loggedInUser.photoURL} alt=""/> */}

export default Header;