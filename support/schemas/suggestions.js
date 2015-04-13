var mongoose = require('mongoose'); //Using model method of mongoose


module.exports = mongoose.model('suggestionCollection2', {
    //suggestionGroup: {
        keywords: [],
        platform: String,
        game: String,
        suggestion: String,
        instructionLink: String,
        views: Number,
        worked: Number
    //} 
});
    