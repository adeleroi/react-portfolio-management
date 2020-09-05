import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Nav from './Nav'
import Home from './views/Home'
import Stock from './views/Stock'
import Portfolio from './views/Portfolio'
import Action from './views/Action'
// import {fetchStockData} from './store/actionTypes'
import  { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App(props) {

  // useEffect(() => {
  //   const { dispatch, isFetching } = props;
  //   dispatch(fetchStockData());
  // }, [])


  // const { stockData } = props
  return (
      <Router>
        <div className="App">
          <Nav/>
          <Switch>
            <Route path="/" exact  component={Home} />
            <Route path="/portfolio" exact component={Portfolio}/>
            <Route path="/stock/:slug/:symbol" exact  component={Stock}/>
            <Route path="/action/:actionType/:symbol" exact component={Action}/>
          </Switch>
        </div>
      </Router>
  ) 
}
//component={(props) => <Portfolio {...props} stockData={stockData}/> }
// const mapStateToProps = state => ({
//   stockData: state.requestReducer.stockData,
//   isFetching: state.requestReducer.isFetching,
// })
export default App;

// export default connect(mapStateToProps)(App);
