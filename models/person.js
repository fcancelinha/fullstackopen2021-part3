require('dotenv').config({path:'../.env'})
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

console.log(`connecting to mongodb using address ${url}`)

mongoose
    .connect(url,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(response => {
        console.log('connected to mongo successfully...')
    }).catch((error) => {
        console.log(error)
    })

const peopleSchema = new mongoose.Schema({
    id: String,
    name: String,
    number: String
})

peopleSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id 
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('people', peopleSchema)