import React, {useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getUserDetails, updateUser} from '../actions/userActions';
import {USER_UPDATE_RESET} from '../constants/userConstants';
import ErrorMessage from "../components/ErrorMessage";
import FormContainer from "../components/FormContainer";
import SpinnerLoader from "../components/SpinnerLoader";


const UserEditScreen = ({match, history}) => {
    const userId = match.params.id
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({type: USER_UPDATE_RESET})
            history.push('/admin/userlist')
        } else {

            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, user, userId, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id: userId, name, email, isAdmin}))
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>back to userlist</Link>
            <FormContainer>
                <h1>Edit user</h1>
                {loadingUpdate && SpinnerLoader()}
                {errorUpdate && ErrorMessage(errorUpdate)}
                {loading ? <SpinnerLoader/> : error ? <ErrorMessage error={error}/> : (
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name'
                                          placeholder='Enter name'
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}>

                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email'
                                          placeholder='Enter email'
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}>

                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isadmin'>
                            <Form.Check type='checkbox'
                                        label='Is Admin'
                                        checked={isAdmin}
                                        onChange={(e) => setIsAdmin(e.target.checked)}>

                            </Form.Check>
                        </Form.Group>

                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default UserEditScreen;