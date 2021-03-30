const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()


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


let persons = [
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "name": "Hyunjin Lee",
        "number": "99-878-123",
        "id": 6
    }
]


app.get('/info', (req, res) => {
    res.send(`<div> Phonebook has info for ${persons.length} <div> <br> <div> ${new Date()} <div>`)
})

app.get(BASE_URL, (req, res) => {

    if (!persons)
        return res.status(204).json({
            error: `No content available to send`
        })

    res.send(persons)
})

app.get(`${BASE_URL}/:id`, (req, res) => {

    const resourceID = Number(req.params.id)
    const person = persons.find(({ id }) => id === resourceID)

    person ? res.json(person) : res.status(404).end()

})


app.delete(`${BASE_URL}/:id`, (req, res) => {

    const resourceID = Number(req.params.id)
    persons = persons.filter(({ id }) => id !== resourceID)

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
        case undefined !== persons.find(value => value.name === body.name) : return error(res, 'Names should be unique, there is already one such name')
    }

    const person = {
        ...body,
        id: Math.floor((Math.random() * (10000 - 1))),
    }

    persons.push(person)
    res.json(person)

})


app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})