import { Box, Button } from '@mui/material';

const Pagination = () => {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                mt: 2,
                // backgroundColor: '#f0f0f0',
                borderRadius: 'unset',
                boxShadow: 'none',
                p: '0 !important', // Override padding
            }}
        >
            <Button
                variant="outlined"
                sx={{
                    color: '#000',
                    borderColor: '#00A6B7',
                    borderRadius: 'unset',
                    background: '#fff',
                }}
            >
                &lt;
            </Button>
            <Button
                variant="outlined"
                sx={{
                    color: '#fff',
                    borderColor: '#00A6B7',
                    background: '#00A6B7',
                    borderRadius: 'unset',
                }}
            >
                1
            </Button>
            <Button
                variant="outlined"
                sx={{
                    color: '#000',
                    borderColor: '#00A6B7',
                    borderRadius: 'unset',
                    background: '#fff',
                }}
            >
                &gt;
            </Button>
        </Box>
    );
};

export default Pagination;
