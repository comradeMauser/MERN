import React from 'react';
import {Alert} from 'react-bootstrap';
import PropTypes from 'prop-types';


const ErrorMessage = ({error, message, children}) => {
    return (
        <div>
            {   // cases of errors or notification
                error ?
                    <>
                        <h3 className='text-danger'><strong>ALARM und ACHTUNG!</strong></h3>
                        <Alert variant='danger'> {error} </Alert>
                    </>
                    : message ? <Alert variant='success'> {message} </Alert>
                    : <Alert variant='secondary'> {children} </Alert>
            }
        </div>
    );
};

export default ErrorMessage;

// ErrorMessage.defaultProps = {
//     message: "something wrong, call police!"
// }

ErrorMessage.propTypes = {
    message: PropTypes.string
}

