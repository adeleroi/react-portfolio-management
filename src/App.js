import React from 'react';
import './App.css';
import Nav from './Nav'
import Demo from './Demo'
import Home from './views/Home'
import Stock from './views/Stock'
import  { BrowserRouter as Router, Route, Switch,  useHistory } from 'react-router-dom'

function App() {
  return (
      <Router>
        <div className="App">
          <Nav/>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/demo" component={Demo}/>
            <Route path="/stock" component={Stock}/>
          </Switch>
        </div>
      </Router>
  ) 
}

export default App;
