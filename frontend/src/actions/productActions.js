import axios from 'axios';
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL
}
    from '../constants/productConstants';

const listProducts = () => async (dispatch) => {
    try {

        dispatch({type: PRODUCT_LIST_REQUEST})
        const {data} = axios.get("/api/prosucts")

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (eggog) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: eggog.response && eggog.response.data.message ?
                eggog.response.data.message : eggog.message
        })

    }
}

export default listProducts