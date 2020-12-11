import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Carousel, Image} from 'react-bootstrap';
import ErrorMessage from './ErrorMessage';
import SpinnerLoader from './SpinnerLoader';
import {listTopProducts} from '../actions/productActions';


const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const {loading, error, products} = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return loading ? <SpinnerLoader/> : error ? <ErrorMessage error={error}/> : (
        <Carousel pause='hover' className='bg-dark'>
            {
                products.map(product => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid/>
                            <Carousel.Caption className='carousel-caption'>
                                <h2 className='text-black-50'>{product.name}
                                    <strong>${product.price}</strong>
                                </h2>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))
            }
        </Carousel>
    );
};

export default ProductCarousel;