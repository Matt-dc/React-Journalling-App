import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// utils
import axios from 'axios'
import ContextWrapper from './ContextWrapper';
import Spinner from './components/utils/spinner'

// layout
import NavBar from './components/layout/navBar'
import Footer from './components/layout/footer'

// homepage
import Home from './components/pages/homepage/home';

// pages
import About from './components/pages/about';
import Post from './components/pages/post/post';
import TopicPage from './components/pages/topicPage/topicPage'
import TermsAndConditions from './components/pages/termsAndConditions'
import AuthorProfilePage from './components/pages/authorProfilePage/authorProfilePage'

// auth
import CheckEmail from './components/authentication/signup/checkEmail'
import LoginPage from './components/authentication/signin/loginPage'
import ForgotPassword from './components/authentication/signin/forgotPassword'
import SetNewPassword from './components/authentication/signin/setNewPassword'

// signup
import SignUpForm from './components/authentication/signup/signUpForm'
import Confirm from './components/authentication/signup/confirm'
import ChooseTopics from './components/authentication/signup/chooseTopics'

// authRoutes
import UserPostsFeed from './components/pages/authRoutes/userPosts/userPostsFeed';
import CreatePost from './components/pages/authRoutes/createPost';
import SavedPostsFeed from './components/pages/authRoutes/savedPostsFeed/savedPostsFeed'
import EditProfile from './components/pages/authRoutes/editProfile'
import UserReadingHistory from './components/pages/authRoutes/userHistory/userHistoryFeed'
import FollowedUsersList from './components/pages/authRoutes/followedUsersList/followedUsersList'
import PopularPostsFeed from './components/pages/popularPostsFeed/popularPostsFeed'
import PersonalizedFeed from './components/pages/authRoutes/personalizedFeed/personalizedFeed'


// CSS
import './styles/App.css';
import './styles/Utils.css';
import './styles/Thumbnail.css';
import './styles/Sidebar.css';
import './styles/Pages.css';
import './styles/Navbar.css';
import './styles/Comments.css';


class App extends Component {


  state = {
    loading: true,
    redirectTo: null,
    loginWarning: false,
    submitted: false,
    // followedUsers:[],
  }


  componentDidMount(){
    this.getUser();
    this.setState({ loading: false, })
  }


  getUser = () => {

    axios.defaults.withCredentials = true;
    axios.get('/users/'
    , {withCredentials: true}
    )
        .then(res => {
          if(res.data.user) { 

            this.setState({ 
              savedArticles: res.data.user.saved_articles,
              loading: false,
            })

              this.props.updateUser({
                isAuth: true,
                avatarImage: res.data.user.image,
                userId: res.data.user._id,
                username: res.data.user.username,
            })
          } else {  
            this.props.updateUser({
              isAuth: false,
              loading: false,
            })
          }
        })
          .catch(err =>{
            this.props.user({
              isAuth: false,
              userId: null,
              username: null,
              loading: false,
          })
 
        })
      }

      componentDidUpdate(prevProps){

        if(this.props.userId !== prevProps.userId) {
          this.getFollowedUsers();
        }
      }



    getFollowedUsers = () => {
      axios.post(`/users/following/${this.props.userId}`, { name: 'following' })
      .then(res => {
          this.setState({
              followedUsers: res.data,
         })
      })
      .catch(err => {
        this.setState({
          error: 'There was an error fetching your follwed users',
        })
      })
    }


    warnLogin = () => {
      this.setState({
        loginWarning: !this.state.loginWarning,
      })
    }      
        

    changeHandler = val => {
      this.setState({
          [ val.target.name ]: val.target.value,
          error: '',
      })
}


  handleUserLogin = e => {

    e.preventDefault();

    this.setState({
        loading: true,                        
    })

    const userLogin = {
        email: this.state.email,
        password: this.state.password,
    }

    axios.post('/users/login', userLogin)
        .then(res => {
            if( res.status === 200 ) {
                this.props.updateUser({
                    username: res.data.user.username,
                    author: res.data.user.author,
                    userId: res.data.user._id,
                    isAuth: true,
                    avatarImage: res.data.user.image
                })
                this.setState({
                    redirectTo: true,
                    loading:false,
                })
            } 
      })
        .catch(err => {
          this.setState({
              isAuth: false,
              error: "There was a problem: Please check your login details.",
              password:'',
              loading:false,
        })
    })
  }


  handleUserSignup = e => {
    e.preventDefault();
    
    const re = /^\S+@\S+$/
    if(!re.test(this.state.email)) {
        this.setState({
            error: 'Please enter a valid email',
        })
        return
    }

    this.setState({
        sendingEmail: true,
    })
    
    const emailObj = { email: this.state.email }

    axios.post('/users/sendemail', emailObj)
    .then(res => {
        
        this.setState({
            msg: res.data.msg,
            email: res.data.email,
            submitted: true,
            sendingEmail: false,
        }) 
    })
    .catch(err => console.log(err));
  }


