const { Schema, model } = require('mongoose');

// Create the Celebrity model with the schema.
const celebritySchema = new Schema(
    {
        name: {
            type: String
        },
        occupation: {
            type: String,
            enum: [ 'actor', 'singer', 'comedian', 'unknown' ]
        },
        catchPhrase: {
            type: String,
            required: true
        }
    }
)

// export the celebrity model
module.exports = model('Celebrity', celebritySchema);