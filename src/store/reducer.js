import { combineReducers } from 'redux'
import {
    BUY,
    SELL,
    STOCK_BEGIN,
    STOCK_SUCCESS,
    STOCK_ERROR,
    NEWS_BEGIN,
    NEWS_ERROR,
    NEWS_SUCCESS,
    GET_PORTFOLIO_DATA,
    titres
} from './actionTypes'

const initialState = {isLoading: false, error: null, newsData: null}

const newsReducer = (state = initialState, action) => {
    const {type, data, error} = action
    switch(type){
        case NEWS_BEGIN:
            return {
                ...state,
                isLoading: true,
            }
        case NEWS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                newsData: data.map(val => ({
                    uuid: val.uuid,
                    title: val.title,
                    summary: val.summary,
                    publisher: val.publisher,
                    publishAt: val.published_at,
                    link: val.link,
                    imageUrl: val.main_image?.resolutions[0].url
                }))
            }
        case NEWS_ERROR:
            return {
                ...state,
                error,
            }
        default:
            return state;
    }

}

const requestReducer = (
    state = { 
        isFetching: false, stockData: null,
        portfolioData: [], news: null, titres, error: null },
    action) => {
    let updatedState;
    let updatedStockIndex;
    let  updatedPortfolio;

    switch (action.type){
        case STOCK_BEGIN:
            return {
                ...state,
                isFetching: true
            };

        case STOCK_SUCCESS:
            return {
                ...state,
                isFetching: false,
                stockData: action.data
            };
        
        case STOCK_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }

        case GET_PORTFOLIO_DATA:
            const symbols = Object.keys(action.data);
            return {
                    ...state,
                    portfolioData: symbols.map(x => ({
                        symbol: x, close: action.data[x].quote?.latestPrice, quantity: 0
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
    newsReducer,
    requestReducer
})

export default rootReducer