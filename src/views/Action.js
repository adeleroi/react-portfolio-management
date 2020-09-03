import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Action = (props) => {
    const { actionType, symbol } = props.match.params
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);
    const [price, setPrice] = useState(0);
    const handleTotal = (value) => { setTotal(value) };
    const handleQuantity = (value) => { setQuantity(value) };
    const handleSubmit = (e) => {
        e.preventDefault();
        
    }
    useEffect(() => {
        getTotal(price, quantity)
        return () => {
        }
    }, [quantity])
    const getTotal = (p, q) => {
        return setTotal(p * q)
    }
    return (
        <ActionWrapper>
            <FormWrappper>
                <form className="form-container" onSubmit={(e) => {handleSubmit(e)}}>
                    <h1 className="form-title">{symbol}</h1>
                    <div className="form-info">
                        <label className="form-label">Current Price :</label>
                        <span> {price}$</span>
                    </div>
                    <div className="form-info">
                        <label className="form-label">Quantity : </label>
                        <input onChange={(e) => { handleQuantity(e.target.value) }} className="form-input"/>
                    </div>
                    <div className="form-info">
                        <label className="form-label">Total :</label>
                        <span>{total}$</span>
                        {/* <input onChange={(e) => { handleTotal(e.target.value) }} className="form-input"/> */}
                    </div>
                    {actionType === 'buy' &&
                    <button className="form-btn">Buy</button>
                    }
                    {actionType === 'sell' &&
                    <button className="form-btn">Sell</button>
                    }
                </form>
            </FormWrappper>
        </ActionWrapper>
    )
}

const ActionWrapper = styled.div`
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
`
const FormWrappper = styled.div`
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    // background-color: transparent;
    .form-title{
        font-size: 1.2rem;
    }
    .form-container{
        font-size: 1.5rem;
        padding: 15px 15px 15px 15px;
        height: 40%;
        width: 30%;
        border: 1px solid #cccccc;
        border-radius: 10px;
        display: grid;
        // place-items: center;
        background-color: white;
        line-height: 40px;
    }
    .form-label{
        display: flex;
        text-align: left;
        width: 100%;
    }
    .form-info{
        display: flex;
        justify-content: space-between;
        width: 100%;

    }
    .form-input{
        height: 50%;
        display: flex;
        text-align: right;
        font-size: 1.2rem;
        padding-right: 10px;
        border-radius: 5px;
        border: 1px solid #cccccc;
    }
    .form-btn{
        color: white;
        height: 45px;
        font-size: 1.1rem;
        border-radius: 10px;
        border: 1px solid #cccccc;
        background-color: rgb(36, 36, 114);
        cursor: pointer;
        transition: all ease 0.5s;
    }
    .form-btn:hover{
        color: yellow;
        // color: rgb(36, 36, 114);
        border: 1px solid rgb(36, 36, 114);
    }

`
export default Action