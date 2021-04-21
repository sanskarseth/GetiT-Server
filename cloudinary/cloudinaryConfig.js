const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
	cloud_name: 'dgvpf7eqf',
	api_key: '437814458945231',
	api_secret: 'vIHf6FSoLnn6QLLM_bgPEdgINFk',
});

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: 'GetiT',
		allowed_formats: ['png', 'jpeg', 'jpg'], // supports promises as well
	},
});

module.exports = {
	cloudinary,
	storage,
};
