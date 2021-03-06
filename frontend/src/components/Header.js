import React from 'react';
import {Route} from 'react-router-dom';
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../actions/userActions';
import SearchBox from './SearchBox';

const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header className='header'>
            <Navbar bg="primary" variant="dark">
                <Container className='my-3'>

                    <LinkContainer to='/'>
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </LinkContainer>

                    <Nav className="ml-auto">
                        <LinkContainer to='/cart'>
                            <Nav.Link><i className="fa fa-shopping-cart"> </i> Cart</Nav.Link>
                        </LinkContainer>
                        {
                            userInfo ?
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Log out</NavDropdown.Item>
                                </NavDropdown>
                                :
                                <LinkContainer to='/login'>
                                    <Nav.Link><i className="fa fa-user"> </i> Sign in</Nav.Link>
                                </LinkContainer>
                        }

                        {/*Admin panel*/}
                        {
                            userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminMenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )
                        }

                        <LinkContainer to='/about'>
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>
                    </Nav>

                    <Route render={({history}) => <SearchBox history={history}/>}/>

                </Container>
            </Navbar>
        </header>
    );
};

export default Header;