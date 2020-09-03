import React, { useState } from 'react'
import {Link} from 'react-router-dom'
export default function Nav(){
    const [isLogin , Setlog] = useState(false)
    return (
            <div className="nav-bar">
                <div className="nav-items">
                    <div className="nav-logo">
                        <Link to="/" className="nav-link">
                        <span className="menu-logo">
                            Cash
                        </span>
                        </Link>
                    </div>
                        <ul className="items-list">
                            <Link to="/portfolio" className="nav-link">
                                <li className="item">
                                    <span className="menu-item start">Start Demo</span>
                                </li>
                            </Link>
                        </ul>
                </div>
            </div>
    )
}

// function logout(){return <span className="menu-item">Log Out</span>}
// function login(){return <span className="menu-item">Log In</span>}