import React from 'react'
import TableRow from './TableRow';

const Table = ({user, sellShares, deleteShare}) => {

    const totalCalc = user.shareValues.reduce((runningTotal, shareValues)=>(runningTotal += (shareValues.currentMarketValue * shareValues.numshares)),0);
    
    const row = user.shareValues.map((singleStock, i)=>{
        return (
            <TableRow deleteShare={deleteShare} sellShares={sellShares} key={i} singleStock={singleStock}/>
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
