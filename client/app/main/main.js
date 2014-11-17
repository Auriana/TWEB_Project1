'use strict';

angular.module('twebProject1App')
  .config(function ($stateProvider) {
    $stateProvider
	  .state('authentif', {
        url: '/authentif',
        templateUrl: 'app/main/authentif/authentif.html',
        controller: 'AuthentifCtrl'
      })
      .state('main', {
        url: '/',
        templateUrl: 'app/main/home/home.html',
        controller: 'HomeCtrl',
		authenticate: true
      });
  });