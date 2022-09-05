require("dotenv/config");
const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI
mongoose.connect(mongoURI)
	.then(db => console.log(`connected to database`))
	.catch(err => console.log(err))

const Celebrity = require("./models/celebrity")

// Create an array of 3 objects, each with name, occupation and catchPhrase
const celebrities = [
    {
        name: 'Tom Cruise',
        occupation: 'actor',
        catchPhrase: 'I feel the need, the need for speed.'
    },
    {
        name: 'Beyonce',
        occupation: 'singer',
        catchPhrase: "Don't try to lessen yourself for the world; let the world catch up to you."
    },
    {
        name: 'Daffy Duck',
        occupation: 'comedian',
        catchPhrase: "Youuu're dethpicable!"
    }
]

// Call the Celebrity model's insertMany method with the array as argument.
Celebrity.insertMany(celebrities)
    .then(celebrities => {
    console.log(`Success - added ${celebrities.length} books to the db`)
    mongoose.connection.close()
})
    .catch(err => console.log(err))