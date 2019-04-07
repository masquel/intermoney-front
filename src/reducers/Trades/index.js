import { getTrades } from '../../api';
import arrayToObjectByKey from '../../utils/arrayToObjectByKey';

import { ERROR, processApiError } from '../helpers';

export const FETCH_START = "trades/FETCH_START";
export const FETCH_SUCCESS = "trades/FETCH_SUCCESS";
export const FETCH_FAILURE = "trades/FETCH_FAILURE";

export const fetchTrades = (account) => dispatch => {
	dispatch({type: FETCH_START});
	return getTrades(account)
		.then(response => {
			dispatch({
				type: FETCH_SUCCESS,
				payload: response.data
			})
			return response.data;
		})
		.catch(error => {
			dispatch(processApiError(error));
		})
}


const initialState = {
	loading: false,
	trades: {},
	error: null,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_START:
			return {
				...state,
				loading: true
			}
		case FETCH_SUCCESS: {
			return {
				...state,
				loading: false,
				trades: action.payload
			}
		}
		case FETCH_FAILURE:
		case ERROR: {
			return {
				...state,
				loading: false,
				error: action.payload
			}
		}
		default: return state;
	}
}