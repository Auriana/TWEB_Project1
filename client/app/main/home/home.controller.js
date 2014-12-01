'use strict'

angular.module('twebProject1App')
  .controller('HomeCtrl', function ($scope, $http, socket, Auth, $window) {
    $scope.awesomeThings = [];

    //Create lesson
    $scope.startPresentation = function () {
      /*if ((typeof $scope.newLecture_title != 'undefined' ) || ($scope.newLecture_title === '')) {
       alert('Please to give a title to this lecture');
       return;
       }

       if ((typeof $scope.newLecture_descr != 'undefined') || ($scope.newLecture_descr === '')) {
       alert('Please to give a description to this lecture');
       return;
       }

       if ((typeof $scope.newLecture_pass != 'undefined') || ($scope.newLecture_pass === '')) {
       alert('Please to give a password to this lecture');
       return;
       }*/

      alert("test");

      $http.post('/api/presentations', {
        title: $scope.newLecture_title,
        description: $scope.newLecture_descr,
        pdfPath: 'notImplement',
        userId: Auth.getCurrentUser()._id,
        date_creation: getTime(),
        page: 1,
        password: $scope.newLecture_pass
      }).success(function (data, status, headers, confi) {

        $window.location = '/presenterSide?presentationId=' + data._id;
      });
    };

    function getTime() {
      var d = new Date();
      var h = addZero(d.getHours());
      var m = addZero(d.getMinutes());
      var s = addZero(d.getSeconds());
      var y = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      var x = y + "/" + month + "/" + day + " " + h + ":" + m + ":" + s;
      return x;
    }

    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }

  });

