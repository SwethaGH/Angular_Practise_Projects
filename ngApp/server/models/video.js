const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction

const Schema = mongoose.Schema; // Reference to Mongoose Schema class

const videoSchema = new Schema({ // Define schema for video documents
    title: String, // Title field as String
    url: String, // URL field as String
    description: String // Description field as String
});

module.exports = mongoose.model('video', videoSchema, 'videos'); // Export video model for videos collection