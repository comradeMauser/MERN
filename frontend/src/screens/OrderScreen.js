import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button, Card, Col, Image, ListGroup, Row} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {PayPalButton} from 'react-paypal-button-v2';
import {getOrderDetails, payOrder, deliverOrder} from '../actions/orderActions';
import ErrorMessage from '../components/ErrorMessage';
import SpinnerLoader from '../components/SpinnerLoader';
import {ORDER_PAY_RESET, ORDER_DELIVER_RESET} from '../constants/orderConstants';

const OrderScreen = ({match, history}) => {
    const orderId = match.params.id
    const dispatch = useDispatch()
    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const {loading, order, error} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, success: successPay} = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading: loadingDeliver, success: successDeliver} = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    if (!loading) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }

        const addPayPalScript = async () => {
            const {data: clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || successPay || successDeliver) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))

        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }

    }, [dispatch, orderId, successPay, successDeliver, order, history, userInfo])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? <SpinnerLoader/> :
        error ? <ErrorMessage error={error}/> :
            <>
                <h1>Order: {order._id}</h1>
                <Row>
                    <Col className='text-left' md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>Shipping</h3>
                                <div>
                                    <div><strong>Name: </strong>{order.user.name}</div>
                                    <div><strong>Email: </strong>
                                        <a href={`mailto${order.user.email}`}> {order.user.email} </a></div>
                                    <div>
                                        <strong>Address: </strong>
                                        {`${order.shippingAddress.address}, 
                                          ${order.shippingAddress.city}, 
                                          ${order.shippingAddress.postalCode}, 
                                          ${order.shippingAddress.country}`}

                                        {/*Deliverede indicator*/}
                                        {order.isDelivered ?
                                            <ErrorMessage message={`Delivered on ${order.deliveredAt}`}/> :
                                            <ErrorMessage children='Not delivered'/>}
                                    </div>
                                </div>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h3>Payment Method</h3>
                                <div>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}

                                    {/*Paid indicator*/}
                                    {order.isPaid ?
                                        <ErrorMessage message={`Paid on ${order.paidAt}`}/> :
                                        <ErrorMessage children='Not paid'/>}
                                </div>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h3>Order Items</h3>
                                {order.orderItems.length === 0 ? <ErrorMessage error='order is empty'/>
                                    : <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
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
                                <ListGroup.Item><h3>Order Summary</h3></ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${order.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <SpinnerLoader/>}
                                        {!sdkReady ? (
                                            <SpinnerLoader/>
                                        ) : (
                                            <PayPalButton
                                                amount={order.totalPrice}
                                                onSuccess={successPaymentHandler}
                                            />
                                        )}
                                    </ListGroup.Item>
                                )}
                                {loadingDeliver && <SpinnerLoader/>}
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button type='button' className='btn btn-block'
                                                onClick={deliverHandler}>Mark as delivered</Button>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
};

export default OrderScreen;