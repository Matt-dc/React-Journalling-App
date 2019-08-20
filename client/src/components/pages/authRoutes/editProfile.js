import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import  { Row, Col, Container, Form, Button, Image } from 'react-bootstrap'
import axios from 'axios'
import Spinner from '../../utils/spinner'
import ContextWrapper from '../../../ContextWrapper'
import { UserConsumer } from '../../../UserContext'


class EditProfile extends Component {

    state = {
        error: null,
        editing: false,
        type: 'password',
        password: '',
        password2: '',
        match: 'none',
        noMatch: 'none',
        topics:[],
        userInterests: [],
    }


    componentDidMount() {
         axios.get(`/users/`)
            .then(res =>  {
                this.setState({
                    id: res.data.user._id,
                    username: res.data.user.username,
                    email: res.data.user.email,
                    password: null,
                    image: res.data.user.image,
                    userInterests: res.data.user.topics.map(int => int.toLowerCase()),
                })
            })
            .catch(err => {
                this.setState({
                    error: 'There was a problem fetching your details...',
                })
            })   
    }

    changeHandler = e => {
        this.setState({
            error: '',
            [ e.target.name ] : e.target.value,
        }, () => {
            if(this.state.password === this.state.password2) {
                this.setState({
                    match: 'inline',
                    noMatch: 'none',
                })
            } else {
                this.setState({
                    match: 'none',
                    noMatch: 'inline',
                })
            }
        })
    }


    toggleViewPassword = () => {
        this.state.type === "password" ? this.setState({ type: 'text' }) : this.setState({ type: 'password' })
    }

    toggleEdit = () => {
        this.setState({
            editing: !this.state.editing
        })
    }

    interestHandler = e => {

        const clicked = e.target.value;

        this.setState({
            userInterests: this.state.userInterests.includes(clicked) ? 
                this.state.userInterests.filter(interest => {
                    return interest !== clicked
                 })  :  [ ...this.state.userInterests, clicked ]
            })
    }



    fileChangeHandler = e => {
        const img = e.target.files[0];

        let formData = new FormData()
        formData.append('image', img)
        const config = { headers: { 'Content-Type' : 'multipart/form-data' }}

        axios.put(`/users/update/${this.state.id}`, formData, config)
        .then(res => {
            this.setState({
                message: 'done',
                image: res.data.image        
            })
        })
    }



    handleSubmit = e => {

        e.preventDefault();

        const updatedUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            image: this.state.image,
            topics: JSON.stringify(this.state.userInterests),
        }    

        this.setState({
            test: JSON.stringify(updatedUser)
        })

        const config = { headers: { 'Content-Type' : 'multipart/form-data' }}
        let formData = new FormData();

