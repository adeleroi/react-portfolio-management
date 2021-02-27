
/*React*/
import * as realTimeConfig from '../chartConfig/realTimeChart';
import React, { useState } from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import styled from 'styled-components';

/*chart.js*/
import { Line } from "react-chartjs-2"
import "chartjs-plugin-streaming";
import Chart from '../components/Chart'
import CompanyInfo from '../components/CompanyInfo';
import { sellStock } from '../store/actionTypes';
import {FullPageSpiner} from '../components/Spiner'


const Stock =  ({history, ...props}) => {

    const [period, setPeriod] = useState(() => props.match.params.period);
    const date = new Date().toDateString();
    const [isRealTime, setRealTime] = useState(false);
    const {symbol} = props.match.params;
    const { isFetching, stockData } = props;

    const handleClickPeriod = (period) => {
        history.push(`/stock/${symbol}/period/${period}`)
        if (period === "RT"){
            setRealTime(true);
        }
        setPeriod(period);
    }

    const changeTab = (id) => {
        const periods = document.getElementsByClassName("stock-timeseries-period");
        for (var i = 0; i < periods.length; i++){
            periods[i].style.borderBottom = "none";
        }
        document.getElementById(id).style.borderBottom = "2px solid blue";
    }

    React.useEffect(() => {
        if(isFetching || !stockData){
            return
        }
        changeTab(period)
    }, [period, isFetching])

    if(isFetching || !stockData){
        return <FullPageSpiner/>
    }
    return (
        <div className="stock-container">
            <StockMenuHeader stockData={stockData} symbol={symbol} date={date} {...props}/>
            <div className="stock-chart-container">
                <div className="stock-data-visualization">    
                    <div className="stock-chart">
                    <PeriodStyle>
                        <div className="stock-timeseries-menu">
                            <ul className="stock-timeseries-periods">
                                <li className="stock-timeseries-period" id="RT" onClick={() => handleClickPeriod("RT")}>Real time</li>
                                <li className="stock-timeseries-period" id="1D" onClick={() => handleClickPeriod("1D")}>1D</li>
                                <li className="stock-timeseries-period" id="5D" onClick={() => handleClickPeriod("5D")}>5D</li>
                                <li className="stock-timeseries-period" id="1M" onClick={() => handleClickPeriod("1M")}>1M</li>
                                <li className="stock-timeseries-period" id="3M" onClick={() => handleClickPeriod("3M")}>3M</li>
                                <li className="stock-timeseries-period" id="2Y" onClick={() => handleClickPeriod("2Y")}>2Y</li>
                            </ul>
                        </div>
                    </PeriodStyle>
                    </div>
                    {/* { isRealTime && <Line data={realTimeConfig.data(companyName)} options={realTimeConfig.options(stockData[symbol].quote.close) } type={'line'}/>} */}
                    { !isRealTime && <Chart period={period} symbol={props.match.params.symbol} className="svg-d3"></Chart>}
                </div>
            </div>
            <CompanyInfo stockData={stockData} symbol={symbol}/>
        </div>
    )
}

const StockCompanyInfo = ({stockData, symbol}) => {
    return (
        <>
            <div className="stock-trade-info">
                <div className="stock-infos">    
                    <span className="stock-symbol-title">{stockData[symbol].quote.symbol}</span>
                    <div className="stock-companyName-exchange">
                        <span className="stock-companyName">{stockData[symbol].quote.companyName}</span>
                        <span className="stock-exchange">{stockData[symbol].quote.primaryExchange}</span>
                    </div>
                </div>
            </div> 
        </>
    )
}

const StockValueInfo = ({stockData, symbol}) => {
    return (
        <>
            <div className="stock-price">
                <div style={{display:"flex"}}>{stockData[symbol].quote.latestPrice} $</div>
                <div className="stock-change-changepercent">
                    <GreenRed>
                        <span className={stockData[symbol].quote.change > 0? 'green': 'red'}>{stockData[symbol].quote.change}</span>
                        <span className={stockData[symbol].quote.change > 0? 'green': 'red'}>({stockData[symbol].quote.changePercent}%)</span>
                    </GreenRed>
                </div>
            </div>
        </>
    )
}

const ActionButton = ({action, match, symbol, stockData}) => {
    const btnStyle = {
        textDecoration: "none",
        color: action === 'buy' ? 'white' : 'rgb(36, 36, 114)',
        backgroundColor: action == 'buy' ? 'rgb(36, 36, 114)' : 'white',
        border: '1px solid blue',
        borderRadius: '3px',
        height: '30px',
        width: '60px',
        fontSize: '1.2rem',
        display: 'grid',
        placeItems: 'center'
    }
    return (
        <>
            <Link
                style={btnStyle}
                to={{
                    pathname: `/action/${action}/${match.params.symbol}`,
                    state: {
                        stockPrice: stockData[symbol].quote.latestPrice
                    }
                }}
            >
                {action === 'buy' ? 'Buy' :'Sell'}

            </Link>
        </>
    )
}

const StockMenuHeader = ({stockData, symbol, date, ...props}) => {
    return (
        <>
            <div className="stock-menu-date">
                <span className="stock-today">{date}</span>
                <div className="stock-stock-menu" style={{marginBottom: '16px'}}>
                    <StockCompanyInfo stockData={stockData} symbol={symbol} />
                    <div className="stock-buy-sell-menu">
                        <StockValueInfo stockData={stockData} symbol={symbol}/>
                        <div className="stock-buy-sell">
                            <ActionButton stockData={stockData} action='buy' symbol={symbol} {...props}/>
                            <ActionButton stockData={stockData} action='sell' symbol={symbol} {...props} />
                        </div>
                    </div>
                </div>
            </div>
        </>
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
      font-size: 1.5rem;
  }
  .action-link{
      text-decoration: none;
  }

`
const PeriodStyle = styled.div`
  .stock-timeseries-menu{
    box-shadow: 1px 4px 16px rgba(0,0,0,.12)!important;
    height: 40px;
    display: flex;
    place-items: center;
    border-radius: 5px;
  }
`

export default connect(mapStateToProps)(Stock);