import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { buyStock, sellStock } from '../store/actionTypes';
// import 

const Action = (props) => {
    const { actionType, symbol } = props.match.params;
    const { portfolioData, onClickBuyStock, onClickSellStock } = props; // 
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);
    
    // handle Function
    const handleQuantity = (value) => { setQuantity(value) };
    const handleSubmit = (e) => {
        e.preventDefault();
        // setQuantity(0);
    }
    // hooks
    useEffect(() => {
        setTotal(props.location.state.latestPrice * quantity)
    }, [quantity, props.location.state.latestPrice])
    
    // extra Function
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <ActionWrapper>
            <div>
                <span>
                    {portfolioData.reduce((acc, next) => acc + (next.close * next.quantity), 0)}
                </span>
            </div>
            <FormWrappper>
                <form className="form-container" onSubmit={(e) => {handleSubmit(e)}}>
                    <h1 className="form-title">{symbol}</h1>
                    <div className="form-info">
                        <label className="form-label">Current Price :</label>
                        <span>{formatter.format(props.location.state.latestPrice)}</span>
                    </div>
                    <div className="form-info">
                        <label className="form-label">Quantity : </label>
                        <input onChange={(e) => { handleQuantity(e.target.value) }} className="form-input quantity" placeholder={"Enter a quantity..."}/>
                    </div>
                    <div className="form-info">
                        <label className="form-label">Total :</label>
                        <span>{formatter.format(total)}</span>
                    </div>
                    {actionType === 'buy' &&
                    <button className="form-btn" onClick={() => onClickBuyStock({symbol, quantity: Number(quantity)})}>Buy</button>
                    }
                    {actionType === 'sell' &&
                    <button className="form-btn" onClick={() => onClickSellStock({symbol, quantity: Number(quantity)})}>Sell</button>
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
    height: calc(100% - 47px);  
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
        height: 70%;
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
        // justify-content: space-between;
        width: 100%;

    }
    // .form-input.quantity{
    //     // text-align: left;
    //     padding-right: 10px;
    // }
    .form-input{
        height: 50%;
        display: flex;
        // align-self: center;
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
const mapStateToProps = (state) => ({
    portfolioData: state.requestReducer.portfolioData,

})
const mapDispatchToProps = dispatch => ({
    onClickBuyStock: (ob) => {
        dispatch(buyStock(ob));
    },
    onClickSellStock: (ob) => {
        dispatch(sellStock(ob))
    }
})
// export default Action
export default connect(mapStateToProps, mapDispatchToProps)(Action); //, 