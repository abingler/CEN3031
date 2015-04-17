describe('SuggestController', function() {
  var scope, $controller, $location
  beforeEach(module('SupportModule'));
  beforeEach(inject(function($rootScope, _$controller_, _$location_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    location = _$location_;
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

    it('checks the showEmail not filled', inject(function($controller) {
      var suggest = $controller('SuggestController', { $scope: $scope });

      expect(suggest.message).toBe("");
    }));

    it('checks the ---', inject(function($controller) {
      var suggest = $controller('SuggestController', { $scope: $scope });

      expect(suggest.game).toBe("");
    }));

    it('checks the ---', inject(function($controller) {
      var suggest = $controller('SuggestController', { $scope: $scope });

      expect(suggest.game).not.toBe("aurulux");
    }));

  });

  describe('TechnicalController', function() {

    it('sets the strength to "strong" if the password length is >8 chars', function() {
      var $scope = {};
      var suggest = $controller('TechnicalController', { $scope: $scope });
      expect(suggest).toBeDefined();
    });
  });
});

