const axios = require('axios');

const BASE_URL = 'http://localhost:4001/customer_purchase_details';

export const fileUploadService = (file) => {
	const data = new FormData();
	data.append('file', file);
	const api = fetch(BASE_URL, {
		method: 'POST',
		body: data
	}).then((response) => {
		return response.json();
	});
	api
		.then((responseJson) => {
			return responseJson;
		})
		.catch((error) => {
			console.error(error);
		});
	return api;
};
