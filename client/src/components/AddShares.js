import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const AddShares = ({addShares}) => {
    const [formData, setFormData] = useState({});

    const onSubmit = (e)=>{
        e.preventDefault();
        formData.numshares = Number(formData.numshares)
        addShares(formData)
        e.target.reset()
        setFormData({})
    }

    const onChange = (e)=>{
        formData[e.target.id] = e.target.value.toUpperCase()
        setFormData(formData)
    }

    return (
        <>
            <h3>Add Shares</h3>
            <form onSubmit={onSubmit}>
                <label htmlFor='stockSymbol'>Company:</label>
                <input type='text' id='stockSymbol' placeholder='Company' onChange={onChange}></input>
                <label htmlFor='numshares'>Number:</label>
                <input type='number' id='numshares' placeholder='Num' onChange={onChange}></input>
                <label htmlFor='date'>Date:</label>
                <input type='date' id='date'></input>
                <button type='submit'>Add</button>
            </form>
        </>
    )
};

export default AddShares;