'use strict'

angular.module('twebProject1App')
  .controller('HomeCtrl', function ($scope, $http, socket, Auth, $window) {
    //Archive lecture
    $scope.archives = [];

    $http.get('/api/presentations/user/' + Auth.getCurrentUser()._id)
      .success(function (data, status, headers, config){
        data.forEach(function(pres){
          $scope.archives.push({
            "url" : "/presenterSide?presentationId=" + pres._id,
            "title" : pres.title
          })
        });
    });

    //Join Lecture
    $scope.lectureToJoin = "";
    $scope.lectureToJoinUrl = "";

    $scope.JoinPresentation = function(){
      $http.get('/api/presentations/pass/' + $scope.join_pass).success(function (data, status, headers, config) {
        $scope.lectureToJoin = data.title;
        $scope.lectureToJoinUrl = "viewerSide?presentationId=" + data._id;
      }).error(function(data, status, headers, config){
        $scope.lectureToJoin = "Lecture Not Found."
      });
    };

    $scope.creds = {
      bucket: 'frankfurt-bucket-tweb',
      access_key: 'AKIAIOAZDTCXKH2V52QA',
      secret_key: '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'
    }


    var isFileSelected = false;

    //selecting the file to upload
    $scope.onFileSelect = function ($files) {
      if ($files != undefined) {
        $scope.selectedFile = $files[0]
        if ($scope.selectedFile.type !== 'application/pdf') {
          alert('Please choose a PDF file !');
          return;
        }

        isFileSelected = true;
      }
    };

    //Create lesson
    $scope.startPresentation = function () {
      //Check if the password is already used
      //$scope.newLecture_pass
      $http.get('/api/presentations/pass/' + $scope.newLecture_pass).success(function (data, status, headers, config){
        alert("Password already used.");
      }).error(function(data, status, headers, config){
        fToUpload();
      });

    };

    //Upload pdf
    var fToUpload = function(){
      AWS.config.update({accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key});
      AWS.config.region = 'eu-central-1';
      var bucket = new AWS.S3({params: {Bucket: $scope.creds.bucket}});
      if (isFileSelected) {
        var params = {
          Key: $scope.selectedFile.name,
          ContentType: $scope.selectedFile.type,
          Body: $scope.selectedFile,
          ServerSideEncryption: 'AES256'
        };

        bucket.putObject(params, function (err, data) {
          if (err) {
            // There Was An Error With Your S3 Config
            alert(err.message);
            return false;
          }
          else {
            // Success!
            alert('Upload Done');

            $http.post('/api/presentations', {
              title: $scope.newLecture_title,
              description: $scope.newLecture_descr,
              pdfPath: 'https://s3.eu-central-1.amazonaws.com/frankfurt-bucket-tweb/' + $scope.selectedFile.name,
              userId: Auth.getCurrentUser()._id,
              date_creation: getTime(),
              page: 1,
              password: $scope.newLecture_pass
            }).success(function (dataSecond, status, headers, confi) {
              $window.location = '/presenterSide?presentationId=' + dataSecond._id;
            });
          }
        })
          .on('httpUploadProgress', function (progress) {
            // Log Progress Information
			//var value = (Math.round(progress.loaded / progress.total * 100);
		    //$scope.progress-bar = value;
            console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
          });
      }
      else {
        // No File Selected
        alert('No File Selected');
      }
    }


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
