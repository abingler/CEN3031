var mongoose = require('mongoose'); //Using model method of mongoose

module.exports = mongoose.model('suggestionCollection2', {
    //suggestionGroup: {
        keywords: [],
        platform: String,
        suggestion: String,
        instructionLink: String 
    //} 
});
    