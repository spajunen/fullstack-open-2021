/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
`mongodb+srv://fullstack:${password}@cluster0.7uonz.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number
})

if (process.argv.length === 3) {
  Person
    .find({})
    .then(result => {
      console.log('phonebook:')
      result.forEach(person => {
        console.log(person.name, ' ', person.number)
      })
      mongoose.connection.close()
    })
}

if (process.argv.length > 3) {
  person
    .save()
    // eslint-disable-next-line no-unused-vars
    .then(result => {
      console.log('Added ',{ name },' number ',{ number },' to phonebook')
      mongoose.connection.close()
    })
}
