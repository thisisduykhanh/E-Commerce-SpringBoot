'use client';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { paths } from '@/paths';



export function ProductsFilters({ filters = {}, sortDir = 'desc' }) {
    const { status } = filters;

    // The tabs should be generated using API data.
const tabs = [
    { label: 'Sản Phẩm', value: 'Access' , count: filters.totalElementsByStatus?.Access || 0 },
];

    const router = useRouter();

    const updateSearchParams = React.useCallback(
        (newFilters, newSortDir) => {
            const searchParams = new URLSearchParams();

            if (newSortDir === 'asc') {
                searchParams.set('sortDir', newSortDir);
            }

            if (newFilters.status) {
                searchParams.set('status', newFilters.status);
            }

            if (newFilters.sku) {
                searchParams.set('sku', newFilters.sku);
            }

            if (newFilters.category) {
                searchParams.set('category', newFilters.category);
            }

            router.push(`${paths.supplier.products.list}?${searchParams.toString()}`);
        },
        [router]
    );

    const handleStatusChange = React.useCallback(
        (_, value) => {
            updateSearchParams({ ...filters, status: value }, sortDir);
        },
        [updateSearchParams, filters, sortDir]
    );


    return (
        <div>
            <Tabs onChange={handleStatusChange} sx={{ px: 3 }} value={status ?? ''} variant="scrollable">
                {tabs.map((tab) => (
                    <Tab
                        iconPosition="end"
                        key={tab.value}
                        label={tab.label}
                        sx={{ minHeight: 'auto' }}
                        tabIndex={0}
                        value={tab.value}
                    />
                ))}
            </Tabs>
            <Divider />
        </div>
    );
}
