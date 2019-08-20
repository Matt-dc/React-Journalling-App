module.exports = {
    
    users: {
        confirm: {
            title: 'Check your Inbox',
            body: 'We\'ve sent an email to the email address you provided',
            showRedirect: false,
            btnTxt: 'Ok' 
        }, 
        resend: { 
            title: 'Second time lucky!',
            body: 'We\'ve resent the email. Please check your spam folder',
            showRedirect: false,
            btnTxt: 'Ok' 
        },
        confirmed: { 
            title: 'Congratulations!',
            body: 'Your email is confirmed',   
            showRedirect: true,     
            to: '/signup',
            btnTxt: 'Go to signup' 
        },
        alreadyConfirmedButNotSignedUp: { 
            title: 'Almost done!',
            body: 'It looks like your email has already been confirmed. Add in a few details and you\'re good to go!',
            showRedirect: true,
            to: '/signup',
            btnTxt: 'Go to sign up' 
        },
        alreadyConfirmedAndSignedUp: {
            title: 'Nothing to see here...',
            body: 'You\'re already fully signed up. Get on writing a post or read something interesting :)',
            showRedirect: '/home',
            btnTxt: 'Let\'s go' 
        },
        couldNotFind: { 
            title: 'Oops! We couldn\'t find your details in our system :/',
            body: 'Try signing up again, or get in contact with our technical support team',
            showRedirect: true,
            to: '/home',
            btnTxt: 'Ok',
        },
        signUpCompletedMissingTopics: {
            title: 'All set!',
            body: 'Help us bring you tailored content by telling us a bit about what you\'re interested in',
            showRedirect: true,
            to: '/choosetopics',
            btnTxt: 'Choose topics' 
        },  
        failureCompletingSignUp: {
            title: 'Oops...',
            body: 'There was an error signing you up. Try again later or contact our technical team.',
            showRedirect: true,
            to: '/home',
            btnTxt: 'Ok' 
        },
        topicsChosenSuccessfully: {
            title: 'You\'re good to go!',
            body: 'While we tailor our content to you as best we can, you can always adjust your settings and details in the "Edit profile" tab ',
            showRedirect: true,
            to: '/home',
            btnTxt: 'Ok' 
        },
        recoveryPasswordEmailSent: {
            title: 'Check your email inbox',
            body: 'We\'ve sent you a link, which will take you the password reset page',
            showRedirect: true,
            to: '/home',
            btnTxt: 'Ok' 
        },
        passwordSuccessfullyReset: {
            title: 'Reset Successful',
            body: 'Your password has been successfully reset. Keep it safe :)',
            showRedirect: true,
            to: '/home',
            btnTxt: 'Will do' 
        }
    },

    posts: {
        postCreated: {
            title: 'Post created!',
            body: 'We\'ll let you know when there are comments',
            showRedirect: true,
            to: '/home'
        }, 
        postTitleExists: {
            title: 'What a coincidence!',
            body: 'It looks like you already created a post with that name',
            showRedirect: false
        }, 
        couldNotCreate: {
            title: 'Oops! Error creating post',
            body: 'Please try again or contact our technical support',
            showRedirect: false
        }, 
        couldNotGetPost: {
            title: 'Well fancy that!',
            body: 'It seems we couldn\t find that post. Try reloading the page or check the spelling',
            showRedirect: false
        }, 
        couldNotGetPosts: {
            title: 'Network error',
            body: 'Could not fetch posts. Try reloading the page or check your network',
            showRedirect: false
        }, 
        noPosts:  {
            title: 'No posts yet!',
            body: 'Not to worry - get on creating one. Your audience is waiting',
            showRedirect: true,
            to: '/createpost'        
        } 
    },
    comments: {
        confirm: {
            title: 'Oops',
            body: 'There was a problem saving your comment. Give it another go or try again later',
            showRedirect: false
        }
    }
  
}