'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

export default function Layout() {
    const router = useRouter();
    React.useEffect(() => {
        router.replace('/user');
    }, [router]);

    return null;
}
