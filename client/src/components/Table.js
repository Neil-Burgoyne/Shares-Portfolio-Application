import React from 'react'
import TableRow from './TableRow';

const Table = ({values, sellShares, deleteShare, editShare}) => {

    const totalCalc = values.reduce((runningTotal, shareValues)=>(runningTotal += (shareValues.currentMarketValue * shareValues.numshares)),0);
    
    const row = values.map((singleStock, i)=>{
        return (
            <TableRow editShare={editShare} deleteShare={deleteShare} sellShares={sellShares} key={i} singleStock={singleStock}/>
        )
    });
    
    return (
    <>
        <h1>Table</h1>
        <table>
            <tbody>
                <tr>
                    <th>Share</th>
                    <th>#</th>
                    <th>Average Price Paid</th>
                    <th>Current Value</th>
                    <th>%</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Sell</th>
                </tr>
                {row}
                <tr>
                    <td></td>
                    <td></td>
                    <th>Total:</th>
                    <td>£{totalCalc}</td>
                </tr>
            </tbody>
        </table>
    </>
)};

export default Table;
