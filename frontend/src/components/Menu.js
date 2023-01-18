import React from 'react'
import {Link} from 'react-router-dom'


const MenuItem = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/users'>Users</Link>
                </li>
                <li>
                    <Link to='/projects'>Projects</Link>
                </li>
                <li>
                    <Link to='/todoes'>ToDo Notes</Link>
                </li>
            </ul>
        </nav>
    )
}


export default MenuItem