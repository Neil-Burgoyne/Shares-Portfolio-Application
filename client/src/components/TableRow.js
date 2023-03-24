import React from 'react'

const TableRow = ({singleStock}) => {
    
    const viewClick = ()=>{
        console.log("View")
    }

    const editClick = ()=>{
        console.log("Edit")
    }

    const delClick = ()=>{
        console.log("Del")
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
        <td onClick={delClick}>Delete</td>
    </tr>
    </>
)};

export default TableRow;