  handleUserLogout = () => {

    this.setState({
        spinner: true,                        
    })

    axios.post('/users/logout')
    .then(res => {
        if( res.status === 200 ) {
          this.props.updateUser({
            username: null,
            userId: null,
            isAuth: false,

          })
          this.setState({
            loading: false,
          })
        } 
  })
    .catch(err => {
      console.log(`There was an error: ${err}`)
        this.setState({
            data: err,
            loading: false,
        })
    })
}


getComments = () => {
    axios.get(`/comments/`)
}


toggleSidebar = () => {

  this.setState({
    showSidebar: !this.state.showSidebar
  })
  if(document.body.style.overflow === "hidden") {
    document.body.style.overflow = "visible"
  } else {
    document.body.style.overflow = "hidden"
  }
}



toggleSaveHandler = id => {

  this.setState({
      savedArticle: id
  })

  const obj = {
      toToggle: id, 
      name: 'saved_articles'
  }

  axios.put(`/users/update/savedArticles/${this.props.userId}`, obj)
  .then(res => {
      this.setState({
          savedArticles: res.data.saved_articles
      })
  })
}



  render(){


    if(this.state.loading) {
        return (
          <div className="spinner-container">
              <Spinner className="spinner" size='2x' spinning='spinning' />
          </div>
        )
    }

    return (

      <Router>

        <div> 

          <NavBar 
              handleUserLogout={this.handleUserLogout} 
              warnLogin={this.warnLogin}
              loginWarning={this.state.loginWarning}
              handleUserLogin={this.handleUserLogin}
              error={this.state.error}
              redirectTo={this.state.redirectTo}
              handleUserSignup={this.handleUserSignup}
              changeHandler={this.changeHandler}
              msg={this.state.msg}
              email={this.state.email}
              submitted={this.state.submitted}
              sendingEmail={this.state.sendingEmail}
              followedUsers={this.state.followedUsers}
              showSidebar={this.state.showSidebar}
              toggleSidebar={this.toggleSidebar}
          />                  

              <Switch>
  
                  {/* Signup / login routes */}
                  <Route exact path='/confirm/:token' component={Confirm} />
                  <Route path="/checkemail" component={CheckEmail} />                  
                  <Route path="/forgotpassword" component={ForgotPassword} />          
                  <Route path='/choosetopics' component={ChooseTopics} />


                  {/* Open routes */}
                  <Route exact path='/' component={Home} />
                  <Route exact path='/home' component={Home} />
                  <Route exact path="/topic/:topic" render={(props) => <TopicPage {...props} savedArticles={this.state.savedArticles} toggleSaveHandler={this.toggleSaveHandler} />} />
                  <Route path="/login" render={(props) => <LoginPage {...props} handleUserLogin={this.handleUserLogin} redirectTo={this.state.redirectTo} changeHandler={this.changeHandler} /> } />                  
                  <Route exact path="/signup" component={SignUpForm} />
              
                  <Route path="/termsandconditions" component={TermsAndConditions} />                 
                  <Route path='/about' component={About} />


                  {/* Auth protected routes */}
                  <Route path='/createpost' render={() => <CreatePost isAuth={this.state.isAuth} />} />
                  
                  <Route path="/savedposts" render={(props) => <SavedPostsFeed {...props} savedArticles={this.state.savedArticles} toggleSaveHandler={this.toggleSaveHandler} />} />
                  <Route exact path='/userposts' render={(props) => <UserPostsFeed {...props} userPosts={this.state.userPosts} />} /> 
                  <Route path="/setnewpassword/:token" component={SetNewPassword} />                  
                  <Route path="/editprofile" component={EditProfile} />                  
                  <Route path="/profile/:id" component={AuthorProfilePage} />

                  <Route exact path='/personalized' render={(props) => <PersonalizedFeed {...props} savedArticles={this.state.savedArticles} toggleSaveHandler={this.toggleSaveHandler} />} />
                  <Route exact path='/popular' render={(props) => <PopularPostsFeed {...props} savedArticles={this.state.savedArticles} toggleSaveHandler={this.toggleSaveHandler} />} />
                 
                  <Route exact path='/followedusers' component={FollowedUsersList} />
                  <Route exact path='/userhistory' component={UserReadingHistory} />

                  <Route exact path='/readpost/:id' render={(props) => <Post { ...props } warnLogin={this.warnLogin} /> } />

                  {/* <Route exact path="/:id" render={() => <Post warnLogin={this.warnLogin} /> } /> */}


              </Switch>
              
            <Footer />

            </div>

        </Router>        

    );
  }
}

export default ContextWrapper(App);
