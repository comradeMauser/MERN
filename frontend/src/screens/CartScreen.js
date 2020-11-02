import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {addToCart, removeFromCart} from '../actions/cartActions';
import {Row, Col, Card, ListGroup, Image, Button, Form} from 'react-bootstrap';
import ErrorMessage from '../components/ErrorMessage';


const CartScreen = ({match, history, location}) => {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split("=")[1]) : 1
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandker = (id) => {
        console.log(`removeFromCartHandker ${id}`)
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
        console.log('checkoutHandler')
    }

    const empty = <ErrorMessage> your cart is empty, <Link to='/'> GFTO </Link> </ErrorMessage>

    return (
        <div>
            <h2>Shopping list</h2>
            <Row>
                <Col md={8}>
                    {
                        cartItems.length === 0 ? empty
                            : (
                                <ListGroup variant='flush'>
                                    {cartItems.map(item => (
                                        <ListGroup.Item key={item.product}>
                                            <Row>

                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>

                                                <Col md={3}>
                                                    <Link to={`/product/${item.product}`}> {item.name} </Link>
                                                </Col>

                                                <Col md={2}>
                                                    ${item.price}
                                                </Col>

                                                <Col md={2}>
                                                    <Form.Control as='select'
                                                                  value={item.qty}
                                                                  onChange={
                                                                      e => dispatch(addToCart(
                                                                          item.product, Number(e.target.value)
                                                                          )
                                                                      )
                                                                  }>

                                                        {
                                                            [...Array(item.countInStock).keys()].map(item => (
                                                                <option key={item + 1} value={item + 1}>
                                                                    {item + 1}
                                                                </option>
                                                            ))
                                                        }

                                                    </Form.Control>
                                                </Col>

                                                <Col md={2}>
                                                    <Button type='button' variant='light'
                                                            onClick={() => {
                                                                removeFromCartHandker(item.product)
                                                            }}>
                                                        <i className='fas fa-trash'> </i>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>)
                    }
                </Col>


                <Col className='mt-3' md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h4>Subtotal {cartItems.reduce((accum, item) => accum + item.qty, 0)} items</h4>

                                total
                                price: {cartItems.reduce((accum, item) => accum + item.price * item.qty, 0).toFixed(2)} }
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={cartItems.length === 0}
                                        onClick={checkoutHandler}>
                                    <div>Proceed to checkout*</div>
                                    <div>*(Перейти к оформлению 3aka3a)</div>
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>

            </Row></div>


    );
};

export default CartScreen;