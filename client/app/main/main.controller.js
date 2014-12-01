'use strict';

angular.module('twebProject1App')
  .controller('MainCtrl', function ($scope, $http, socket, Auth, $upload, $window) {
    $scope.awesomeThings = [];

    /* Upload PDF files */
    /* from https://github.com/danialfarid/angular-file-upload */
    $scope.onFileSelect = function ($files) {
      //$files: an array of files selected, each file has name, size, and type.
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        $scope.upload = $upload.upload({
          url: '/upload',
          data: {title: $scope.newLecture_title, author: $scope.newLecture_descr},
          file: file
        }).progress(function (evt) {
          console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function (data, status, headers, config) {
          // file is uploaded successfully
          console.log(data);
        });
      }
    };

    /* Start Lecture */
    $scope.startNewPresentation = function () {
      var pres = $scope.presentation[index];
      $http.post('/api/presentation', {title: pres.title, description: pres.descr, pdfPath: pres.pdfPath, page: 1})
        .success(function (presentation) {
          /* Avec la notion de session, ce serait :
           $window.location = '/testSocketIO?presentation_id=' + presentation_id'; */
          $window.location = '/testSocketIO';
        });
    };

    /* Join a lecture */
    $scope.joinPresentation = function () {
      $window.location = '/testPDF';

    };

  });
