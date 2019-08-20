import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Modal } from 'react-bootstrap'
import Spinner from '../../utils/spinner'


export default class SignUp extends Component {

    constructor(props) {  // SHOULD BE A FUNCITONAL COMP.
        super(props);

        this.state = {
            }
    }


    changeHandler = e => {
        this.props.changeHandler(e)
    }
   
    
    render() {

            const modal = (

            this.props.submitted && this.props.msg ? 
            
            <Modal {...this.props} size="lg">
                <Row className="center">
                    <Col style={{margin: '4% 0 2% 0'}}>
                        <h1>{(this.props.msg.title)}</h1>
                    </Col>
                </Row>
              
                <Modal.Body>
                    <Row className="show-grid center" style={{ margin: "8% 0 2% 0"}}>
                        <Col>
                            <h5>{this.props.msg.body}</h5>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Link  
                        className="link-as-button" 
                        onClick={this.props.hideSignup} 
                        to={{pathname: this.props.msg.to, state:{ email: this.props.email, set: true }}}>
                        {this.props.msg.btnTxt}
                        </Link>
                </Modal.Footer>
            </Modal>
            
            : 

            <Modal {...this.props} size="lg">
                <Modal.Body>

                    <Row className="show-grid center" style={{ margin: "8% 0 2% 0"}}>
                        <Col>
                            <h1>Join us!</h1>
                        </Col>
                    </Row>
          
                    <Row className="show-grid">
                        <Col sm={3} md={3}></Col>
                        <Col className="center" sm={6} md={6}>
                            <p style={{fontSize: '0.9em', color:'#656565',
                            marginBottom: '5%'
                            }}>Stay up to date with all our articles 
                                and get our personalized recommendations about
                                all the things that are important to you.</p>
                        </Col>
                        <Col sm={3} md={3}></Col>
                    </Row>  

                    {/* Modal body */}
                    <Row>
                        <Col sm={3} md={3}></Col>
                        <Col sm={6} md={6}>
                            <Form onSubmit={this.props.handleUserSignup}>
                            <Form.Group controlId="formBasicEmail">
                            <Form.Control onChange={this.changeHandler} name="email" value={this.props.email} placeholder="Enter email" />
                            <Form.Text className="text-muted center">
                                We'll never share your email with anyone else.
                            </Form.Text>
                            </Form.Group>
                            <Row>
                                <Col className="center" style={{marginBottom:'3%'}}>  
                                    <Button variant="dark" type="submit"> {this.props.sendingEmail ? 
                                        <span><Spinner spinning="spinning" size="1x" /></span> : 'Sign up' }
                                    </Button>
                                </Col>
                            </Row>
                            </Form>
                            <p style={{color: 'red'}}>{this.state.error}</p>
                        </Col>    
                    </Row>
                    <Row>
                        <Col className="center">
                            <p style={{margin:'2% 0 3% 0'}}
                            >Already have an account? 
                                <span onClick={event => {
                                    this.props.hideSignup(); 
                                    this.props.showLogin();}} 
                                    style={{color:'#0069d9', 
                                    cursor: 'pointer', 
                                    marginLeft:'1%'}}
                                    > Sign in</span></p>
                        </Col>
                    </Row>
                   
            </Modal.Body>
        </Modal>

        )

        if(this.state.spinner) {
            return (
                <div className="spinner-container">
                    <Spinner size={2} />
                </div>
            )
        }
        
        return (

            <React.Fragment>
                {this.state.confirming ? <Spinner size='8x' spinning={'spinning'} /> 
                : 
                modal
                }
            </React.Fragment>
        )
    }
}

 
