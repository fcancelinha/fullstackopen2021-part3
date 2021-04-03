
//.env
require('dotenv').config()
const PORT = process.env.PORT || 3001
const BASE_URL = `/api/persons`

//imports
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const Person = require('./models/person')


const errorHandler = (error, request, response, next) => {
    console.log(error.message)
   
    switch (error.message) {
        case 'CastError':
            return response.status(400).send({ error: 'invalid id, check format' })
        case 'ValidationError':
            return response.status(400).send({error: error.message})
        default:
            next(error)
    }
}


morgan.token('content', (req) => {
    return Object.keys(req.body).length ? '| ' + JSON.stringify(req.body) : ""
})

//middleware
app.use(
    express.static('build'),
    express.json(),
    morgan(':method :url :status :res[content-length] - :response-time ms :content'),
    cors(),
    errorHandler
)


app.get('/info', (req, res) => {

    Person.find({}).count().then(response => {
        res.send(`<div> Phonebook has info for ${response} contacts <div> <br> <div> ${new Date()} <div>`)
    })
        .catch((error) => {
            console.log(error)
            next(error)
        })


  
})


app.get(BASE_URL, (req, res) => {

    Person.find({})
        .then(response => {
            console.log(response)

            if (!response.length)
                return res.status(204).json({ error: `No content available to send` })

            res.json(response)

        }).catch((error) => {
            console.log(error)
        })

})


app.get(`${BASE_URL}/:id`, (req, res) => {

    Person
        .findOne({_id : req.params.id})
        .then(response => {
            if(response)
                res.json(response)
            else
                res.status(404).send()
        })
        .catch(error => next(error))

})


app.delete(`${BASE_URL}/:id`, (req, res, next) => {

    console.log("id to delete", req.params.id)
    console.log("id type", typeof req.params.id)

    Person
        .findByIdAndRemove(req.params.id)
        .then(response => {

            res.status(204).end()
        })
        .catch(error => next(error))

})


app.put(`${BASE_URL}/:id`, (req, res, next) => {

    Person
        .findByIdAndUpdate(req.params.id, req.params.body, {new: true, runValidators: true})
        .then(response => {
            console.log("put", response)

            if(response)
                res.json(response)
            else
                res.status(404).send({error: 'Could not find entry with the id provided'})
            
        })
        .catch(error => next(error))


})


app.post(`${BASE_URL}`, (req, res, next) => {
    const body = req.body

    // switch (true) {
    //     case !body: return error(res, 'content missing', 404)
    //     case !body.name: return error(res, 'Name is missing from request', 400)
    //     case !body.number: return error(res, 'Number is missing from request', 400)
    //     case undefined !== phonebook.find(value => value.name === body.name) : return error(res, 'Names should be unique, there is already one such name')
    // }

    const contact = new Person({ ...body })

    contact
        .save()
        .then(response => {
            res.json(response)
        })
        .catch(error => next(error))
})



app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})