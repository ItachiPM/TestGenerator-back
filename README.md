# Test Generator API Backend
This project was create to help people to study. It is also good to make a simple quiz for fun.

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Setup](#setup)
* [Usage](#usage)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)


## General Information
This project was create to help study to exam in school but it is also good to did simple quiz and have fun with friends.

The purpose is fast and enjoyable study base on question and answer and solve test

I did this because someone asked me to create app to study for exam.
It is also a credit project in MegaK course.


## Technologies Used
- Typescript - version 4.7
- Node JS - version 17.0
- Express - version 4.18
- Passport JS - version 0.6
- Passport-local - version 1.0
- Mysql2 - version 2.3
- Cors - version 2.8
- Jest


## Features
- authorization and authentication user by passport JS
- hashed a password of user
- possibility to add new question by user. if questions have only correct answer they don't be use in quiz. Only questions with 2 or more answer cen by used in quiz
- possibility to get all question and get all question from module
- possibility to generate exam and exam from module with specific number of question
- shuffle answer in questions exam
- shared types with frontend


## Setup
create data base:
use file clonedb

look to file sensitiveDataTemplate and create .env file base on it.

npm install
npm start


## Usage
This api is collaborate with TestGenerator-frontend API Link here:
https://github.com/ItachiPM/TestGenerator-front



## Acknowledgements
This project was created on base knowledge gained on MegaK course.


## Contact
#michal.pietraszek98@gmail.com
