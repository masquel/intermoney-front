import axios from 'axios';

import { API_URL } from '../config';

console.log('API_URL', API_URL);

const api = axios.create({
	baseURL: API_URL + '/api'
})

api.defaults.headers.common['Authorization'] = 'Auth=0x2f618c7606f040340fb2f34f4c58ff2183119913';


export const getOrderBook = (market) => {
	return api.get("/orders/orderbook/", {
		params: {
			market
		}
	});
};

export const createOrder = ({type, side, ...order}) => {
	console.log(`/orders/${side}_${type}/`, order);
	return Promise.resolve();
	//return api.post(`/orders/${side}_${type}/`, order);
};

export const getWallets = () => {
	return new Promise((resolve) => {
		resolve();
	});
};

export const getActiveOrders = (address) => {
	return api.get("/orders/active/");
};

export const getHistoryOrders = (address) => {
	return api.get("/orders/");
};

export const cancelOrder = (id, address) => {
	return api.delete("/orders/"+id)
};

export const cancelAllOrders = () => {
	return new Promise((resolve) => {
		resolve();
	});
};

export const getTickers = (address) => {
	return api.get("/markets/");
};