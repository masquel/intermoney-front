import axios from 'axios';

import { API_URL } from '../config';

console.log('API_URL', API_URL);

export const api = axios.create({
	baseURL: API_URL + '/api'
});


export const getOrderBook = (market) => {
	return api.get(`/markets/${market}/orderbook/`);
};

export const createOrder = ({type, side, ...order}) => {
	console.log(`/orders/${side}_${type}/`, order);
	return api.post(`/orders/${side}_${type}/`, order);
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

export const getTrades = (address) => {
	return api.get("/trades/");
}

export const getNextNonce = () => {
	return api.get("/orders/get_next_nonce/")
};