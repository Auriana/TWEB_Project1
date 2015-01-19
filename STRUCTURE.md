Structure of DIMMI application
==============================

##Introduction##
To develop the infrastructure of our application we use [Yeoman](http://yeoman.io). Its workflow includes other technologies:
* [AngularJS]( https://angularjs.org), the JavaScript framework
* [Bower](), the management tool
* [Grunt](), the build tool
We chose the [AngularJS Full-Stack generator](https://github.com/DaftMonk/generator-angular-fullstack), and selected several options, including:
- Client-side :
* Scripts: JavaScript
* Markup: Jade 
* Stylesheets: Stylus
- Server-side :
* Database: MongoDB 
* Socket.io integration

##Files structure##

The file structure is define by the Yoemann's skeleton. Here the description of the main folders :
  * client : the client side application
    * app : all the client application
      * account : Landing page and login
      * admin : panel admin
      * main : home page
      * presenterSide : page for the presenter
      * viewerSide : page for the viewer
    * assets : all the images 
  * dist : the final version to push on internet
    * public : client application
    * server : server application
  * server : the server side application
    * api : all the endPoint 
    * auth : different authentication system (Facebook, ...)
  * node_modules : library folder, use by Bower
	
- AN Passage de la home page à la presenter side
	bouton qui appelle fonction

To change the page automatically we use the javascript propriety "window.location". For keep the information of the presentation
we pass the presentation's id in the URL. The function also check if all the precedent call was successful, and with a 
callback validate the form and switch the page.

$scope
$scope is the environment of the current application. This mean that when you want to create a variable in the app, 
you have to create it throw the $scope. Like that you can use it in the different view (Jade , ... ).

Each model has an affiliated Stylus file. For example, the home page has its Style Sheet home.styl, and so on.

##Data Base##
* entitites, 
* how we add/delete/get/modifiy
* server/api/X/index.js => route
* appel depuis les controller
* message : chat + request
* presentation
* user (de base)
* Comment ajouter une nouvelle route (ajouter dans l'inde.js => faire l'appel dans le controller)

To save our data we use the NoSQL database MongoDB. It use a collection system instead of the classic table 
in a relation database.
When we want to do a query in the database, we use the "$http" object from Angular. That allow us to do HTTP request to 
the REST API.
For create the API in our skeleton, the template give us a method call "yo angular-fullstack:endpoint $ENDPOINT_NAME$". 
This method create all the file in the /server/api folder with the default CRUD operator.

When we create a endpoint, a new folder who contain all needed file is created. Here the description of this file :
  * index.js : Contain all REST route that we can used for interacts with Mongo.
  * controller.js : Contain the function who are called by index.js. By default there is a CRUD operation.
  * model.js : Contain the structure of our collection in MongoDB.
  * socket.js : Contain some functions used by SocketIO for broadcast an new entry, for example.
  * spec.js : This one define the I/O of the REST service.
  
For our project, we have to use 3 endpoints : 
  * message : For all message in the chat for each lecture.
  * presentation : For all information about the lecture.
  * user : For all user information.
  
Sometime we have to add a more specific route for our API. To do that the first thing to do is to add a new route in
the index.js file. After that u can create a specific function in the controller and link it to the route, you have to 
write the query. Here you can use the official MongoDB website.
In the client side, you have to use $http to send REST request, for example $http().get().success().


##Uploading and showing PDF files##
The two main purposes of this application are the following:
-	For the presenter : to upload the PDF file.
-	For the viewer : to display the PDF file.
In order to implement them, we use an existing library: [PDF.js](http://mozilla.github.io/pdf.js)


##PDF hosting##

- Amazon S3:
	tuto : http://www.cheynewallace.com/uploading-to-s3-with-angularjs/
	(voir emails du prof)
	
###CORS configuration###
	
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

##Landing Page##

The template of the landing page comes from http://www.blacktie.co/2013/12/flatty-app-landing-page/. We especially have been inspired by the structure of the page. Indeed, we change the other aspects in order that the design matchs with Dimmi’s concept, and its current state. This page is implemented in the client/app/account/home.jade file.


