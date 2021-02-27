import * as React from 'react'

const Spiner = () => {
    return (
        <>
            <h1>
                <span className="icon-spinner9" style={{color: 'rgb(36, 36, 114)'}}></span>
                &nbsp; Loading
            </h1>
        </>
    )
}

const FullPageSpiner = () => {
    return (
        <div style={{height: '100vh', display: 'grid', placeItems: 'center'}}>
            <h1>
                <span className="icon-spinner9" style={{color: 'rgb(36, 36, 114)'}}></span>
                &nbsp; Loading
            </h1>
        </div>
    )
}

export { Spiner, FullPageSpiner }