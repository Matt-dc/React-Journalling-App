import React from 'react'
import { Navbar } from 'react-bootstrap'

export default function footer() {

    return (
        <React.Fragment>
            <div  style={{ marginTop: '10%'}}></div>
                <Navbar bg="dark" variant="dark" fixed="bottom" sticky="bottom">
                        <Navbar.Brand href="/home"><img alt="" src="/assets/book.jpg" width="30" height="30" className="d-inline-block align-top" />
                {' Blogging App '}
                </Navbar.Brand>
            </Navbar>
        </React.Fragment>

        )
    }

    // style={{marginBottom: '30px'}}