TWEB_Project1
=============
Building an application with AngularJS and MongoDB on Heroku.com

Heroku : https://stormy-castle-5332.herokuapp.com/

Anthony Roubaty & Auriana Hug.

## How to run our project
Be sure to have installed NodeJS, Bower and Grunt.
1. Clone the repo
2. Run MongoDB (mongod.exe file)
3. With another shell, at `TWEB_Project1` root and write: `grunt build`. It will build the project.
4. Run the project with `grunt serve`.
5. A new browser page will open at http://localhost:9000.

## Description
This application let the user take part of a presentation, as the presenter of as a viewer.
The goal is to integrate a live feedback into a presentation. The audience can send private and public requests during
the "show", and the presenter is able to see them directly.

## Our concept
A user creates an account. He can be a presenter and a viewer. 
In the first case, he puts a PDF file, and indicates he's ready to present.
In the second case, he selects the user who will present, then the title of the presentation. He chooses it and starts the PDF.

## Users
- Viewer
- Presenter

## Screens of the app
- Logging page (log in/sign in)
- Home page (after logging)
- For the presenter :
	- Presenter screen (slides, requests and chat).
	- Only slides for the projector
- Viewer screen (slides, requests, stats and chat).
- Presentation summary for past presentations : title, PDF file, description, date and stats (requests).
- Admin dashboard.


