'use strict';

angular.module('twebProject1App')
  .controller('ViewersideCtrl', function ($scope, $http, socket) {
    //presentation title
	$scope.titlePresentation = "Test Presentation";
	// Chat part
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
		$http.post('/api/messages', { name: $scope.inputChat , time : $scope.formedDate, type : "message"});
		$scope.inputChat = '';
	};
	
	/*$scope.$on('$destroy', function () {
		socket.unsyncUpdates('message');
	});*/
	
	$scope.scroll = function(){
		document.getElementById('chatDisplay').scrollTop = 99999;
	}
	//Button
	$scope.slowBut = function(){
		$scope.date = new Date();
		$scope.formedDate = $scope.date.getHours() + 'h' + $scope.date.getMinutes() + 'm' + $scope.date.getSeconds() + 's';
		$http.post('/api/messages', { name: "Slow down!" , time : $scope.formedDate, type : "slow"});
	}
	
	$scope.loudBut = function(){
		$scope.date = new Date();
		$scope.formedDate = $scope.date.getHours() + 'h' + $scope.date.getMinutes() + 'm' + $scope.date.getSeconds() + 's';
		$http.post('/api/messages', { name: "Louder, please!" , time : $scope.formedDate, type : "loud"});
	}
	
	$scope.lostBut = function(){
		$scope.date = new Date();
		$scope.formedDate = $scope.date.getHours() + 'h' + $scope.date.getMinutes() + 'm' + $scope.date.getSeconds() + 's';
		$http.post('/api/messages', { name: "I'm lost !" , time : $scope.formedDate, type : "lost"});
	}
	
	$scope.inteBut = function(){
		$scope.date = new Date();
		$scope.formedDate = $scope.date.getHours() + 'h' + $scope.date.getMinutes() + 'm' + $scope.date.getSeconds() + 's';
		$http.post('/api/messages', { name: "Interesting..." , time : $scope.formedDate, type : "interesting"});
	}
	
	//synchronisation des pages du PDF
	socket.socket.on('pageNumber', function(num) {
		queueRenderPage(num);
		pageNum = num;
	});
	//////////////////////
	//
	// If absolute URL from the remote server is provided, configure the CORS
	// header on that server.
	//
	var url = './data/WebInfra.pdf';
	//
	// Fetch the PDF document from the URL using promises
	//
	PDFJS.getDocument(url).then(function(pdf) {
		// Using promise to fetch the page
		pdf.getPage(1).then(function(page) {
			var scale = 1.5;
			var viewport = page.getViewport(scale);
			//
			// Prepare canvas using PDF page dimensions
			//
			var canvas = document.getElementById('the-canvas');
			var context = canvas.getContext('2d');
			canvas.height = viewport.height - 100;
			canvas.width = viewport.width - 100;
			//
			// Render PDF page into canvas context
			//
			var renderContext = {
				canvasContext: context,
				viewport: viewport
			};
			page.render(renderContext);
		});
	});
	var pdfDoc = null,
		pageNum = 1,
		pageRendering = false,
		pageNumPending = null,
		scale = 0.8,
		canvas = document.getElementById('the-canvas'),
		ctx = canvas.getContext('2d');
	/*
	* Get page info from document, resize canvas accordingly, and render page.
	* @param num Page number.
	*/
	function renderPage(num) {
		pageRendering = true;
		// Using promise to fetch the page
		pdfDoc.getPage(num).then(function(page) {
			var viewport = page.getViewport(scale);
			canvas.height = viewport.height;
			canvas.width = viewport.width;
			// Render PDF page into canvas context
			var renderContext = {
				canvasContext: ctx,
				viewport: viewport
			};
			var renderTask = page.render(renderContext);
			// Wait for rendering to finish
			renderTask.promise.then(function () {
				pageRendering = false;
				if (pageNumPending !== null) {
					// New page rendering is pending
					renderPage(pageNumPending);
					pageNumPending = null;
				}
			});
		});
		// Update page counters
		document.getElementById('page_num').textContent = pageNum;
	}
	/*
	* If another page rendering in progress, waits until the rendering is
	* finised. Otherwise, executes rendering immediately.
	*/
	function queueRenderPage(num) {
		if (pageRendering) {
			pageNumPending = num;
		} else {
			renderPage(num);
		}
	}
	/**
	* Displays previous page.
	*/
	$scope.onPrevPage = function () {
		if (pageNum <= 1) {
			return;
		}
		pageNum--;
		queueRenderPage(pageNum);
	}
	/**
	* Displays next page.
	*/
	$scope.onNextPage = function () {
		if (pageNum >= pdfDoc.numPages) {
			return;
		}
		pageNum++;
		queueRenderPage(pageNum);
	}
	/**
	* Asynchronously downloads PDF.
	*/
	PDFJS.getDocument(url).then(function (pdfDoc_) {
		pdfDoc = pdfDoc_;
		document.getElementById('page_count').textContent = pdfDoc.numPages;
		// Initial/first page rendering
		renderPage(pageNum);
	});
  });