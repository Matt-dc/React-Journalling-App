# React Journalling App - Medium Clone

&nbsp;

## Why build it?
This is intended as a portfolio project. What began as a full-stack MERN CRUD app, eventually grew to incorporate many of the features present on Medium's own site. This is in no way an attempt to rival the site but rather is my own personal aim to develop my own skills with the MERN stack by attempting to rebuild a well-known platform.

<p align="center">
 <img src="siteimages/homepage.png?raw=true" width="700px" />
</p>

&nbsp;&nbsp;


## Overview
This is a clone of the popular blogging network Medium. It implements the functionality to:
 - Create and update posts
 - follow users
 - receive personalized content based on topic preferences
- edit reading history
- update and reset login information
- comment and reply to comments
- like both posts and comments


&nbsp;
## More specifics
The App uses React’s Context API to pass user auth details to different components. 

It passes in props to child components using a higher order function (ContextWrapper.js) for props outside the render method, and UserConsumer for within. 

Several components also implement Hooks.

Sessions are handled with Express sessions and email authentication with JWT.

&nbsp;
## Third Party
The project users PassportJS for authenticating users and Nodemailer for both validating login details and also resetting the user’s password. 

Emails with a link are sent by way of smtp.gmail.com, API calls are done with Axios and file uploads are handled with Multer.


### Functionality

------

#### Follow Users
&nbsp;
<p align="center" >
 <img src="siteimages/followusers.png?raw=true" width="300px" />
</p>

&nbsp;

#### Personalise posts according to selected topics
&nbsp;

<p align="center">
 <img src="siteimages/personalized.png?raw=true" width="500px" />
</p>

&nbsp;
## Usage
Introduce an email into the sign up field and you will receive an email with a link (valid for a limited time) redirecting you to finish the sign up. 

<p align="center">
 <img src="siteimages/emailsignup.png?raw=true" width="700px" />
</p>


&nbsp;
## Live Version
You can see a live working version hosted on Heroku here:

blbal link


## Installation


```bash
cd React-Jounalling-App
npm install
npm run concurrently
```


## License
[MIT](https://choosealicense.com/licenses/mit/)
