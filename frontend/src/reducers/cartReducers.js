import {
    CART_ADD_ITEM as ADD,
    CART_REMOVE_ITEM as REMOVE,
    CART_SAVE_SHIPPING_ADDRESS as SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD as PAYMENT_METHOD,
} from '../constants/cartConstants';

export const cartReducer = (state = {cartItems: [], shippingAddress: {}}, action) => {
    switch (action.type) {
        case ADD:
            const item = action.payload
            const existItem = state.cartItems.find(el => el.product === item.product)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(el => el.product === existItem.product ? item : el)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case REMOVE:
            return {
                ...state,
                cartItems: state.cartItems.filter(el => el.product !== action.payload)
            }
        case SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        default:
            return state
    }
}