const express = require('express');
const router = express.Router();

const { Listing } = require('../modals/listing');

const auth = require('../middleware/auth');

router.get('/:id', auth, async (req, res) => {
	const listing = Listing.findById(req.params.id);
	if (!listing) return res.status(404).send();

	res.send(listing);
});

module.exports = router;
