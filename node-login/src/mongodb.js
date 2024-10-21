const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost:27017/nodeLoguin')
.then(() => {
	console.log('mongodb connected')
})
.catch((e) => {
	console.log('mongodb fail')
})

const LogInSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	}, 
	password:{
		type: String,
		required: true
	}, 
})

const collection = new mongoose.model('Collection', LogInSchema)

module.exports = collection