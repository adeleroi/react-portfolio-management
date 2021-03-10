import React from 'react';
import styled from 'styled-components';

const CompanyInfo = ({stockData, symbol}) => {
    return (
        <CompanyInfoStyle>
            <h2 className="company">About &nbsp;<a className="about-title" href={`/${stockData[symbol].company.website}`}>{symbol}</a>:
            </h2>
            <div className="stock-company-info">
                <div className="infos-infos">
                    <div className="company">
                        <span className="lable-description">Sector </span>
                        <span>: {stockData[symbol].company.sector}</span>
                    </div>
                    <div className="company">
                        <span className="lable-description">Employees </span>
                        <span>: {stockData[symbol].company.employees}</span>
                    </div>
                    <div className="company">
                        <span className="lable-description">Industry </span>
                        <span>: {stockData[symbol].company.industry}</span>
                    </div>
                <div className="company description">
                    <span className="lable-description">Description </span>
                    <span>: {stockData[symbol].company.description}</span>
                </div>
                </div>
            </div> 
        </CompanyInfoStyle>
    )
}
const CompanyInfoStyle = styled.div`
    width: 80%;
    line-height: 35px;
    .stock-company-info{
        display: flex;
        // flex-direction: column;
        // place-items: center;
        width: 100%;
        justify-content: flex-start;

    }
    .infos-infos{
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        // width: 67%;
        // height: 36vh;
        margin-bottom: 15px;
    }
    .company{
        display: flex;
    }
    .company.description{
        // display: flex;
        width: 67%;
        text-align: left;
        margin-bottom: 50px;
        line-height: 25px;
    }
    .about-title{
        margin-left: 5px;
    }
    .lable-description{
        // display: flex;
        text-align: left;
        font-weight: bold;
        // margin-bottom: 30px;
    }
`

export default CompanyInfo;
