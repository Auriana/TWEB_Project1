TWEB_Project1
=============
TWEB_Project1 is the source code and content for Dimmi application.

Dimmi's URL is https://dimmi-tweb.herokuapp.com and is built with AngularJS and MongoDB on Heroku.com

*Note* : You have the choice between discovering the application from the given URL, or running locally the project on your computer (see [4th chapter](#Run)).
At [this section](#State), we make a short balance between these two versions of the project.


## Content covered

The content covers:

1. [What Dimmi is, and why](#What)

2. [How Dimmi works](#Work)

3. [What is the current state of the project](#State)

4. [How to run this project](#Run)

5. [How we plan to develop Dimmi](#Develop)

6. [How to add improvements](#Improve)

## <a name="What"></a>1. What Dimmi is, and why

###1.1 What

<img src="https://github.com/Auriana/TWEB_Project1/blob/master/doc-img/logo_Dimmi_round.png"
 alt="Dimmi logo" title="Dimmi" align="right" />

This application allows the user to take part of a lecture, as the speaker (presenter) or as a memebr of the audience (viewer).
The goal is to integrate a live feedback into a given lecture. The audience can send public requests during
the "show", and the presenter is able to see them directly, and can change behavior according to it.

It is possible to find [more details](https://github.com/Auriana/TWEB_Project1/blob/master/DIMMI.md) about the concept and the use.


###1.2 Why

We built this application in the context of a Web Technologies course (HEIG-VD). But the idea of the general concept comes 
from an established fact: the audience is often shy and hesitates to ask questions. This application aims to facilitate the communication 
and to assess the presenter if the audience has understood his/her speech.

## <a name="Work"></a>2. How Dimmi works

As it is mentioned above, Dimmi is a web application, built with [AngularJS](https://angularjs.org) and [MongoDB](http://www.mongodb.org) on [Heroku.com](https://www.heroku.com). Plus, this project uses [PDF.js](http://mozilla.github.io/pdf.js) and [Amazon S3 platform](http://aws.amazon.com/s3/?nc2=h_ls). 

So, curious ? The very technical details are situated [here](https://github.com/Auriana/TWEB_Project1/blob/master/STRUCTURE.md).


## <a name="State"></a>3. What is the current state of the project

As we have first implemented the application locally, this version is the current one. As we mentioned, we offer a version built on **heroku** too. Unfortunately, we have the following problems for both versions :

* **Lecture recovery** :  We planned to propose to recover a past lecture, in order to continue a stopped one, or to see the stats (requests uses, questions). The problem is that it does not really work as we wish : the slide is not the one where we stopped, plus the number of the requests mmade by the audience.
* **Archive** : The section called "Archive" from the home page shows only the lectures made during the session, not all of them (since the creation of the account of the user). We have to correct that.

The additional bug we discovered **for the deployed version** is the following : It is not possible to see the PDF from the viewerSide or the presenterSide pages, although the PDF file was loaded correctly. We suppose the problem comes from Amazon S3 platform. The problem is, focusing on the local version, we have not already fix it.


## <a name="Run"></a>4. How to run this project

Be sure to have installed NodeJS, Bower and Grunt on your local machine.

1. Clone the repo.

2. Run MongoDB (mongod.exe file).

3. With another shell, at `TWEB_Project1` root and write: `grunt build`. It will build the project.

4. Run the project with `grunt serve`.

5. A new browser page will open at http://localhost:9000.


## <a name="Develop"></a>5. How we plan to develop Dimmi

At this moment, we have stopped the implementation of this project. But we have planned to add some interesting additional features, 
in addition to correcting the problem discussed above (showing PDF) :

* **Submit poll** : It could be really useful for the presenter to create a specific poll about his/her lecture to the audience. Then, the answers would be saved, and possible to see in the archive.
* **Notifications of questions** : The implemented chat already allows the audience to express itself, but its issues have to be highlighted. Thus the presenter would see them better and could quickly answer to them.
* **Duplication of presenter screen** : We've imagined a second screen with only the PDF view for the beamer, and the initial one who allows the presenter to follow the mood of the audience.
* **System monitoring** : The admin have to monitor the application. We have to provide him a solution.
* **Admin dashboard** : It would be interesting for the admin to have an overview of the number of the visitors of the app, on which frequency, and so on. We have thought about adding the Google Analytics service.


## <a name="Improve"></a>6. How to add improvements

We welcome fixes and improvements! If you have an idea on how to improve Dimmi, we'd love you to share it here.
Please contact us if this is the case !


#### Authors

Anthony Roubaty & Auriana Hug

