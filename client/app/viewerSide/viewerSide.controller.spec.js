'use strict';

describe('Controller: ViewersideCtrl', function () {

  // load the controller's module
  beforeEach(module('twebProject1App'));

  var ViewersideCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewersideCtrl = $controller('ViewersideCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
