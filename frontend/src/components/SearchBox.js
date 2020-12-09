import React, {useState} from 'react';
import {Button, Form, FormControl} from 'react-bootstrap';

const SearchBox = ({history}) => {
    const [keyword, setKeyword] = useState("")

    const submitHandler = (e) => {
        console.log(e)
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }
    return (
        <Form onSubmit={submitHandler} inline>
            <FormControl className='mr-sm-2 ml-sm-2' type='rext' name='q' placeholder='Search products'
                         onChange={(e) => setKeyword(e.target.value)}/>
            <Button type='submit' variant="outline-info">Search</Button>
        </Form>
    );
};

export default SearchBox;