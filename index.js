const express = require('express')
const app = express()

const BASE_URL = `/api/persons`

const persons = [
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

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get(BASE_URL, (req, res) => {
    res.send(persons)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})