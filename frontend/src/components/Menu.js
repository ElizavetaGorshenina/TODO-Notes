import React from 'react'
import {Link} from 'react-router-dom'
import App from './components/App.js'


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
                <li>
                    {this.App.is_authenticated() ? <button onClick={()=>this.App.logout()}>Logout</button> : 
                        <Link to='/login'>Login</Link>}
                </li>
            </ul>
        </nav>
    )
}


export default MenuItem