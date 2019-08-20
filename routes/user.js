const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/checkAuth')
const { passportCheckAuth } = require('../middleware/passportAuth')
const UserController = require('../controllers/users')
const passport = require('passport')


// MULTER
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
    }
});


function fileFilter(req, file, cb) {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({ storage: storage,
                        limits: { filesize: 1024 * 1024 * 5 },
                        fileFilter: fileFilter,                    
                      })


// PASSPORT
require('../middleware/passport')(passport)
 

// SIGN ROUTES
router.post('/sendemail', UserController.send_email)

router.put('/signup/:id', UserController.complete_user_signup)

router.put('/update/image/:id', upload.single('image'), UserController.update_user_image)

router.post('/confirmemail/:token', checkAuth, UserController.confirm_email)

router.put('/choosetopics/:id', UserController.update_user_topics)


// LOGIN ROUTES
router.get('/', UserController.checkUserStatus)

router.post('/login', passport.authenticate('local'), UserController.loginResponse)                            

router.post('/logout', UserController.log_user_out)


//USER INFO UPDATE ROUTES
router.post('/recoverpassword', UserController.recover_password)


router.post('/confirmpasswordrecover/:token', UserController.confirm_password_recover)

router.post('/setnewpassword/:token', UserController.set_new_password)

router.put('/update/:id', upload.single('image'), UserController.update_user)


// AUTHOR PAGE
router.get('/profile/:id', UserController.get_author_profile) 

// fOLLOWED USERS
router.post('/following/:id', UserController.get_users_array)
router.put('/update/following/:id', UserController.update_user_array)
router.get('/userArticles/:id', UserController.get_user_articles)

// LIKES
router.post('/likes/:id', UserController.get_posts_array)
router.put('/update/likes/:id', UserController.update_user_array)

// SAVED ARTICLES
router.post('/savedarticles/:id', UserController.get_posts_array)
router.put('/update/savedarticles/:id', UserController.update_user_array)

//R EADING HISTORY
router.post('/readinghistory/:id', UserController.get_posts_array)
router.post('/update/readinghistory/:id', UserController.update_reading_history)
router.put('/delete/readinghistory/:id', UserController.delete_reading_history_item)



module.exports = router