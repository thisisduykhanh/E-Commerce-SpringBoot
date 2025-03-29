import { paperClasses } from '@mui/material/Paper';

export const MuiCard = {
    styleOverrides: {
        root: ({ }) => {
            return {
                borderRadius: '20px',
                backgroundColor: 'transparent',
                boxShadow: 'none',
                [`&.${paperClasses.elevation1}`]: {
                    boxShadow: 'none',
                },
            };
        },
    },
};
