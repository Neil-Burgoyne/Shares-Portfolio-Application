import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Slide } from '@mui/material';

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const Message = ({ message, show, hide }) => {
    return (
        <Snackbar
            open={show}
            autoHideDuration={6000}
            onClose={hide}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            TransitionComponent={SlideTransition}
        >
            <MuiAlert severity={message.severity}>{message.text}</MuiAlert>
        </Snackbar>);
}

export default Message;