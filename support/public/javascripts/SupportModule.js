(function() {
    var app = angular.module('SupportModule', ['ui.bootstrap']);

    app.controller('MainController', function(){
        this.selected = 0;
        
        this.select = function(withSelect) {
            this.selected = withSelect;
        }
        
        this.isSelected = function(withSelect) {
            return this.selected === withSelect;
        }
    });
    
    app.controller('TechnicalController', ['$log', function($log) {
        this.problem = "";
        this.error = "";
        this.suggestions = [];
        this.pendingSuggestions = [];
        this.showSuggestion = false;
        this.showSendEmail = false;
        this.showError = false;
        this.showCongrats = false;
        
        this.shouldShowSuggestion = function() {
            return this.showSuggestion;
        }
        
        this.shouldShowSendEmail = function() {
            return this.showSendEmail;
        }
        
        this.shouldShowCongrats = function() {
            return this.showCongrats;
        }
        
        this.shouldShowSubmit = function() {
            return !this.showSuggestion && !this.showSendEmail && !this.showCongrats;
        }
        
        this.findSuggestions = function() {
            if (this.problem.length == 0) {
                this.error = "Please type in your problem so we can help you!";
                this.showError = true;
            }
            
            $log.log("Looking for suggestions...");
            
            this.showError = false;
            this.pendingSuggestions = [];
            for (suggest in suggestionDB) {
                for (keyword in suggestionDB[suggest].keywords) {
                    var curWord = suggestionDB[suggest].keywords[keyword];
                    if (this.problem.toLowerCase().indexOf(curWord) > -1) {
                        // the problem contains this keyword!
                        this.pendingSuggestions.push(suggestionDB[suggest]);
                        break; // no dups
                    }
                }
            }
            
            $log.log("Found " + this.suggestions.length + " suggestions");
            
            this.nextSuggestion();
        }
        
        this.nextSuggestion = function() {
            if (this.pendingSuggestions.length) {
                this.suggestions.push(this.pendingSuggestions[0]);
                this.pendingSuggestions.shift();
                this.showSuggestion = true;
                this.showSendEmail = false;
            } else {
                this.suggestions = [];
                this.showSendEmail = true;
                this.showSuggestion = false;
            }
        }
        
        this.foundSolution = function() {
            this.showCongrats = true;
            this.showSuggestion = false;
        }
        
        this.sendEmail = function() {
            
        }
    }]);
    
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
})();