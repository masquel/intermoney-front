import { combineReducers } from 'redux';

import App from './App';
import Orderbook from './Orderbook';
import Wallets from './Wallets';

export default combineReducers({
	App,
	Orderbook,
	Wallets
});