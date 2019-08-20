import React, { useState } from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap'

import LoginModal from '../authentication/signin/loginModal'
import SignupModal from '../authentication/signup/signUpModal'
import LogoutModal from '../authentication/signin/logoutModal'
import SidebarModal from './sidebar/sidebarModal'
import LoginWarningModal from '../utils/loginWarningModal'

import { UserConsumer } from '../../UserContext';

import ContextWrapper from '../../ContextWrapper';


const NavBar = props => {
    
    const [ showLoginModal, setShowLogin ] = useState(false);
    const [ showSignupModal, setShowSignup ] = useState(false);
    const [ showLogoutModal, setShowLogout ] = useState(false);
    const [ showSidebar, setShowSidebar] = useState(false);

    const handleHideLogin = () => setShowLogin(false);
    const handleHideSignup = () => setShowSignup(false);
    const handleHideLogout = () => setShowLogout(false);

    const handleShowLogin = () => setShowLogin(true);
    const handleShowSignup = () => setShowSignup(true);
    const handleShowLogout = () => setShowLogout(true);
    const handleShowSidebar = () => setShowSidebar(true);


    return (


    <React.Fragment>

        <UserConsumer>
            {value => {
                return (
                    // ## Top user navigation bar ##
                <Navbar bg="light" expand="lg">       
                    <Nav>
                        <Nav.Link onClick={props.toggleSidebar}><i class="fa fa-bars fa-1x" ></i></Nav.Link>    
                    </Nav>    

                    <Navbar.Brand className="ml-auto brand-logo"
                                  className="d-inline-block align-top"  
                                  href="/home">
                                  <img alt="" src="/assets/book.jpg" width="30" height="30" />
                    {' JournallingApp '}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />             

                    <Navbar.Collapse className="mr-auto">
                        <Nav className="mr-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            {value.isAuth &&
                            <>
                                <Nav.Link href="/editprofile">Edit Profile</Nav.Link>
                                <Nav.Link href="/createPost">Write Something</Nav.Link> 
                            </>
                            }    
                        </Nav>
                   
                    {!value.isAuth &&
                        <Nav>
                            <Nav.Link className="nav-button" onClick={handleShowLogin}>Log in</Nav.Link>
                            <Nav.Link className="nav-button" onClick={handleShowSignup}>Sign Up</Nav.Link>
                        </Nav>

                     }
                    {value.isAuth &&
                        <Nav>
                            <Nav.Link href="/editProfile" className="avatar-container">
                                <div className="avatar-image-container">
                                    <Image src={`/${value.avatarImage}`}  width="70px" />
                                </div>
                                <div className="avatar-username">Hi, {value.username}</div>
                            </Nav.Link>
                            {/* <Nav.Link className="user-greeting"> </Nav.Link> */}
                            <Nav.Link className="logout-button" onClick={event => {handleShowLogout(); props.handleUserLogout();}}>Log out</Nav.Link>
                        </Nav>
                    }
                    </Navbar.Collapse>
            </Navbar>
                )
            }}
        </UserConsumer>

       

        <Nav className="justify-content-center" bg="light" variant="light">
            <Nav.Item>
                <Nav.Link href="/topic/tech">Tech</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/topic/language">Language</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/topic/science">Science</Nav.Link>
            </Nav.Item>   
            <Nav.Item>
                <Nav.Link href="/topic/self">Self</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/topic/society">Society</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/topic/music">Music</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/topic/geography">Geography</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/topic/programming">Code</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/topic/nature">Nature</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/topic/psychology">Psych</Nav.Link>
            </Nav.Item>
     
        </Nav>

   

        <LoginModal 
            show={showLoginModal} 
            onHide={handleHideLogin} 
            hideLogin={handleHideLogin} 
            showSignup={handleShowSignup} 
            handleUserLogin={props.handleUserLogin}
            changeHandler={props.changeHandler}
            error={props.error}
            redirectTo={props.redirectTo}
        />
       
       
        <SignupModal 
            show={showSignupModal} 
            onHide={handleHideSignup} 
            hideSignup={handleHideSignup} 
            showLogin={handleShowLogin} 
            handleUserSignup={props.handleUserSignup}
            changeHandler={props.changeHandler}
            error={props.error}
            redirectTo={props.redirectTo}
            msg={props.msg}
            email={props.email}
            submitted={props.submitted}
            sendingEmail={props.sendingEmail}

        />


        <LogoutModal 
            show={showLogoutModal} 
            onHide={handleHideLogout} 
            handleUserLogout={props.handleUserLogout} 

        />


        <SidebarModal 
            show={props.showSidebar} 
            onHide={props.toggleSidebar} 
            followedUsers={props.followedUsers}
        />


        <LoginWarningModal 
            show={props.loginWarning} 
            onHide={props.warnLogin} 
            warnLogin={props.warnLogin} 
        />


    </React.Fragment>

    )
}


export default ContextWrapper(NavBar)
