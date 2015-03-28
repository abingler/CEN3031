Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

(function() {
    var app = angular.module('AdminModule', ['ui.bootstrap']);

    app.controller('MainController', ['$log', '$location', '$scope', '$http', '$timeout', function($log, $location, $scope, $http, $timeout) {
        this.selected = 0;
        
        // LOAD DATABASE HERE
        this.suggestionDB = suggestionDB;
        this.editing = 2;
        
        this.select = function(withSelect) {
            this.selected = withSelect;
        }
        
        this.isSelected = function(withSelect) {
            return this.selected === withSelect;
        }
        
        this.isEditing = function(withEditing) {
            return this.editing === withEditing;
        }
        
        this.deleteKeyword = function(withIndex) {
            this.suggestionDB[this.editing].keywords.splice(withIndex,1);
        }
        
        this.addKeyword = function() {
            this.suggestionDB[this.editing].keywords.push("");
        }
        
        this.apply = function() {
            this.editing = -1;
        }
        
        this.edit = function(withIndex) {
            this.editing = withIndex;
        }
        
        this.delete = function(withIndex) {
            this.suggestionDB.splice(withIndex,1);
        }
        
        this.moveUp = function(withIndex) {
            this.suggestionDB.move(withIndex, withIndex-1);
        }
        
        this.moveDown = function(withIndex) {
            this.suggestionDB.move(withIndex, withIndex+1);
        }
        
        this.addNew = function() {
            this.suggestionDB.push(
                {
                    keywords: ["first keyword"],
                    suggestion: "New suggestion"
                });
            this.editing = this.suggestionDB.length - 1;
        }
        
        this.saveChanges = function() {
            // SAVE DATABASE HERE
            $log.log("TODO : save to MongoDB");
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
            keywords: ["what game", "which game"],
            suggestion: "This is Auralux.",
            game: "Auralux"
        },
        {
            keywords: ["what game", "which game"],
            suggestion: "This is Turtle Tumble.",
            game: "turtle tumble"
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