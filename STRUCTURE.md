Structure of DIMMI application
==============================

- AU css => stylus, html => jade

- AU Landing page inspired by : http://www.blacktie.co/2013/12/flatty-app-landing-page/

- AN Mongo Data Base : 
	* entitites, 
	* how we add/delete/get/modifiy
	* server/api/X/index.js => route
	* appel depuis les controller
	* message : chat + request
	* presentation
	* user (de base)
	* Comment ajouter une nouvelle route (ajouter dans l'inde.js => faire l'appel dans le controller)
	
	
Pour sauvegarder nos données, nous avons utilisé une base NoSQL, MongoBD, qui nous a permis de stocker nos informations 
sous format de collections. 
Pour faire des requêtes sur la base, nous avons utilisé l'objet "$http" d'Angular. Ce dernier
permet de faire des requêtes HTTP sur un service REST. Pour créer un service REST dans le squelette "Angular-fullstack", 
il existe une tâche dans Yoemann ("yo angular-fullstack:endpoint $ENDPOINT_NAME$"). Cette dernière va générer tout les
fichiers nécéssaire dans /server/api.
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

	
- AN Structure des fichiers	

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


- AU Amazon S3:
	tuto : http://www.cheynewallace.com/uploading-to-s3-with-angularjs/
	(voir emails du prof)
	
- AU PDF.js
