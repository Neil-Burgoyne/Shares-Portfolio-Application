import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { cardElevation } from '../../styles/tableStyles';

const AddShares = ({ addShares, allStocks, selected }) => {
    const [stockSymbol, setStockSymbol] = useState();
    const [number, setNumber] = useState();
    const [added, setAdded] = useState(false);

    const stocks = allStocks.map((stock) => {
        return `${stock.symbol}: ${stock.name}`
    })

    const addSharesStyle = {
        padding: '1rem',
        margin: '1rem',
        textAlign: 'centre'
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const data = { stockSymbol: stockSymbol, numshares: number }
        addShares(data)
        e.target.reset()
        setNumber()
        setAdded(!added)
    }

    const onChange = (e) => {
        setAdded(false)
        setNumber(e.target.value)
    }

    const onSelect = (e, value) => {
        setAdded(false)
        if (value) {

            const symbol = value.split(':')[0]
            setStockSymbol(symbol)
        }
    }

    return (
        <>
            <Card>
                <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={addSharesStyle} variant="h5" component="div">Add Shares</Typography>
                    <form onSubmit={onSubmit}>
                        <Autocomplete sx={addSharesStyle} id='combo-box-demo' size="small" onChange={onSelect} disablePortal options={stocks} renderInput={(params) => <TextField {...params} label="Company" />} />
                        <TextField sx={addSharesStyle} style={{ marginBottom: '1rem' }} id="standard-basic" type="number" label="Number of Shares" onChange={onChange} variant="standard" /><br />
                        <Button variant="contained" type="submit">Add</Button><br />
                    </form>
                </CardContent>
            </Card>
        </>
    )
};

export default AddShares;