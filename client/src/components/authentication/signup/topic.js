import React from 'react'

export default function Topic(props) {

    return (
    
        <div style={{
                    backgroundImage: `url(assets/topics/${props.topicImage})`,
                    width: '250px',
                    height: '125px',
            }}>
          
                <div style={{ 
                        background: 'rgba(0, 0, 0, 0.3)',
                        width: '250px',
                        height: '125px',
                        color: '#fff',
                        fontSize: '2em',
                        fontWeight: 'bold',
                        padding: '1.2em 0',
                        zIndex: '1',
                        boxShadow: 'none',

                        }} 
                onClick={props.topicHandler} 
                onMouseEnter={props.mouseEnter}
                onMouseLeave={props.mouseLeave}
                >{props.topic}
                </div> 
        </div> 
       
    )
}
