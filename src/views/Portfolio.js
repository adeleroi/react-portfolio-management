import React, {useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {fetchStockData} from '../store/actionTypes'
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Portfolio = (props) =>  {
    const {dispatch, stockData, isFetching, portfolioData} = props;
    const [demoSymbol, setSymbol] = useState(['AAPL', 'GOOG', 'AMZN', 'MSFT', 'FB', 'BABA', 'TSLA', 'NVDA', 'CRM', 'PYPL', 'AMD']);
    const formatter = new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'USD'
    })
    useEffect(()=>{
            dispatch(fetchStockData());
        }, [])
        if(isFetching || !stockData){
            return( <PortfolioContainer><span className="portfolio-loading">Loading...</span></PortfolioContainer>)
        }
        return (
            <PortfolioContainer>
                <div className="portfolio-holding">
                    <div className="portfolio-infos">
                        <h3 className="portfolio-holding-title">Holdings</h3>
                        <div className="portfolio-market-data">
                            <span className="portfolio-market-value-title">Total Market Value</span>
                            <span className="portfolio-market-value">
                                {formatter.format(portfolioData.reduce((ac, ob) => ac + (ob.quantity * ob.close), 0))}
                            </span>
                        </div>
                    </div>
                    <table className="portfolio-table">
                        <thead>
                            <tr>
                                <th>Symbol/Name</th>
                                <th>Quantity</th>
                                <th>Last Price</th>
                                <th>Change</th>
                                <th>%Change</th>
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
                                    <td>{portfolioData.find((x) => x.symbol === ob).quantity}</td>
                                    <td>{formatter.format(stockData[ob].quote.latestPrice)}</td>
                                    <td className={stockData[ob].quote.change > 0 ? 'green-color': 'red-color'}>{stockData[ob].quote.change}</td>
                                    <td className={stockData[ob].quote.changePercent > 0 ? 'green-color': 'red-color'}>{stockData[ob].quote.changePercent}</td>
                                    <td>{stockData[ob].quote.latestVolume}</td>
                                    <td>{formatter.format(stockData[ob].quote.marketCap)}</td>
                                    <td>
                                        <Link to={{
                                            pathname: `/action/buy/${stockData[ob].company.symbol}`,
                                            state:{
                                                latestPrice: stockData[ob].quote.latestPrice,
                                            }
                                        }}>Buy</Link> | 
                                        <Link to={{
                                            pathname: `/action/sell/${stockData[ob].company.symbol}`,
                                            state:{
                                                latestPrice: stockData[ob].quote.latestPrice,
                                            }                                            
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
    portfolioData: state.requestReducer.portfolioData
  })

const PortfolioContainer = styled.div`
        width: 100%;
        display: grid;
        place-items: center;
        margin-top: 40px;
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
        font-size: 1.8rem;
    }
    .portfolio-holding{
        width: 80%;
    }
    .portfolio-table{
        width: 100%;
    }
    .portfolio-infos{
        display: flex;
    }
    .portfolio-market-data{
        display: flex;
        flex-direction: column;
        width: 35%;
        justify-content: center;
        line-height: 25px;
    }
    .portfolio-market-value-title{
        text-align: right;
        font-weight: bold;
        font-size: 1.3rem;
    }
    .portfolio-market-value{
        text-align: right;
        font-weight: bold;
        font-size: 1.8rem;
        margin-bottom: 30px;
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