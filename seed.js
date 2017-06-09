const mongojs = require('mongojs');
const ObjectId = mongojs.ObjectId;

const seedLists = [
	{
		_id: ObjectId('5863f68da5a1ac0ecc852557'),
		name: 'Test1',
		card: [
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
		card: [
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
		created: new Date(),
		updated: new Date()
	},
	{
		_id: ObjectId('5863f68da5a1ac0ecc852541'),
		sideA: 'うちの学校では、毎月テストがあります。',
		sideB: 'There is a test at my school every month.',
		created: new Date(),
		updated: new Date()
	},
	{
		_id: ObjectId('5863f68da5a1ac0ecc852542'),
		sideA: '毎月どのくらい家賃を払っていますか？',
		sideB: 'How much do you pay for rent each month?',
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

// Seed lists and cards
seedLists.map(function(list) {
	return db.lists.save(list);
});

seedCards.map(function(card) {
	return db.cards.save(card);
});

console.log('The End')
db.close();