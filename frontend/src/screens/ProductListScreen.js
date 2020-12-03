import React, {useEffect} from 'react';
import {Button, Col, Row, Table} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {listProducts, deleteProduct} from '../actions/productActions';
import ErrorMessage from '../components/ErrorMessage';
import SpinnerLoader from '../components/SpinnerLoader';


const ProductListScreen = ({history}) => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts())
        } else {
            history.push('/')
        }
    }, [dispatch, userInfo, history, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm("are you sure?")) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = (product) => {
        console.log(createProductHandler)
        //TODO: createProductHandler
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h2>Products</h2>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'> </i> Create new product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <SpinnerLoader/>}
            {errorDelete && <ErrorMessage error={errorDelete}/>}
            {loading ? <SpinnerLoader/> : error ? <ErrorMessage error={error}/> :
                <Table className='table-sm' striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Edit</th>
                    </tr>
                    </thead>

                    <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/user/${product._id}/edit`}>
                                    <Button variant='success' className='btn-sm mr-1'>
                                        <i className='fas fa-edit'> </i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm'
                                        onClick={() => {
                                            deleteHandler(product._id)
                                        }}>
                                    <i className='fas fa-trash'> </i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            }
        </>
    );
};

export default ProductListScreen;