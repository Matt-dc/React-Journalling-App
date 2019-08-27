# React Journalling App - Medium Clone
MERN stack app styled using <a href="https://react-bootstrap.github.io/">React Bootstrap</a>.

&nbsp;

## Why build it?
This is intended as a portfolio project. What began as a full-stack MERN CRUD app, eventually grew to incorporate many of the features present on <a href="https://medium.com/">Medium</a>'s own site. This is in no way an attempt to rival the site but rather is my own personal goal to develop my skills with the MERN stack by attempting to rebuild a well-known platform.

<p align="center">
 <img src="siteimages/homepage.png?raw=true" width="700px" />
</p>

&nbsp;&nbsp;


## Overview
This is a clone of the popular blogging network Medium. It implements the functionality to:
 - Create and update posts
 - Follow users
 - Receive personalized content based on topic preferences
- Edit reading history
- Update and reset login information
- Comment and reply to comments
- Like both posts and comments


&nbsp;
## More specifics
The App uses React’s <a href="https://reactjs.org/docs/context.html">Context API</a> to pass user auth details to different components. 

It passes in props to child components using a higher order function (ContextWrapper.js) for props outside the render method, and UserConsumer for within. 

Several components also implement <a href="https://reactjs.org/docs/hooks-intro.html">Hooks</a>.

Sessions are handled with <a href="https://www.npmjs.com/package/express-session">Express sessions</a> and email authentication is controlled using a <a href="https://jwt.io/">JSON Web Token</a>.

&nbsp;
## Third Party
The project uses <a href="http://www.passportjs.org/">PassportJS</a> for authenticating users, as well as <a href="https://www.npmjs.com/package/bcrypt">Bcrypt</a> for password hashing. <a href="https://nodemailer.com/about/">Nodemailer</a> is used for both validating login details and also resetting the user’s password. 

Emails with a link are sent by way of <a href="https://support.google.com/a/answer/176600?hl=en">smtp.gmail.com</a>, API calls are done with <a href="https://github.com/axios/axios">Axios</a> and file uploads are handled with <a href="https://github.com/expressjs/multer">Multer</a>.


### Functionality

---------------------------------------

#### Follow Users
<p align="center" >
 <img src="siteimages/followusers.png?raw=true" width="300px" />
</p>

&nbsp;

#### Personalise posts according to selected topics
<p align="center">
 <img src="siteimages/personalized.png?raw=true" width="400px" />
</p>

&nbsp;
## Usage
Introduce an email into the sign up field and you will receive an email with a link (valid for a limited time) redirecting you to finish the sign up. Password reset is handled in virtually the same way (but green button!).

<p align="center">
 <img src="siteimages/emailsignup.png?raw=true" width="500px" />
</p>

## Live Version
You can see a live working version hosted on Heroku here:

blbal link


## Installation


```bash
cd React-Journalling-App
npm install
npm run concurrently
```


## License
[MIT](https://choosealicense.com/licenses/mit/)
