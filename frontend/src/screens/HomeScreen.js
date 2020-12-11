import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {listProducts} from '../actions/productActions';
import Meta from '../components/Meta';
import ErrorMessage from '../components/ErrorMessage';
import ProductCarousel from '../components/ProductCarousel';
import SpinnerLoader from '../components/SpinnerLoader';
import Product from '../components/Product';
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
        <>
            <Meta/>
            {!keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light'>Go Back</Link>}
            {loading ? <SpinnerLoader/> : error ? <ErrorMessage error={error}/> :
                <>
                    <h2>Latest products</h2>
                    <Row>
                        {products.map(item => (
                            <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={item}/>
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
                </>
            }
        </>
    );
}

export default HomeScreen;