import { buttonClasses } from '@mui/material/Button';

function getContainedVars() {
    return {
        '--Button-containedBg': 'unset',
        '--Button-containedBgGradient': 'unset',
        '--Button-containedStroke': 'unset',
    };
}

function getOutlinedVars() {
    const vars = {
        '--Button-outlinedBorder': 'unset',
        '--Button-outlinedHoverBg': 'unset',
        '--Button-outlinedActiveBg': 'unset',
    };

    return vars;
}


export const MuiButton = {
    defaultProps: { disableRipple: true },
    styleOverrides: {
        root: {
            borderRadius: '8px',
            minHeight: 'var(--Button-minHeight)',
            minWidth: 'unset',
            textTransform: 'none',
            backgroundColor: 'unset',
            '&:focus-visible': { outline: '2px solid var(--mui-palette-primary-main)' },
        },
        text: {
            backgroundColor: 'unset',
            '&:hover': { backgroundColor: 'var(--Button-textHoverBg)' },
            '&:active': { backgroundColor: 'var(--Button-textActiveBg)' },
        },
        outlined: {
            boxShadow: 'var(--mui-shadows-1)',
            borderColor: 'var(--Button-outlinedBorder)',
            backgroundColor: 'unset',
            '&:hover': {
                borderColor: 'var(--Button-outlinedBorder)',
                backgroundColor: 'var(--Button-outlinedHoverBg)',
            },
            '&:active': { backgroundColor: 'var(--Button-outlinedActiveBg)' },
        },
        contained: {
            backgroundColor: 'unset',
            backgroundImage: 'unset',
            boxShadow: 'unset',
            '&:hover': {
                boxShadow: 'unset',
            },
            '&:active': { backgroundImage: 'unset' },
            '&:focus-visible': { boxShadow: 'unset', outlineOffset: '1px' },
            [`&.${buttonClasses.disabled}`]: { backgroundImage: 'none', '&::before': { boxShadow: 'none' } },
        },
        containedPrimary: getContainedVars(),
        containedSecondary: getContainedVars(),
        containedSuccess: getContainedVars(),
        containedInfo: getContainedVars(),
        containedWarning: getContainedVars(),
        containedError: getContainedVars(),
        outlinedPrimary: getOutlinedVars(),
        outlinedSecondary: getOutlinedVars(),
        outlinedSuccess: getOutlinedVars(),
        outlinedInfo: getOutlinedVars(),
        outlinedWarning: getOutlinedVars(),
        outlinedError: getOutlinedVars(),
        sizeSmall: { '--Button-minHeight': '32px', fontSize: '0.8125rem', lineHeight: '24px' },
        sizeMedium: { '--Button-minHeight': '40px', fontSize: '0.875rem', lineHeight: '28px' },
        sizeLarge: { '--Button-minHeight': '48px', fontSize: '0.9375rem', lineHeight: '32px' },
    },
};
