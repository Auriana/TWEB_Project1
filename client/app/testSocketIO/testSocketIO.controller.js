'use strict';

angular.module('twebProject1App')
  .controller('TestsocketioCtrl', function ($scope, $http, socket) {	
  
	$scope.listeMsg = [];
	$scope.date = new Date();
  
	$http.get('/api/messages').success(function(listeMsg) {
		$scope.listeMsg = listeMsg;
		socket.syncUpdates('message', $scope.listeMsg);
    });

	$scope.send = function() {
      if($scope.inputChat === '') {
        return;
      }
	  
	  $scope.date = new Date();
	  $scope.formedDate = $scope.date.getHours() + 'h' + $scope.date.getMinutes() + 'm' + $scope.date.getSeconds() + 's';
	  
      $http.post('/api/messages', { name: $scope.inputChat , time : $scope.formedDate});
      $scope.inputChat = '';
	  
    };
	
	$scope.$on('$destroy', function () {
      socket.unsyncUpdates('message');
    });	
	
	$scope.scroll = function(){
		document.getElementById('chatDisplay').scrollTop = 99999;
	}
  });
