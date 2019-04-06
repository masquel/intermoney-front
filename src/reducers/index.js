import { combineReducers } from 'redux';

import App from './App';
import Orderbook from './Orderbook';
import Wallets from './Wallets';
import Orders from './Orders';

console.log(Orders);


export default combineReducers({
	App,
	Orderbook,
	Orders,
	Wallets
});