import { UserContext } from '@/contexts/auth/custom/user-context';
import React from 'react';

export function useUser() {
    const context = React.useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
}
