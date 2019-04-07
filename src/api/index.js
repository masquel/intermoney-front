import axios from 'axios';

import { API_URL } from '../config';

console.log('API_URL', API_URL);

const api = axios.create({
	baseURL: API_URL + '/api'
})


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

export const getActiveOrders = () => {
	return new Promise((resolve) => {
		resolve();
	});
};

export const getHistoryOrders = () => {
	return new Promise((resolve) => {
		resolve();
	});
};

export const cancelOrder = () => {
	return new Promise((resolve) => {
		resolve();
	})
};

export const cancelAllOrders = () => {
	return new Promise((resolve) => {
		resolve();
	});
};

export const getTickers = (address) => {
	return api.get("/markets/", {
		headers: {
			'Authorization': 'Address ' + address,
			'Content-Type': 'application/json'
		}
	});
};