import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material'
import { Stack } from '@mui/system';

const BuyRow = ({ addShares, sellShares, selectedStock, asset }) => {
    const [numShares, setNumShares] = useState(0);

    const handleBuyShares = () => {
        const data = { stockSymbol: selectedStock.symbol, numshares: numShares };
        addShares(data);
        setNumShares(0);
    }
    const handleSellShares = () => {
        if (numShares <= asset.numShares) {
            sellShares(Number(numShares), selectedStock)
        } else {
            return null
        }
    }

    const handleNumChange = (e) => {
        setNumShares(e.target.value)
    }

    return (
        <Stack>
            <Box>
                <Typography>{`You currently own ${asset.numShares} shares in ${selectedStock.name} valued at a total of $${asset.currentTotalValue} `}</Typography>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "2rem", padding: "0.5rem 2rem 0.5rem 2rem", alignItems: "center" }}>
                <Typography>{`Number of ${selectedStock.symbol} Shares:`}</Typography>
                <TextField
                    sx={{ width: "5rem" }}
                    type="number"
                    onChange={handleNumChange}
                    value={numShares}
                    variant="standard"
                />
                <Typography>x ${selectedStock.closingValue} = ${(numShares * selectedStock.closingValue).toFixed(2)}</Typography>
                <Button sx={{ backgroundColor: "green", "&:hover": { backgroundColor: "#009900" } }} onClick={handleBuyShares} variant="contained" size="medium">
                    Buy
                </Button>
                <Button sx={{ backgroundColor: "#DD0000", "&:hover": { backgroundColor: "#FF0000" } }} onClick={handleSellShares} variant="contained" size="medium">
                    Sell
                </Button>
            </Box>
        </Stack>
    );
}

export default BuyRow;