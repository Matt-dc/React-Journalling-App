import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap'; //remember to import CSS styles CDN from React-bootstrap

export default class Post extends Component {


  render(){
    return(

      <div>

        POSOOOSTTT

          <Form.Control as="textarea" />
          <Button variant="success">Post</Button>
          <p>Time, date, location</p>
          <hr/>
      </div>

    );
  }
}
