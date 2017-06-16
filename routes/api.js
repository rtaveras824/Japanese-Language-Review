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
	console.log(req.body);
	return res.json(req.body);
});

module.exports = router;