//.env
require('dotenv').config()

//imports
const express = require('express')
const morgan = require('morgan')
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


const PORT = process.env.PORT || 3001
const BASE_URL = `/api/persons`

let phonebook = []


Person.find({})
      .then(response => {
       
          phonebook = response
          console.log("response", response)
          console.log("phonebook", phonebook)
          console.log(Array.isArray(phonebook))
      }).catch((error)=> {
          console.log(error)
      })

app.get('/info', (req, res) => {
    res.send(`<div> Phonebook has info for ${phonebook.length} <div> <br> <div> ${new Date()} <div>`)
})

app.get(BASE_URL, (req, res) => {

    if (!phonebook.length)
        return res.status(204).json({
            error: `No content available to send`
        })

    res.json(phonebook)
})

app.get(`${BASE_URL}/:id`, (req, res) => {

    const resourceID = Number(req.params.id)
    const person = phonebook.find(({ id }) => id === resourceID)

    person ? res.json(person) : res.status(404).end()

})


app.delete(`${BASE_URL}/:id`, (req, res) => {

    const resourceID = Number(req.params.id)
    phonebook = phonebook.filter(({ id }) => id !== resourceID)

    res.status(204).end()
})


const error = (res, error) => {
    return res.status(400).json({ error })
}



app.post(`${BASE_URL}`, (req, res) => {
    const body = req.body

    switch(true){
        case !body : return error(res, 'content missing')
        case !body.name : return error(res, 'Name is missing from request')
        case !body.number : return error(res, 'Number is missing from request')
        case undefined !== phonebook.find(value => value.name === body.name) : return error(res, 'Names should be unique, there is already one such name')
    }

    phonebook.push(body)
    res.json(phonebook)

})


app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})