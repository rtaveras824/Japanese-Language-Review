const express = require('express');
const router = new express.Router;

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const List = mongoose.model('List');
const Card = mongoose.model('Card');

router.get('/lists', function(req, res, next) {
	return List.find({
		$or: [
			{
				$and: [{
					author: ObjectId(req.user_id)
				}, {
					public: false
				}]
			},
			{ public: true }
		]
	})
		.exec(function(err, lists) {
			
			var publicSplitList = {
				public: [],
				private: []
			};
			lists.map((list, i) => {
				if (list.public) {
					publicSplitList.public.push(list);
				} else {
					publicSplitList.private.push(list);
				}
			});
			console.log(publicSplitList);

			res.json(publicSplitList);
		});
});

router.get('/lists/:list_id', function(req, res, next) {
	var listId = req.params.list_id;

	return List.findById(listId)
		.populate('cards')
		.exec(function(err, list) {
			res.json(list);
		});
});

router.get('/cards/:card_id', function(req, res, next) {
	var cardId = req.params.card_id;

	return Card.findById(cardId)
		.exec(function(err, card) {
			res.json(card);
		});
});

router.post('/addlist', function(req, res, next) {
	console.log('api user id', req.user_id);
	var newList = new List({
		name: req.body.name,
		author: req.user_id,
		public: req.body.public
	});
	newList.save(function(err, newEntry) {
		if (err) return err;
		console.log(newEntry);
		res.send(newEntry);
	});
});

router.post('/addcard', function(req, res, next) {
	console.log('add card');
	var newCard = new Card({
		side_a: req.body.side_a,
		side_b: req.body.side_b,
		photo_url: req.body.photo_url
	});
	
	newCard.save(function(err, newEntry) {
		if (err) return err;
		List.findByIdAndUpdate(req.body.deck_id, { $push: { cards: newEntry._id }})
			.exec(function(err, result) {
				res.json(newEntry);
			})
	});
});

module.exports = router;