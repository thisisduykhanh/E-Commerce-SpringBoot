'use client';

import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { useUser } from '@/hooks/use-user';

export function GuestGuard({ children }) {
    const router = useRouter();
    const { user, error, isLoading } = useUser();
    const [isChecking, setIsChecking] = React.useState(true);

    const checkPermissions = React.useCallback(async () => {
        if (isLoading) {
            return;
        }

        if (error) {
            setIsChecking(false);
            return;
        }

        if (user) {
            router.replace(paths.dashboard.overview);
        }

        setIsChecking(false);
    }, [isLoading, error, user, router]);

    React.useEffect(() => {
        checkPermissions().catch(() => {
            // noop
        });
    }, [checkPermissions]);

    if (isChecking || isLoading) {
        return null;
    }

    if (error) {
        return <Alert color="error">{error.message}</Alert>;
    }

    return children;
}
