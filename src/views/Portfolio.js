import React, {useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {fetchStockData} from '../store/actionTypes'
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Portfolio = (props) =>  {
    const {dispatch, stockData, isFetching} = props;
    const [demoSymbol, useSymbol] = useState(['AAPL', 'GOOG', 'AMZN', 'MSFT', 'FB', 'BABA', 'TSLA', 'NVDA', 'CRM', 'PYPL', 'AMD']);
    useEffect(()=>{
            dispatch(fetchStockData());
        }, [])
        if(isFetching || !stockData){
            return( <PortfolioContainer><span className="portfolio-loading">Loading...</span></PortfolioContainer>)
        }
        return (
            <PortfolioContainer>
                <div className="portfolio-holding">
                <h3 className="portfolio-holding-title">Holding</h3>
                    <table className="portfolio-table">
                        <thead>
                            <tr>
                                <th>Symbol/Name</th>
                                <th>Quantity</th>
                                <th>Last Price</th>
                                <th>Change</th>
                                <th>High</th>
                                <th>Volume</th>
                                <th>Market Cap</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {demoSymbol.map(ob => {
                            return (
                                <tr key={stockData[ob].company.symbol}>
                                    <td>
                                    <Link to={{
                                        pathname: `/stock/${stockData[ob].company.companyName}/${stockData[ob].company.symbol}`
                                    }}>
                                        {stockData[ob].company.symbol} <span>({stockData[ob].company.companyName})</span>
                                        </Link>    
                                    </td>
                                    <td>200</td>
                                    <td>{stockData[ob].quote.latestPrice}</td>
                                    <td className={stockData[ob].quote.change > 0 ? 'green-color': 'red-color'}>{stockData[ob].quote.change}</td>
                                    <td >{stockData[ob].quote.high}</td>
                                    <td>{stockData[ob].quote.latestVolume}</td>
                                    <td>{stockData[ob].quote.marketCap}</td>
                                    <td>
                                        <Link to={{
                                            pathname: `/action/buy/${stockData[ob].company.symbol}`
                                        }}>Buy</Link> | 
                                        <Link to={{
                                            pathname: `/action/sell/${stockData[ob].company.symbol}`
                                        }}>Sell</Link>
                                    </td>
                                </tr>)})}
                        </tbody>
                    </table>
                </div>
            </PortfolioContainer>
        )
}

const mapStateToProps = state => ({
    stockData: state.requestReducer.stockData,
    isFetching: state.requestReducer.isFetching,
  })

const PortfolioContainer = styled.div`
        width: 100%;
        display: grid;
        place-items: center;
    .portfolio-loading{
        margin-top: 60px;
        font-size: 1.5rem;
        font-weight: bold;
    }
    .green-color{
        color: green;
    }
    .red-color{
        color: red;
    }
    .portfolio-holding-title{
        width: 100%;
        text-align: left;
    }
    .portfolio-holding{
        width: 80%;
    }
    .portfolio-table{
        width: 100%;
    }
    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
    tr:nth-child(odd) {
        background-color: #dddddd;
    }
    .buy-sell{
        display: flex;
        justify-self: center;
    }
    
`

export default connect(mapStateToProps)(Portfolio);