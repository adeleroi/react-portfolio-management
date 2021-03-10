import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Nav from './Nav'
import Home from './views/Home'
import Stock from './views/Stock'
import StockList from './views/PortfolioContainer'
import Action from './views/Action'
// import Svg from './d3'
import {fetchStockData} from './store/actionTypes'
import  { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App(props) {
  const { dispatch } = props;

  useEffect(() => {
    dispatch(fetchStockData());
  }, [])

  return (
      <Router>
        <div className="App">
          <Nav/>
          <Switch>
            <Route path="/" exact  component={Home} />
            <Route path="/portfolio" exact component={StockList} />
            <Route path="/stock/:symbol/period/:period" exact  component={Stock}/>
            <Route path="/action/:actionType/:symbol" exact component={Action}/>
          </Switch>
        </div>
      </Router>
  ) 
}
const mapStateToProps = state => ({
  stockData: state.requestReducer.stockData,
  isFetching: state.requestReducer.isFetching,
})
// export default App;

export default connect(mapStateToProps)(App);
