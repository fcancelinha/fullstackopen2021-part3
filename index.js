
//.env
require('dotenv').config()
const PORT = process.env.PORT || 3001
const BASE_URL = `/api/persons`

//imports
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

morgan.token('content', (req) => {
    return Object.keys(req.body).length ? '| ' + JSON.stringify(req.body) : ""
})

app.use(
    express.json(), 
    express.static('build'),
    morgan(':method :url :status :res[content-length] - :response-time ms :content'),
    cors()
    )

app.get('/info', (req, res) => {

    Person.find({}).count().then(response => {
        res.send(`<div> Phonebook has info for ${response} contacts <div> <br> <div> ${new Date()} <div>`)
        mongoose.connection.close()
    })
    .catch((error) => {
        console.log(error)
    })
    
})

app.get(BASE_URL, (req, res) => {


    Person.find({})
    .then(response => {
        console.log(response)

        // if(!response.length)
        //     return res.status(204).json({ error: `No content available to send` })

        res.json(response)
        mongoose.connection.close()

    }).catch((error)=> {
        console.log(error)
    })
   
})

app.get(`${BASE_URL}/:id`, (req, res) => {

    const resourceID = Number(req.params.id)
    const person = phonebook.find(({ id }) => id === resourceID)

    person ? res.json(person) : res.status(404).end()

})


app.delete(`${BASE_URL}/:id`, (req, res) => {


    console.log("id to delete", req.params.id)

    Person
        .findByIdAndRemove(req.params.id)
        .then(response => {

            res.status(204).end()
            mongoose.connection.close()
        })
        .catch(error => {
            console.log(error)
        })

})


const error = (res, error, code) => {
    return res.status(code).json({ error })
}

app.post(`${BASE_URL}`, (req, res) => {
    const body = req.body

    switch(true){
        case !body : return error(res, 'content missing', 404)
        case !body.name : return error(res, 'Name is missing from request', 400)
        case !body.number : return error(res, 'Number is missing from request', 400)
        // case undefined !== phonebook.find(value => value.name === body.name) : return error(res, 'Names should be unique, there is already one such name')
    }

    const contact = new Person({ ...body })

    contact
        .save()
        .then(response => {
            res.json(response)
            mongoose.connection.close()
        })
        .catch((error) => {
            console.log(error)
        })
})


app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})