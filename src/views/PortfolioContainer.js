import React, {useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {fetchStockData} from '../store/actionTypes'
import Portfolio from '../components/Portfolio'
import styled from 'styled-components';


const PortfolioContainer = (props) =>  {
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
        return( <PortfolioStyle><span className="portfolio-loading">
                    <span className="icon-spinner9" style={{color: 'rgb(36, 36, 114)'}}></span>
                    Loading...</span>
                </PortfolioStyle>)
    }
    return (
        <PortfolioStyle>
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
                                <Portfolio stockData={stockData} ob={ob} portfolioData={portfolioData} key={ob}/>
                            )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </PortfolioStyle>
    )
}

const mapStateToProps = state => ({
    stockData: state.requestReducer.stockData,
    isFetching: state.requestReducer.isFetching,
    portfolioData: state.requestReducer.portfolioData
  })

const PortfolioStyle = styled.div`
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

export default connect(mapStateToProps)(PortfolioContainer);