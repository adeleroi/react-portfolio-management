import * as React from 'react'
import { useAuth0, Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter as Router } from 'react-router-dom'



const LoginButton = () => {
    const {loginWithRedirect} = useAuth0()
    return (
        <div className="nav-link">
            <li className="item" onClick={() => loginWithRedirect()}>
                <span className="menu-item start">Login</span>
            </li>
        </div>
    )
}

const LogoutButton = () => {
    const {logout} = useAuth0()
    return (
        <div className="nav-link">
            <li className="item" onClick={() => logout({returnTo: window.location.origin })}>
                <span className="menu-item start">Logout</span>
            </li>
        </div>
    )
}

const Auth0ProviderWrapper = ({children}) => {
    return (
        <>
            <Auth0Provider
                domain="dev-3zcn32gl.us.auth0.com"
                clientId="uffSh2DMW09GJVz6KGZ1Lrtn2Ny4WLuj"
                redirectUri={window.location.origin}
                // audience=""
                // scope=""
            >
                {children}
            </Auth0Provider>
        </>
    )
}

const AppProvider = ({children}) => {
    return (
        <Router>
            <Auth0ProviderWrapper>
                {children}
            </Auth0ProviderWrapper>
        </Router>
    )
}


export {AppProvider, LoginButton, LogoutButton}