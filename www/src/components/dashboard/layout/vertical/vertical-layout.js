'use client';

import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';
import * as React from 'react';

import { useSettings } from '@/hooks/use-settings';

import { layoutConfig as layoutConfigSupplier } from '../config';
import { layoutConfig as layoutConfigAdmin } from '../config-admin';
import { layoutConfig as layoutConfigUser } from '../config-user';
import { MainNav } from './main-nav';
import { SideNav } from './side-nav';

export function VerticalLayout({ children }) {
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
    const { settings } = useSettings();

    return (
        <React.Fragment>
            <GlobalStyles
                styles={{
                    body: {
                        '--MainNav-height': '56px',
                        '--MainNav-zIndex': 1000,
                        '--SideNav-width': '280px',
                        '--SideNav-zIndex': 1100,
                        '--MobileNav-width': '320px',
                        '--MobileNav-zIndex': 1100,
                    },
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
                <SideNav color={settings.navColor} items={layoutConfig.navItems} />
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                        pl: { lg: 'var(--SideNav-width)' },
                    }}
                >
                    <MainNav items={layoutConfig.navItems} />
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
            </Box>
        </React.Fragment>
    );
}
