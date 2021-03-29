import * as React from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchNewsData } from '../store/actionTypes'
import { Spiner } from './lib'

const News = ({dispatch, isLoading, newsData, error, symbol}) => {
    // newsData = []
    // const data = newsData.filter(news => news.imageUrl !== undefined)
    React.useEffect(() => {
        dispatch(fetchNewsData(symbol))
    }, [dispatch, symbol])
    
    if(isLoading){
        return <Spiner/>
    }

    return (
        <div style={{width: '45vw'}}>
            <h1 style={{textAlign: 'left'}}>News</h1>
            {
                newsData && newsData.filter(news => news.imageUrl !== undefined).map(news => {
                    return (
                        <a href={news.link} 
                            style={{textDecoration: 'none', color: 'inherit'}}
                            target="_blank" rel="noopener noreferrer"
                        >
                            <div key={news.uuid} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                maxWidth: "95%",
                                border: '1px solid #dcdcdc',
                                borderRadius: '10px',
                                padding: '10px',
                                marginBottom: '20px'
                                }}>
                                <div style={{maxWidth: '100%', marginRight: '20px'}}>
                                    <p style={{
                                        textAlign: 'left',
                                        fontSize: '13px',
                                        margin: 0,
                                        color: 'gray'
                                        }}>
                                        {news.publisher}
                                    </p>
                                    <h4 style={{textAlign: 'left'}}>{news.title}</h4>
                                </div>
                                <div style={{display: 'grid', placeItems: 'center'}}>
                                    <img src={news.imageUrl} alt="img" style={{
                                        backgroundSize: 'cover',
                                        width: "120px",
                                        height: "90px",
                                        borderRadius: '10px',
                                    }}/>
                                </div>
                            </div>
                        </a>
                    )
                })
            }
        </div>
    )
}


const mapStateToProps = (state) => ({
    isLoading: state.newsReducer.isLoading,
    newsData: state.newsReducer.newsData,
    error: state.newsReducer.error
})

export default connect(mapStateToProps)(News)