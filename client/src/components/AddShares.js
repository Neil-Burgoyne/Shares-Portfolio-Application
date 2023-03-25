import React, { useState } from 'react'

const AddShares = ({addShares}) => {
    const [formData, setFormData] = useState({});

    const onSubmit = (e)=>{
        e.preventDefault();
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
                <label htmlFor='share'>Share:</label>
                <input type='text' id='stockSymbol' placeholder='Share' onChange={onChange}></input>
                <label htmlFor='number'>Number:</label>
                <input type='number' id='numshares' placeholder='Num' onChange={onChange}></input>
                <label htmlFor='date'>Date:</label>
                <input type='date' id='date'></input>

                <button type='submit'>Add</button>

            </form>
        </>
    )
};

export default AddShares;