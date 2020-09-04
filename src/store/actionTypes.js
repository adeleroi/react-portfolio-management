// import { Profiler } from "react";

export const BUY = "BUY";
export const SELL = "SELL";
export const REQUEST_STOCKS_DATA = "REQUEST_STOCKS_DATA";
export const RECEIVE_STOCKS_DATA = "RECEIVE_STOCKS_DATA";

const sandbaseUrl = "https://sandbox.iexapis.com/stable";
const sandToken = "Tsk_f449b3b9b1e04ea3b0e1e41c195a4359";

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

export const requestStocksData = (stock) => ({
    type: REQUEST_STOCKS_DATA,
    stock,
})

export const receiveStocksData = (stock, json) => ({
    type: RECEIVE_STOCKS_DATA,
    stock,
    data: json,
})

export const fetchStockData = (stock) => {
    return dispatch => {
        dispatch(requestStocksData(stock))
        return fetch(`${sandbaseUrl}/stock/market/batch?symbols=${stock}&types=company,quote&range=1d&token=${sandToken}`)
        .then(x => x.json())
        .then(x => dispatch(receiveStocksData(stock, json)))
    }
}
