import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap'; //remember to import CSS styles CDN from React-bootstrap
import Home from './components/Home'  //exact path because of default???
import CustomNav from './components/CustomNav'
import Footer from './components/Footer'

import Post from './components/Post'
import Posts from './components/Posts'


import './App.css';

class App extends Component {

  render() {

    return (

        <Router>
          <div>
              <CustomNav />
              <Route exact path="/" component={Home} />
              <Route path="/customNav" component={CustomNav} />
              <Route path="/post" component={Post} />
              <Route path="/posts" component={Posts} />
              <Route path="/#" />
              <Route path="/#" />
              <Footer />
          </div>
        </Router>


    );
  }
}

export default App;
