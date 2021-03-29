// import { Profiler } from "react";

export const BUY = "BUY";
export const SELL = "SELL";
export const STOCK_BEGIN = "STOCK_BEGIN";
export const STOCK_SUCCESS = "STOCK_SUCCESS";
export const STOCK_ERROR = "STOCK_ERROR"

export const NEWS_BEGIN = "NEWS_BEGIN";
export const NEWS_SUCCESS = "NEWS_SUCCESS";
export const NEWS_ERROR = "NEWS_ERROR"

export const GET_PORTFOLIO_DATA = "GET_PORTFOLIO_DATA";
const sandbaseUrl = "https://sandbox.iexapis.com/stable";
const sandToken = "Tsk_f449b3b9b1e04ea3b0e1e41c195a4359";
export const titres = ['AMZN', 'GOOG', 'MSFT', 'FB', 'BABA', 'TSLA', 'NVDA', 'CRM', 'PYPL', 'AMD'];

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

export const requestStockData = () => ({
    type: STOCK_BEGIN,
})

export const receiveStockData = (data) => ({
    type: STOCK_SUCCESS,
    data,
})

export const requestStockFail = (error) => ({
    type: STOCK_ERROR,
    error,
})

export const receivePortfolioData = (data) =>({
    type: GET_PORTFOLIO_DATA,
    data,
})

// export const getTotalHoldings = () => ({
//     type: "GET_TOTAL_HOLDINGS",
//     total:0
// })

export const requestNewsData = () => ({
    type: NEWS_BEGIN
})

export const receiveNewsData = (data) => ({
    type: NEWS_SUCCESS,
    data,
})

export const requestNewsFail = (error) => ({
    type: NEWS_ERROR,
    error,
})

export const fetchStockData = () => {
    return dispatch => {
        dispatch(requestStockData())
        return fetch(`${sandbaseUrl}/stock/market/batch?symbols=${titres.join(",")}&types=company,quote&range=1d&token=${sandToken}`)
        .then(x => x.json())
        .then(x => { dispatch(receivePortfolioData(x)); dispatch(receiveStockData(x)) })
        .catch(e => dispatch(requestStockFail(e)))
    }
}

export const fetchNewsData = symbol => {
    const options ={
        method: 'GET',
        headers: {
            'x-rapidapi-key': "dc8bce9564msh70f4dbf4221a6a2p1af0e6jsnf138007f2311",
            'x-rapidapi-host': "apidojo-yahoo-finance-v1.p.rapidapi.com"
        }
    }
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-news?category=${symbol}&region=US`
    return dispatch => {
        dispatch(requestNewsData())
        return fetch(url, options)
            .then(async x => {
                let rawData = await x.json()
                let result = rawData?.items?.result
                const newsList = result.slice(0, 7)
                return newsList
            })
            .then(x => dispatch(dispatch(receiveNewsData(x))))
            .catch(e => dispatch(requestNewsFail(e)))
    }
}


