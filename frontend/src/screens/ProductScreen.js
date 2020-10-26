import React, {useState, useEffect} from 'react';
import {Card, Row, Col, Image, Button, ListGroup, Form} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import ErrorMessage from "../components/ErrorMessage";
import Rating from '../components/Rating';
import {listProductsDetails} from '../actions/productActions';
import SpinnerLoader from "../components/SpinnerLoader";


const ProductScreen = ({match, history}) => {
    const [qty, setQty] = useState(0)

    const dispatch = useDispatch()
    const details = useSelector(state => state.productDetails)

    const {loading, error, product} = details
    const {name, image, description, price, countInStock, rating, numReviews} = product

    useEffect(() => {
            dispatch(listProductsDetails(match.params.id))
        }, [dispatch, match]
    )

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <Card>
            {   //loading case
                loading ? <SpinnerLoader/> :
                    //error case
                    error ? <ErrorMessage error={error}/> :
                        //main content
                        <>
                            <Card.Body>
                                <Row>
                                    <Col className="col-7">
                                        <Image
                                            className='img-fluid'
                                            src={image} alt={name}/>
                                    </Col>

                                    <Col className="col-4">
                                        <ListGroup className='list-unstyled' variant='flush'>
                                            <ListGroup.Item as='h2'> {name}</ListGroup.Item>

                                            <ListGroup.Item>
                                                {rating ? `${rating} rating` : 'no rating yet'}
                                                <Rating value={rating} numReviews={numReviews}/>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                {countInStock ? countInStock + ' in stock' : 'out of stock'}
                                            </ListGroup.Item>

                                            <ListGroup.Item as='h2'> <strong> ${price} </strong> </ListGroup.Item>
                                            <ListGroup.Item as='h5'> {description} </ListGroup.Item>

                                            {
                                                product.countInStock > 0 && (
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Qty</Col>
                                                            <Col>
                                                                <Form.Control as='select'
                                                                              value={qty}
                                                                              onChange={
                                                                                  e => setQty(e.target.value)
                                                                              }>
                                                                    {
                                                                        [...Array(product.countInStock).keys()].map(item => (
                                                                            <option key={item + 1} value={item + 1}>
                                                                                {item + 1}
                                                                            </option>
                                                                        ))
                                                                    }

                                                                </Form.Control>
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                )
                                            }

                                            <ListGroup.Item>
                                                <Button className='btn btn-lg btn-outline-light btn-block my-1'
                                                        onClick={addToCartHandler}>
                                                    add to cart
                                                </Button>
                                            </ListGroup.Item>

                                        </ListGroup>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </>
            }
        </Card>
    );
};

export default ProductScreen;