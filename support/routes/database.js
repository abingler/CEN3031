var suggestionsSchema = require('../schemas/suggestions'); //Adding suggestions schema for mongoose
var mandrill = require('mandrill-api/mandrill');

/*Contains GET and PUT requests for database */

//Added by Andrew
exports.addSuggestions = function(req, res){
    
    for(suggest in suggestionDB){
        
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
}

//Remove Documents
exports.removeSuggestions = function(req, res){
    suggestionsSchema.remove()
    .exec(function(err, suggestion){
        if(err){
            console.log(err);
            res.status(500).json({status: 'failure'});
        } else{
            console.log(suggestion);
            res.json({status: 'success'}, suggestion);
        }
    });
    console.log("Suggestions Removed");
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
        } else {
            console.log(suggestion);
            res.json({status: 'success'}, suggestion);
        }
    });  
    //console.log(suggestionsSchema.find());
    console.log("working");
};

exports.push = function(req, res){
    var platform = req.body.platform;
    var keywords = req.body.keywords;
    var suggestion = req.body.suggestion;
    var instructionLink = req.body.instructionLink;
    var game = req.body.game;
    var empty = false;
    //var del = keywords.split(",");

    console.log(typeof platform);

    if((typeof platform === "undefined") && (typeof suggestion === "undefined" )
        && (typeof instructionLink === "undefined") && (typeof game === "undefined")){
        empty = true;
    } //Handle weird edge case

    var suggestiontemp = { 
        keywords: keywords,
        platform: platform,
        suggestion: suggestion,
        instructionLink: instructionLink,
        game: game

    };
    if(empty == false){
        var record = new suggestionsSchema(suggestiontemp);
        record.save(function(err){
            if(err){
                res.status(500).json({status: 'failure'});
            }else{
                res.json({status: 'success'});
            }
        });
    }

}


var sendEmail = function(subject, text) {
    var mandrill_client = new mandrill.Mandrill('GTbOxjh7BPuJpiDjFQryFQ');
    
    var message = {
        "html": "",
        "text": text,
        "subject": subject,
        "from_email": "support@wardrumstudios.com",
        "from_name": "War Drum Support Page",
        "to": [{
                "email": "mtmole@ufl.edu",
                "name": "Thomas Williamson",
                "type": "to"
            }],
        "headers": {
            "Reply-To": "no-reply@wardrumstudios.com"
        },
        "important": false,
        "track_opens": null,
        "track_clicks": null,
        "auto_text": null,
        "auto_html": null,
        "inline_css": null,
        "url_strip_qs": null,
        "preserve_recipients": null,
        "view_content_link": null,
        "tracking_domain": null,
        "signing_domain": null,
        "return_path_domain": null,
        "merge": true,
        "merge_language": "mailchimp",
        "global_merge_vars": [{
                "name": "merge1",
                "content": "merge1 content"
            }],
        "merge_vars": [{
                "rcpt": "mtmole@ufl.edu",
                "vars": [{
                        "name": "merge2",
                        "content": "merge2 content"
                    }]
            }],
        "tags": [
            "password-resets"
        ],
        "recipient_metadata": [{
                "rcpt": "mtmole@ufl.edu",
                "values": {}
            }],
        "attachments": [],
        "images": []
        };
        var async = false;
        var ip_pool = "Main Pool";
        mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
        console.log(result);
        /*
        [{
                "email": "recipient.email@example.com",
                "status": "sent",
                "reject_reason": "hard-bounce",
                "_id": "abc123abc123abc123abc123abc123"
            }]
        */
        }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
        });
}

exports.searchSuggestions = function(req, res) {
     // we need to create a custom $where function using our query since we
     // do a specialized string search based on an array of possible keywords per entry
     var replacequote = req.body.problem.toLowerCase().replace("\'", "\\\'");
     console.log("This is the game " + req.body.game);
     var func = new Function("return function(){ " +
                "var query = '" + replacequote + "';" +
                "for (keyword in this.keywords) {" +
                "    var curWord = this.keywords[keyword];" +
                "    if (query.indexOf(curWord) > -1) {" +
                         "if (this.hasOwnProperty('game') && this.game !== \'" + req.params.game + "\') continue;" + 
                "        return true;" +
                "    }" +
                "}" +
        "return false;" +
         "};")();
    
     suggestionsSchema.find({$where: func})
    .exec(function(err, suggestion) {
        if(err){
            console.log(err);
            res.status(500).json({status: 'failure'});
        }else{
            console.log(suggestion);
            res.json({status: 'success'}, suggestion);
        }
    });  
    
    console.log("working");
};

exports.emailProblem = function(req, res) {
    console.log("Sending email");
    
    var problemBody = "Automated support email\n\nEmail: " + req.body.email + "\nGame: " + req.body.game + "\nProblem: " + req.body.problem + "\n\n";
    sendEmail("Support for " + req.body.game, problemBody);
    
    console.log("Done.");
};


     var suggestionDB = [
        {
            keywords: ["freeze", "black", "not respond"],
            suggestion: "Rebooting your device may help. To reboot it, turn it completely off and back on again."
        },
        {
            keywords: ["which game", "what game"],
            suggestion: "You are playing Auralux",
            game: "Auralux"
        },
        {
            keywords: ["which game", "what game"],
            suggestion: "You are playing turtle tumble",
            game: "turtle tumble"
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