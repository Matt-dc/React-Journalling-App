import React from 'react'
import SidebarItem from './sidebarItem';

import { UserConsumer } from '../../../UserContext'

export default function SidebarModal(props) {

    return (
        <>
        <UserConsumer> 
            {value => (
            <React.Fragment>                        
                <div onClick={props.onHide} className={props.show ? "show-overlay dark-overlay" : "hide-overlay dark-overlay"}></div>
                <div className={props.show ? "show-sidebar sidebar" : "hide-sidebar sidebar"}>
                    <ul>               
                        <li className="sidebar-header" onClick={props.onHide}><i class="fa fa-bars fa-1x" ></i> 
                            <img className="sidebar-logo" alt="" src="/assets/book.jpg" width="30" height="30" />
                            <span className="sidebar-brand">JournalApp</span>
                        </li>  

                       
                            {value.isAuth ?  
                            <>
                            <a href="/userposts"><li className="sidebar-item"><i class="fa fa-file"></i>Your articles</li></a>
                            <a href="/followedusers"><li className="sidebar-item"><i class="fa fa-address-book"></i>Followed users</li></a>
                            <a href="/savedposts"><li className="sidebar-item"><i class="fa fa-bookmark"></i>Saved posts</li></a>
                            <a href="/userhistory"><li className="sidebar-item"><i class="fa fa-history"></i>Reading history</li></a>
        
                            <hr className="sidebar-divider" />
                
                            <h5 className="sidebar-subheader">FOLLOWING</h5>    
                            
                            {props.followedUsers && props.followedUsers.slice(0, 7).map(fol => {
                                    return (
                                        <SidebarItem
                                        fol={fol}
                                        />
                                    )
                            })}
                            </>

                            : 
                    
                            <div className='login-warning-sidebar-message'>
                                <p>
                                    Sign up or login to follow users and receive personalized content
                                </p>
                            </div>
                            }
                    </ul>
                    </div>
                                
                </React.Fragment>
                )}
            </UserConsumer>
            </>

    )

}
