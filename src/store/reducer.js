import { combineReducers } from 'redux'
import {
    BUY,
    SELL,
    REQUEST_STOCKS_BEGIN,
    REQUEST_STOCKS_SUCCESS,
    GET_PORTFOLIO_DATA
} from './actionTypes'

const initialState = {
    stocks: [

    ]
}

const transactionReducer = (state = initialState, action) => {
    let updatedStocks;
    let updatedStockIndex;
    switch(action.type){
        case BUY:
            updatedStocks = [...state.stocks];
            updatedStockIndex = updatedStocks.findIndex(el => el.symbol === action.payload.symbol);
            if(updatedStockIndex < 0){
                updatedStocks.push({...action.payload, quantity: action.payload.quantity});
            }else{
                const boughtStock = { ...updatedStocks[updatedStockIndex] };
                boughtStock.quantity += action.payload.quantity;
                updatedStocks[updatedStockIndex] = boughtStock;
            }
            return { ...state, stocks: updatedStocks };
        
        case SELL:
            updatedStocks = [...state.stocks];
            updatedStockIndex = updatedStocks.findIndex(el => el.symbol === action.payload.symbol)
            const soldStock = { ...updatedStocks[updatedStockIndex] };
            soldStock.quantity -= action.payload.quantity;
            if(soldStock.quantity > 0){
                updatedStocks[updatedStockIndex] = soldStock;
            }else{
                updatedStocks.splice(updatedStockIndex, 1);
            }
            return { ...state, stocks: updatedStocks };
        
        default:
            return state;
    }

}

const requestReducer = (state = { isFetching: false, stockData: null, portfolioData: [] }, action) => {
    let updatedState;
    let updatedStockIndex;
    let  updatedPortfolio;

    switch (action.type){

        case REQUEST_STOCKS_BEGIN:
            return {
                ...state,
                isFetching: true
            };

        case REQUEST_STOCKS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                stockData: action.data
            };

        case GET_PORTFOLIO_DATA:
            const symbols = Object.keys(action.data);
            return {
                    ...state,
                    portfolioData: symbols.map(x => ({
                        symbol: x, close: action.data[x].quote?.latestPrice, quantity: 200
                    }))
            };

        case BUY:
            updatedState = {...state};
            updatedStockIndex = updatedState.portfolioData.findIndex(el => el.symbol === action.payload.symbol);
            if(updatedStockIndex < 0){
                updatedState.portfolioData.push(action.payload)
            }else{
                updatedPortfolio = [ ...state.portfolioData ];
                const boughtStock = updatedPortfolio[updatedStockIndex]; //shallow copy
                boughtStock.quantity += Number(action.payload.quantity);
            }
            return { ...state, portfolioData: updatedPortfolio };
            
        case SELL:
            updatedPortfolio = [ ...state.portfolioData ];            
            updatedStockIndex = updatedPortfolio.findIndex((el) => el.symbol === action.payload.symbol);
            const soldStock = updatedPortfolio[updatedStockIndex];
            soldStock.quantity -= Number(action.payload.quantity);
            return { ...state, portfolioData: updatedPortfolio };
            
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    transactionReducer,
    requestReducer
})

export default rootReducer