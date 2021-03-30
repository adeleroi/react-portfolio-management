import * as React from 'react'
import { titres } from '../store/actionTypes'
import { StockTendency } from './lib'
import { useParams, NavLink, Link } from 'react-router-dom'

const SearchStock = ({stockData, onSubmitStock}) => {
    const { period } = useParams()
    // let history = useHistory()
    // console.log('stockdata', stockData)    
    const [stockList, setStockList] = React.useState(() => titres)
    const [isValid, setValid] = React.useState(true)
    const filter = (data) => {
        let arr = []
        for (var stock of titres){
            if (data && stock.includes(data.toUpperCase())){
                arr.push(stock)
            }
        }
        if(data.length && arr.length){
            return arr
        }
        else if(data.length && !arr.length){
            return []
        }
        else{
            return titres
        }
    }
    const Filter = (e) => {
        setStockList(filter(e.target.value))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const {submitedstock} = e.target.elements
        if(!stockList.includes(submitedstock)){
            setValid(false)
            return 
        }
        console.log(e.target.elements)
        onSubmitStock(submitedstock.value.toUpperCase())
    }
    return (
        <div>
            <div style={{marginTop: '30px'}}>
                <Link to="/">
                    <img
                        src="https://fontmeme.com/permalink/210329/ae43d5614cb9755b92358a26e2679add.png"
                        style={{width: '45px', height: '20px'}}
                    alt="logo-img"/>
                </Link>
            </div>
            <form onSubmit={handleSubmit}>
                <input onChange={e => Filter(e)} style={{
                    width: '90%', marginBottom: '15px',
                    paddingLeft: '10px', marginTop: '20px',
                    height: '25px', fontSize: '18px', borderRadius: '5px' 
                    }}
                    placeholder="Enter stock symbol"
                id="submitedstock"/>
            </form>
            { stockList && stockList.length && isValid? (
                <div style={{
                    listStyle: 'none', height: '150px',
                    overflowY: 'scroll'
                    }}>
                    {
                        stockList.map((val, _) => {
                            const change = stockData && stockData[val].quote.change
                            const changePercent = stockData && stockData[val].quote.changePercent
                            return (
                                <div key={val}>
                                    <NavLink className="active-link" activeClassName='active' to={`/stock/${val}/period/${period}`}>
                                    <StockTendency 
                                        change={change} changePercent={changePercent} fs="1rem"
                                        // onClick={() => history.push(`/stock/${val}/period/${period}`)}
                                        style={{
                                        fontSize: '12px', display: 'flex', justifyContent: 'flex-start',
                                        AlignItems: 'right', borderTop: '1px solid black', height: '25px',
                                        paddingTop: '8px', paddingLeft: '8px', cursor: 'pointer'
                                        }}
                                        // key={val}
                                        >
                                            <span style={{
                                            fontSize: '1rem', marginRight: '10px',
                                            }}
                                            >
                                            {val}
                                            </span>
                                    </StockTendency>
                                    </NavLink>
                                </div>
                        )
                        })
                    }
                </div>
                ):(
                    <span style={{color: 'red'}}>Stock not found</span>
                )
            }
        </div>
    )
}

const SideMenu = ({stockData, onSubmitStock}) => {
    return (
        <aside style={{height: '100vh', width: '250px', position: 'sticky',
        borderTop: 'none', top: '0px', color: 'white',
        backgroundImage: "linear-gradient(to bottom, rgb(36, 36, 114), #103131)"}}>
            <SearchStock stockData={stockData} onSubmitStock={onSubmitStock}/>
        </aside>
    )
}


export default SideMenu