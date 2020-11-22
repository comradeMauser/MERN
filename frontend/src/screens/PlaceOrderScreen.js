import React from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import {Row, Col, ListGroup, Image} from 'react-bootstrap'
import ErrorMessage from "../components/ErrorMessage";


const PlaceOrderScreen = () => {
    const cart = useSelector(state => state.cart)


    return (
        <>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {`${cart.shippingAddress.address}, 
                                ${cart.shippingAddress.city}, 
                                ${cart.shippingAddress.postalCode}, 
                                ${cart.shippingAddress.country}`}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <ErrorMessage error='cart is empty'/>
                                : <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/></Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}> {item.name} </Link></Col>
                                                <Col md={4}>
                                                    {item.qty} x {item.price} = {item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>


        </>
    );
};

export default PlaceOrderScreen;