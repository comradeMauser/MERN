import React from 'react';
import {Alert} from 'react-bootstrap';

const ErrorMessage = ({error}) => {
    return (
        <div>
            <h3 className='text-danger'><strong>ALARM und ACHTUNG!</strong></h3>
            <Alert variant='danger'>{error}</Alert>
        </div>
    );
};

export default ErrorMessage;