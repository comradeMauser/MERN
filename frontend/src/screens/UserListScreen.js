import React, {useEffect} from 'react';
import {Button, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {listUsers, deleteUser} from '../actions/userActions';
import ErrorMessage from '../components/ErrorMessage';
import SpinnerLoader from '../components/SpinnerLoader';

const UserListScreen = ({history}) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/')
        }
    }, [dispatch, userInfo, history, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm("are you sure?")) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <>
            <h1>Registered users</h1>
            {loading ? <SpinnerLoader/> : error ? <ErrorMessage error={error}/> :
                <Table className='table-sm' striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Edit</th>
                    </tr>
                    </thead>

                    <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>{user.isAdmin ? (
                                    <i className='fas fa-check' style={{color: "green"}}> </i>) :
                                <i className='fas fa-times' style={{color: "red"}}> </i>
                            }
                            </td>
                            <td>
                                <LinkContainer to={`/user/${user._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'> </i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm'
                                        onClick={() => {
                                            deleteHandler(user._id)
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

export default UserListScreen;