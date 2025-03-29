'use client';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import RouterLink from 'next/link';
import { usePathname } from 'next/navigation';

import { paths } from '@/paths';

function useSegment(sampleId) {
    const pathname = usePathname();
    return pathname.split('/dashboard/social/profile/')[sampleId] ?? 'timeline,connections';
}

export function ProfileTabs({ params }) {
    const sampleId = params?.id || 1;
    const segment = useSegment(sampleId);

    return (
        <Tabs
            sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', color: '#1a1a1a' ,}}
            value={segment}
        >
            <Tab
                component={RouterLink}
                href={paths.user.supplier.timeline(sampleId)}
                label="Dòng thời gian"
                tabIndex={0}
                value="timeline"
                sx={{ color: '#1a1a1a' }}
            />
            <Tab
                component={RouterLink}
                href={paths.user.supplier.connections(sampleId)}
                label="Sản phẩm"
                tabIndex={0}
                value="connections"
                sx={{ color: '#1a1a1a' }}
            />
        </Tabs>
    );
}
