'use strict';

angular.module('twebProject1App')
  .controller('PresentersideCtrl', function ($scope, $http, socket) {
    
	//TODO
	//pour récupère le GET de presenterSide?presentationId=XXX
	//$scope.presentationId = $location.search().presentationId;
	
	$scope.listeMsg = [];
	$scope.date = new Date();
	
	$scope.nbSlow = 0;
	$scope.nbLost = 0;
	$scope.nbLoud = 0;
	$scope.nbInte = 0;
  
	$http.get('/api/messages').success(function(listeMsg) {
		$scope.listeMsg = listeMsg;
		socket.syncUpdates('message', $scope.listeMsg, function(event, item, array){
			//TODO
			//Modification des msg
		});
    });
	
	$scope.scroll = function(type){
		document.getElementById('chatDisplay').scrollTop = 99999;
		$scope.nbSlow = 0;
		$scope.nbLost = 0;
		$scope.nbLoud = 0;
		$scope.nbInte = 0;
		
		for(var i = 0; i < $scope.listeMsg.length; i++){
			switch($scope.listeMsg[i].type){
			case "slow":
				$scope.nbSlow++;
				break;
				
			case "lost":
				$scope.nbLost++;
				break;
				
			case "loud":
				$scope.nbLoud++;
				break;
				
			case "interesting":
				$scope.nbInte++;
				break;
			}
		}
		
		/*for(i in $scope.listeMsg){
			$http.delete('/api/messages/' + i._id);
		}*/
	}
	
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
		socket.socket.emit('pageNumber', pageNum);
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
		socket.socket.emit('pageNumber', pageNum);
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
