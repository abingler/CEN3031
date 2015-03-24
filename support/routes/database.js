var suggestionsSchema = require('../schemas/suggestions'); //Adding suggestions schema for mongoose

/*Contains GET and PUT requests for database */

//Added by Andrew
exports.addSuggestions = function(req, res){
    
//suggestionDB.forEach(
    for(suggest in suggestionDB){
    //function(suggestion){
       /* var store = {
            suggestionGroup: suggestion

        }; */
        
        var record = new suggestionsSchema(suggestionDB[suggest]);
        console.log(record);
        record.save(function(err) {
            if(err){
                console.log(err);
                console.log("failure");
                res.status(500).json({status: 'failure'});
            } else {
                res.json({status: 'success'});
                console.log("success");
            }
        });
        
        //db.suggestionCollection.insert(store);
        console.log("worked");
    }
    
   /* var record = new suggestionsSchema(//PUll in info from each);
        record.save(function(err) {
            if(err){
                console.log(err);
                res.status(500).json({status: 'failure'});
            } else {
                res.json({status: 'success'});
            }
        }); */
}

exports.getSuggestions = function(req, res){
   /* suggestionsSchema.findOne({platform: "iOS" }, function(err, docs){
        console.log(err);
        console.log(docs);
    }); */
     suggestionsSchema.find()
    .setOptions({sort: 'suggestionGroup'})
    .exec(function(err, suggestion) {
        if(err){
            console.log(err);
            res.status(500).json({status: 'failure'});
        }else{
            console.log(suggestion);
        }
    });  
    //console.log(suggestionsSchema.find());
    console.log("working");
};


exports.searchSuggestions = function(req, res){
   /* suggestionsSchema.findOne({platform: "iOS" }, function(err, docs){
        console.log(err);
        console.log(docs);
    }); */
     suggestionsSchema.find({keywords: req.params.keywords})
    .exec(function(err, suggestion) {
        if(err){
            console.log(err);
            res.status(500).json({status: 'failure'});
        }else{
            console.log(suggestion);
            res.json(suggestion);

        }
    });  
    //console.log(suggestionsSchema.find());
    console.log("working");
};



     var suggestionDB = [
        {
            keywords: ["freeze", "black", "not respond"],
            suggestion: "Rebooting your device may help. To reboot it, turn it completely off and back on again."
        },
        {
            keywords: ["freeze", "black", "not respond"],
            suggestion: "Make sure your operating system is completely up to date. Check for updates under Settings, then System Information."
        },
        {
            keywords: ["lost level", "lost purchase", "no level"],
            platform: "Android",
            suggestion: "Sometimes clearing your Google Play cache can help with that, particularly on devices with multiple user accounts. Click the link below for instructions on how to do that.",
            instructionLink: "https://support.google.com/googleplay/troubleshooter/4592924?hl=en#ts=4592730"
        },
        {
            keywords: ["lost level", "lost purchase", "no level"],
            platform: "iOS",
            suggestion: "Make sure you are currently signed in to your Apple ID on your device. Check other apps where you have made purchases or go into the App Store on your device and make see if you are prompted to log in."
        },
        {
            keywords: ["too slow", "speed"],
            suggestion: "This game has great music and pacing for a slow, ethereal experience. If you want something more intense, purchase speed mode! Sound good?",
        },
        { 
            keywords: ["no sound", "no music", "can't hear"],
            suggestion: "Try checking the settings dialog from the main menu (select 'Settings' in the lower right corner) for muted volume levels. You can toggle the music and sound levels there."
        },
        {
            keywords: ["no sound", "no music", "can't hear"],
            suggestion: "To make sure it's a problem with the game, check to make sure other apps and games make sounds with no problem. If they don't, please check for systemic problems such as having your phone on silent, or unwanted headphones in your headphone jack."
        }
    ];