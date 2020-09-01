import React, { useState } from 'react';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

export default function Chart(){
    const [symbol, setSymbol] = useState('AAPL');
    const [range, setRange] = useState('1m');
    return (
        <div>
           <div>
                <select className="select company" onChange={(e) => setSymbol(e.target.value)}>
                    <option disabled>Select a company</option>
                    <option value="AAPL">Apple</option>
                    <option value="MCSFT">Microsoft</option>
                    <option value="GOOG">Google</option>
                    <option value="FB">FaceBook</option>

                </select>
            </div>
            <div>
                <select className="select period" onChange={(e) => setRange(e.target.value)}>
                    <option disabled>Select a period</option>
                    <option value="1m">1 month</option>
                    <option value="3m">3 months</option>
                    <option value="6m">6 months</option>
                    <option value="1y">1 year</option>
                    <option value="2y">2 years</option>
                    <option value="5y">5 year</option>

                </select>
            </div>
        </div>
    )
}

// const Token = "pk_eb5e2384ca5e4c4fb810994a409ae48e"
// const baseUrl = "https://cloud.iexapis.com/stable"

// const searchData = (selection) =>{
//     const pointer = this;
//     console.log(pointer);
//   fetch(`${baseUrl}/stock/${pointer.symbol}/${pointer.range}?token=${Token}`)
//     .then(data => data.json())
//     .then(x => console.log(x))
// }