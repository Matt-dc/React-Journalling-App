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

  // show modals on click and hide opon click outside of the div
  constructor(props) {
    super(props);
    this.state = {
      showModal:''
    }
    this.handleModal = this.handleModal.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }
  handleModal = e => {
    this.setState({
        showModal: e.target.id,
    });
  }
  closeModal = () => {
      this.setState({
          showModal:''
      });
  }
  handleOutsideClick = e => {
    if (this.modal && this.modal.contains(e.target)) return;
     this.closeModal()
  }

  render() {

    return (

        <div>
        <CustomNav showModal={e=>this.showModal(e)}
                    handleModal ={e=>this.handleModal(e)} />

          <Router>
            <div>
                <Route exact path="/" render={props => <Home
                    {...props} showModal={this.state.showModal}
                               handleModal={e => this.handleModal(e)}
                               modalRef={n => (this.modal = n)}
                               handleOutsideClick={e => this.handleOutsideClick(e)}
                                /> } />

                <Route path="/post" component={Post} />
                <Route path="/posts" component={Posts} />
                <Footer />
            </div>
          </Router>
          </div>
    );
  }
}

export default App;
