'use strict';

angular.module('twebProject1App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('testSocketIO', {
        url: '/testSocketIO',
        templateUrl: 'app/testSocketIO/testSocketIO.html',
        controller: 'TestsocketioCtrl'
      });
  });