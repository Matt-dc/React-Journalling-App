import React, { Component } from 'react'
import axios from 'axios';



 export const UserContext = React.createContext();


 class UserController extends Component {

    constructor(props) {
        super(props)

        this.state = {
            topics: [
                {topic :'Tech',        
                    image: 'tech.jpeg',
                        value: 'tech'    
                },
                {topic :'Language', 
                    image: 'language.jpeg',
                        value: 'language'    
                },
                {topic :'Science', 
                    image: 'science.jpeg',
                        value: 'science'    
                },
                {topic :'Self', 
                    image: 'self.jpeg',
                        value: 'self'    
                },
                {topic :'Society', 
                    image: 'society.jpeg',
                        value: 'society'    
                },
                {topic :'Music', 
                    image: 'music.jpeg',
                        value: 'music'    
                },
                {topic :'Geography', 
                    image: 'geography.jpeg',
                        value: 'geogeography'    
                },
                {topic :'Code', 
                    image: 'code.jpeg',
                        value: 'code'    
                },
                {topic :'Nature', 
                    image: 'nature.jpeg',
                        value: 'nature'    
                },
                {topic :'Health', 
                    image: 'health.jpeg',
                        value: 'health'    
                },
                {topic :'Psych', 
                    image: 'psych.png',
                        value: 'psych'
                },
                {topic :'Food', 
                    image: 'food.jpeg',
                        value: 'food'    
                },
                {topic :'Relationships', 
                    image: 'relationships.jpeg',
                        value: 'relationships'    
                },
                {topic :'Art', 
                    image: 'art.jpeg',
                        value: 'art'    
                },
                {topic :'Movies', 
                    image: 'movies.jpeg',
                        value: 'movies'    
                },

            ],
        }
    }

    updateUser = user => {
        this.setState(user)
    }



 render(){

    return( 

        <UserContext.Provider
            value={{
                isAuth: this.state.isAuth,
                // warnLogin: this.warnLogin,
                updateUser: this.updateUser,
                userId: this.state.userId,
                avatarImage: this.state.avatarImage,
                username: this.state.username,
                topics: this.state.topics,
               
                }}
                >
                {this.props.children}
        </UserContext.Provider>
    )
 }
}

const UserProvider = UserController
const UserConsumer = UserContext.Consumer

export { UserProvider, UserConsumer }

