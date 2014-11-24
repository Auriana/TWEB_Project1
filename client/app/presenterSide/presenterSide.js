'use strict';

angular.module('twebProject1App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('presenterSide', {
        url: '/presenterSide',
        templateUrl: 'app/presenterSide/presenterSide.html',
        controller: 'PresentersideCtrl'
      });
  });