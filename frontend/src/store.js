import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import productListReducer from './reducers/productListReducer';

const reducer = combineReducers({
    productList : productListReducer
})

const initState = {}

const middleware = [thunk]

const store = createStore(reducer,
    initState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store