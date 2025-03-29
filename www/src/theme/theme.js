import { createTheme } from '@mui/material/styles';

// Define your theme here
const theme = createTheme({
    palette: {
        primary: {
            main: '#00A6B7', // Màu chính
        },
        secondary: {
            main: '#0085A1', // Màu phụ
        },
        background: {
            default: '#EDF0F7', // Màu nền mặc định
            paper: '#fff',
        },
        text: {
            primary: '#000', // Màu chữ chính
            secondary: '#fff',
        },
    },
    typography: {
        fontFamily: 'Poppins, Inter, Arial, sans-serif',
        fontSize: 14,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding:'0',
                    fontSize: '13px',
                    textTransform: 'none',
                    borderStyle: 'none',
                    '&:hover': {
                        backgroundColor: '#D4DDE8',
                    },
                },
                contained: {
                    backgroundColor: '#00A6B7',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#0085A1',
                    },
                },
                outlined: {
                    backgroundColor: '#EDF0F7',
                    color: '#000',
                    '&:hover': {
                        backgroundColor: '#D4DDE8',
                    },
                },
            },
        },
    },
});

export default theme;
