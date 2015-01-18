'use strict';

angular.module('twebProject1App')
  .controller('PresentersideCtrl', function ($scope, $http, socket, $location, $window) {

    $scope.exit = function(){
      if (confirm("Are you sure ?")) { // Clic sur OK
        $window.location = '/';
      }
    };

    //pour récuperer le GET de presenterSide?presentationId=XXX
    $scope.presentationId = $location.search().presentationId;
    $scope.titlePresentation = 'Fail to load';
    $scope.pdfUrl = 'Not load yet';

    var pdfDoc = null,
      pageNum = 1,
      pageRendering = false,
      pageNumPending = null,
      scale = 0.8,
      canvas = document.getElementById('the-canvas'),
      ctx = canvas.getContext('2d');


    //PDFJS.disableRange = true;
    $http.get('/api/presentations/' + $scope.presentationId).success(function (pres) {
      $scope.titlePresentation = pres.title;
      $scope.pdfUrl = pres.pdfPath;

      /**
       * Asynchronously downloads PDF.
       */
      PDFJS.getDocument($scope.pdfUrl).then(function (pdfDoc_) {
        pdfDoc = pdfDoc_;
        document.getElementById('page_count').textContent = pdfDoc.numPages;
        // Initial/first page rendering
        renderPage(pageNum);
      });
    });

    $scope.listeMsg = [];
    $scope.date = new Date();

    $scope.nbSlow = 0;
    $scope.nbLost = 0;
    $scope.nbLoud = 0;
    $scope.nbInte = 0;

    $http.get('/api/messages').success(function (listeMsg) {
      for (var i = 0; i < listeMsg.length; i++){
        if(listeMsg[i].presentationId == $scope.presentationId){
          $scope.listeMsg.push(listeMsg[i]);
        }
      }
      socket.syncUpdates('message', $scope.listeMsg, function (event, item, array) {
        if (item.presentationId != $scope.presentationId) {
          $scope.listeMsg.pop();
        }

      });
    });

    $scope.scroll = function (type) {
      document.getElementById('chatDisplay').scrollTop = 99999;
      $scope.nbSlow = 0;
      $scope.nbLost = 0;
      $scope.nbLoud = 0;
      $scope.nbInte = 0;

      for (var i = 0; i < $scope.listeMsg.length; i++) {
        switch ($scope.listeMsg[i].type) {
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
    }

    /*
     * Get page info from document, resize canvas accordingly, and render page.
     * @param num Page number.
     */
    function renderPage(num) {
      pageRendering = true;
      // Using promise to fetch the page
      pdfDoc.getPage(num).then(function (page) {
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


  });
