import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import { Analytics } from '@/components/core/analytics';
import { I18nProvider } from '@/components/core/i18n-provider';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { SettingsButton } from '@/components/core/settings/settings-button';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';
import { Toaster } from '@/components/core/toaster';
import { config } from '@/config';
import { UserProvider } from '@/contexts/auth/user-context';
import { SettingsProvider } from '@/contexts/settings';
import { applyDefaultSettings } from '@/lib/settings/apply-default-settings';
import { getSettings as getPersistedSettings } from '@/lib/settings/get-settings';

import { CartProvider } from "@/contexts/CartContext";

export const metadata = { title: config.site.name };

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: config.site.themeColor,
};

export default async function Layout({ children }) {
    const settings = applyDefaultSettings(await getPersistedSettings());

    return (
        <html lang={settings.language} suppressHydrationWarning>
            <body style={{ margin: '24px', padding: 0 }}>
                <InitColorSchemeScript attribute="class" />
                <Analytics>
                    <LocalizationProvider>
                        <UserProvider>
                            <SettingsProvider settings={settings}>
                                <I18nProvider lng={settings.language}>
                                <CartProvider>
                                        <ThemeProvider>
                                            {children}
                                            <SettingsButton />
                                            <Toaster position="bottom-right" />
                                        </ThemeProvider>
                                    
                                    </CartProvider>
                                </I18nProvider>
                            </SettingsProvider>
                        </UserProvider>
                    </LocalizationProvider>
                </Analytics>
            </body>
        </html>
    );
}
