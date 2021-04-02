const mongoose = require('mongoose')
const parNr = process.argv.length


if (parNr < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const url = `mongodb+srv://fullstack:${process.argv[2]}@part3.5ysao.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('People', personSchema)


if (parNr === 3) {
    Person
        .find({})
        .then(result => {
            console.log("\nphonebook:\n")
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })

} else if (parNr > 4) {

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    
    console.log("number",process.argv[4])
    console.log(person)

    person
        .save()
        .then(result => {
        console.log(`added ${result.name} number ${result.number} to the phonebook`)
        mongoose.connection.close()
    })
}
