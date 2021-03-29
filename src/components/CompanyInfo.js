import React from 'react';
import styled from 'styled-components';

const CompanyInfo = ({stockData, symbol, title, data}) => {
    const keyList = Object.keys(data)
    // const hasDescription = data.hasOwnProperty("Description")
    return (
        <CompanyInfoStyle>
            <h2 className="apropos-title">{title}</h2>
            <div className="stock-company-info">
                {
                    keyList.map(key => {
                        const isDescription = key === "Description"
                        return (
                            <div className="infos-infos" key={key}>
                                    <div className={ isDescription ? "description" : "company" }>
                                            <span className="lable-description">
                                            { isDescription ? null: key } 
                                            </span>
                                    {
                                        key !== 'Website' ? ( 
                                            <span className={isDescription ? null: "c-response"}>
                                                {data[key]}
                                            </span>
                                        ):(
                                            <a className="c-response"
                                                href={`/${stockData[symbol].company.website}`}>
                                                {symbol}
                                            </a>
                                        )
                                    }
                                    </div>
                            </div>
                        )
                    })
                }
            </div> 
        </CompanyInfoStyle>
    )
}
const CompanyInfoStyle = styled.div`
    min-width: 18vw;
    line-height: 35px;
    border: 1px solid #dcdcdc;
    border-radius: 10px;
    padding: 0 10px;
    margin-bottom: 23px;
    .apropos-title{
        text-align: left;
    }
    .stock-company-info{
        display: flex;
        flex-direction: column;
        // place-items: center;
        width: 100%;
        justify-content: flex-start;
        font-size: 12px;

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
        ${'' /* align: center; */}
        justify-content: space-between;
        border-top: 1px solid gray;
        ${'' /* width: 15vw; */}

    }
    .description{
        // display: flex;
        width: 15vw;
        text-align: left;
        margin-bottom: 20px;
        line-height: 20px;
        font-size: 12px;
        ${'' /* max-height: 300px; */}
        ${'' /* overflow-x: hidden; */}
        ${'' /* white-space: nowrap; */}
        ${'' /* resize: vertical; */}
        ${'' /* text-overflow: ellipsis; */}
        ${'' /* overflow-wrap: break-word;
        word-wrap: break-word; */}
    }
    .c-response{
        margin-left: 5px;
        font-weight: bold;
    }
    .lable-description{
        // display: flex;
        text-align: left;
        font-weight: bold;
        // margin-bottom: 30px;
        color: gray;
    }
`

export default CompanyInfo;
