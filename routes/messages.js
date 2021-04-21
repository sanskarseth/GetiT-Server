const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { Expo } = require('expo-server-sdk');

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
	const messages = await Message.find({ toUserId: req.user.userId });
	res.send(messages);
});

router.post('/', [auth, validateWith(schema)], async (req, res) => {
	const { listingId, messagee } = req.body;

	const listing = await Listing.findById(listingId);
	if (!listing) return res.status(400).send({ error: 'Invalid listingId.' });

	const targetUser = await User.findById(listing.userId);
	if (!targetUser) return res.status(400).send({ error: 'Invalid userId.' });

	let message = new Message({
		fromUserId: req.user.userId,
		toUserId: listing.userId,
		listingId,
		content: messagee,
		dateTime: Date.now(),
	});

	await message.save();

	const { expoPushToken } = targetUser;

	if (Expo.isExpoPushToken(expoPushToken))
		await sendPushNotification(expoPushToken, message);

	res.status(201).send();
});

module.exports = router;
