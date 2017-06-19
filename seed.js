const mongojs = require('mongojs');
const ObjectId = mongojs.ObjectId;
const async = require('async');
const bcryptjs = require('bcryptjs');

const seedUsers = [
	{
		_id: ObjectId('5863f68da5a1ac0ecc852000'),
		display_name: 'root',
		password: 'password',
		created: new Date(),
		updated: new Date()
	},
	{
		_id: ObjectId('5863f68da5a1ac0ecc852001'),
		display_name: 'rtaveras824',
		password: 'password',
		created: new Date(),
		updated: new Date()
	}
];

const seedLists = [
	{
		_id: ObjectId('5863f68da5a1ac0ecc852557'),
		name: 'Test1',
		author: ObjectId('5863f68da5a1ac0ecc852000'),
		public: true,
		cards: [
			ObjectId('5863f68da5a1ac0ecc852540'),
			ObjectId('5863f68da5a1ac0ecc852541'),
			ObjectId('5863f68da5a1ac0ecc852542')
		],
		created: new Date(),
		updated: new Date()
	},
	{
		_id: ObjectId('5863f68da5a1ac0ecc852558'),
		name: 'Test2',
		author: ObjectId('5863f68da5a1ac0ecc852000'),
		public: false,
		cards: [
			ObjectId('5863f68da5a1ac0ecc852543'),
			ObjectId('5863f68da5a1ac0ecc852544'),
			ObjectId('5863f68da5a1ac0ecc852545')
		],
		created: new Date(),
		updated: new Date()
	}
];

const seedCards = [
	{
		_id: ObjectId('5863f68da5a1ac0ecc852540'),
		side_a: '私のせんもんは、工学です。',
		side_b: 'My major is engineering.',
		photo_url: 'http://www.diploma-degree.com/Degree/700-3253-Civil+Engineering+Degree.jpg',
		created: new Date(),
		updated: new Date()
	},
	{
		_id: ObjectId('5863f68da5a1ac0ecc852541'),
		side_a: 'うちの学校では、毎月テストがあります。',
		side_b: 'There is a test at my school every month.',
		photo_url: 'http://images.collegexpress.com/article/test-prep-timeline-high-school.jpg',
		created: new Date(),
		updated: new Date()
	},
	{
		_id: ObjectId('5863f68da5a1ac0ecc852542'),
		side_a: '毎月どのくらい家賃を払っていますか？',
		side_b: 'How much do you pay for rent each month?',
		photo_url: 'https://rdcnewscdn.realtor.com/wp-content/uploads/2013/11/payrent.jpg',
		created: new Date(),
		updated: new Date()
	},
	{
		_id: ObjectId('5863f68da5a1ac0ecc852543'),
		side_a: 'ジェイクに足を踏んでごめんって言うつもりなの？',
		side_b: 'Are you going to say sorry to Jake for stepping on his foot?',
		created: new Date(),
		updated: new Date()
	},
	{
		_id: ObjectId('5863f68da5a1ac0ecc852544'),
		side_a: 'あんたの声、ひどいな！風邪でもひいてるの？それとも実は男だったり？',
		side_b: 'Your voice sounds awful! Do you have a cold or are you actually a dude?',
		created: new Date(),
		updated: new Date()
	},
	{
		_id: ObjectId('5863f68da5a1ac0ecc852545'),
		side_a: 'それは全部です。',
		side_b: 'That\'s everything.',
		created: new Date(),
		updated: new Date()
	}
];

const seedUserLists = [
	{
		_id: ObjectId('5863f68da5a1ac0ecc852400'),
		user_id: ObjectId('5863f68da5a1ac0ecc852001'),
		list_id: ObjectId('5863f68da5a1ac0ecc852557'),
		created: new Date(),
		updated: new Date()
	}
]

const databaseUrl = 'japanese-language-review';
const collections = ['lists', 'cards'];
const db = mongojs(databaseUrl, collections);

db.on('error', function(err) {
	console.log('Database Error:', err);
});

db.on('connect', function() {
	console.log('Database connected');
});

const hashPassword = function(user, callback) {
	bcryptjs.hash(user.password, 10, function(err, hash) {
		if (err) throw err;

		user.password = hash;
		callback(null, user);
	});
};

// Clear database
db.dropDatabase();

async.map(seedUsers, hashPassword, function(error, result) {
	db.users.save(result);
});

seedUsers.map(function(user) {
	return db.users.save(user);
});

seedLists.map(function(list) {
	return db.lists.save(list);
});

seedCards.map(function(card) {
	return db.cards.save(card);
});

seedUserLists.map(function(userList) {
	return db.userlists.save(userList);
});

console.log('The End')
db.close();
