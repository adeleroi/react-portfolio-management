import React, {useEffect, useLayoutEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Portfolio = (props) => {
    // const demoSymbol = [{symbol:'AAPL', name: 'Apple Inc'}, {symbol: 'GOOG', name: 'Alphabet Inc.'}, {symbol: 'AMZN', name: 'Amazon'}, {symbol:'MSFT', name: 'Micosoft Corporation'}, {symbol:'FB', name: 'Facebook, Inc'}, 'BABA', 'TSLA', 'NVDA', 'CRM', 'PYPL', 'AMD']
    const [demoSymbol, setSymbol] = useState(['AAPL', 'GOOG', 'AMZN', 'MSFT', 'FB', 'BABA', 'TSLA', 'NVDA', 'CRM', 'PYPL', 'AMD']);
    const [data, setData] = useState({})
    // const Token = "pk_99d153747d5a4c939661c8f2fb359437";
    // const baseUrl = "https://cloud.iexapis.com/stable";
    const [sandbaseUrl, setSandBox] = useState("https://sandbox.iexapis.com/stable");
    const [sandToken, setToken] = useState("Tsk_f449b3b9b1e04ea3b0e1e41c195a4359");
    useEffect(() => {
        const fetchData = () => {
            const demo = demoSymbol.join(",");
            console.log(demo);
            const promesse = fetch(`${sandbaseUrl}/stock/market/batch?symbols=${demo}&types=company,quote&range=1d&token=${sandToken}`)
                                .then(x => x.json())
                                .then(x => setData(x))
        }
        fetchData();
    }, [props.match.params])

    return (
        <div></div>
        // <div>will</div>{data.APPL.company.symbol}
        // <PortfolioContainer>
        //     <div className="portfolio-holding">
        //     <h3 className="portfolio-holding-title">Holding</h3>
        //         <table className="portfolio-table">
        //             <thead>
        //                 <tr>
        //                     <th>Symbol/Name</th>
        //                     <th>Quantity</th>
        //                     <th>Last Price</th>
        //                     <th>Change</th>
        //                     <th>%Change</th>
        //                     <th>Volume</th>
        //                     <th>Market Value</th>
        //                     <th>Market Cap</th>
        //                     <th>Action</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {demoSymbol.map(ob => {
        //                 return (
        //                     <tr>
        //                         <td>
        //                         <Link to={{
        //                             pathname: `/stock/${data[ob].company.companyName}/${data[ob].company.symbol}`
        //                         }}>
        //                             {data[ob].company.symbol} <span>({data[ob].company.companyName})</span>
        //                             </Link>    
        //                         </td>
        //                         <td>200</td>
        //                         <td>{data[ob].quote.latestPrice}</td>
        //                         <td>{data[ob].quote.change}</td>
        //                         <td>%{data[ob].quote.changePercentage}</td>
        //                         <td>{data[ob].quote.latestVolume}</td>
        //                         <td>{data[ob].quote.marketCap}</td>
        //                         <td>
        //                             <Link to={{
        //                                 pathname: `/action/buy/${data[ob].company.symbol}`
        //                             }}>Buy</Link> | 
        //                             <Link to={{
        //                                 pathname: `/action/sell/${data[ob].company.symbol}`
        //                             }}>Sell</Link>
        //                         </td>
        //                     </tr>)})}
        //                     {/* <tr>
        //                     <td>
        //                         <Link to={{
        //                             pathname:"/stock/google/GOOG",
        //                             state: {
        //                             stockSymbol: "GOOG",
        //                         }
        //                         }}>
        //                             GOOG
        //                         </Link>
        //                     </td>
        //                     <td>200</td>
        //                     <td>240.23</td>
        //                     <td>44046</td>
        //                     <td>
        //                         <Link to={{
        //                             pathname: "/action/buy/GOOG"
        //                         }}>Buy</Link> | 
        //                         <Link to={{
        //                             pathname: "/action/sell/GOOG"
        //                         }}>Sell</Link>
        //                     </td>
        //                 </tr>
        //                 <tr className="action">
        //                     <td>
        //                         <Link to={{
        //                             pathname:"/stock/amazon/AMZN",
        //                             state: {
        //                                 stockSymbol: "AMZN",
        //                             }
        //                         }}>
        //                             AMZN
        //                         </Link>
        //                     </td>
        //                     <td>200</td>
        //                     <td>214.53</td>
        //                     <td>46046</td>
        //                     <td>
        //                         <Link to={{
        //                             pathname: "/action/buy/AMZN"
        //                         }}>Buy</Link> | 
        //                         <Link to={{
        //                             pathname: "/action/sell/AMZN"
        //                         }}>Sell</Link>
        //                     </td>
        //                 </tr> */}
        //             </tbody>
        //         </table>
        //     </div>
        // </PortfolioContainer>
    )
}

const PortfolioContainer = styled.div`
        width: 100%;
        display: grid;
        place-items: center;
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

export default Portfolio