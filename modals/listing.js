const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 50,
	},
	images: [
		{
			url: {
				type: String,
				required: true,
				minlength: 5,
			},
			thumbnailUrl: {
				type: String,
				required: true,
				minlength: 5,
			},
		},
	],
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
	},
	description: {
		type: String,
	},
	location: {
		langitude: {
			type: Number,
		},
		longitude: {
			type: Number,
		},
	},
});

const Listing = mongoose.model('Listing', listingSchema);

exports.Listing = Listing;
