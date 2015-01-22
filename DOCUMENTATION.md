Documentation for Dimmi application
===================================

This document presents how Dimmi is built. The explanations include the used tools, the structure of the files, the data base aspect, and the libraries required for the completion of this work.

## Content covered

The content covers:

1. [Quick overview](#overview)

2. [Files structure](#structure)

	2.1 [Description](#description)
	
	2.2 [Bower](#bower)
	
3. [Data Base](#db)

	3.1 [MongoDB](#mongodb)
	
	3.2 [Entities](#entities)
	
	3.3 [Mongoose](#mongoose)	
	
	3.4 [REST API](#rest)
	
	3.5 [Adding a route](#route)
	
4. [Implementation details](#details)

	4.1 [$scope](#scope)
	
	4.2 [Chat](#chat)
	
	4.3 [From home page to presenter/viewer sides](#passing)
	
5. [PDF loading and displaying](#loading)

	5.1 [PDF.js](#pdfjs)
	
	5.2 [Adapting to Dimmi](#adapting)
	
6. [PDF storing](#hosting)

	6.1 [Amazon S3](#amazon)
	
	6.2 [Configurations](#config)
	
7. [Landing Page](#landing)

8. [Summary of technologies](#techno)

--------

##1. <a name="overview"></a>Quick overview##

In order to develop the infrastructure of our application, we used [Yeoman](http://yeoman.io). Its workflow includes other technologies:
* [AngularJS](https://angularjs.org), the JavaScript framework
* [Bower](http://bower.io), the management tool (see chapter [Files structure](#structure))
* [Grunt](http://gruntjs.com), the build tool

Thank to Yo generating project skeleton, we could install the [AngularJS Full-Stack generator](https://github.com/DaftMonk/generator-angular-fullstack), and selected several options, including:

* Client-side :
	* Scripts: JavaScript
	* Markup: Jade 
	* Stylesheets: Stylus
* Server-side :
	* Database: MongoDB 
	* Socket.io

Moreover, we used [Bootstrap](http://getbootstrap.com), the famous HTML-CSS-JavaScript framework for developing the design in an easier and responsive way. 


##2. <a name="structure"></a>Files structure##

###2.1 <a name="description"></a>Description###

The file structure is defined by the Yeoman's skeleton. Here is the description of the main folders :

* client : the client side 
	* app : all the client application
	* account : landing page and login
	* admin : panel admin
	* main : home page
	* presenterSide : page for the presenter
    * viewerSide : page for the viewer
    * assets : all the images 
	
* dist : the final version to push on internet
    * public : client application
    * server : server application
	
* server : the server side 
    * api : all the endPoint 
    * auth : different authentication system (Facebook, ...)

* node_modules : library folder, used by Bower
	
Each model has an affiliated Stylus file. For example, the home page has its "style sheet" (home.styl), and so on.

###2.2 <a name="bower"></a>Bower###

Bower is a great tool which manages frameworks, libraries, assets, and utilities. Its work includes installing packages, and manages them in a specific file `bower.json`. Typically, the content of ours is the following:

```
{
	"name": "tweb-project1",
	"version": "0.0.0",
	"dependencies": {
		"angular": ">=1.2.*",
		"json3": "~3.3.1",
		"es5-shim": "~3.0.1",
		"jquery": "~1.11.0",
		"bootstrap": "~3.1.1",
		"angular-resource": ">=1.2.*",
		"angular-cookies": ">=1.2.*",
		"angular-sanitize": ">=1.2.*",
		"angular-bootstrap": "~0.11.0",
		"font-awesome": ">=4.1.0",
		"lodash": "~2.4.1",
		"angular-socket-io": "~0.6.0",
		"angular-ui-router": "~0.2.10",
		"pdfjs-dist": "~1.0.937",
		"ng-file-upload": "~2.0.5",
		"ng-file-upload-shim": "~2.0.5",
		"aws-sdk-js": "~2.1.2"
	},
	"devDependencies": {
		"angular-mocks": ">=1.2.*",
		"angular-scenario": ">=1.2.*"
	}
}

```

##3. <a name="db"></a>Data Base##

###3.1 <a name="mongodb"></a>MongoDB###

To save the data, we use the NoSQL database [MongoDB](http://www.mongodb.org). It uses a collection system instead of the classic tables in a relation database.


###3.2 <a name="entities"></a>Entities###

For Dimmi, we have 3 endpoints : 

  * message : message and requests in the chat for each lecture.
  
  * presentation : lecture information.
  
  * user : user information.
  
<img src="https://github.com/Auriana/TWEB_Project1/blob/master/doc-img/entities.jpg" alt="entities" title="entities" align="center" />

###3.3 <a name="mongoose"></a>Mongoose###

In fact, to work with MongoDB, we used an ODM called [Mongoose](http://mongoosejs.com), in order to write easily business logic. Here's an model example with Mongoose (`presentation.model.js` file) :

```
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PresentationSchema = new Schema({
  title: String,
  description: String,
  pdfPath: String,
  userId: Object,
  date_creation: String,
  page: Number,
  password: String
});

module.exports = mongoose.model('Presentation', PresentationSchema);

```
###3.4 <a name="rest"></a>REST API###

When it is necessary to do a query in the database, we use the `$http` object from Angular. That allows us to do HTTP request to the REST API.

In order to create the API in our skeleton, the template provides us a method called `yo angular-fullstack:endpoint $ENDPOINT_NAME$`. 
This method creates the entire file in the `/server/api` folder with the default CRUD operators.

When we create an endpoint (or entity), a new folder is automatically created, which contains all the necessary files. Here are the description of those files :

* index.js : contains all the REST route that we can use for interactions with Mongo.
* controller.js : contains the functions which are called by index.js. By default, there is a CRUD operation.
* model.js : contains the structure of our collection in MongoDB.
* socket.js : contains some functions used by SocketIO, for example to broadcast a new entry.
* spec.js : defines the I/O of the REST service.
  
###3.5 <a name="route"></a>Adding a route###
 
Sometime, we had to add a more specific route for our API. To do that, the first thing to do was to add a new route in
the index.js file. After that, it was possible to create a specific function in the controller and link it to the route. Then we wrote the query.
In the client side, we have to use `$http` to send REST request, for example `$http().get().success()`.

	
##4. <a name="details"></a>Implementation details##

###4.1 <a name="scope"></a>$scope###

The `$scope` is an object that refers to the application model. This means that when we want to create a variable in the app, we have to create it through the `$scope`. In this way, it's possible to use it in the different views (jade , ...). Later, we'll see examples with the requests and the "prev" button.

###4.2 <a name="chat"></a>Chat###

First, we thought to propose only a simple chat. However, later, we wanted to add the special messages we call "requests". They are : "Slow down", "Louder, please", "I'm lost" and "Interesting". They allows to post simple but effective messages to the presenter. Plus, it's easy to see them quickly from the point of view of the presenter. To implement them, here is the way we proceeded (example with "Slow down"):

`ViewerSide.jade` file:

```
	button.btn.btn-default.black-button(type='button', value='slow_down', ng-click="slowBut()") Slow down

```

This is the button for the "Slow down" request for the audience. Notice the `ng-click="slowBut()` which allows to call the following function from `ViewerSide.controller.js`file :

```
	$scope.slowBut = function () {
      $scope.date = new Date();
      $scope.formedDate = $scope.date.getHours() + 'h' + $scope.date.getMinutes();
      $http.post('/api/messages', {
        name: "Slow down!",
        time: $scope.formedDate,
        type: "slow",
        presentationId: $scope.presentationId,
	      numSlide: pageNum + ""
      });
    }
```

This function adds a message into the database (thanks to the ` $http.post(...)` function), with its relative information (date, type, presentation's id, ...).

On the other side, in the `PresenterSide.controller.js`file, we first set to 0 each number of occurrence of the requests :

```
    $scope.nbSlow = 0;
    $scope.nbLost = 0;
    $scope.nbLoud = 0;
    $scope.nbInte = 0;
```

We count them through the following code :

```
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
```

And finally we print them on the presenter's board (`PresenterSide.jade` file):

```
      p.btn.btn-lg.black-button {{nbSlow}} Slow down
      p.btn.btn-lg.black-button {{nbLoud}} Louder, please
      p.btn.btn-lg.black-button {{nbLost}} I'm lost
      p.btn.btn-lg.black-button {{nbInte}} Interesting
```

As explained before, we use the $scope to render the view : `{{nbSlow}}` becomes the current number of occurrence made by the audience (in the case of the "Slow down" request).

###4.3 <a name="passing"></a>From home page to presenter/viewer sides###

Generally, to change the page automatically, we use the javascript propriety `window.location`. Besides, it's a bit more complicated when passing from home page to presenter/viewer sides. It is indeed necessary to keep the information of the presentation. To do that, we put the presentation's id into the URL. The call-back function checks if the previous call was successful, validates the form, loads the PDF file, and finally switches the page.


##5. <a name="loading"></a>PDF loading and displaying##

###5.1 <a name="pdfjs"></a>PDF.js###

In order to be able to display PDF files, we used an existing library: [PDF.js](http://mozilla.github.io/pdf.js). It provided us several useful functions (where `num` is the number of the page):
- `renderPage(num)`: gets page information from the document, resize the canvas according to it, and render the page.
- `queueRenderPage(num)`: if another page is rendering in progress, waits until the rendering is finised. Otherwise, executes the rendering immediately.
- `onPrevPage()`: displays the previous page.
- `onNextPage()`: displays the next page.

###5.2 <a name="adapting"></a> Adapting to Dimmi###

But it was more complicated to add the provided features to our application, because of our specific infrastructure. We had to add the javascript code (from the library) to the controllers of the presenterSide and the viewerSide pages (`client/app/presenterSide.controller.js` and `client/app/viewerSide.controller.js`). Then, it was necessary to include in another way the generated `pdf.worker.js` file into the `client/index.html`: so that Bower does not include it in its generated files, we had to write the following code slightly below the other automatic script includes.

```
<script type="application/javascript">
  PDFJS.workerSrc = 'bower_components/pdfjs-dist/build/pdf.worker.js';
</script>`
```

Let's go back to the `presenterSide.controller.js` and the `viewerSide.controller.js` files : we had to change several parameters from the initial code. For example, `function onPrevPage() {...}` became `$scope.onPrevPage = function () {...]`so that this function could be called by the button linked to this action. 

Furthermore, we used [Socket.io](http://socket.io), which enables real-time bidirectional event-based communication. In the case of the PDF showing, it was really useful, because our goal was to updates viewer's current page, when the presenter changes his/hers. Let's have a look at the following code:


```
	// PresenterSide.controller.js file :
    
	$scope.onNextPage = function () {
      if (pageNum >= pdfDoc.numPages) {
        return;
      }
      pageNum++;
      socket.socket.emit('pageNumber', pageNum);
      queueRenderPage(pageNum);
    }
```
On the one hand, we have to catch the information from the changing page.


```
	// ViewerSide.controller.js file :
    
	//Synchronizing PDF pages
    socket.socket.on('pageNumber', function (num) {
      queueRenderPage(num);
      pageNum = num;
    });
	
```
On the other hand, we have to get this notification and make the necessary changes.


##6. <a name="hosting"></a>PDF storing##

With the use of Heroku and the fact that many PDF files could be uploaded on it, we had to find a solution to store these files. We use the Amazon Web Services, the S3 platform in particular.

The Amazon S3 bucket has been configured to allow CORS access, in order to allow us to retrieve the PDF files. The upload is done in the front-end, on the client-side.

###6.1 <a name="amazon"></a>Amazon S3###

In order to configure S3 with our application, we followed this tutorial : [http://www.cheynewallace.com/uploading-to-s3-with-angularjs](http://www.cheynewallace.com/uploading-to-s3-with-angularjs). This is particularly described to use `the aws-sdk-js bower package`, in order to be able to upload files on Amazon S3. 
	
###6.2 <a name="config"></a>Configurations###

For the context of Dimmi application, we needed to fix some parameters. Here are our configuration settings :

<img src="https://github.com/Auriana/TWEB_Project1/blob/master/doc-img/s3Config.PNG" alt="Config S3" title="Config S3" align="center" />

And the `CORSRule` :

```
  <?xml version="1.0" encoding="UTF-8"?>
  <CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
      <CORSRule>
          <AllowedOrigin>*</AllowedOrigin>
          <AllowedMethod>GET</AllowedMethod>
          <AllowedMethod>PUT</AllowedMethod>
          <MaxAgeSeconds>3000</MaxAgeSeconds>
          <ExposeHeader>x-amz-server-side-encryption</ExposeHeader>
          <ExposeHeader>x-amz-request-id</ExposeHeader>
          <ExposeHeader>x-amz-id-2</ExposeHeader>
          <ExposeHeader>Accept-Ranges</ExposeHeader>
          <ExposeHeader>Content-Encoding</ExposeHeader>
          <ExposeHeader>Content-Length </ExposeHeader>
          <ExposeHeader>Content-Range</ExposeHeader>
          <AllowedHeader>*</AllowedHeader>
      </CORSRule>
  </CORSConfiguration>

```

##7. <a name="landing"></a>Landing Page##

The template of the landing page comes from http://www.blacktie.co/2013/12/flatty-app-landing-page. We especially have been inspired by the structure of the page. Indeed, we change the other aspects in order that the design and the content match with Dimmi’s concept, and its current state. This page is implemented in the `client/app/account/home.jade` file.

------

##8. <a name="techno"></a>Summary of technologies##

Here is the list of all the technologies we have used in this project. We haven't talked about all of them, but you'll find the link to know more about them.

* Scaffolding and building technologies:
	* [Yo](https://github.com/yeoman/yo)
	* [Grunt](http://gruntjs.com)
* Back-end technologies:
	* [NPM](https://www.npmjs.com)
	* [NodeJS](nodejs.org)
	* [ExpressJS](http://expressjs.com)
	* [MongoDB](http://www.mongodb.org)
	* [Mongoose](http://mongoosejs.com)
	* [SocketIO](http://socket.io)
	* [Amazon S3](http://getbootstrap.com)
* Front-end technologies:
	* [Bower](http://bower.io)
	* [AngularJS](https://angularjs.org)
	* [Bootstrap](http://getbootstrap.com)
	* [PDF.js](http://mozilla.github.io/pdf.js)