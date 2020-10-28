import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {addToCart} from '../actions/cartActions';
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

    console.log(qty)
    console.log(cartItems)

    return (
        <div>
            CartScreen Plug
            {qty}
        </div>
    );
};

export default CartScreen;