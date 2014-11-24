'use strict';

angular.module('twebProject1App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('viewerSide', {
        url: '/viewerSide',
        templateUrl: 'app/viewerSide/viewerSide.html',
        controller: 'ViewersideCtrl'
      });
  });