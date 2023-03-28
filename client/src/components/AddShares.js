import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

const AddShares = ({ addShares, allStocks }) => {
    const [formData, setFormData] = useState({});

    const stocks = allStocks.map((stock) => {
        return `${stock.symbol}: ${stock.name}`
    })

    const addSharesStyle = {
        padding: '1rem',
        margin: '1rem'
    }

    const onSubmit = (e) => {
        e.preventDefault();
        formData.numshares = Number(formData.numshares)
        addShares(formData)
        e.target.reset()
        setFormData({})
    }

    const onChange = (e) => {
        newFormData = { ...formData }
        newFormData.numshares = e.target.value
        setFormData(newFormData)
    }

    const onSelect = (e) => {
        const symbol = e.target.innerText.split(':')
        newFormData = { ...formData }
        newFormData.stockSymbol = symbol[0]
        setFormData(newFormData)
    }

    return (
        <>
            <Card>
                <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={addSharesStyle} variant="h5" component="div">Add Shares</Typography>
                    <form onSubmit={onSubmit}>
                        <Autocomplete sx={addSharesStyle} id='combo-box-demo' size="small" onChange={onSelect} disablePortal sx={{ width: 300 }} options={stocks} renderInput={(params) => <TextField {...params} label="Company" />} />
                        <TextField sx={addSharesStyle} style={{ marginBottom: '1rem' }} id="standard-basic" type="number" label="Number of Shares" onChange={onChange} variant="standard" /><br />
                        <Button variant="contained" type="submit">Add</Button>
                    </form>
                </CardContent>
            </Card>
        </>
    )
};

export default AddShares;