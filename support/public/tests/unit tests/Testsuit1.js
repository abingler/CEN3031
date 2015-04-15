describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});

describe("controller tests", function() {
	var controller, scope;
	beforeEach(module('SupportModule'));
	describe("MainController tests", function() {
		it('should be defined', inject(function($controller) {
		      //spec body
		      var MainController = $controller('MainController');
		      expect(MainController).toBeDefined();
		}));
	});
	/*
	describe("TechnicalController tests", function() {
		it('should be defined', inject(function($controller) {
		      //spec body
		      var TechnicalController = $controller('TechnicalController');
		      expect(TechnicalController).toBeDefined();
		}));
	});
	*/
});
