import * as React from 'react';
import { connect } from 'react-redux';
import './App.css';
import Nav from './Nav'
import Home from './views/Home'
import Stock from './views/Stock'
import StockList from './views/PortfolioContainer'
import Action from './views/Action'
import  { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store/store'
import { useAuth0 } from '@auth0/auth0-react';
import { FullPageSpiner } from './components/lib';


const store = configureStore()

function App() {
  const { isAuthenticated, isLoading, user } = useAuth0()
  console.log('auth ', user, isAuthenticated, isLoading)
  // const val = await getAccessTokenSilently()
  if(isLoading){
    return <FullPageSpiner/>
  }
  return isAuthenticated ? (
    <AuthenticatedApp user={user}/> 
  ) : ( 
    <Provider store={store}>
      <UnauthenticatedApp />
    </Provider>
    )
}

function UnauthenticatedApp(props){
  return (
    <div className="App">
      {/* <Nav/> */}
      <Switch>
        {/* <Route path="/" exact component={Nav} /> */}
        <Route path="/" exact  component={Home} />
        <Route path="/portfolio" exact component={StockList} />
        <Route path="/stock/:symbol/period/:period" exact  component={Stock}/>
        <Route path="/action/:actionType/:symbol" exact component={Action}/>
      </Switch>
    </div>
  )
}

function AuthenticatedApp({user}){
  // console.log(user)
  return (<h1>{user.nickname} le best du monde</h1>)
}


const mapStateToProps = state => ({
  stockData: state.requestReducer.stockData,
  isFetching: state.requestReducer.isFetching,
})

connect(mapStateToProps)(UnauthenticatedApp);
export default App