import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({value, numReviews}) => {
    //color dependence on rating
    const color = !value ? 'grey' : value < 3 ? 'red' : value < 4.5 ? 'green' : '#4284d3'

    //stars dependence on rating
    const rating = (value, factor) => {
        return value >= factor ? 'fas fa-star' : factor - value <= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'
    }

    return (
        <div className='rating'>
            <span>
                <i style={{color}} className={
                    rating(value, 1)
                }> </i>
                <i style={{color}} className={
                    rating(value, 2)
                }> </i>
                <i style={{color}} className={
                    rating(value, 3)
                }> </i>
                <i style={{color}} className={
                    rating(value, 4)
                }> </i>
                <i style={{color}} className={
                    rating(value, 5)
                }> </i>
            </span>
            <span> {numReviews ? `${numReviews} reviews` : ' '}</span>
        </div>
    );
};

Rating.defaultProps = {
    numReviews: 0,
    value: 0
}

Rating.propTypes = {
    value: PropTypes.number,
    numReviews: PropTypes.number
}

export default Rating;