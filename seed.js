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
		sideA: '私のせんもんは、工学です。',
		sideB: 'My major is engineering.',
		photoUrl: 'http://www.diploma-degree.com/Degree/700-3253-Civil+Engineering+Degree.jpg',
		created: new Date(),
		updated: new Date()
	},
	{
		_id: ObjectId('5863f68da5a1ac0ecc852541'),
		sideA: 'うちの学校では、毎月テストがあります。',
		sideB: 'There is a test at my school every month.',
		photoUrl: 'http://images.collegexpress.com/article/test-prep-timeline-high-school.jpg',
		created: new Date(),
		updated: new Date()
	},
	{
		_id: ObjectId('5863f68da5a1ac0ecc852542'),
		sideA: '毎月どのくらい家賃を払っていますか？',
		sideB: 'How much do you pay for rent each month?',
		photoUrl: 'https://rdcnewscdn.realtor.com/wp-content/uploads/2013/11/payrent.jpg',
		created: new Date(),
		updated: new Date()
	},
	{
		_id: ObjectId('5863f68da5a1ac0ecc852543'),
		sideA: 'ジェイクに足を踏んでごめんって言うつもりなの？',
		sideB: 'Are you going to say sorry to Jake for stepping on his foot?',
		created: new Date(),
		updated: new Date()
	},
	{
		_id: ObjectId('5863f68da5a1ac0ecc852544'),
		sideA: 'あんたの声、ひどいな！風邪でもひいてるの？それとも実は男だったり？',
		sideB: 'Your voice sounds awful! Do you have a cold or are you actually a dude?',
		created: new Date(),
		updated: new Date()
	},
	{
		_id: ObjectId('5863f68da5a1ac0ecc852545'),
		sideA: 'それは全部です。',
		sideB: 'That\'s everything.',
		created: new Date(),
		updated: new Date()
	}
];

const databaseUrl = 'japanese-language-review';
const collections = ['lists', 'cards'];
const db = mongojs(databaseUrl, collections);

db.on('error', function(err) {
	console.log('Database Error:', err);
});

db.on('connect', function() {
	console.log('Database connected');
});

// Clear database
db.dropDatabase();

const hashPassword = function(user, callback) {
	bcryptjs.hash(user.password, 10, function(err, hash) {
		if (err) throw err;

		user.password = hash;
		callback(null, user);
	});
};

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

console.log('The End')
db.close();