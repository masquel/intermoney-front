import { getOrderBook } from '../../api';

const initialState = {
	loading: false,
	data: {
		ask: [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        bid: [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ]
	},
}

const FETCH_START = "app/orderbook/FETCH_START";
const FETCH_SUCCESS  = "app/orderbook/FETCH_SUCCESS";
const FETCH_FAILURE  = "app/orderbook/FETCH_SUCCESS"; 

export const fetchOrderBook = () => dispatch => {
	dispatch({type: FETCH_START});
	return getOrderBook()
		.then((response) => {
			dispatch({type: FETCH_SUCCESS, payload: response.data});
		})
		.catch(error => {
			dispatch({type: FETCH_FAILURE, payload: error});
		})
}

export default function reducer(state = initialState, action){
	switch (action.type) {
		case FETCH_START: {
			return {
				...state,
				loading: true
			}
		}
		case FETCH_SUCCESS: {
			return {
				...state,
				loading: false,
				data: action.payload
			}
		}
		case FETCH_FAILURE: {
			return {
				...state,
				loading: false
			}
		}
		default: return state;
	}
	return state;
}