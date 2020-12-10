import React, {useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import ErrorMessage from '../components/ErrorMessage';
import SpinnerLoader from '../components/SpinnerLoader';
import Product from '../components/Product';
import {useDispatch, useSelector} from 'react-redux';
import {listProducts} from '../actions/productActions';
import Paginate from '../components/Paginate';


const HomeScreen = ({match}) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products, pages, page} = productList

    useEffect(() => {
            dispatch(listProducts(keyword, pageNumber))
        }, [dispatch, keyword, pageNumber]
    )

    return (
        <div>
            {   //loading case
                loading ? <SpinnerLoader/> :
                    //error case
                    error ? <ErrorMessage error={error}/> :
                        //main content
                        <>
                            <h2>Latest products</h2>
                            <Row>
                                {products.map(item => (
                                    <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={item}/>
                                    </Col>
                                ))}
                            </Row>
                            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}></Paginate>
                        </>
            }
        </div>
    );
}

export default HomeScreen;