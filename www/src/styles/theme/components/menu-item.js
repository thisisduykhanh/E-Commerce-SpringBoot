import { listItemIconClasses } from '@mui/material/ListItemIcon';

export const MuiMenuItem = {
    defaultProps: { disableRipple: true },
    styleOverrides: {
        root: {
            borderRadius: '8px',
            gap: 'var(--ListItem-gap)',
            paddingBlock: 'var(--MenuItem-paddingBlock, )',
            paddingInline: 'var(--MenuItem-paddingInline, )',
            [`& .${listItemIconClasses.root}`]: { minWidth: 'auto' },
        },
    },
};
