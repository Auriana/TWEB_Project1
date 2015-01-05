TWEB_Project1
=============
TWEB_Project1 is the source code and content for Dimmi application.

Dimmi's URL is https://dimmi-tweb.herokuapp.com and is built with AngularJS and MongoDB on Heroku.com

## To do

1. DONE - solve PDF upload -> have to load it in the presenterSide view (id = undefined).

2. AN - the viewer have to be able to join the lecture via the password (+ confirmation with title of lecture under).

3. fix and solve heroku problems.

4. delete the popup test on PDF upload.

5. create the list of Archive under the blocks.

6. delete the "things".

7. improve design for a more practical use.

8. create the analytic page.

9. before quit the lecture, ask if sure (both sides).

- LATER notifications of questions.
- LATER - duplicate presenter screen.
- DONE - solve first pdf page problem
- DONE - for feedback: manage timestamp of message "request" and current number of slides, etc.
- DONE - prepare the scenario of our demo (must have/nice to have).
- DONE - create the landing page.
- DONE - modify the Change Password page.

## Content covered

The content covers:

1. [What Dimmi is, and why](#What)

2. [How Dimmi works, from a technical standpoint](#Work)

3. [How to run this project](#Run)

4. [How we plan to develop Dimmi](#Develop)

5. [How to add improvements](#Improve)

## <a name="What"></a>1. What Dimmi is, and why

### What

<img src="https://github.com/Auriana/TWEB_Project1/blob/master/doc-img/logo_Dimmi.png"
 alt="Dimmi logo" title="Dimmi" align="right" />

This application allows the user take part of a lecture, as the presenter or as a viewer.
The goal is to integrate a live feedback into a given lecture. The audience can send public requests during
the "show", and the presenter is able to see them directly, and can change behavior according to it.

It is possible to find [more details](https://github.com/Auriana/TWEB_Project1/blob/master/DIMMI.md) about the concept and the use.

### Why

We built this application in the context of a Web Technologies course (HEIG-VD). But the idea of the general concept comes 
from an established fact: the audience is often shy and hesitates to ask questions. This application aims to facilitate the communication 
and to assess the presenter if the audience has understood his/her speech.

## <a name="Work"></a>2. How Dimmi works, from a technical standpoint

Bla blab with AngularJS and MongoDB on Heroku.com

So, curious ? The very technical details are situated [here](https://github.com/Auriana/TWEB_Project1/blob/master/DIMMI_implementation.md).

## <a name="Run"></a>3. How to run this project

Be sure to have installed NodeJS, Bower and Grunt on your local machine.

1. Clone the repo.

2. Run MongoDB (mongod.exe file).

3. With another shell, at `TWEB_Project1` root and write: `grunt build`. It will build the project.

4. Run the project with `grunt serve`.

5. A new browser page will open at http://localhost:9000.

## <a name="Develop"></a>4. How we plan to develop Dimmi

* submit poll
* notifications of questions.
* duplicate presenter screen.

## <a name="Improve"></a>5. How to add improvements

We welcome fixes and improvements! If you have an idea on how to improve it, we'd love yout to share it here.
Please fork the repo, make your changes and then create a pull request.

#### Authors

Anthony Roubaty & Auriana Hug

