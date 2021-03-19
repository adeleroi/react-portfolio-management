import React from 'react'
import {FormGroup, GreenRed} from './lib'
import formatCurrency from '../utils/formatter'

const ActionForm = ({submitButton, stockData, symbol}) => {
    const handleSubmit = (e) => {
        //
    }
    return (
        <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
            <ActionFormHeader stockData={stockData} symbol={symbol} />
            <FormGroup>
                <label className="form-label" htmlFor="quantity">Nb of shares : </label>
                <input 
                    onChange={(e) => {}} className="form-input quantity" 
                    placeholder={"Enter a quantity..."}
                    style={{paddingLeft: '5px', fontSize: '16px'}}
                    id="quantity"
                />
            </FormGroup>
            <FormGroup>
                <label className="form-label">Order type : </label>
                <select>
                    <option>Market</option>
                    <option>Limit</option>
                </select>
            </FormGroup>
            <FormGroup>
                <label className="form-label">Expiration : </label>
                <select>
                    <option>Good For Day</option>
                    <option>Good Till Expiry</option>
                </select>
            </FormGroup>
            <FormGroup>
                <label className="form-label">Estimated coast :</label>
                <span>{formatCurrency(0)}</span>
            </FormGroup>
            <div>
                {React.cloneElement(
                    submitButton,
                    {type: "submit"},
                    ...(Array.isArray(submitButton.props.children)
                    ? submitButton.props.children
                    : [submitButton.props.children])
                )}
            </div>
        </form>
    )
}

const ActionFormHeader = ({stockData, symbol}) => {
    const change = stockData && stockData[symbol].quote.change
    const latestPrice = stockData && stockData[symbol].quote.latestPrice
    const changePercent = stockData && stockData[symbol].quote.changePercent
    return (
        <>
            <h3>Buy shares for {symbol} - {stockData ? stockData[symbol].company.companyName : null} </h3>
            <FormGroup>
            <label>Stock price:</label>
            <div style={{display: 'flex'}}>
                <div>
                    <GreenRed  style={{fontSize: '16px', textAlign: 'start'}}>
                        <span style={{marginRight: '10px'}}>{formatCurrency(latestPrice)}</span>
                        <span className={change > 0? 'green': 'red'} style={{fontSize: '16px'}}>
                            {change > 0 ? '+' : null }{change}
                        </span>
                        <span className={change > 0? 'green': 'red'} style={{fontSize: '16px'}}>
                            ({changePercent}%)
                        </span>
                    </GreenRed>
                    <CompanyNameAndExchange 
                        style={{flexDirection: 'row', 
                            fontSize: '12px',
                            marginLeft:'0',
                            marginTop: '6px',
                            color: 'gray'
                        }}
                        stockData={stockData} symbol={symbol}
                    />
                </div>
            </div>
        </FormGroup>
    </>
    )
}

const CompanyNameAndExchange = ({style,stockData, symbol}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px', ...style}}>
            <span style={{marginRight: '5px'}}>{stockData && stockData[symbol].quote.companyName}</span>
            <span>{stockData && stockData[symbol].quote.primaryExchange}</span>
        </div>
    )
}

export {ActionForm, ActionFormHeader, CompanyNameAndExchange}