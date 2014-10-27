'use strict';

angular.module('twebProject1App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('testPdf', {
        url: '/testPdf',
        templateUrl: 'app/testPdf/testPdf.html',
        controller: 'TestpdfCtrl'
      });
  });