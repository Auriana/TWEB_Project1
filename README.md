TWEB_Project1
=============
Building an application with AngularJS and MongoDB on Heroku.com

Heroku : https://dimmi-tweb.herokuapp.com

Authors: Anthony Roubaty & Auriana Hug.

## To do
- 1) AN - solve PDF upload.
- 2) AN - the viewer have to be able to join the lecture via the password (+ confirmation with title of lecture under).
- 3) ? - fix and solve heroku problems.
- 4) DONE - solve first pdf page problem
- 5) DONE - for feedback: manage timestamp of message "request" and current number of slides, etc.
- 6) DONE - prepare the scenario of our demo (must have/nice to have).
- 7) DONE - create the landing page // To be continued.
- 8) DONE - modify the Change Password page.
- 9) AU - improve design for a more practical use.
- 10) create the analytics page.
- 11) confirm the password.
- 12) create the list of Archive under the blocks.
- 13) before quit the lecture, ask if sure (both sides).
- 14) notifications of questions.
- 15) duplicate presenter screen.

## Current problems
- Heroku commit. Miss many things (CSS, etc.)
- File upload doesn't work locally.
- The viewer can't correctly join the lecture.
- No PDF file is linked to the session.

## Scenario of the demo
- 1) Land on the home page (landing page)
- 2) Quickly go through it.
- 3) Come back to the logging section and create an account.
- 4) Prepare a lecture (title, description, upload and password).
- 5) Start the lecture. Describe the page and its components.
- 6) With another account, log in.
- 7) Enter the password. Confirm the lecture.
- 8) Land on the viewer side. Describe the differences.
- 9) Presenter: go through  sides.
- 10) Viewer: see that the slides change.
- 11) Viewer: write a question. And say "So down".
- 12) Presenter: see the question and the request.
- 13) Viewer and Presenter: quit the lecture.
- 14) Viewer: log out.
- 15) Presenter: see his archives and click on one old lecture.
- 16) Land on the analytics page. Describe it.

## Specifications 
### User
- register & login (OK)

### Presenter
- prepare lecture (OK)
- link PDF slides (KO!) - static, need to be dynamic
- give lecture (OK)
- control slides (OK)
- see feedback (KO) - create link to feedback page => think about the feedback page
- submit poll (?) - requests

### Viewer
- join and attend lecture (~OK) - enter the password of the lecture
- asks questions (OK) - chat
- give feedback (OK) - chat + requests
- answer poll (OK) - requests

### Admin (?)
- monitor system (KO)
- consult admin dashboard (KO)

### Coming soon
- submit poll

## How to run this project
Be sure to have installed NodeJS, Bower and Grunt.
- 1. Clone the repo
- 2. Run MongoDB (mongod.exe file)
- 3. With another shell, at `TWEB_Project1` root and write: `grunt build`. It will build the project.
- 4. Run the project with `grunt serve`.
- 5. A new browser page will open at http://localhost:9000.

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
	- Only slides for the projector (?)
- Viewer screen (slides, requests, stats and chat).
- Presentation summary for past presentations : title, PDF file, description, date and stats (requests).
