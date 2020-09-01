/*React*/
import React, { useState } from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

/* Plotly */
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);


const Stock =  () => {
    const [symbol, setSymbol] = useState('AAPL');
    const [period, setPeriod] = useState('1D');
    const date = new Date().toDateString();
    const handleTradingPeriod = (el) => {
        /*requete avec le nom de symbol et la periode */
    }
    return (
        <div className="stock-container">
            <div className="stock-menu-date">
                <span className="stock-today">{date}</span>
                <div className="stock-stock-menu">
                    <div className="stock-trade-info">
                        <div className="stock-infos">    
                            <span className="stock-symbol-title">BNS</span>
                            <div className="stock-companyName-exchange">
                                <span className="stock-companyName">Bank of Nova Scotia</span>
                                <span className="stock-exchange">TSX, CA</span>
                            </div>
                        </div>
                    </div>
                    <div className="stock-buy-sell-menu">
                        <div className="stock-price">
                            <span>80.28</span>
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
                                <li className="stock-timeseries-period">Real time</li>
                                <li className="stock-timeseries-period">1D</li>
                                <li className="stock-timeseries-period">1W</li>
                                <li className="stock-timeseries-period">1M</li>
                                <li className="stock-timeseries-period">3M</li>
                            </ul>
                        </div>
                    </div>
                    <div className="stock-stock-chart">
                        <Plot
                            data={[
                            {
                                x: [1, 2, 3],
                                y: [2, 6, 3],
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: {color: 'red'},
                            },
                            ]}
                            layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stock