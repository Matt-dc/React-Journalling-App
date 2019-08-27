const User = require('../models/User');
const Post = require('../models/Post');
const sendEmail = require('../email/email.send');
const msgs = require('../email/email.msgs');
const confirmationTemplate = require('../email/email.confirmationTemplate');
const recoveryTemplate = require('../email/email.recoveryTemplate');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


exports.checkUserStatus = (req, res) => {

    if(req.user) {
        res.json({user: req.user})
        console.log(`Currently logged in as ${req.user}`)
    } else {
        res.json({ user: null})
        console.log('No user currently logged in')
    }
}


// ##############
//  Sign up  ###
// #############

exports.send_email = (req, res) => {

    const email = req.body.email;   

    User.findOne({ email })
    .then(user => {   
        if(!user) {
            User.create({ email })   
            .then(user => {
                const token = jwt.sign({
                    email: user.email,
                    userId: user._id 
                }, process.env.JWT_KEY, { expiresIn: "1hr" })

                sendEmail(user.email, confirmationTemplate.confirm(token), token)
                .then(() => res.json({msg: msgs.users.confirm}))
            })
        }
        else if(user && !user.confirmed) {

            const token = jwt.sign({
                email: user.email,
                userId: user._id 
            }, process.env.JWT_KEY, { expiresIn: "1hr" })

            sendEmail(user.email, confirmationTemplate.confirm(token))
            .then(() => res.json({ msg: msgs.users.resend }))
        } 
        else if(user && user.confirmed && !user.password){
            res.json({ msg: msgs.users.alreadyConfirmedButNotSignedUp,
                       email: user.email
                    })
        }
        else if(user && user.confirmed && user.password && user.topics.length < 1){
            res.json({ msg: msgs.users.signUpCompletedMissingTopics,
                       email: user.email
                    })
        } else {
            res.json({ msg: msgs.users.topicsChosenSuccessfully,
                       email: user.email,
                       id: user._id,
            })
        }   
    })    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                      });
}



exports.confirm_email = (req, res) => {
     
     const token = req.params.token;
     const decoded = jwt.verify(token, process.env.JWT_KEY)
     
     User.findById( decoded.userId )
     .then(user => {
        if(!user) {
            res.json({ msg: msgs.users.couldNotFind})
        }
        else if(user && !user.confirmed) {
            User.findByIdAndUpdate(decoded.userId, { confirmed: true })
            .then(() => res.json({ 
                msg: msgs.users.confirmed, 
                email: user.email,
                id: user._id,
             }))
                .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
        }
        else if(user && user.confirmed && !user.password) {
            res.json({ msg: msgs.users.alreadyConfirmedButNotSignedUp,
                       email: user.email,
                       id: user._id,
                })
        }
        else {
            res.json({ msg: msgs.users.alreadyConfirmedAndSignedUp,
                       email: user.email,
                       id: user._id,
                })
            }
        })    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                      });
}


exports.update_user_image = (req, res) => {

        const { id } = req.params
        const updatedImg = req.body
        updatedImg.image = req.file.path

        User.findByIdAndUpdate({ _id: id }, updatedImg, { new: true }, (err, doc) => {
            if(err) {
                return res.send(err);
            } else {
                return res.send(doc);
            }
        })
    }



exports.complete_user_signup = (req, res) => {

    const { id } = req.params
    const { password } = req.body
    const updatedObj = req.body;

        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hashedPwd) => {
            
            updatedObj.password = hashedPwd;
    
            User.findByIdAndUpdate({ _id: id }, updatedObj, { new: true }, (err, doc) => {
                if(err) {
                    res.send({ msg: msgs.users.signUpCompletedMissingTopics });
                } else {
                    res.send({ msg: msgs.users.signUpCompletedMissingTopics });
                }
            })
        })
}



// ##################
//  Login Auth   ###
// ##################


exports.loginResponse = (req, res) => { 
    if( req.user ) {
        return res.json({user: req.user})
    } else {
       return res.json({ error: {message: 'msgs.users.loginFailure ' }})
    }
}


exports.log_user_out = (req, res) => {
    req.logout();
    res.json({ msg: 'You are now logged out',
               redirectURI: '/about'
    })
}   



// ##################
//  update user   ###
// ##################


