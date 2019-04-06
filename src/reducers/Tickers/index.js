import { getTickers } from '../../api';
import arrayToObjectByKey from '../../utils/arrayToObjectByKey';

import { ERROR, processApiError } from '../helpers';

export const FETCH_START = "tickers/FETCH_START";
export const FETCH_SUCCESS = "tickers/FETCH_SUCCESS";
export const FETCH_FAILURE = "tickers/FETCH_FAILURE";

export const fetchTickers = () => dispatch => {
	dispatch({type: FETCH_START});
	getTickers()
		.then(response => {
			dispatch({
				type: FETCH_SUCCESS,
				payload: arrayToObjectByKey(response.data.tickers, 'symbol')
			})
		})
		.catch(error => {
			dispatch(processApiError(error));
		})
}


const initialState = {
	loading: false,
	tickers: {},
	error: null,
	socketSubscribeId: null
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
				tickers: action.payload
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