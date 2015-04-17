describe("controller tests", function() {
	var $controller, scope, $location;
	beforeEach(module('SupportModule'));
	beforeEach(inject(function($rootScope, _$controller_,  _$location_) {
		$controller =_$controller_;
		location = _$location_;
    	$scope = $rootScope.$new();        
	}));

	describe("MainController tests", function() {

		it('should be defined', inject(function($controller) {
		      var MainController = $controller('MainController');
		      expect(MainController).toBeDefined();
		}));

		it('should define selected = 0', inject(function($controller) {
		      var MainController = $controller('MainController');
		      expect(MainController.selected).toBe(0);
		}));

		it('tests select function', inject(function($controller) {
		      var MainController = $controller('MainController');
		      MainController.select();
		      expect(MainController.selected).toBe(MainController.withSelect);
		}));

		it('tests isSelected function', inject(function($controller) {
		      var MainController = $controller('MainController');
		      var result = MainController.isSelected();
		      expect(result).toBe(false);
		      MainController.select();
		      result = MainController.isSelected();
		      expect(result).toBe(true);
		}));

	});

	describe("RefundController tests", function() {

		it('should be defined', inject(function($controller) {
		      var RefundController = $controller('RefundController',{$scope:$scope});
		      expect(RefundController).toBeDefined();
		}));

		it('should define this.message to be "" ', inject(function($controller) {
		      var RefundController = $controller('RefundController',{$scope:$scope});
		      expect(RefundController.message).toBe("");
		}));

		it('should define this.email to be "" ', inject(function($controller) {
		      var RefundController = $controller('RefundController',{$scope:$scope});
		      expect(RefundController.email).toBe("");
		}));

		it('should define this.showEmail to be true ', inject(function($controller) {
		      var RefundController = $controller('RefundController',{$scope:$scope});
		      expect(RefundController.showEmail).toBe(true);
		}));

		it('should define this.game to be "" ', inject(function($controller) {
		      var RefundController = $controller('RefundController',{$scope:$scope});
		      expect(RefundController.game).toBe("");
		}));

		it('test function shouldShowSendEmail', inject(function($controller) {
		      var RefundController = $controller('RefundController',{$scope:$scope});
		      var result = RefundController.shouldShowSendEmail();
		      expect(result).toBe(RefundController.showEmail);
		}));
		it('test function shouldShowSendEmail', inject(function($controller) {
		      var RefundController = $controller('RefundController',{$scope:$scope});
		      RefundController.sendEmail();
		      expect(RefundController.showEmail).toBe(false);
		}));
		
	});
});
