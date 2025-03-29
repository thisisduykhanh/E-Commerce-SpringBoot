'use client';

import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { toast } from '@/components/core/toaster';
import { useUser } from '@/hooks/use-user';
import { authClient } from '@/lib/auth/custom/client';
import { logger } from '@/lib/default-logger';

export function CustomSignOut() {
    const { checkSession } = useUser();

    const router = useRouter();

    const handleSignOut = React.useCallback(async () => {
        try {
            logger.debug('Attempting to sign out'); // Added logging
            const { error } = await authClient.signOut();

            if (error) {
                logger.error('Sign out error', error);
                toast.error('Something went wrong, unable to sign out');
                return;
            }

            // Refresh the auth state
            await checkSession?.();
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('role');

            // UserProvider, for this case, will not refresh the router and we need to do it manually
            router.refresh();
            logger.debug('Sign out successful, router refreshed'); // Added logging
            // After refresh, AuthGuard will handle the redirect
        } catch (err) {
            logger.error('Sign out error', err);
            toast.error('Something went wrong, unable to sign out');
        }
    }, [checkSession, router]);

    return (
        <MenuItem component="div" onClick={handleSignOut} sx={{ justifyContent: 'center' }} key="sign-out">
            Sign out
        </MenuItem>
    );
}
