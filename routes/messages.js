const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { Expo } = require('expo-server-sdk');
const mongoose = require('mongoose');

const { User } = require('../modals/user');
const { Message } = require('../modals/message');
const { Listing } = require('../modals/listing');

const sendPushNotification = require('../utilities/pushNotifications');
const auth = require('../middleware/auth');
const validateWith = require('../middleware/validation');

const schema = {
	listingId: Joi.string().required(),
	message: Joi.string().required(),
};

router.get('/', auth, async (req, res) => {
	const messages = await Message.find({ toUserId: req.user._id });
	// console.log(messages);
	res.send(messages);
});

router.post('/', [auth], async (req, res) => {
	try {
		const listing = await Listing.findById(
			mongoose.Types.ObjectId(req.body.listingId)
		);
		if (!listing) return res.status(400).send({ error: 'Invalid listingId.' });

		const targetUser = await User.findById(listing.userId);
		// console.log('saf', targetUser);
		if (!targetUser) return res.status(400).send({ error: 'Invalid userId.' });

		let message = new Message({
			fromUserId: req.user._id,
			toUserId: listing.userId,
			listingId: req.body.listingId,
			content: req.body.message,
			dateTime: Date.now(),
		});

		await message.save();

		const { expoPushToken } = targetUser;

		if (Expo.isExpoPushToken(expoPushToken))
			await sendPushNotification(expoPushToken, message);

		res.status(201).send('added');
	} catch (ex) {
		console.log(ex);
	}
});

router.delete('/:id', auth, async (req, res) => {
	const message = await Message.findByIdAndRemove(req.params.id);

	if (!message) return res.status(404).send('Message Not Found.');

	res.send(message);
});

module.exports = router;
