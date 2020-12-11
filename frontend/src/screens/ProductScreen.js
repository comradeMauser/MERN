import React, {useState, useEffect} from 'react';
import {Card, Row, Col, Image, Button, ListGroup, Form} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import Meta from '../components/Meta';
import Rating from '../components/Rating';
import {listProductsDetails, createProductReview} from '../actions/productActions';
import SpinnerLoader from '../components/SpinnerLoader';
import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants';


const ProductScreen = ({match, history}) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {success: successProductReview, error: errorProductReview} = productReviewCreate

    useEffect(() => {
            if (successProductReview) {
                alert("Submitted")
                setRating(0)
                setComment('')
                dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
            }
            dispatch(listProductsDetails(match.params.id))
        }, [dispatch, match, successProductReview]
    )

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submithandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {rating, comment}))
    }

    return (
        <Card>
            {loading ? <SpinnerLoader/> : error ? <ErrorMessage error={error}/> :
                <>
                    <Card.Body>
                        <Row>
                            <Col className="col-7">
                                <Image className='img-fluid'
                                       src={product.image} alt={product.name}/>
                            </Col>

                            <Meta title={product.name}/>
                            <Col className="col-4">
                                <ListGroup className='list-unstyled' variant='flush'>
                                    <ListGroup.Item as='h2'> {product.name}</ListGroup.Item>

                                    <ListGroup.Item>
                                        {product.rating ? `${product.rating} rating` : 'no rating yet'}
                                        <Rating value={product.rating} numReviews={product.numReviews}/>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        {product.countInStock ? product.countInStock + ' in stock' : 'out of stock'}
                                    </ListGroup.Item>

                                    <ListGroup.Item as='h2'> <strong> ${product.price} </strong>
                                    </ListGroup.Item>
                                    <ListGroup.Item as='h5'> {product.description} </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control as='select' value={qty}
                                                                  onChange={
                                                                      e => setQty(e.target.value)}>
                                                        {[...Array(product.countInStock).keys()].map(item => (
                                                            <option key={item + 1} value={item + 1}>
                                                                {item + 1}
                                                            </option>
                                                        ))}
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
                        {/*Reviews*/}
                        <Row>
                            <Col md={6}>
                                <h2>Reviews</h2>
                                {product.reviews.length === 0 && <ErrorMessage children='no reviews yet'/>}
                                <ListGroup variant='flush'>
                                    {product.reviews.map(review => (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating}/>
                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}
                                    <ListGroup.Item>
                                        <h4>Write a custome review</h4>
                                        {errorProductReview && <ErrorMessage error={errorProductReview}/>}
                                        {userInfo ? (
                                            <Form onSubmit={submithandler}>
                                                <Form.Group controlId='rating'>
                                                    <Form.Label>Rating</Form.Label>
                                                    <Form.Control as='select' value={rating}
                                                                  onChange={e => setRating(e.target.value)}>
                                                        <option value=''>Select...</option>
                                                        <option value='1'>Poor</option>
                                                        <option value='2'>Fair</option>
                                                        <option value='3'>Good</option>
                                                        <option value='4'>Very good</option>
                                                        <option value='5'>Excellent</option>
                                                        ))}
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId='comment'>
                                                    <Form.Label>Comment</Form.Label>
                                                    <Form.Control as='textarea' row='3' value={comment}
                                                                  onChange={e => setComment(e.target.value)}></Form.Control>
                                                </Form.Group>
                                                <Button type='submit' variant='primary'>Submit</Button>
                                            </Form>
                                        ) : (
                                            <ErrorMessage> Please <Link to='/login'>sign in</Link> to write a
                                                review </ErrorMessage>)}
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