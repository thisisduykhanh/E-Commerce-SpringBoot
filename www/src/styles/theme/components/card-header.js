import { avatarClasses } from '@mui/material/Avatar';

export const MuiCardHeader = {
    defaultProps: { titleTypographyProps: { variant: 'h6' }, subheaderTypographyProps: { variant: 'body2' } },
    styleOverrides: {
        root: { padding: '0' },
        avatar: {
            [`& .${avatarClasses.root}`]: {
                '--Icon-fontSize': 'var(--icon-fontSize-lg)',
                backgroundColor: 'unset',
                boxShadow: 'unset',
                color: 'unset',
            },
        },
    },
};
