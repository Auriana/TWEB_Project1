'use strict';

describe('Controller: TestsocketioCtrl', function () {

  // load the controller's module
  beforeEach(module('twebProject1App'));

  var TestsockerioCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestsockerioCtrl = $controller('TestsocketioCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