exports.update_user = (req, res) => {

    // Node throws error for req.body.hasOwnProperty('bla') otherwise
    req.body = JSON.parse(JSON.stringify(req.body)); 

    const updatedObj = req.body;
    const id = req.params.id
    let updatedPwd

    if('password' in req.body) updatedPwd = req.body.password
    
    if(req.body.hasOwnProperty('topics')) {
        const parsed = JSON.parse(req.body.topics)
        req.body.topics = parsed
    }
  
    if(req.file) {
        updatedObj.image = req.file.path
    }
  
    if(updatedPwd) {
        
        bcrypt.hash(updatedPwd, 10, (err, hashedPwd) => {
            updatedObj.password = hashedPwd;

                User.findByIdAndUpdate({ _id: id }, updatedObj, { new: true }, (err, doc ) => {
                    if(err) {
                        return res.send(err);
                    } else {
                        return res.send(doc);
                    }
                })
            })
        } else {
            User.findById(id)
            .then(user => {
                updatedObj.password = user.password;

                User.findOneAndUpdate({ _id: id }, updatedObj, { new: true }, (err, doc ) => {
                    if(err) {
                        return res.send(err);
                    } else {
                        return res.send(doc);
                    }
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
    }
}



exports.update_user_topics = (req, res) => {

    const userToUpdate = req.params.id;
    const updatedObj = req.body

    User.findByIdAndUpdate({ _id: userToUpdate }, updatedObj, {new: true}, (err, doc) => {
        if(err) {
            res.send(err);
        } else {
            res.json({ msg: msgs.users.topicsChosenSuccessfully });
        }
    })
}


exports.recover_password = (req, res)  => {

    const { email } = req.body

    User.findOne({ email })
    .then(user => {

        if(!user) {
            res.status(404).json({ msg: 'sorry, that email doesn\'t exist in our system' })
        } else {
            const token = jwt.sign({
                email: user.email,
                userId: user._id 
            },  process.env.JWT_KEY, { expiresIn: "1hr" 
        })
            sendEmail(user.email, recoveryTemplate.confirm(token), token)
            .then(() => res.json({ msg: msgs.users.recoveryPasswordEmailSent }))
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}



exports.set_new_password = (req, res) => {

    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const id = decoded.userId;
    const updatedPwd = req.body.password

    User.findById(id)

    .then(user => {

       if(!user) {
           res.json({ msg: msgs.users.couldNotFind})
       }

       else {
            bcrypt.hash(updatedPwd, 10, (err, hashedPwd) => {
                user.password = hashedPwd;

                User.findByIdAndUpdate(id, user, { new: true }, (err, doc) => {
                    if(err) {
                        return res.send(err);
                    } 
                })
                .then(() => res.json({ 
                    msg: msgs.users.passwordSuccessfullyReset,
                    id: user._id,
                    email: user.email,
                 }))
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            })
       }
    })
}



exports.confirm_password_recover = (req, res) => {

    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    
    User.findById( decoded.userId )
    .then(user => {
       if(!user) {
           res.json({ msg: "We can't find your email on the system. Are you sure you have an account?"})
       }
       else {
           res.send(user)
           }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}



// ##############################
//  user saved information   ###
// #############################


exports.get_author_profile = (req, res) => {

    const id = req.params.id;

    User.findById(id)
    .then(user => {
        if (!user) {
            res.json({ msg: 'No such user exists '})
        } else {
            res.send(user)
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}



// #####################################
//  likes, savedArticles, following  ###
// #####################################


exports.get_users_array = (req, res) => {

    const { id } = req.params
    const { name } = req.body

    User.findById(id)
    .then(user => {
        if(!user) {
            res.status(401).json({msg: "No User!"})
        } else {
            // const query = user[name]
            const query = user[name]

            User.find({ '_id': { $in: query } })
            .then(user_array => {
                if(user_array) {
                    res.send(user_array)
                } else {
                    res.status(404).json({ msg: "no articles found" })
                }
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}


exports.get_posts_array = (req, res) => {

    const { id } = req.params
    const { name } = req.body

    User.findById(id)
    .then(user => {
        if(!user) {
            res.status(401).json({msg: "No User!"})
        } else {
            const query = user[name]

            Post.find({ '_id': { $in: query } })
            .then(posts_array => {
                if(posts_array) {
                    res.send(posts_array)
                } else {
                    res.json({ msg: "no articles found" })
                }
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}


exports.get_user_articles = (req, res) => {
 
    const { id } = req.params

    Post.find({ authorId: id})
    .then(posts => {
        res.send(posts)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}


exports.update_user_array = (req, res) => {

    const { id } = req.params
    const { name, toToggle } = req.body
    
    User.findById(id)
    .then(user => {

        if(!user[name].includes(toToggle)) {
            user[name] = [...user[name], toToggle]
        } else {
            user[name] = user[name].filter(f => {
                return f != toToggle
            })
        }

        User.findByIdAndUpdate({ _id: id }, user, { new: true }, (err, doc ) => {
            if(err) {
                return res.send(err);
            } else {
                return res.send(doc);
            }
        })    
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}


exports.update_reading_history = (req, res) => {
 
    const { id } = req.params
    const { articleId } = req.body

    User.findById(id)
    .then(user => {
        if(user) {
            if(! 'reading_history' in user) {
                user.reading_history = [ ...user.reading_history, articleId ]
            } else if(! user.reading_history.includes(articleId)) {
                user.reading_history = [ ... user.reading_history, articleId ]
            }

            User.findByIdAndUpdate({ _id: id }, user, { new: true }, (err, doc ) => {
                if(err) {
                    return res.send(err);
                } else {
                    return res.send(doc);
                }
            }) 
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}


exports.delete_reading_history_item = (req, res) => {

    const { id } = req.params
    const { articleId } = req.body
    
    User.findById(id)
    .then(user => {
        if(user) {
            if(user.reading_history.includes(articleId)) {
                user.reading_history = user.reading_history.filter(el => {
                    return el != articleId
                })
            }
            User.findByIdAndUpdate({ _id: id }, user, { new: true }, (err, doc) => {
                if(err) {
                    return res.send(err);
                }
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      })
    .then(() => {
        User.findById(id)
        .then(user => {
            if(user) {
                Post.find({ '_id': { $in: user['reading_history'] } })
                .then(posts => {
                    if(posts) {
                        res.send(posts)
                    } else {
                        res.json({ msg: "No more items found" })
                    }
                })
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}