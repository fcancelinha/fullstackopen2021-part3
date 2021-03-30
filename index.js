const express = require('express')
const app = express()
app.use(express.json())


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


app.post(`/api/persons`, (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const person = {
        ...body,
        id: Math.floor((Math.random() * (10000 - 1))),
    }

    persons.push(person)
    res.json(person)

})


const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})