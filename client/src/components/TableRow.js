import React, { useState } from 'react'

const TableRow = ({singleStock, sellShares}) => {
    const [clicked, setClicked] = useState(false);
    const [shareInput, setShareInput] = useState();
    const [error, setError] = useState(false);
    
    const viewClick = ()=>{
        console.log("View")
    }

    const editClick = ()=>{
        console.log("Edit")
    }

    const sellClick = ()=>{
        setClicked(!clicked)
    }

    const onChange = (e)=>{
        setShareInput(e.target.value)
    }

    const sell =()=>{
        if(shareInput <= singleStock.numshares){
            const temp = {...singleStock}
            temp.numshares -= shareInput
            sellShares(temp, singleStock)
            sellClick()
        }else{
            return null
        }
    }


    return( 
    <>
    <tr>
        <td>{singleStock.stockSymbol}</td>
        <td>{singleStock.numshares}</td>
        <td>£{singleStock.averagePricePaid}</td>
        <td>£{singleStock.currentMarketValue}</td>
        <td onClick={viewClick}>View</td>
        <td onClick={editClick}>Edit</td>
    {clicked? 
    <>
        <td><input id="input" type='number' onChange={onChange} placeholder='Number to sell'></input></td>
        <td><button onClick={sell}>Sell Shares</button></td>
        <td><button onClick={sellClick}>Cancel</button></td>
    </>
    : <td onClick={sellClick}>Sell</td>}
    </tr>
    </>
)};

export default TableRow;