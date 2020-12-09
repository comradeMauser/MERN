import React, {useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import ErrorMessage from "../components/ErrorMessage";
import Product from '../components/Product';
import {useDispatch, useSelector} from 'react-redux';
import {listProducts} from '../actions/productActions';
import SpinnerLoader from "../components/SpinnerLoader";


const HomeScreen = ({match}) => {
    const keyword = match.params.keyword
    const dispatch = useDispatch()
    const list = useSelector(state => state.productList)
    const {loading, error, products} = list

    useEffect(() => {
            dispatch(listProducts(keyword))
        }, [dispatch, keyword]
    )

    return (
        <div>
            {   //loading case
                loading ? <SpinnerLoader/> :
                    //error case
                    error ? <ErrorMessage error={error}/> :
                        //main content
                        <>
                            <h2>latest products</h2>
                            <Row>
                                {products.map(item => (
                                    <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={item}/>
                                    </Col>
                                ))}
                            </Row>
                        </>
            }
        </div>
    );
}

export default HomeScreen;