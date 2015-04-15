
Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};



(function() {
    var app = angular.module('AdminModule', ['ui.bootstrap']);

    app.controller('MainController', ['$log', '$location', '$scope', '$http', '$timeout', function($log, $location, $scope, $http, $timeout) {
        this.selected = 0;
        
        // LOAD DATABASE HERE
        this.suggestionDB = suggestionDB;
        this.editing = -1;
        
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
        
        //Will Remove Suggestions  
        $http.get('/removeSuggestions/');

        $log.log(this.suggestionDB);

        /*This will add updated Suggestions with http post*/
            for(suggest in this.suggestionDB){
                $log.log(suggest);
                $log.log(this.suggestionDB[suggest]);
                $http.post('/push', {keywords: this.suggestionDB[suggest].keywords, suggestion: this.suggestionDB[suggest].suggestion, 
                    instructionLink: this.suggestionDB[suggest].instructionLink, platform: this.suggestionDB[suggest].platform, 
                    game: this.suggestionDB[suggest].game, views: this.suggestionDB[suggest].views, 
                    solved: this.suggestionDB[suggest]. solved}); //Could probably just pass the object, but it works so nah
            }

        } 


        //Database Functions

        this.callDatabase = function(){
            console.log("Calling Database");
            var view = this;
           $http.get('/getSuggestions/').then(function(data) {
                view.suggestionDB = data.data;
                $log.log(this.suggestionDB);
            });

        } 


    }]);
    
     var suggestionDB = [];

})();

