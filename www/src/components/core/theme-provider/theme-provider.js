'use client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { useSettings } from '@/hooks/use-settings';
import { createTheme } from '@/styles/theme/create-theme';

import { EmotionCacheProvider } from './emotion-cache';
import { Rtl } from './rtl';

function CustomThemeProvider({ children }) {
    const { settings } = useSettings();

    const theme = createTheme({
        primaryColor: settings.primaryColor,
        direction: settings.direction,
    });

    return (
        <EmotionCacheProvider options={{ key: 'mui' }}>
            <Rtl direction={settings.direction}>
                <ThemeProvider disableTransitionOnChange theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </Rtl>
        </EmotionCacheProvider>
    );
}

export { CustomThemeProvider as ThemeProvider };
