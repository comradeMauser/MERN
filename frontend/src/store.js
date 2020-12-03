import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {cartReducer} from './reducers/cartReducers';
import {
    productListReducers, productDetailsReducer, productDeleteReducer, productCreateReducer
} from './reducers/productListReducers';
import {
    userLoginReducer, userRegisterReducer, userDetailsReducer,
    userUpdProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer,
} from './reducers/userReducers';
import {orderCreateReducer, orderDetailsReducer, orderPayReducer, orderMyListReducer} from './reducers/orderReducers';


const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdProfile: userUpdProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyList: orderMyListReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store