        for (var key in updatedUser) {
            formData.append(key, updatedUser[key])
        }    
        axios.put(`/users/update/${this.state.id}`, formData, config)
        .then(res => {
            if(res.status === 200) {
                this.setState({
                    data: JSON.stringify(res.data),
                    username: res.data.username,
                    email: res.data.email,
                    image: res.data.image,
                    editing: false,
                    userInterests: res.data.topics.map(t => t.toLowerCase()),
                })
            }
        })
        .catch(err => {
            this.setState({
                error: 'There was a problem fetching your details...',
            })
        })   
    }

    render() {
        
      
        if (this.props.isAuth == null) {
            return (
            <div className="spinner-container">
                <Spinner />
            </div>
            )
        } 

        if (this.props.isAuth === false){
            return <Redirect to="/login" />
        }

        const content = (

            this.state.editing ? 

            <>
            <Row className="center" style={{margin: '3em 0'}} >
                <Col>
                    <input 
                        style={{display:'none'}} 
                        type="file" 
                        onChange={this.fileChangeHandler} 
                        ref={fileInput => this.fileInput = fileInput} 
                    /> 
                        
                        <Button onClick={() => this.fileInput.click()}>Update profile image</Button>
                </Col>
                
            </Row>
            <Row>
                <Col sm={3} md={3}></Col>
                <Col sm={6} md={6}>
                    <Form >
                        <Form.Group>
                            <Form.Label>Username</Form.Label>    
                            <Form.Control className="text-muted" type="text" id="username" name="username" onChange={this.changeHandler} value={this.state.username} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>  
                            <Form.Control className="text-muted" type="email" id="email" name="email" onChange={this.changeHandler} value={this.state.email} />
                        </Form.Group>  
                        <Form.Group>
                            <Form.Label>Change Password</Form.Label>{this.state.password && <span style={{margin: '0 2em', color: "8e8e8e", fontSize: "0.8em", textDecoration:'underline', cursor:'pointer' }} onClick={this.toggleViewPassword}>view</span>}  
                            <i class="fa fa-check green fa-xs" style={{display: this.state.match}} ></i>
                                <i class="fa fa-times red" aria-hidden="true"  style={{display: this.state.noMatch}} ></i>
                            <Form.Control className="text-muted" type={this.state.type} id="password" name="password" onChange={this.changeHandler} value={this.state.password} />
                        </Form.Group>
                        <Form.Group>
                        <Form.Label>Repeat New Password</Form.Label>   <i class="fa fa-check green" style={{display: this.state.match}} ></i>
                                <i class="fa fa-times red" aria-hidden="true"  style={{display: this.state.noMatch}} ></i>
                            <Form.Control className="text-muted" type={this.state.type} id="password2" name="password2" onChange={this.changeHandler} value={this.state.password2} />
                        </Form.Group>

            

                        <Row style={{margin: '3em 0 1.5em 0'}}>
                            <Col>
                                <h3>Your interests</h3>
                            </Col>
                        </Row>

                        <UserConsumer>
                            {value => {
                                return (
                                    <Row>
                                        <Col>
                                            {value.topics.map(topic => {
                                            return (
                                                <>
                                                <input type="checkbox" onChange={this.interestHandler} value={topic.value} checked={this.state.userInterests.includes(topic.value)} /><span style={{marginLeft: '2em'}}>{topic.topic}</span><br/>
                                                </>
                                                )
                                            })}
                                        </Col>
                                    </Row>
                                )}
                            }
                        </UserConsumer>
                        

                        {/* {this.state.userInterests} */}
                        <Row style={{ margin: "3em 0"}}>
                            <Col ></Col>
                            <Col className="center" md={2}>
                                <Button onClick={this.handleSubmit}>Update</Button>
                            </Col>
                         
                        </Row>
                    </Form>
                </Col>
                <Col sm={3} md={3}></Col>
            </Row>
            </>

            :

            <>
            <Row className="center" style={{ margin: '3em 0'}}>
                <Col md={3}></Col>
                <Col>
                    <p>{this.state.username}</p>
                    {/* {JSON.stringify(this.state.data)} */}
                </Col>
                <Col md={3}></Col>
            </Row>
            <Row className="center" style={{ margin: '3em 0'}}>
                <Col md={3}></Col>
                <Col>
                    <p>{this.state.email}</p>
                </Col>
                <Col md={3}></Col>
            </Row>
         
            <Row className="center" style={{ margin: '3em 0'}}>
                <Col>                    
                    <h5 style={{color: '#4d72ad'}}>Your interests</h5>
                    <hr />
                    <p>{this.state.userInterests.map(int => {
                        return (
                            <p style={{margin: '1em 0', fontSize: '1.2em', color: '#a1a1a1'}}>{int}</p>
                        )
                    })}</p>
                </Col>
            </Row>
            <Row className="center" style={{ margin: '3em 0'}}>
                <Col md={3}></Col>
                <Col>
                    <Button onClick={this.toggleEdit}>Edit</Button>
                </Col>
                <Col md={3}></Col>
            </Row> 
            </>
        )



        return (

            <Container>
                
                <Row style={{ marginBottom: '3em' }}>
                    <Col className="center">
                        <h1>Edit Profile</h1>
                    </Col>
                </Row>
                <Row className="center">
                    <Col>
                        <div className="profile-page-avatar-container">
                            <Image src={this.state.image} width="200px" />
                        </div>
                    </Col>
                </Row>
                {content}
            </Container>

        )    
           
    }
}

export default ContextWrapper(EditProfile) 