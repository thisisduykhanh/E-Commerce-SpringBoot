'use client';

import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';
import * as React from 'react';

import { useSettings } from '@/hooks/use-settings';

import { layoutConfig as layoutConfigSupplier } from '../config';
import { layoutConfig as layoutConfigAdmin } from '../config-admin';
import { layoutConfig as layoutConfigUser } from '../config-user';
import { MainNav } from './main-nav';

export function HorizontalLayout({ children }) {
    const { settings } = useSettings();
    const role = sessionStorage.getItem('role')?.toLowerCase();
    let layoutConfig;

    switch (role) {
        case 'admin':
            layoutConfig = layoutConfigAdmin;
            break;
        case 'supplier':
            layoutConfig = layoutConfigSupplier;
            break;
        case 'dashboard':
            layoutConfig = layoutConfigUser;
            break;
        default:
            layoutConfig = layoutConfigSupplier;
            break;
    }

    return (
        <React.Fragment>
            <GlobalStyles
                styles={{
                    body: { '--MainNav-zIndex': 1000, '--MobileNav-width': '320px', '--MobileNav-zIndex': 1100 },
                }}
            />
            <Box
                sx={{
                    bgcolor: 'var(--mui-palette-background-default)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    minHeight: '100%',
                }}
            >
                <MainNav color={settings.navColor} items={layoutConfig.navItems} />
                <Box
                    component="main"
                    sx={{
                        '--Content-margin': '0 auto',
                        '--Content-maxWidth': 'var(--maxWidth-xl)',
                        '--Content-paddingX': '24px',
                        '--Content-paddingY': { xs: '24px', lg: '64px' },
                        '--Content-padding': 'var(--Content-paddingY) var(--Content-paddingX)',
                        '--Content-width': '100%',
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </React.Fragment>
    );
}
