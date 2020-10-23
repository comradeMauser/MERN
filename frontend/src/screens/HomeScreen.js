import React, {useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import ErrorMessage from "../components/ErrorMessage";
import Product from '../components/Product';
import {useDispatch, useSelector} from 'react-redux';
import listProducts from '../actions/productActions';
import SpinnerLoader from "../components/SpinnerLoader";


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
                loading ? <SpinnerLoader/> :
                    //error case
                    error ? <ErrorMessage error={error}/> :
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