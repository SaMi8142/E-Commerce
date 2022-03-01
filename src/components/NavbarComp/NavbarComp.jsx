import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap'
import Cart from './Cart/Cart'



function NavbarComp() {

    const visitedLinkStyle = {
        textDecoration: "underline",
        textDecorationThickness: "0.2rem",
        textUnderlineOffset: "5px",
        textDecorationColor: "#b7d33c",
    }

    return (
        <>
            <Navbar sticky="top" collapseOnSelect id="nav-comp" expand="lg" variant="dark">
                <Container>
                    <Link id="brand" className="nav-links" to="/"><span id="len">LEN</span>DAILY</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link className="links nav-links" to="/">Home</Link>
                            <Link style={visitedLinkStyle} className="links nav-links" to="/shop">Shop</Link>
                            <Link className="links nav-links" to="/addproduct">Add Product</Link>
                        </Nav>
                        <Nav>
                            <Link className="links nav-links" to="/signup">Sign Up</Link>
                            <Link className="links nav-links" to="/login">Login</Link>
                            <div className="nav-links" id="cart"><Cart /></div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}

export default NavbarComp