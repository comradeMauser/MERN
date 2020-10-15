import React from 'react';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import Rating from "./Rating";


const Product = ({product}) => {
    return (
        <Card className='my-1 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image}/>
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text className='my-3' as='div'>
                    {product.rating ? `${product.rating} rating`: 'no rating yet'}
                    <Rating value={product.rating} numReviews={product.numReviews}/>
                </Card.Text>

                <Card.Text as='h3'>
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;