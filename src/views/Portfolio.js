import React from 'react'
import {Link} from 'react-router-dom'


const Portfolio = () => {
    return (
        <div className="portfolio-container">
            <h1>Portfolio</h1>
            <div className="portfolio-holding">
                <table className="portfolio-table">
                    <thead>
                        <tr>
                            <th>SYMBOL/NAME</th>
                            <th>QUANTITY</th>
                            <th>LAST PRICE</th>
                            {/* <th>BOOK COST</th> */}
                            <th>MARKET VALUE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                            <Link to={{
                                pathname: '/stock/apple/AAPL',
                                state: {
                                    stockSymbol: "AAPL",
                                }
                            }}>
                                    AAPL
                                </Link>    
                            </td>
                            <td>200</td>
                            <td>120.23</td>
                            <td>24046</td>
                            <td>
                                <Link to={{
                                    pathname: "/action/buy/AAPL"
                                }}>Buy</Link> | 
                                <Link to={{
                                    pathname: "/action/sell/AAPL"
                                }}>Sell</Link>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Link to={{
                                    pathname:"/stock/google/GOOG",
                                    state: {
                                    stockSymbol: "GOOG",
                                }
                                }}>
                                    GOOG
                                </Link>
                            </td>
                            <td>200</td>
                            <td>240.23</td>
                            <td>44046</td>
                            <td>
                                <Link to={{
                                    pathname: "/action/buy/GOOG"
                                }}>Buy</Link> | 
                                <Link to={{
                                    pathname: "/action/sell/GOOG"
                                }}>Sell</Link>
                            </td>
                        </tr>
                        <tr className="action">
                            <td>
                                <Link to={{
                                    pathname:"/stock/amazon/AMZN",
                                    state: {
                                        stockSymbol: "AMZN",
                                    }
                                }}>
                                    AMZN
                                </Link>
                            </td>
                            <td>200</td>
                            <td>214.53</td>
                            <td>46046</td>
                            <td>
                                <Link to={{
                                    pathname: "/action/buy/AMZN"
                                }}>Buy</Link> | 
                                <Link to={{
                                    pathname: "/action/sell/AMZN"
                                }}>Sell</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Portfolio