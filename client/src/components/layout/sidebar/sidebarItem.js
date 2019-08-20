import React from 'react'
import { Image } from 'react-bootstrap'


export default function SidebarItem( props ) {
    return (
        <>
            <li className="sidebar-item">
                <a href={`/profile/${props.fol._id}`}>
                    <div className="sidebar-profile-disc">
                        <Image src={`/${props.fol.image}`} height="50px" />
                    </div>
                    <div style={{display: 'inline'}}>{props.fol.username}</div>
                </a>
            </li>
        </>
    )
}
