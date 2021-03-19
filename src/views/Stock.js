import * as React from 'react';
import { connect } from 'react-redux';
import CompanyInfo from '../components/CompanyInfo';
import formatCurrency from '../utils/formatter'
import {
    FullPageSpiner,
    ActionButton,
    SubmitActionButton,
    GreenRed
} from '../components/lib'
import {
    HistoricalPeriod,
    HistoricalPeriodList,
    HistoricalChart,
    VisualizationLayout,
    HistoricalPeriodMenuLayout,
    VisualizationProvider,
} from '../components/visualization'

import {
    Modal,
    ModalButtonOpen,
    ModalContents,
} from '../components/modal'

import {
    ActionForm,
    CompanyNameAndExchange
} from '../components/form'

import "@reach/dialog/styles.css"

const Stock =  ({history, ...props}) => {
    const date = new Date().toDateString();
    const {symbol} = props.match.params;
    const { isFetching, stockData } = props;

    const handleClickPeriod = (period) => {
        history.push(`/stock/${symbol}/period/${period}`)
    }

    React.useEffect(() => {
        if(isFetching || !stockData){
            return
        }
    }, [isFetching, stockData])

    if(isFetching || !stockData){
        return <FullPageSpiner/>
    }
    return (
        <div className="stock-container">
            <StockMenuHeader stockData={stockData} symbol={symbol} date={date} {...props}/>
            <VisualizationProvider {...props}>
                <VisualizationLayout>
                    <HistoricalPeriodMenuLayout>
                        <HistoricalPeriodList>
                            <HistoricalPeriod period="1D" onClick={() => handleClickPeriod("1D")}/>
                            <HistoricalPeriod period="5D" onClick={() => handleClickPeriod("5D")}/>
                            <HistoricalPeriod period="1M" onClick={() => handleClickPeriod("1M")}/>
                            <HistoricalPeriod period="3M" onClick={() => handleClickPeriod("3M")}/>
                            <HistoricalPeriod period="2Y" onClick={() => handleClickPeriod("2Y")}/>
                        </HistoricalPeriodList>
                    </HistoricalPeriodMenuLayout>
                    {<HistoricalChart symbol={symbol}/>}
                </VisualizationLayout>
            </VisualizationProvider>
            <CompanyInfo stockData={stockData} symbol={symbol}/>
        </div>
    )
}

const StockCompanyInfo = ({stockData, symbol}) => {
    return (
        <>
            <div className="stock-infos">    
                <span className="stock-symbol-title">{stockData[symbol].quote.symbol}</span>
                <CompanyNameAndExchange stockData={stockData} symbol={symbol}/>
            </div>
        </>
    )
}

const StockValueInfo = ({stockData, symbol}) => {
    const change = stockData[symbol].quote.change
    const latestPrice = stockData[symbol].quote.latestPrice
    const changePercent = stockData[symbol].quote.changePercent
    return (
        <>
            <div className="stock-price">
                <div style={{display:"flex"}}>{formatCurrency(latestPrice)}</div>
                <div className="stock-change-changepercent">
                    <GreenRed>
                        <span className={change > 0? 'green': 'red'} style={{fontSize: ''}}>
                            {change > 0 ? '+' : null }{change}
                        </span>
                        <span className={change > 0? 'green': 'red'}>
                            ({changePercent}%)
                        </span>
                    </GreenRed>
                </div>
            </div>
        </>
    )
}

const StockMenuHeader = ({stockData, symbol, date, ...props}) => {
    return (
        <>
            <div className="stock-menu-date">
                <span className="stock-today">{date}</span>
                <div className="stock-stock-menu" style={{marginBottom: '16px'}}>
                    <StockCompanyInfo stockData={stockData} symbol={symbol} />
                    <div className="stock-buy-sell-menu">
                        <StockValueInfo stockData={stockData} symbol={symbol}/>
                        <div className="stock-buy-sell">
                            <Modal>
                                <ModalButtonOpen>
                                    <ActionButton variant="primary">Buy</ActionButton>
                                </ModalButtonOpen>
                                <ModalContents stockData={stockData} symbol={symbol}>
                                    <ActionForm
                                        stockData={stockData}
                                        symbol={symbol}
                                        submitButton={<SubmitActionButton>Buy</SubmitActionButton>}
                                    />
                                </ModalContents>
                            </Modal>
                            <Modal>
                                <ModalButtonOpen>
                                    <ActionButton variant="secondary">Sell</ActionButton>
                                </ModalButtonOpen>
                                <ModalContents stockData={stockData} symbol={symbol}>
                                    <ActionForm
                                        stockData={stockData}
                                        symbol={symbol}
                                        submitButton={<SubmitActionButton>Sell</SubmitActionButton>}
                                    />
                                </ModalContents>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const mapStateToProps = state => ({
    stockData: state.requestReducer.stockData,
    isFetching: state.requestReducer.isFetching,
  })



export default connect(mapStateToProps)(Stock);