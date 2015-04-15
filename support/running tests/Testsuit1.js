//sample jasmine test
describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});

describe('Unit: MainController', function() {
  //var Person;
  //beforeEach(module('SupportModule'));
 
  it("should get the error for key word freeze", 
    function() {
    	var asdn = SupportModule.app.controller.shouldShowSuggestion();
    	//$scope.problem = 'freeze';
    	//var sorted = app.controller('freeze');
    	//var ine = $controller('TechnicalController', { $scope: $scope })
    	//expect(asdn).toEqual("Rebooting your device may help. To reboot it, turn it completely off and back on again.");
    	expect(asdn).toEqual('true');
  });
})