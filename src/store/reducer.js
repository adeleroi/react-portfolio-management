import {
    BUY,
    SELL,
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
                updatedStocks.push({...action.payload, quantity: 1});
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

export default transactionReducer;