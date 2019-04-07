import { combineReducers } from 'redux';
import { notification } from 'antd';

import { getActiveOrders, getHistoryOrders } from '../../api';

import { processApiError } from '../helpers';

export const FETCH_ORDERS_START = "orders/FETCH_START";
export const FETCH_ORDERS_SUCCESS = "orders/FETCH_SUCCESS";
export const FETCH_ORDERS_FAILURE = "orders/FETCH_FAILURE";

export const FETCH_ACTIVE_ORDERS_START = "orders/active/FETCH_START";
export const FETCH_ACTIVE_ORDERS_SUCCESS = "orders/active/FETCH_SUCCESS";
export const FETCH_ACTIVE_ORDERS_FAILURE = "orders/active/FETCH_FAILURE";

export const CANCEL_ORDER = "orders/cancel";


export const fetchHistoryOrderList = () => dispatch => {
    dispatch({type: FETCH_ORDERS_START});
    getHistoryOrders()
        .then(response => {
            dispatch({type: FETCH_ORDERS_SUCCESS, payload: response.data});
        })
        .catch(error => {
            dispatch({type: FETCH_ORDERS_FAILURE});
            dispatch(processApiError(error));
        })
}

export const fetchActiveOrderList = () => dispatch => {
    dispatch({type: FETCH_ACTIVE_ORDERS_START});
    getActiveOrders()
        .then(response => {
            dispatch({type: FETCH_ACTIVE_ORDERS_SUCCESS, payload: response.data});
        })
        .catch(error => {
            dispatch({type: FETCH_ACTIVE_ORDERS_FAILURE});
            dispatch(processApiError(error));
        })
}

export const cancelOrder = order => ({
    type: CANCEL_ORDER,
    payload: order
});

const initialState = {
    activeOrders: {
    	loading: false,
    	data: [],
    	error: null
    },
    orders: {
    	loading: false,
    	data: [],
    	error: null
    }
};

const activeOrderReducer = (state = initialState.activeOrders, action) => {
	switch (action.type) {
		case FETCH_ACTIVE_ORDERS_START: {
			return {
				...state,
				error: null,
				loading: true
			}
		};
		case FETCH_ACTIVE_ORDERS_SUCCESS: {
			return {
				...state,
				loading: false,
				data: action.payload,
			}
		};
		case FETCH_ACTIVE_ORDERS_FAILURE: {
		 	return {
		 		...state,
		 		loading: false,
		 		error: action.paylod
		 	}
		};
		case CANCEL_ORDER: {
			return {
				...state,
				data: state.data.filter((item) => item.id !== action.payload.id)
			}
		};
		default: return state;
	}
}

const orderReducer = (state = initialState.orders, action) => {
    switch (action.type) {
    	case FETCH_ORDERS_START: {
			return {
				...state,
				error: null,
				loading: true
			}
		};
		case FETCH_ORDERS_SUCCESS: {
			return {
				...state,
				loading: false,
				data: action.payload
			}
		};
		case FETCH_ORDERS_FAILURE: {
		 	return {
		 		...state,
		 		loading: false,
		 		error: action.payload
		 	}
		};
		case CANCEL_ORDER: {
			return {
				...state,
				data: state.data.map((item) => {
					if(item.id !== action.payload.id){
						return item
					}
					return {
						...item, 
						state: "CANCELED"
					}
				})
			}
		};
		default: return state;
    }
}



const reducer = combineReducers({
 	orders: orderReducer,
 	activeOrders: activeOrderReducer
});

export default reducer;
