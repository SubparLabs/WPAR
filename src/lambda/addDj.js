const axios = require('axios');

const apiRoot = 'https://stream.subpar.fm/api/station/1/streamers';

exports.handler = (event, context, callback) => {

	const name = event.queryStringParameters.n || "anon";
	
	axios({
		method:'post', 
		url:apiRoot,
		headers: {
			'X-API-Key': process.env.SUBPAR_API_KEY
		},
		data: {
			streamer_username: name,
			streamer_password: "password",
			display_name: name,
			is_active: true,
			enforce_schedule: false,
			schedule_items: []
		}
	}).then(res => {
		callback(null, {
			statusCode: 200,
			body: JSON.stringify(res.data)
		});
	})
	.catch(err => {
		callback(err);
	});

};
