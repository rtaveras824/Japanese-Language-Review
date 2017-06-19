const express = require('express');
const router = new express.Router;

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const List = mongoose.model('List');
const Card = mongoose.model('Card');
const UserList = mongoose.model('UserList');

// router.get('/lists', function(req, res, next) {
// 	return List.find({
// 		$or: [
// 			{
// 				$and: [{
// 					author: ObjectId(req.user_id)
// 				}, {
// 					public: false
// 				}]
// 			},
// 			{ public: true }
// 		]
// 	})
// 		.exec(function(err, lists) {
			
// 			var publicSplitList = {
// 				public: [],
// 				private: []
// 			};
// 			lists.map((list, i) => {
// 				if (list.public) {
// 					publicSplitList.public.push(list);
// 				} else {
// 					publicSplitList.private.push(list);
// 				}
// 			});
// 			console.log(publicSplitList);

// 			res.json(publicSplitList);
// 		});
// });

router.get('/userprivatelists', function(req, res, next) {
	const userId = req.user_id;

	return List.find({
		$and: [{
			author: userId,
		}, {
			public: false
		}]
	})
		.exec(function(err, lists) {
			res.json(lists);
		});
});

router.get('/userpubliclists', function(req, res, next) {
	const userId = req.user_id;

	return List.find({
		$and: [{
			author: userId,
		}, {
			public: true
		}]
	})
		.exec(function(err, lists) {
			res.json(lists);
		});
});

router.get('/publiclists', function(req, res, next) {
	return List.find({
		public: true
	})
		.exec(function(err, lists) {
			res.json(lists);
		});
});

router.get('/savedlists', function(req, res, next) {
	const userId = req.user_id;
	return UserList.find({
		user_id: userId
	})
	.select('list_id')
	.populate('list_id')
		.exec(function(err, lists) {
			console.log(lists);
			res.json(lists);
		})
});

router.get('/lists/:list_id', function(req, res, next) {
	const userId = req.user_id;
	const listId = req.params.list_id;

	return List.findById(listId)
		.lean()
		.populate('cards')
		.exec(function(err, list) {
			return UserList.find({
				$and: [{
					user_id: userId
				}, {
					list_id: listId
				}]
			})
			.exec(function(err, saved) {
				if (saved.length > 0) 
					list.saved = true;
				else
					list.saved = false;
				res.json(list);
			});
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

router.post('/addsaved', function(req, res, next) {
	const listId = req.body.list_id;
	const userId = req.user_id;

	var newUserList = new UserList({
		user_id: userId,
		list_id: listId
	});

	newUserList.save(function(err, newEntry) {
		if (err) return err;
		res.send(newEntry);
	});
});

router.post('/removesaved', function(req, res, next) {
	const listId = req.body.list_id;
	const userId = req.user_id;

	return UserList.remove({
		$and: [{
			user_id: userId
		}, {
			list_id: listId
		}]
	})
		.exec(function(response) {
			console.log('deleted', response);
			res.send(response);
		});
});

module.exports = router;