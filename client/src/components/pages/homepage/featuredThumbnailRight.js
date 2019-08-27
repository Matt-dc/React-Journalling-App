import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ContextWrapper from '../../../ContextWrapper'
import AuthorDetails from '../../utils/authorThumbnail'

const FeaturedThumbnailRight = props => {

    const bookmark = 
    props.savedArticles && props.isAuth ?
        <i class={props.savedArticles.indexOf(props.post._id) === -1 ?
                "fa fa-bookmark-o bookmark-icon" : 
                "fa fa-bookmark bookmark-icon" }
                id={props.post._id}
                style={{ cursor: 'pointer' }}
                onClick={() => props.toggleSaveHandler(props.post._id)}>
            </i>
        : ''

    return (

        <React.Fragment> 
                <Row>
                    <Col>
                        <Link to={`/readpost/${props.post._id}`}>
                            <div className="featuredThumbnail-image-container">
                                <Image src={`/${props.post.image}`} width="100%"  /><br />
                            </div>
                        </Link>                    
                    </Col>
                </Row>
                <Row style={{ margin: '-1em 0 0 0' }}>
                    <Col md={10}  sm={10} style={{ padding: 0 }}>
                        <Link to={`/readpost/${props.post._id}`}>
                            <h5 className="featuredThumbnail-title">{`${props.post.title}`}</h5>
                        </Link>
                    </Col>
                    <Col md={1}>{bookmark}</Col>
                </Row>
                <Row>
                    <Col>
                        <Link to={`/readpost/${props.post._id}`}>
                            <p className="featuredThumbnail-tagline">{props.post.tagline.substring(0, 25)}</p>
                        </Link>
                    </Col>
                </Row>

                
                <Row>
                    <Col>
                        <Link to={`/profile/${props.post.authorId}`}>
                            <AuthorDetails post={props.post} />        
                        </Link>
                    </Col>
                </Row>
                    


        </React.Fragment>
    )
}

export default ContextWrapper(FeaturedThumbnailRight)


