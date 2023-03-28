import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const Search = () => {
    const returnSearch = ()=>{

    }
    return( 
    <>
        <Autocomplete id='combo-box-demo' size="small" onChange={returnSearch} disablePortal sx={{ width: 300 }} options={[]} renderInput={(params) => <TextField {...params} label="Select" />} />
    </>
)};

export default Search;