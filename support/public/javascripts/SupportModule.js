(function() {
    var app = angular.module('SupportModule', ['ui.bootstrap']);
    //var mongoose = require('mongoose');
    //var schema = mongoose.model('TodoSchema');

    app.controller('MainController', function(){
        this.selected = 0;
        
        this.select = function(withSelect) {
            this.selected = withSelect;
        }
        
        this.isSelected = function(withSelect) {
            return this.selected === withSelect;
        }
    });
    
    app.controller('RefundController', ['$log', '$location', '$scope', '$http', '$timeout', function($log, $location, $scope, $http, $timeout) {
        this.message = "";
        this.email = "";
        this.showEmail = true;
        this.game = "";
        
        this.shouldShowSendEmail = function() {
            return this.showEmail;
        }
        
        this.sendEmail = function() {
           $http.post('/refundemail', {message: this.message, game: this.game, email: this.email}).then(function(data) {
           });
            
           this.showEmail = false;
        }
    }]);
    
    app.controller('SuggestController', ['$log', '$location', '$scope', '$http', '$timeout', function($log, $location, $scope, $http, $timeout) {
        this.message = "";
        this.email = "";
        this.showEmail = true;
        this.game = "";
        
        this.shouldShowSendEmail = function() {
            return this.showEmail;
        }
        
        this.sendEmail = function() {
           $http.post('/suggestemail', {message: this.message, game: this.game, email: this.email}).then(function(data) {
           });
            
           this.showEmail = false;
        }
    }]);
    
    app.controller('TechnicalController', ['$log', '$location', '$scope', '$http', '$timeout', function($log, $location, $scope, $http, $timeout) {
        this.problem = "";
        this.error = "";
        this.suggestions = [];
        this.pendingSuggestions = [];
        this.showSuggestion = false;
        this.showSendEmail = false;
        this.showError = false;
        this.showCongrats = false;
        this.showWillRespond = false;
        this.game = "default";
        this.count = 0;
        
//        this.uploadToMongolab = function(req, res) {
//            res.jsonp(new schema(req.body));
//        }
        
        this.shouldShowSuggestion = function() {
            return this.showSuggestion;
        }
        
        this.shouldShowSendEmail = function() {
            return this.showSendEmail;
        }
        
        this.shouldShowCongrats = function() {
            return this.showCongrats;
        }
        
        this.shouldShowWillRespond = function() {
            return this.showWillRespond;
        }
        
        this.shouldShowSubmit = function() {
            return !this.showSuggestion && !this.showSendEmail && !this.showCongrats && !this.showWillRespond;
        }
        
        this.findSuggestions = function() {
            $log.log(this.game);
            
            if (this.problem.length == 0) {
                this.error = "Please type in your problem so we can help you!";
                this.showError = true;
            }
            
            $log.log("Looking for suggestions...");
            $log.log(this);

            $log.log("Found this");
            this.showError = false;

           this.pendingSuggestions = [];
           var view = this;
           $http.post('/search', {problem: this.problem, game: this.game}).then(function(data) {
//           $http.get('/search/' + this.problem.toLowerCase() + '/' + this.game).then(function(data) {
             $log.log(data.data);
             view.pendingSuggestions = data.data;
             view.nextSuggestion(); //Calls nextSuggestion right away
          
           });

            $log.log(this.pendingSuggestions);
            //old code that connected to array at the bottom
            //$location.path('/search/' + this.problem);
            //var suggestionDB2 = this.suggestion; //THIS IS THE LINE TO FIX
/*            for (suggest in suggestionDB2) {
                console.log(suggestionDB2);
                console.log(suggest);
                for (keyword in suggestionDB2[suggest].keywords) {
                    var curWord = suggestionDB2[suggest].keywords[keyword];
                    if (this.problem.toLowerCase().indexOf(curWord) > -1) {
                        // the problem contains this keyword!
                        this.pendingSuggestions.push(suggestionDB2[suggest]);
                        break; // no dups
                    }
                }
            }*/
            
        }


        
        this.nextSuggestion = function() {
             $log.log("Made it to nextsuggestion");
            if (this.pendingSuggestions.length) { //If we have any more suggestions
                this.suggestions.push(this.pendingSuggestions[0]); //Push 1st pending suggestion onto this.suggestions
                //HERE Search for this.suggestions and update views
                $log.log("suggestions: ");
                $log.log(this.suggestions);
                this.updateViews();
                this.count++;
                this.pendingSuggestions.shift();
                this.showSuggestion = true;
                this.showSendEmail = false;
            } else {
                this.suggestions = [];
                this.showSendEmail = true;
                this.showSuggestion = false;
                this.count = 0;
            }
        }

        this.updateViews = function(){
                $http.post('/views', this.suggestions[this.count]); 
        }

        this.updateSolved = function(){
            $http.post('/solved', this.suggestions[this.count-1]);
        }
        
        this.foundSolution = function() {
            this.updateSolved();
            this.showCongrats = true;
            this.showSuggestion = false;
        }
        
        this.sendEmail = function() {
           $http.post('/techemail', {problem: this.problem, game: this.game, email: this.email}).then(function(data) {
           });
            
           this.showWillRespond = true;
           this.showSendEmail = false;
        }
    }]);
    
/*     var suggestionDB = [
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
    ];*/
})();