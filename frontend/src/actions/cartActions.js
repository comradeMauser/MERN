import axios from 'axios';
import {CART_ADD_ITEM as ADD} from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const {data} = await axios(`/api/products/${id}`)

    dispatch({
        type: ADD,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}