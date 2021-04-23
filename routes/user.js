const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { User } = require('../modals/user');
const { Listing } = require('../modals/listing');

const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
	const users = await User.find();
	if (!users) return res.status(404).send();

	// const listings = await Listing.find({ userId: req.params.id });

	// console.log(listings.length);

	res.send(users);
});

module.exports = router;
