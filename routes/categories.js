const express = require('express');
const router = express.Router();
const { Category, validate } = require('../modals/category');
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');

router.get('/', async (req, res) => {
	const categories = await Category.find().select('-__v');
	// console.log(categories);
	res.send(categories);
});

router.get('/:id', validateObjectId, async (req, res) => {
	const category = await Category.findById(req.params.id).select('-__v');

	if (!category)
		return res
			.status(404)
			.send('The category with the given ID was not found.');

	res.send(category);
});

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let category = new Category({
		name: req.body.name,
		icon: req.body.icon,
		backgroundColor: req.body.backgroundColor,
		color: req.body.color,
	});

	category = await category.save();

	res.send(category);
});

module.exports = router;
