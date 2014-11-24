'use strict';

describe('Controller: PresentersideCtrl', function () {

  // load the controller's module
  beforeEach(module('twebProject1App'));

  var PresentersideCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PresentersideCtrl = $controller('PresentersideCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
