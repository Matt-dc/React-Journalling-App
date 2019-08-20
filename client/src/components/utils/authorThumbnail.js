import React from 'react'


export default function AuthorDetails(props) {
    return (
        <>
            
            <div className="author-details-container">
                <div className="authorThumbnail-image-container">
                        <a href={`/profile/${props.post.authorId}`}><img src={`/${props.post.authorAvatar}`} width="70px"/></a>
                </div>
                <div className="author-date-container">
                        <div style={{marginRight: '2em' }}>
                            <a href={`/profile/${props.post.authorId}`}>
                                <span className="authorThumbnail-author">{props.post.author}</span>
                            </a>
                        </div>
                        <div>
                            <div className="authorThumbnail-date">
                                <span >{props.post.date}</span>
                            </div>
                            <div className="authorThumbnail-comments">
                                <span >{`${props.post.comments} comments`}</span>
                            </div>
                        </div>
                </div>

            </div>

        </>
    )
}
