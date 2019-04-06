const WEB3_ACTIONS = {
	"RECEIVE_ACCOUNT": "web3/RECEIVE_ACCOUNT",
	"CHANGE_ACCOUNT": "web3/CHANGE_ACCOUNT",
	"LOGOUT": "web3/LOGOUT"
}

const initialState = {
	defaultSymbol: 'USD_EUR',
	account: null
}

export default (state = initialState, action) => {
	switch (action) {
		case WEB3_ACTIONS.RECEIVE_ACCOUNT: 
		case WEB3_ACTIONS.CHANGE_ACCOUNT: {
			return {
				...state,
				account: action.address
			}
		}
		default: return state;
	}
	return state;
};