'use client';

import Alert from '@mui/material/Alert';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { config } from '@/config';
import { useUser } from '@/hooks/use-user';
import { AuthStrategy } from '@/lib/auth/strategy';
import { logger } from '@/lib/default-logger';
import { paths } from '@/paths';


export function AuthGuard({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, error, isLoading } = useUser();
    const [isChecking, setIsChecking] = React.useState(true);

    const checkPermissions = React.useCallback(() => {
        logger.debug('[AuthGuard]: Checking permissions...', { user, error, isLoading });
        if (isLoading) return;

        if (error) {
            setIsChecking(false);
            return;
        }

        if (!user) {
            logger.error('[AuthGuard]: User is not authenticated');
            switch (config.auth.strategy) {
                case AuthStrategy.CUSTOM:
                    router.replace(paths.auth.custom.signIn);
                    break;
                case AuthStrategy.AUTH0:
                    router.replace(paths.auth.auth0.signIn);
                    break;
                case AuthStrategy.COGNITO:
                    router.replace(paths.auth.cognito.signIn);
                    break;
                case AuthStrategy.FIREBASE:
                    router.replace(paths.auth.firebase.signIn);
                    break;
                case AuthStrategy.SUPABASE:
                    router.replace(paths.auth.supabase.signIn);
                    break;
                default:
                    logger.error('[AuthGuard]: Unknown auth strategy');
                    break;
            }
            return;
        }
        const segments = pathname.split('/');
        if (segments[1] != user.role) {
            sessionStorage.clear();
            router.replace(paths.auth.custom.signIn);
        }

        setIsChecking(false);
    }, [isLoading, error, user, router]);

    React.useEffect(() => {
        checkPermissions();
    }, [checkPermissions]);

    if (isLoading || isChecking) {
        return null;
    }

    if (error) {
        return <Alert severity="error">{error.message || 'An error occurred'}</Alert>;
    }

    return children;
}
