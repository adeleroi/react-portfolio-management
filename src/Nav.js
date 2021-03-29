import React from 'react'
import {Link, Route} from 'react-router-dom'
// import { LoginButton, LogoutButton } from './context/auth-provider'

export default function Nav(){
    return (
            <div className="nav-bar">
                <div className="nav-items">
                    <div className="nav-logo">
                        <Link to="/" className="nav-link">
                        <span className="menu-logo">
                            Cash
                            {/* <img
                                style={{width: '60px', height: '30px'}} 
                                src="https://fontmeme.com/permalink/210329/4a31d2ff4ab57e607e1f0cafbc34de84.png" alt="img"
                            /> */}
                        </span>
                        </Link>
                    </div>
                        <ul className="items-list">
                            <Route path="/" exact>
                            <Link to="/portfolio" className="nav-link">
                                <li className="item">
                                    <span className="menu-item start">Start Demo</span>
                                </li>
                            </Link>
                            </Route>
                            {/* <LoginButton/>
                            <LogoutButton/> */}
                        </ul>
                </div>
            </div>
    )
}
