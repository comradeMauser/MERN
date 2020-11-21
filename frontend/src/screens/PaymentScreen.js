import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Button, Col} from 'react-bootstrap'
import {savePaymentMethod} from '../actions/cartActions';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';


const PaymentScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h3>Payment Method</h3>
            <Form onsubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select</Form.Label>
                    <Col>
                        <Form.Check type='radio' label='PayPal' id='PayPal' name='paymentMethod'
                                    value='PayPal' checked
                                    onChange={e => setPaymentMethod(e.target.value)}/>

                        <Form.Check type='radio' label='Stripe' id='Stripe' name='paymentMethod'
                                    value='Stripe'
                                    onChange={e => setPaymentMethod(e.target.value)}/>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;