import React from 'react'
import TableRow from './TableRow';

const Table = ({user, sellShares}) => {
    
    const row = user.shareValues.map((singleStock, i)=>{
        return (
            <TableRow sellShares={sellShares} key={i} singleStock={singleStock}/>
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
            </tbody>
        </table>
    </>
)};

export default Table;
