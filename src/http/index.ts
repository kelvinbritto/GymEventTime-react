import axios from 'axios';

const http = axios.create({
	baseURL: 'http://127.0.0.1:8001/',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest',
	},
});

export default http;
