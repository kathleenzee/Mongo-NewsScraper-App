// Require mongoose (dependencies)
var mongoose = require('mongoose');
// Create a schema class
var Schema = mongoose.Schema;

// Create the Note schema
var NoteSchema = new Schema({
    _article: {
        type: String,
        ref: 'Article'
    },
    text: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Remember, Mongoose will automatically save the ObjectIds of the notes
// These ids are referred to in the Article model

// // Create the Note model with the NoteSchema
var Note = mongoose.model("Note", NoteSchema);

// // Export the Note model
module.exports = Note;