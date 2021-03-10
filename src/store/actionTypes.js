// import { Profiler } from "react";

export const BUY = "BUY";
export const SELL = "SELL";
export const REQUEST_STOCKS_BEGIN = "REQUEST_STOCKS_BEGIN";
export const REQUEST_STOCKS_SUCCESS = "REQUEST_STOCKS_SUCCESS";
export const GET_PORTFOLIO_DATA = "GET_PORTFOLIO_DATA";
export const GET_TOTAL_HOLDINGS = "GET_TOTAL_HOLDINGS";

const sandbaseUrl = "https://sandbox.iexapis.com/stable";
const sandToken = "Tsk_f449b3b9b1e04ea3b0e1e41c195a4359";
const titres = ['AAPL', 'GOOG', 'AMZN', 'MSFT', 'FB', 'BABA', 'TSLA', 'NVDA', 'CRM', 'PYPL', 'AMD'].join(",");

export const buyStock = (stockObject) =>({
    type: BUY,
    payload: stockObject,
    date: Date.now(),
})

export const sellStock = (stockObject) => ({
    type: SELL,
    payload: stockObject,
    date: Date.now(),
})

export const requestStocksData = () => ({
    type: REQUEST_STOCKS_BEGIN,
})

export const receiveStocksData = (stockData) => ({
    type: REQUEST_STOCKS_SUCCESS,
    data: stockData
})

export const fetchStockData = () => {
    return dispatch => {
        dispatch(requestStocksData())
        return fetch(`${sandbaseUrl}/stock/market/batch?symbols=${titres}&types=company,quote&range=1d&token=${sandToken}`)
        .then(x => x.json())
        .then(x => {dispatch(getPortfolioData(x));dispatch(receiveStocksData(x))})
    }
}

export const getPortfolioData = (data) =>({
    type: GET_PORTFOLIO_DATA,
    data,
})

export const getTotalHoldings = () => ({
    type: "GET_TOTAL_HOLDINGS",
    total:0
})
