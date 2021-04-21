const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const config = require('config');

cloudinary.config({
	cloud_name: config.get('clou_name'),
	api_key: config.get('clou_key'),
	api_secret: config.get('clou_secret'),
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
