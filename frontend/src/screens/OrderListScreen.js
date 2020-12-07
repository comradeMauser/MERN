import React, {useEffect} from 'react';
import {Button, Table} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {listOrders} from '../actions/orderActions';
import ErrorMessage from '../components/ErrorMessage';
import SpinnerLoader from '../components/SpinnerLoader';

const OrderListScreen = ({history}) => {
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders} = orderList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    return (
        <>
            <h1>Orders</h1>
            {loading ? <SpinnerLoader/> : error ? <ErrorMessage error={error}/> :
                <Table className='table-sm' striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                    </tr>
                    </thead>

                    <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.isPaid ? order.paidAt.substring(0, 10) :
                                <i className='fas fa-times' style={{color: "red"}}> </i>}
                            </td>
                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) :
                                <i className='fas fa-times' style={{color: "red"}}> </i>}
                            </td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant='success' className='btn-sm mr-1'>
                                        details
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            }
        </>
    );
};

export default OrderListScreen;