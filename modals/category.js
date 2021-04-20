const Joi = require('joi');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50,
	},
	icon: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50,
	},
	backgroundColor: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50,
	},
	color: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50,
	},
});

const Category = mongoose.model('Category', categorySchema);

function validateCategory(category) {
	const schema = {
		name: Joi.string().min(3).max(50).required(),
		icon: Joi.string().min(3).max(50).required(),
		backgroundColor: Joi.string().min(3).max(50).required(),
		color: Joi.string().min(3).max(50).required(),
	};

	return Joi.validate(category, schema);
}

exports.categorySchema = categorySchema;
exports.Category = Category;
exports.validate = validateCategory;
