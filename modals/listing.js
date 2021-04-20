const Joi = require('joi');
const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

const listingSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 50,
	},
	imageurl: {
		type: String,
		default: 'http://192.168.29.155:9000/assets/jacket1_full.jpg',
		minlength: 5,
		maxlength: 255,
		required: true,
	},
	imagethumbnailUrl: {
		type: String,
		default: 'http://192.168.29.155:9000/assets/jacket1_thumb.jpg',
		minlength: 5,
		maxlength: 255,
		required: true,
	},
	price: {
		type: Number,
		required: true,
		min: 1,
	},
	categoryId: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		min: 0,
	},
});

const Listing = mongoose.model('Listing', listingSchema);

function validateListing(listing) {
	// console.log(listing);
	const schema = {
		title: Joi.string().min(2).max(50).required(),
		price: Joi.number().min(1).required(),
		imageurl: Joi.string().min(5).max(255).required(),
		imagethumbnailUrl: Joi.string().min(5).max(255).required(),
		categoryId: Joi.string().required(),
		userId: Joi.string().required(),
		description: Joi.string(),
	};

	return Joi.validate(listing, schema);
}

exports.listingSchema = listingSchema;
exports.Listing = Listing;
exports.validate = validateListing;
