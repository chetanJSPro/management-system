import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { AlertTitle, LinearProgress } from '@mui/material';

export default function TransitionAlerts() {
    const [open, setOpen] = React.useState(true);
    const [progress, setProgress] = React.useState(100); // Start at 100% for the progress bar

    React.useEffect(() => {
        if (open) {
            // Countdown to automatically close alert after 5 seconds
            const timer = setTimeout(() => {
                setOpen(false);
            }, 5000);

            // Update the progress bar every 50ms to give a smooth countdown effect
            const interval = setInterval(() => {
                setProgress(prev => (prev > 0 ? prev - 2 : 0));
            }, 50);

            return () => {
                clearTimeout(timer);
                clearInterval(interval);
            };
        }
    }, [open]);

    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
                <Alert severity="success"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => setOpen(false)}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    <AlertTitle>Success</AlertTitle>
                    Your data is successfully submitted!! 🫡
                </Alert>
                <LinearProgress variant="determinate" color='success' value={progress} />
            </Collapse>
        </Box>
    );
}
