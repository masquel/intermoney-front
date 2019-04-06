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


export const fetchHistoryOrderList = (session_key, limit, offset) => dispatch => {
    dispatch({type: FETCH_ORDERS_START});
    getHistoryOrders(session_key, limit, offset)
        .then(response => {
            dispatch({type: FETCH_ORDERS_SUCCESS, payload: response.data});
        })
        .catch(error => {
            dispatch({type: FETCH_ORDERS_FAILURE});
            dispatch(processApiError(error));
        })
}

export const fetchActiveOrderList = (session_key, limit, offset) => dispatch => {
    dispatch({type: FETCH_ACTIVE_ORDERS_START});
    getActiveOrders(session_key, limit, offset)
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
    	pagination: {
    		total: 0,
    		size: 10,
    		page: 1
    	},
    	error: null
    },
    orders: {
    	loading: false,
    	data: [],
    	pagination: {
    		total: 0,
    		size: 10,
    		page: 1
    	},
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
				data: action.payload.orders,
				pagination: {
					total: action.payload.page.sum_count,
					size: action.payload.page.limit,
					page: action.payload.page.offset / action.payload.page.limit + 1
				}
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
				data: action.payload.orders,
				pagination: {
					total: action.payload.page.sum_count,
					size: action.payload.page.limit,
					page: action.payload.page.offset / action.payload.page.limit + 1
				}
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
