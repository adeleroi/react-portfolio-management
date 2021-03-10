import * as React from 'react'
import Chart from './Chart'
import styled from 'styled-components'


const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args)) 

const VisualizationContext =  React.createContext()

const useVisualization = () => {
    const context = React.useContext(VisualizationContext)
    if(context === undefined){
        throw new Error(`...Component should be used within ...provider`)
    }
    return context
}

const VisualizationProvider = (props) => {
    const [period, setPeriod] = React.useState(() => props.match.params.period);
    return <VisualizationContext.Provider value={[period, setPeriod]} {...props} />
}

const HistoricalPeriodMenuLayout = ({children}) => {
    return (
        <div className="stock-chart">
            <PeriodStyle>
                <div className="stock-timeseries-menu">
                    {children}
                </div>
            </PeriodStyle>
        </div>
    )
}

const VisualizationLayout = ({children}) => {
    return (
        <div className="stock-chart-container">
            <div className="stock-data-visualization">  
                {children}
            </div>
        </div>
    )
}

const HistoricalChart = ({symbol}) => {
    const [period, ] = useVisualization()
    return <Chart period={period} symbol={symbol} className="svg-d3"/>
}

const HistoricalPeriodList = ({children}) => {

    const [period, setPeriod] = useVisualization()
    const changeTab = (id) => {
        const periods = document.getElementsByClassName("stock-timeseries-period");
        for (var i = 0; i < periods.length; i++){
            periods[i].style.borderBottom = "none";
        }
        document.getElementById(id).style.borderBottom = "2px solid blue";
    }

    React.useEffect(() => {
        changeTab(period)
    }, [period])

    return (
        <ul className="stock-timeseries-periods">
            {
                React.Children.map(children, child => {
                    return React.cloneElement(child, {
                            onClick: callAll(() => setPeriod(child.props.period), child.props.onClick)
                        })
                })
            }
        </ul>
    )
}

const HistoricalPeriod = ({period, onClick}) => {
    return <li className="stock-timeseries-period" onClick={onClick} id={period}>{period}</li>
}


const PeriodStyle = styled.div`
  .stock-timeseries-menu{
    box-shadow: 1px 4px 16px rgba(0,0,0,.12)!important;
    height: 40px;
    display: flex;
    place-items: center;
    border-radius: 5px;
  }
`
export {
    HistoricalPeriod,
    HistoricalPeriodList,
    HistoricalChart,
    VisualizationLayout,
    HistoricalPeriodMenuLayout,
    VisualizationProvider,
    useVisualization
}