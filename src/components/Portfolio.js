import * as React from 'react';
import {Link} from 'react-router-dom';
import formatter from '../utils/formatter'

const Portfolio = ({stockData, symbol, portfolioData}) => {
    return (
        <>
            <tr key={stockData[symbol].company.symbol}>
                <td>
                    <Link to={{
                        pathname: `/stock/${stockData[symbol].company.symbol}/period/2Y`,
                    }}>
                    {stockData[symbol].company.symbol} <span>({stockData[symbol].company.companyName})</span>
                    </Link>    
                </td>
                <td>{portfolioData.find((x) => x.symbol === symbol)?.quantity}</td>
                <td>{formatter.format(stockData[symbol].quote.latestPrice)}</td>
                <td className={stockData[symbol].quote.change > 0 ? 'green-color': 'red-color'}>{stockData[symbol].quote.change}</td>
                <td className={stockData[symbol].quote.changePercent > 0 ? 'green-color': 'red-color'}>{stockData[symbol].quote.changePercent}</td>
                <td>{stockData[symbol].quote.latestVolume}</td>
                <td>{formatter.format(stockData[symbol].quote.marketCap)}</td>
                <td>
                    <Link to={{
                        pathname: `/action/buy/${stockData[symbol].company.symbol}`,
                        state:{
                            latestPrice: stockData[symbol].quote.latestPrice,
                        }
                    }}>Buy</Link> | 
                    <Link to={{
                        pathname: `/action/sell/${stockData[symbol].company.symbol}`,
                        state:{
                            latestPrice: stockData[symbol].quote.latestPrice,
                        }                                            
                    }}>Sell</Link>
                </td>
            </tr>
        </>
    )
}

export default Portfolio;