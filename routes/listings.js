const express = require('express');
const router = express.Router();
const Joi = require('joi');
const multer = require('multer');

const { Listing } = require('../modals/listing');

const validateWith = require('../middleware/validation');
const auth = require('../middleware/auth');
const config = require('config');

const { storage } = require('../cloudinary/cloudinaryConfig');
const upload = multer({
	storage,
});

const schema = {
	title: Joi.string().required(),
	description: Joi.string().allow(''),
	price: Joi.number().required().min(1),
	categoryId: Joi.string().required().min(1),
	location: Joi.object({
		latitude: Joi.number().required(),
		longitude: Joi.number().required(),
	}).optional(),
};

// const validateCategoryId = (req, res, next) => {
// 	if (!categoriesStore.getCategory(parseInt(req.body.categoryId)))
// 		return res.status(400).send({ error: 'Invalid categoryId.' });

// 	next();
// };

router.get('/', async (req, res) => {
	const listings = await Listing.find().select('-__v');
	// var l = [];
	// l.push(listings);
	res.send(listings);
});

router.post(
	'/',
	[
		// Order of these middleware matters.
		// "upload" should come before other "validate" because we have to handle
		// multi-part form data. Once the upload middleware from multer applied,
		// request.body will be populated and we can validate it. This means
		// if the request is invalid, we'll end up with one or more image files
		// stored in the uploads folder. We'll need to clean up this folder
		// using a separate process.
		// auth,
		upload.array('images', config.get('maxImageCount')),
		validateWith(schema),
		auth,
	],
	// https://res.cloudinary.com/dgvpf7eqf/image/upload/v1618979592/GetiT/gq2w8uukwlrp8ah9aswt.jpg
	// https://res.cloudinary.com/dgvpf7eqf/image/upload/w_2000,h_2000,c_scale,q_50/v1618977541/GetiT/gdzdaorqrcdm3yczmplq.jpg
	// https://res.cloudinary.com/dgvpf7eqf/image/upload/w_100,h_100,c_scale,q_30/v1618977541/GetiT/gdzdaorqrcdm3yczmplq.jpg

	async (req, res) => {
		// console.log(req.files[0].path);

		const full = req.files[0].path.replace(
			'upload/',
			'upload/w_2000,h_2000,c_scale,q_50/'
		);
		const thumb = req.files[0].path.replace(
			'upload/',
			'upload/w_100,h_100,c_scale,q_30/'
		);

		// console.log(full);
		// console.log(thumb);

		const listing = new Listing({
			title: req.body.title,
			price: parseFloat(req.body.price),
			categoryId: req.body.categoryId,
			description: req.body.description,
			images: [
				{
					url: full,
					thumbnailUrl: thumb,
				},
			],
		});

		if (req.body.location) listing.location = JSON.parse(req.body.location);
		if (req.user) listing.userId = req.user.userId;

		// console.log(listing);

		// store.addListing(listing);

		await listing.save();
		res.status(201).send(listing);
	}
);

module.exports = router;
