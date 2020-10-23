import React, {useEffect} from 'react';
import {Row, Col, Alert} from 'react-bootstrap';
import Product from '../components/Product';
import {useDispatch, useSelector} from 'react-redux';
import listProducts from '../actions/productActions';
// import axios from 'axios';

const HomeScreen = () => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList


    useEffect(() => {
            dispatch(listProducts())
        }, [dispatch]
    )

    return (
        <div>
            <h2>latest products</h2>
            {   //loading case
                loading ? <h4>...loading...</h4> :
                    //error case
                    error ? <Alert variant="danger">error: {error}</Alert> :
                        //main content
                        <Row>
                            {products.map(item => (
                                <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={item}/>
                                </Col>
                            ))}
                        </Row>}
        </div>
    );
}

export default HomeScreen;