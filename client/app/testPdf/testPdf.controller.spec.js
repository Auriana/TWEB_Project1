'use strict';

describe('Controller: TestpdfCtrl', function () {

  // load the controller's module
  beforeEach(module('twebProject1App'));

  var TestpdfCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestpdfCtrl = $controller('TestpdfCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
