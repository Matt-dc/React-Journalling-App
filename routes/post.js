const express = require('express');
const router = express.Router();
const multer = require('multer');
const PostsController = require('../controllers/posts');


// MULTER file image upload
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


// get posts
router.get('/getposts', PostsController.get_all_posts)  // All posts

router.get('/user/posts/:id', PostsController.get_user_posts) // get all posts by an author

router.get('/singlepost/:id', PostsController.get_single_post )

router.get('/user/post/:articleId', PostsController.get_single_user_post) // get single post by an author

router.get('/popular', PostsController.get_popular_posts) // most likes

router.get('/topic/:topic', PostsController.get_posts_on_topic)  // topic page

router.get('/personalized/:topics', PostsController.get_personalized_posts) // based on user-selected topics

router.get('/following/:users', PostsController.get_posts_by_followed_users) // based on user-selected topics




//update post
router.put('/user/update/post/getall/:id', PostsController.update_single_user_post_get_all) // update single post by an author, get all posts back

router.put('/user/update/post/getone/', PostsController.update_single_user_post_get_one) // update single post by an author get single post back

router.put('/user/update/post/image/:articleId', upload.single('image'), PostsController.update_user_post_image) // update single post by an author get single post back

router.delete('/user/delete/post/:id', PostsController.delete_single_user_post) // delete single post by an author



// create post route
router.post('/createpost/image', upload.single('image'), PostsController.create_new_post) //creates the post using the image

router.put('/createpost/update/:articleId', upload.single('image'), PostsController.update_new_post) // update the new post

router.put('/update/likes/:articleId', PostsController.update_post_likes)

router.put('/update/views/:articleId', PostsController.update_post_views)


module.exports = router
