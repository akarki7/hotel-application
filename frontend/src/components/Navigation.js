import React from 'react';
import {Navbar, Nav, Container} from "react-bootstrap";
import "./css/nav.css";

const Navigation= () => {
    return (
        <>
            <Navbar className="color-nav" collapseOnSelect fixed="top">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav >
                            <Nav.Link href="/"><span className="color-nav-link">Limehome Coding Challenge</span></Nav.Link>
                            <Nav.Link href="/login"><span className="color-nav-link nav-right-align">Login</span></Nav.Link>
                            <Nav.Link href="/register"><span className="color-nav-link">Register</span></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;