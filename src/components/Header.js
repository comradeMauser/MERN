import React from 'react';
import {Container, Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';


const Header = () => {
    return (
        <header>
            <Navbar bg="primary" variant="dark">
                <Container className='my-3'>

                    <LinkContainer to='/'>
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </LinkContainer>

                    <Nav className="ml-auto">
                        <LinkContainer to='/cart'>
                            <Nav.Link><i className="fa fa-shopping-cart"> </i> Cart</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/login'>
                            <Nav.Link><i className="fa fa-user"> </i> Sign in</Nav.Link>
                        </LinkContainer>
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