import React, {useState, useEffect} from 'react';
// import {chart} from 'chart.js'
import { Line } from "react-chartjs-2"
import "chartjs-plugin-streaming";
import './index.css'

// import Plotly from 'plotly.js-basic-dist';
// import createPlotlyComponent from "react-plotly.js/factory";
// const Plot = createPlotlyComponent(Plotly);

export default function Demo(){
    const [dataX, setDataX] =  useState([]);
    const [dataY, setDataY] = useState([]);
    const [symbol, setSymbol] = useState('AAPL');
    const [range, setRange] =  useState('1y');
    const [width, setWidth] = useState(0.6 * window.innerWidth);
    const [height, setHeight] = useState(0.6 * window.innerHeight);
    const [datas, setData] = useState({});
    const Token = "pk_af711945276140e6985ca3b22a489b53" //"pk_eb5e2384ca5e4c4fb810994a409ae48e"
    const baseUrl = " https://sandbox.iexapis.com/stable" //"https://cloud.iexapis.com/stable"
    // const chartDataY = () => {
    //     return setDataY([...[(Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100)]])
    // }
    // const chartDataX = () => {
    //     return setDataX([...[Date.now()]])
    // }
    const comp = 'Apple'
    var chartColors = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)'
    };
    const data = {
        datasets: [
          {
            label: `${comp}`,
            borderColor: chartColors.blue,
            backgroundColor: "rgb(255, 99, 132)",
            lineTension: 0,
            fill: false,
            // borderDash: [8, 4],
            borderWidth: 4,
            data: []
          }

        ]
      };
    const options = {
        scales: {
          xAxes: [
            {
              type: "realtime",
              time:{
                unit: "second"
              },
              realtime: {
                duration: 5300,
                refresh: 400,
                delay: 400,
                onRefresh: function(chart) {
                  chart.config.data.datasets.forEach((dataset) => dataset.data.push({
                    x: Date.now(),
                    y: (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100)
                  }));
                },
              }
            }
          ],
          yAxes: [{
            type: 'linear',
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'value'
            },
            ticks: {
              min: -100,
              max: 100
            }
          }]
        },
        tooltips: {
          mode: 'nearest',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: false
        },
        plugins: {
          datalabels: {
            backgroundColor: function(context) {
              return context.dataset.backgroundColor;
            },
            borderRadius: 4,
            clip: true,
            color: 'white',
            font: {
              weight: 'bold'
            },
            formatter: function(value) {
              return value.y;
            }
          }
        }
      };
    useEffect(() => {

    }) //
    // const handleSubmit = () =>{

    //     fetch(`${baseUrl}/stock/${symbol}/chart/${range}?token=${Token}`)
    //         .then(data => data.json())
    //         .then(x => {
    //             const date = x.map(el => el.date);
    //             const open = x.map(el => el.open);
    //             console.log(date);
    //             setDataX([...date]);
    //             setDataY([...open]);
    //         })
    //         .catch(e => {console.log(e)});
    //     getDescription();
    // }
    // const getDescription = () => {
    //     fetch(`${baseUrl}/stock/${symbol}/company?token=${Token}`)
    //         .then(data => data.json())
    //         .then(x => setData({...x}))
    //         .catch(e => {console.log(e)})
    // }
    return (
        <div>
            <h1>Real time Prices</h1>
            <div className="demo-container">
                
                <div className="menu-wrapper">
                    <div className="select-wrapper">
                        <label>Company :</label>
                        <select className="select symbol" >
                          {/*onChange={(e) => {setSymbol(e.target.value)}}*/}
                            <option disabled>Select a company</option>
                            <option value="AAPL">Apple</option>
                            <option value="MSFT">Microsoft</option>
                            <option value="GOOG">Google</option>
                            <option value="FB">FaceBook</option>

                        </select>
                    </div>
                    <div className="select-wrapper">
                        <label>Period :</label>
                        <select className="select period" >
                          {/*onChange={(e) => {setRange(e.target.value)}}*/}
                            <option disabled>Select a period</option>
                            <option value="1m">1 month</option>
                            <option value="3m">3 months</option>
                            <option value="6m">6 months</option>
                            <option value="1y">1 year</option>
                            <option value="2y">2 years</option>
                            <option value="5y">5 year</option>

                        </select>
                    </div>
                    <div className="btn-wrapper">
                        <button className="btn-submit">Submit</button> 
                        {/* onClick={() => handleSubmit()}*/}
                    </div>
                </div>

                <Line data={data} options={options} className="canva-chart"/>
            </div>
            <h3>Company Description</h3>
                <p className="company description"><span className="lable-description">Description</span> : {data.description}</p>
                <p><span className="lable-description">Sector :</span> {data.sector}</p>
                <p><span className="lable-description">Employees: </span> {data.employees}</p>
        </div>
    )
}


