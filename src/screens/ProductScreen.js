import React from 'react';


const ProductScreen = ({match}) => {
    return (
        <div>
            Product {match.params.id}
        </div>
    );
};

export default ProductScreen;