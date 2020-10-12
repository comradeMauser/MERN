import React from 'react';
import {Container, Navbar, Nav, Form, FormControl, Button} from "react-bootstrap";


const Header = () => {
    return (
        <header>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">ProShop</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link href="/cart">
                            <i className="fa fa-shopping-cart"> </i> Cart
                        </Nav.Link>
                        <Nav.Link href="/login">
                            <i className="fa fa-user"> </i> Sign in
                        </Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;