import React from 'react';
import { UserConsumer } from './UserContext'


const ContextWrapper = Component => {
    return function(props) {
      return (
        <UserConsumer>
            { ({isAuth, updateUser, userId, username, avatarImage, author }) => {
              return <Component {...props} 
                  isAuth={isAuth} 
                  userId={userId} 
                  avatarImage={avatarImage} 
                  username={username}
                  author={author} 
                  updateUser={updateUser} />
            }}
        </UserConsumer>
      )
    }
  }
  
  export default ContextWrapper