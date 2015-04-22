describe('SuggestController', function() {
  var scope, $controller;
  beforeEach(module('SupportModule'));
  beforeEach(inject(function($rootScope, _$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $scope = $rootScope.$new();
  }));

  describe('SuggestControllerp1', function() {

    it('should be defined', inject(function($controller) {
      var suggest = $controller('SuggestController', { $scope: $scope });
      expect(suggest).toBeDefined();
    }));


    it('checks the showEmail', inject(function($controller) {
      var suggest = $controller('SuggestController', { $scope: $scope });

      expect(suggest.showEmail).toBe(true);
    }));


    it('checks the showEmail not false', inject(function($controller) {
      var suggest = $controller('SuggestController', { $scope: $scope });

      expect(suggest.showEmail).not.toBe(false);
    }));


    it('checks the message', inject(function($controller) {
      var suggest = $controller('SuggestController', { $scope: $scope });

      expect(suggest.message).not.toBe("Hi");
    }));

    it('checks the message is default', inject(function($controller) {
      var suggest = $controller('SuggestController', { $scope: $scope });

      expect(suggest.message).toBe("");
    }));

    it('checks the game default', inject(function($controller) {
      var suggest = $controller('SuggestController', { $scope: $scope });

      expect(suggest.game).toBe("");
    }));

    it('checks what isnt the game', inject(function($controller) {
      var suggest = $controller('SuggestController', { $scope: $scope });

      expect(suggest.game).not.toBe("aurulux");
    }));

    it('checks the email contnet', inject(function($controller) {
      var suggest = $controller('SuggestController', { $scope: $scope });

      expect(suggest.email).not.toBe("Hi there. Its not working");
    }));

    it('checks the email default', inject(function($controller) {
      var suggest = $controller('SuggestController', { $scope: $scope });

      expect(suggest.email).toBe("");
    }));

    it('test function shouldShowSendEmail', inject(function($controller) {
        var suggest = $controller('SuggestController', { $scope: $scope });
        var suggests = suggest.shouldShowSendEmail();
        expect(suggests).toBe(suggest.showEmail);
    }));

    it('test function shouldShowSendEmail', inject(function($controller) {
        var suggest = $controller('SuggestController', { $scope: $scope });
        suggest.sendEmail();
        expect(suggest.showEmail).toBe(false);
    }));

  });

  describe('TechnicalController', function() {

    it('checks for the TechnicalController', function() {
      var $scope = {};
      var tech = $controller('TechnicalController', { $scope: $scope });
      expect(tech).toBeDefined();
    });

    it('checks for problem', function() {
          var $scope = {};
          var tech = $controller('TechnicalController', { $scope: $scope });
          expect(tech.problem).toBe("");
        });

    it('checks for prooblem default', function() {
          var $scope = {};
          var tech = $controller('TechnicalController', { $scope: $scope });
          expect(tech.problem).not.toBe("LOLZ");
        });

    it('checks for error', function() {
          var $scope = {};
          var tech = $controller('TechnicalController', { $scope: $scope });
          expect(tech.error).toBe("");
        });

    it('checks for error default', function() {
          var $scope = {};
          var tech = $controller('TechnicalController', { $scope: $scope });
          expect(tech.error).not.toBe("Broke as hell");
        });

    it('checks suggestion', function() {
          var $scope = {};
          var tech = $controller('TechnicalController', { $scope: $scope });
          expect(tech.suggestions).not.toBe(null);
        });
    it('checks suggestion2', function() {
          var $scope = {};
          var tech = $controller('TechnicalController', { $scope: $scope });
          expect(tech.suggestions).toBeDefined();
        });

    it('checks pendingsuggestion', function() {
          var $scope = {};
          var tech = $controller('TechnicalController', { $scope: $scope });
          expect(tech.pendingSuggestions).not.toBe(null);
        });
    it('checks pendingsuggestion2', function() {
          var $scope = {};
          var tech = $controller('TechnicalController', { $scope: $scope });
          expect(tech.pendingSuggestions).toBeDefined();
        });

    it('checks showsuggestion', function() {
          var $scope = {};
          var tech = $controller('TechnicalController', { $scope: $scope });
          expect(tech.showSuggestion).toBe(false);
        });
    it('checks showsuggestion2', function() {
          var $scope = {};
          var tech = $controller('TechnicalController', { $scope: $scope });
          expect(tech.showSuggestion).not.toBe(true);
        });

    it('checks showsendemail', function() {
          var $scope = {};
          var tech = $controller('TechnicalController', { $scope: $scope });
          expect(tech.showSendEmail).toBe(false);
        });
    it('checks showsendemail2', function() {
          var $scope = {};
          var tech = $controller('TechnicalController', { $scope: $scope });
          expect(tech.showSendEmail).not.toBe(true);
        });

    it('checks showerror', function() {
          var $scope = {};
          var tech = $controller('TechnicalController', { $scope: $scope });
          expect(tech.showError).toBe(false);
        });
    it('checks showerror2', function() {
          var $scope = {};
          var tech = $controller('TechnicalController', { $scope: $scope });
          expect(tech.showError).not.toBe(true);
        });

    it('checks showcongrats', function() {
          var $scope = {};
          var tech = $controller('TechnicalController', { $scope: $scope });
          expect(tech.showCongrats).toBe(false);
        });
    it('checks showcongrats2', function() {
          var $scope = {};
          var tech = $controller('TechnicalController', { $scope: $scope });
          expect(tech.showCongrats).not.toBe(true);
        });

    it('checks showwillrespond', function() {
          var $scope = {};
          var tech = $controller('TechnicalController', { $scope: $scope });
          expect(tech.showWillRespond).toBe(false);
        });
    it('checks showwillrespond2', function() {
          var $scope = {};
          var tech = $controller('TechnicalController', { $scope: $scope });
          expect(tech.showWillRespond).not.toBe(true);
        });

    it('checks game', function() {
          var $scope = {};
          var tech = $controller('TechnicalController', { $scope: $scope });
          expect(tech.game).toBe("default");
        });
    it('checks game2', function() {
          var $scope = {};
          var tech = $controller('TechnicalController', { $scope: $scope });
          expect(tech.game).not.toBe("jdklansdnaksjndgn");
        });

    it('checks count', function() {
          var $scope = {};
          var tech = $controller('TechnicalController', { $scope: $scope });
          expect(tech.count).toBe(0);
        });
    it('checks count', function() {
          var $scope = {};
          var tech = $controller('TechnicalController', { $scope: $scope });
          expect(tech.count).not.toBe(23);
        });
    it('test function shouldShowSendEmail', inject(function($controller) {
          var tech = $controller('TechnicalController',{$scope:$scope});
          var result = tech.shouldShowSendEmail();
          expect(result).toBe(tech.showSendEmail);
    }));
    it('test function shouldShowCongrats', inject(function($controller) {
          var tech = $controller('TechnicalController',{$scope:$scope});
          var result = tech.shouldShowCongrats();
          expect(result).toBe(tech.showCongrats);
    }));
    it('test function shouldShowWillRespond', inject(function($controller) {
          var tech = $controller('TechnicalController',{$scope:$scope});
          var result = tech.shouldShowWillRespond();
          expect(result).toBe(tech.showWillRespond);
    }));
    it('test function shouldShowSendEmail', inject(function($controller) {
          var tech = $controller('TechnicalController',{$scope:$scope});
          var result = tech.shouldShowSuggestion();
          expect(result).toBe(tech.showSuggestion);
    }));

    
  });


});

