//sample jasmine test

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});

describe('check Title', function() {
  it('should have a title', function() {
    browser.get('http://localhost:3000/');
    expect(browser.getTitle()).toEqual('Auralux Support and Feedback');
  });
});


