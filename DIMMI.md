DIMMI
=============

## Content covered

The content covers:

1. [Dimmi concept](#concept)

2. [Users of the application](#users)

3. [Features](#features)

4. [Screens of Dimmi application](#screens)


## <a name="concept"></a>1. Dimmi concept

A user creates an account. He can be either a presenter or a viewer with the same account.
In the first case, he completes several fields and loads a PDF file, then he indicates he's ready to present.
In the second case, he enters the password of the lecture. Then, it confirms and the lecture can start.

## <a name="users"></a>2. Users of the application

* Viewer : a member of the audience. 
* Presenter : the speacker who presents his/her lecture.
* Admin : the one who monitor the system.

## <a name="features"></a>3. Features

We list here all the features the application offers to the user. Thereadfter, they are more explained. The additional ones are explained [here](https://github.com/Auriana/TWEB_Project1/blob/master/README.md#Develop).

### 3.1 Features dedicated to the user
* register
* login

### 3.2 Features dedicated to the presenter
* prepare a lecture 
* link PDF slides 
* give a lecture 
* control the slides 
* see the feedback
* submit a pll (additional feature)

### 3.3 Features dedicated to the viewer
* join and attend a lecture 
* asks questions
* give feedback 
* answer poll (additional feature)

### 3.4 Features dedicated to the admin
* monitor system (additional feature)
* consult admin dashboard (additional feature)


## <a name="screens"></a>4. Screens of the Dimmi application

The descriptions presented here allows to understand how to use Dimmi, for example in order to create a lecture or in order to attend to one.

### 4.1 The landing page

The landing page introduce Dimmi's concept and main featutes. Plus, it allows the user to directly log in.

### 4.2 Sign up page

This page allows the user to create an account. He/She has to enter a name, an email address and a password.

### 4.3 Home page

The user has to be logged to see it. 

The home page contains two main parts : the presenter one and the viewer one.

The first one, the presenter side, aims the presenter to **create a new lecture**.
Inside it, the user has to enter all the information necessary to start a lecture : 

* the title of the lecture
* its description
* its secret password (imagined by the user)
* the location of the PDF on his/her computer.

It's important to not forget to transmit the written password to the audience, for instance by mail or written on a visible board.

If the PDF is fully loaded, he/she then presses on the "Start" button and the screen switches to that of the lecture.

Under the block of adding lectures, there is another which allows the presenter to see the archive. Archive contains the older lectures he has already given. The link conducts to the old Presenter Lecture screen (see below), with the PDF, the chat and the requests.

The second one, the viewer side, aims the viewver to **attend the lecture**.
Inside it, the user has only to enter the password created and transmitted by the presenter.

Then, he/she presses on the "Join" button and the screen switches to that of the lecture.

### 4.4 Lecture screen

#### 4.4.1 Presenter Lecture screen

The user has to be logged to see it. 

Here we can see 3 blocks :
1) **The PDF view** : allows to see and navigate through the slides.
2) **The audience live** : this is the chat of the lecture, where questions appear.
3) **The audience requests** : there are 4 types of " user requests" :
	* "Slow down"
	* "Louder"
	* "I'm lost"
	* "Interesting"
They allow the presenter to have an overview about the mood of the audience, reading the count of them.

The "Exit" button allows to quit the lecture (a alert will ask if the user is sure about doing this).

#### 4.4.2 Viewer Lecture screen

The user has to be logged to see it. 

This page is very similar to the presenter's one. 

He we have 3 blocks:
1) **The PDF view** : allows to see and navigate through the slides.
2) **The audience live** : this is the chat of the lecture, where the viewers can write his/her questions/comments.
3) **The audience requests** : there are 4 types of " user requests" :
	* "Slow down"
	* "Louder"
	* "I'm lost"
	* "Interesting"
The user can press on the button matching his/her mood, as often as he/she wishes.

The "Exit" button allows to quit the lecture (a alert will ask if the user is sure about doing this).

### 4.6 Settings Page

The user has to be logged to see it. 
This page simply allows the user to change his/her password.
