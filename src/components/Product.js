import React from 'react';
import {Card} from "react-bootstrap";
import Rating from "./Rating";


const Product = ({product}) => {
    return (
        <Card className='my-1 p-3 rounded'>
            <a href={`/product/${product._id}`}>
                <Card.Img src={product.image}/>
            </a>

            <Card.Body>
                <a href={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </a>

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