import React from 'react';
import {Navbar, Nav, Container, Button} from "react-bootstrap";
import "./css/nav.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import authSlice from "../store/slices/auth";

const NavigationLoggedIn= () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(authSlice.actions.setLogout());
        history.push("/login");
    };
    return (
        <>
            <Navbar className="color-nav" collapseOnSelect fixed="top">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav >
                            <Nav.Link href="/"><span className="color-nav-link">LikeHome</span></Nav.Link>
                            <Button size="lg" className="button-color-logout nav-right-align-2" onClick={handleLogout}>Log Out</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavigationLoggedIn;