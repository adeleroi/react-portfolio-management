import React from 'react'
import {ReactComponent as Banner} from './Data.svg'
import {Link} from 'react-router-dom'
import Nav from '../Nav'

const Home = () => {
    return (
        <>
            <Nav/>
            <div className="home-container">
                <div className="container">
                    <div className="banner-info">
                        <h1 className="banner-title">The easiest way to manage your portfolio</h1>
                            <span className="start-demo-msg">
                                <Link className="start-demo-btn" to="/portfolio">
                                    <span>Start Demo</span>
                                </Link>
                            </span>
                    </div>
                    <Banner className="svg-banner"/>
                </div>
            </div>
        </>
    )
}

export default Home;