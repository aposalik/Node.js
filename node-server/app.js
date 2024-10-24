require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

// Config JSON response
app.use(express.json())

// Models
const User = require('./models/User')

// Public Route
app.get('/', (req, res) => {
	res.status(200).json({ msg: 'Hello'})
})

// Private Route
app.get('/user/:id', checkToken, async (req, res) => {
	const id = req.params.id 

// Check if user exists
	const user = await User.findById(id, '-password')

	if(!user) {
		return res.status(404).json({ msg: 'Dont find the User' })
}
	res.status(200).json({ user })
})

function checkToken(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if(!token) {
		return res.status(401).json({ msg: "Denied!" })
	}

	try {
		const secret = proces.env.SECRET
		jwt.verify(token, secret)
		next()
	} catch(error) {
		res.status(400).json({ msg: "Token Fail" })
	}
}

// Register User
app.post('/auth/register', async(req, res) => {
	const { name, email, password, confirmpassword } = req.body
// Validation
	if(!name) {
		return res.status(422).json({ msg: 'auth/register: You need a name' })
	}
	if(!email) {
		return res.status(422).json({ msg: 'auth/register: You need a email' })
	}
	if(!password) {
		return res.status(422).json({ msg: 'auth/register: You need a password' })
	}
	if(password !== confirmpassword) {
		return res.status(422).json({ msg: 'auth/register: Confirme your password' })
	}

// Check if User exists
const userExists = await User.findOne({ email: email })

	if(userExists) {
		return res.status(422).json({ msg: 'uth/register: A new email, please'})
}
// Creat password
	const salt = await bcrypt.genSalt(12)
	const passwordHash = await bcrypt.hash(password, salt)

// Creat user
const user = new User ({
	name,
	email,
	password: passwordHash,
	})

try {

	await user.save()

	res.status(201).json({ msg: 'The user was successfully created'})

	} catch (err) {
		console.log(erro)

		res.status(500).json({ msg: 'Sorry, the developers took the server for a walk. Try again later.'})
	}
})

// Loguin User
app.post('/auth/loguin', async (req, res) => {
	const { email, password } = req.body

// Validations
if(!email) {
	return res.status(422).json({ msg: 'auth/loguin: You need a email' })
}
if(!password) {
	return res.status(422).json({ msg: 'auth/loguin: You need a password' })
}

// Check if User exists Loguin
const user = await User.findOne({ email: email })

	if(!user) {
		return res.status(404).json({ msg: 'uth/loguin: This user does not exist'})
}

// Check if Password match Loguin
const checkPassword = await bcrypt.compare(password, user.password)

	if(!checkPassword) {
		return res.status(404).json({ msg: 'uth/loguin: This password does not exist'})
}

try {
	const secret = process.env.SECRET
	const token = jwt.sign(
	{
		id: user._id,
	},
	secret,
	)

	res.status(200).json({ ms: 'OK', token})

} catch (err) {
	console.log(error)

	res.status(500).json({ msg: 'Sorry, the developers took the server for a walk. Try again ssslater.'})
}
})

// Credential
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

// MongoDB connect
mongoose
	.connect(`mongodb+srv://${dbUser}:${dbPassword}@node-server.a2yxcgt.mongodb.net/?retryWrites=true&w=majority`)
	.then(() => {
		app.listen(3000)
		console.log('MongoDB: You are connect')
	})
	.catch((err) => console.log(err))
