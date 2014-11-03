'use strict';

angular.module('twebProject1App')
  .controller('TestsocketioCtrl', function ($scope, $http, socket) {

	$scope.send = function(){
		alert('send!');
		alert(socket.socket.toSource());
		socket.socket.emit('chat message', 'test');
	};
	
	$scope.msg = 'poney';
	
	socket.socket.on('chat message', function(msg){
		$scope.msg = msg;
	});
  });
