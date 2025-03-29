'use client';

import Link from '@mui/material/Link';
import { DataTable } from '@/components/core/data-table';
import { dayjs } from '@/lib/dayjs';

const columns = [
    { field: 'id', name: 'ID', width: '200px' },
    {
        formatter: (row) => {
            return dayjs(row.issueDate).format('MMM D, YYYY');
        },
        name: 'Issue Date',
        width: '250px',
    },
    {
        formatter: (row) => {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: row.currency }).format(
                row.totalAmount
            );
        },
        name: 'Total (incl. tax)',
        width: '150px',
    },
    {
        formatter: () => (
            <Link color="inherit" underline="always">
                View
            </Link>
        ),
        name: 'Actions',
        hideName: true,
        width: '100px',
        align: 'right',
    },
];

export function InvoicesTable({ rows }) {
    return <DataTable columns={columns} rows={rows} />;
}
