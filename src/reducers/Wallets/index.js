import { getWallets } from '../../api';

const initialState = {
	loading: false,
	data: {},
}

const FETCH_START = "app/wallets/FETCH_START";
const FETCH_SUCCESS  = "app/wallets/FETCH_SUCCESS";
const FETCH_FAILURE  = "app/wallets/FETCH_SUCCESS"; 

export const fetchWallets = () => dispatch => {
	dispatch({type: FETCH_START});
	return getWallets()
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