import React from 'react';
import './App.css';
import Nav from './Nav'
// import Demo from './Demo'
import Home from './views/Home'
import Stock from './views/Stock'
import Portfolio from './views/Portfolio'
import Action from './views/Action'
import  { BrowserRouter as Router, Route, Switch,  useHistory } from 'react-router-dom'

function App() {
  return (
      <Router>
        <div className="App">
          <Nav/>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/portfolio" exact component={Portfolio}/>
            <Route path="/stock/:slug/:symbol" exact  component={Stock}/>
            <Route path="/action/:actionType/:symbol" exact component={Action}/>
          </Switch>
        </div>
      </Router>
  ) 
}

export default App;
