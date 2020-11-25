import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import {Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap'
import ErrorMessage from '../components/ErrorMessage';
import {createOrder} from '../actions/orderActions';


const PlaceOrderScreen = ({history}) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    cart.shippingPrice = cart.itemsPrice > 100 ? 10 : 33
    cart.taxPrice = Number(cart.itemsPrice * 0.06).toFixed(1)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(1)

    const orderCreate = useSelector(state => state.orderCreate)
    const {success, order, error} = orderCreate

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {
        console.log("placeOrderHandler")
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }

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

                {/*Order Summary*/}
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item><h2>Order Summary</h2></ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <ErrorMessage error={error}/>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button type='button' className='btn-block'
                                        disabled={cart.cartItems === 0}
                                        onClick={placeOrderHandler}>Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>


        </>
    );
};

export default PlaceOrderScreen;