/*React*/
import * as realTimeConfig from '../chartConfig/realTimeChart'
import * as lineConfig from '../chartConfig/lineChart'
import React, { useState, useEffect } from 'react'
import {useLocation} from 'react-router-dom'
/*chart.js*/
import { Line } from "react-chartjs-2"
import "chartjs-plugin-streaming";
/* Plotly */
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

const Stock =  (props) => {
    const [period, setPeriod] = useState('1D');
    const [dataX, setDataX] = useState([]);
    const [dataY, setDataY] = useState([]);
    const [infos, setInfos] = useState({});
    const [price, setPrice] = useState(0);
    const date = new Date().toDateString();
    const [isRealTime, setRealTime] = useState(false);
    const location = useLocation();
    const {slug} = props.match.params;
    const companyName = slug;
    useEffect(()=>{
        const {symbol} = props.match.params;
        if (period === 'RT') return
        handlePeriod(symbol.toLowerCase());
    },[props.match.params.symbol, period])

    const handleClick = (period) => {
        if (period === "RT"){
            setRealTime(true);
        }else{
            setRealTime(false);
        }
        setPeriod(period);
        changeTab(period);
    }
    const changeTab = (id) => {
        const periods = document.getElementsByClassName("stock-timeseries-period");
        for (var i = 0; i < periods.length; i++){
            periods[i].style.color = "black";
        }
        document.getElementById(id).style.color = "blue";
    }
    const capitalize = (s) => {
        if(typeof(s)!== String){
            return ''
        }
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    const Token = "pk_99d153747d5a4c939661c8f2fb359437"
    const baseUrl = "https://cloud.iexapis.com/stable"
    const sandbaseUrl = "https://sandbox.iexapis.com/stable";
    const sandToken = "Tsk_f449b3b9b1e04ea3b0e1e41c195a4359"
    const handlePeriod = (symbol) =>{
        fetch(`${sandbaseUrl}/stock/${symbol}/chart/${period}?token=${sandToken}`)
            .then(data => data.json())
            .then(x => {
                const date = x.map(el => el.date);
                const open = x.map(el => el.open);
                console.log(date);
                setDataX([...date]);
                setDataY([...open]);
            })
            .catch(e => {console.log(e)});
        getDescription(symbol);
    }
    const getDescription = (symbol) => {
        fetch(`${sandbaseUrl}/stock/${symbol}/company?token=${sandToken}`)
            .then(data => data.json())
            .then(x => setInfos({...x}))
            .catch(e => {console.log(e)})
    }
    return (
        <div className="stock-container">
            <div className="stock-menu-date">
                <span className="stock-today">{date}</span>
                <div className="stock-stock-menu">
                    <div className="stock-trade-info">
                        <div className="stock-infos">    
                            <span className="stock-symbol-title">{infos.symbol}</span>
                            <div className="stock-companyName-exchange">
                                <span className="stock-companyName">{infos.companyName}</span>
                                <span className="stock-exchange">{infos.exchange}</span>
                            </div>
                        </div>
                    </div> 
                    <div className="stock-buy-sell-menu">
                        <div className="stock-price">
                            <span>{dataY[0]} $</span>
                        </div>
                        <div className="stock-buy-sell">
                            <button className="stock-buy-btn"><span>Buy</span></button>
                            <button className="stock-buy-btn"><span>Sell</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="stock-chart-container">
                <div className="stock-data-visualization">    
                    <div className="stock-chart">
                        <div className="stock-timeseries-menu">
                            <ul className="stock-timeseries-periods">
                                <li className="stock-timeseries-period" id="RT" onClick={(e) => handleClick("RT")}>Real time</li>
                                <li className="stock-timeseries-period" id="1D" onClick={(e) => handleClick("1D")}>1D</li>
                                <li className="stock-timeseries-period" id="1W" onClick={(e) => handleClick("1W")}>1W</li>
                                <li className="stock-timeseries-period" id="1M" onClick={(e) => handleClick("1M")}>1M</li>
                                <li className="stock-timeseries-period" id="3M" onClick={(e) => handleClick("3M")}>3M</li>
                            </ul>
                        </div>
                    </div>
                    <div className="stock-stock-chart">
                        { isRealTime && <Line data={realTimeConfig.data(companyName)} options={realTimeConfig.options(dataY[0])}/>}
                        {!isRealTime && <Line data={lineConfig.data(dataX, dataY, companyName)} options={lineConfig.options} className="canva-chart"/>}
                    </div>
                </div>
            </div>
            <div className="stock-company-info">
                <div className="infos-infos">
                    <div>
                        <span className="lable-description">Sector </span>
                        : {infos.sector}
                    </div>
                    <div>
                        <span className="lable-description">Employees </span>
                        : {infos.employees}
                    </div>
                    <div>
                        <span className="lable-description">Industry </span>
                        : {infos.industry}
                    </div>
                </div>
                <div className="company description">
                    <span className="labledescription">Description</span>
                     : {infos.description}
                </div>
            </div> 
        </div>
    )
}

export default Stock
