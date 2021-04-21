const express = require('express');
const router = express.Router();

const { User } = require('../modals/user');
const { Listing } = require('../modals/listing');

const auth = require('../middleware/auth');

router.get('/:id', auth, async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) return res.status(404).send();

	const listings = await Listing.find({ userId: req.params.id });

	res.send({
		id: user._id,
		name: user.name,
		email: user.email,
		listings: listings.length,
	});
});

module.exports = router;
