import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Portfolio = ({stockData, ob, portfolioData}) => {
    const formatter = new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'USD'
    })
    return (
        <>
            <tr key={stockData[ob].company.symbol}>
                <td>
                <Link to={{
                    pathname: `/stock/${stockData[ob].company.companyName}/${stockData[ob].company.symbol}`,
                    state:{
                        website: stockData[ob].company.website
                    }
                }}>
                    {stockData[ob].company.symbol} <span>({stockData[ob].company.companyName})</span>
                    </Link>    
                </td>
                <td>{portfolioData.find((x) => x.symbol === ob).quantity}</td>
                <td>{formatter.format(stockData[ob].quote.latestPrice)}</td>
                <td className={stockData[ob].quote.change > 0 ? 'green-color': 'red-color'}>{stockData[ob].quote.change}</td>
                <td className={stockData[ob].quote.changePercent > 0 ? 'green-color': 'red-color'}>{stockData[ob].quote.changePercent}</td>
                <td>{stockData[ob].quote.latestVolume}</td>
                <td>{formatter.format(stockData[ob].quote.marketCap)}</td>
                <td>
                    <Link to={{
                        pathname: `/action/buy/${stockData[ob].company.symbol}`,
                        state:{
                            latestPrice: stockData[ob].quote.latestPrice,
                        }
                    }}>Buy</Link> | 
                    <Link to={{
                        pathname: `/action/sell/${stockData[ob].company.symbol}`,
                        state:{
                            latestPrice: stockData[ob].quote.latestPrice,
                        }                                            
                    }}>Sell</Link>
                </td>
            </tr>
        </>
    )
}

export default Portfolio;