const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(bodyParser.json());
app.use(cors());

var db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'smart-brain'
  }
});

app.get('/', (req, res) =>{
	db.select().from('users')
	.then(users => {
		res.json(users);
	});
});

app.post('/signin', (req, res) => {
	db('login').where({
	  email: req.body.email,
	 }).select('*')
	.then(user => {
		if (bcrypt.compareSync(req.body.password, user[0].hash)){
			return db('users').where({
					email: req.body.email
					})
					.select('*')
					.then(user => res.json(user[0]));
		}
		else{
			res.status(400).json('Incorrect login credentials');
		}
	})
	.catch(err => res.status(400).json('Error logging in'));
});

app.post('/register', (req, res) => {
	const {email, name, password} = req.body;
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(password, salt);

	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
				.returning('*')
				.insert({
					name: name,
					email: email,
					joined: new Date()
				})
				.then(user => 
				{
					res.json(user[0]);
				})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('unable to register'));
});

app.put('/image', (req, res) => {
	const {id} = req.body;
	db('users')
	.returning('entries')
	.where('id','=', id)
	.increment('entries', 1)
	.then(entry => {
		if (entry.length == 0)
			res.status(400).json('Cannot find id for user to update')
		else
			res.json(entry[0]);
	})
	.catch(err =>res.status(400).json('error updating user entry'));
});

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	db('users')
		.where('id', id)
		.then(users => {
			if (users.length == 0)
				res.status(400).json('Cannot find user');
			else
				res.json(users[0]);
		})
		.catch(err => res.status(400).json('Error finding user'));
});

app.listen(3000);