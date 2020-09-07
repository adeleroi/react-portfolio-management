
/*React*/
import * as realTimeConfig from '../chartConfig/realTimeChart';
import React, { useState, useEffect, useRef } from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import styled from 'styled-components';

/*chart.js*/
import { Line } from "react-chartjs-2"
import "chartjs-plugin-streaming";
import Svg from '../chartConfig/Svg'


const Stock =  (props) => {
    // State
    const [period, setPeriod] = useState('1M');
    const date = new Date().toDateString();
    const [isRealTime, setRealTime] = useState(false);
    const {slug} = props.match.params;
    const {symbol} = props.match.params;
    const companyName = slug;

    // props
    const { isFetching, stockData } = props

    useEffect(()=> {
        console.log("stockdata",stockData,  isFetching)
    }, []);
    // HandleClick
    const handleClickPeriod = (period) => {
        if (period === "RT"){
            setRealTime(true);
        }else{
            setRealTime(false);
        }
        setPeriod(period);
        changeTab(period);
    }
    // Extra Layout
    const changeTab = (id) => {
        const periods = document.getElementsByClassName("stock-timeseries-period");
        for (var i = 0; i < periods.length; i++){
            periods[i].style.color = "black";
        }
        document.getElementById(id).style.color = "blue";
    }
    // Extra Request
    const Token = "pk_99d153747d5a4c939661c8f2fb359437"
    const baseUrl = "https://cloud.iexapis.com/stable"
    const sandbaseUrl = "https://sandbox.iexapis.com/stable";
    const sandToken = "Tsk_f449b3b9b1e04ea3b0e1e41c195a4359"

    if(isFetching || !stockData){
        return <h1>Loading...</h1>
    }
    return (
        <div className="stock-container">
            <div className="stock-menu-date">
                <span className="stock-today">{date}</span>
                <div className="stock-stock-menu">
                    <div className="stock-trade-info">
                        <div className="stock-infos">    
                            <span className="stock-symbol-title">{stockData[symbol].quote.symbol}</span>
                            <div className="stock-companyName-exchange">
                                <span className="stock-companyName">{stockData[symbol].quote.companyName}</span>
                                <span className="stock-exchange">{stockData[symbol].quote.primaryExchange}</span>
                            </div>
                        </div>
                    </div> 
                    <div className="stock-buy-sell-menu">
                        <div className="stock-price">
                            <div style={{display:"flex"}}>{stockData[symbol].quote.close} $</div>
                            <div className="stock-change-changepercent">
                                <GreenRed>
                                    <span className={stockData[symbol].quote.change > 0? 'green': 'red'}>{stockData[symbol].quote.change}</span>
                                    <span className={stockData[symbol].quote.change > 0? 'green': 'red'}>({stockData[symbol].quote.changePercent}%)</span>
                                </GreenRed>
                            </div>
                        </div>
                        <div className="stock-buy-sell">
                            <button className="stock-buy-btn">
                                <Link
                                    to={{
                                        pathname: `/action/buy/${props.match.params.symbol}`,
                                        state: {
                                            stockPrice: stockData[symbol].quote.close
                                        }
                                    }}
                                >
                                    <span>Buy</span>
                                </Link>
                            </button>
                            <button className="stock-buy-btn" >
                                <Link 
                                    to={{
                                        pathname: `/action/sell/${props.match.params.symbol}`,
                                        state: {
                                            stockPrice: stockData[symbol].quote.close
                                        }
                                    }}    
                                >
                                    <span>Sell</span>
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="stock-chart-container">
                <div className="stock-data-visualization">    
                    <div className="stock-chart">
                        <div className="stock-timeseries-menu">
                            <ul className="stock-timeseries-periods">
                                <li className="stock-timeseries-period" id="RT" onClick={(e) => handleClickPeriod("RT")}>Real time</li>
                                <li className="stock-timeseries-period" id="1D" onClick={(e) => handleClickPeriod("1D")}>1D</li>
                                <li className="stock-timeseries-period" id="5D" onClick={(e) => handleClickPeriod("5D")}>5D</li>
                                <li className="stock-timeseries-period" id="1M" onClick={(e) => handleClickPeriod("1M")}>1M</li>
                                <li className="stock-timeseries-period" id="3M" onClick={(e) => handleClickPeriod("3M")}>3M</li>
                            </ul>
                        </div>
                    </div>
                    <div className="stock-stock-chart">
                        { isRealTime && <Line data={realTimeConfig.data(companyName)} options={realTimeConfig.options(stockData[symbol].quote.close) } type={'line'}/>}
                    </div>
                </div>
            </div>
            { !isRealTime && <Svg period={period} symbol={props.match.params.symbol} className="svg-d3"></Svg>}

            <div className="stock-company-info">
                <div className="infos-infos">
                    <div>
                        <span className="lable-description">Sector </span>
                        : {stockData[symbol].company.sector}
                    </div>
                    <div>
                        <span className="lable-description">Employees </span>
                        : {stockData[symbol].company.employees}
                    </div>
                    <div>
                        <span className="lable-description">Industry </span>
                        : {stockData[symbol].company.industry}
                    </div>
                </div>
                <div className="company description">
                    <span className="labledescription">Description</span>
                     : {stockData[symbol].company.description}
                </div>
            </div> 
        </div>
    )
}

const mapStateToProps = state => ({
    stockData: state.requestReducer.stockData,
    isFetching: state.requestReducer.isFetching,
  })

const GreenRed = styled.div`
  .green{
      color: green;
      font-size: 1.5rem;
      margin-right: 15px; 
  }
  .red{
      color: red;
      font-size: 1.5rem
  }

`

export default connect(mapStateToProps)(Stock);