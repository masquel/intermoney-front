import axios from 'axios';

import { API_URL } from '../config';

console.log('API_URL', API_URL);

const api = axios.create({
	baseURL: API_URL + '/api'
})

api.defaults.headers.common['Authorization'] = 'Auth=0x2f618c7606f040340fb2f34f4c58ff2183119913';


export const getOrderBook = () => {
	return new Promise((resolve, reject) => {
		resolve({
			data: {
				ask: [
					[0.1, 100],
					[0.2, 20],
					[0.3, 30],
					[0.5, 10],
					[0.6, 50],
					[0.7, 1000],
					[0.8, 30],
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
					[0.01, 3000],
					[0.02, 0.1],
					[0.03, 0.2],
					[0.04, 3330],
					[0, 0],
					[0, 0],
					[0, 0],
					[0, 0],
					[0, 0],
					[0, 0]
				]
			}
		})
	});
};

export const createOrder = () => {
	return new Promise((resolve) => {
		resolve();
	});
};

export const getWallets = () => {
	return new Promise((resolve) => {
		resolve();
	});
};

export const getActiveOrders = (address) => {
	return api.get("/orders/active");
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