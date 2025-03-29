'use client';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { Minus as MinusIcon } from '@phosphor-icons/react/dist/ssr/Minus';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import RouterLink from 'next/link';
import * as React from 'react';

import { DataTable } from '@/components/core/data-table';
import { dayjs } from '@/lib/dayjs';
import { paths } from '@/paths';

import { useCustomersSelection } from './customers-selection-context';

const columns = [
    {
        formatter: (row) => (
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Avatar src={row.image} />{' '}
                <div>
                    <Link
                        color="inherit"
                        component={RouterLink}
                        href={paths.dashboard.customers.details('1')}
                        sx={{ whiteSpace: 'nowrap' }}
                        variant="subtitle2"
                    >
                        {row.nameSupply}
                    </Link>
                    <Typography color="text.secondary" variant="body2">
                        {row.email}
                    </Typography>
                    {/* TODO: Supplier email */}
                </div>
            </Stack>
        ),
        name: 'Tên',
        width: '250px',
    },
    //   {
    //     formatter: (row) => (
    //       <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
    //         <LinearProgress sx={{ flex: '1 1 auto' }} value={row.quota} variant="determinate" />
    //         <Typography color="text.secondary" variant="body2">
    //           {new Intl.NumberFormat('vi-VN', { style: 'percent', maximumFractionDigits: 2 }).format(row.quota / 100)}
    //         </Typography>
    //       </Stack>
    //     ),
    //     name: 'Quota',
    //     width: '250px',
    //   },
    {  formatter(row) {
        return row.phone ?  row.phone: 'N/A';
    }, name: 'Số điện thoại', width: '150px' },
    {
        formatter(row) {
            return row.createDate ? dayjs(row.createDate).format('MMM D, YYYY h:mm A') : 'N/A';
        },
        name: 'Ngày tạo',
        width: '200px',
    },
    {
        formatter: (row) => {
            //   const mapping = {
            //     active: { label: 'Hoạt động', icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" /> },
            //     blocked: { label: 'Khoá', icon: <MinusIcon color="var(--mui-palette-error-main)" /> },
            //     pending: { label: 'Chờ duyệt', icon: <ClockIcon color="var(--mui-palette-warning-main)" weight="fill" /> },
            let label, icon;

            switch (row.supplierStatus) {
                case 'Active':
                    label = 'Hoạt động';
                    icon = <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />;
                    break;
                case 'Blocked':
                    label = 'Khoá';
                    icon = <MinusIcon color="var(--mui-palette-error-main)" />;
                    break;
                case 'Pending':
                    label = 'Chờ duyệt';
                    icon = <ClockIcon color="var(--mui-palette-warning-main)" weight="fill" />;
                    break;
                default:
                    label = 'Unknown';
                    icon = null;
            }
            

            return <Chip icon={icon} label={label} size="small" variant="outlined" />;
        },
        name: 'Trạng thái',
        width: '150px',
    },
    {
        formatter: () => (
            <IconButton component={RouterLink} href={paths.dashboard.customers.details('1')}>
                <PencilSimpleIcon />
            </IconButton>
        ),
        name: 'Hành động',
        width: '100px',
        align: 'right',
    },
];

export function CustomersTable({ rows }) {
    const { deselectAll, deselectOne, selectAll, selectOne, selected } = useCustomersSelection();

    return (
        <React.Fragment>
            <DataTable
                columns={columns}
                onDeselectAll={deselectAll}
                onDeselectOne={(_, row) => {
                    deselectOne(row.id);
                }}
                onSelectAll={selectAll}
                onSelectOne={(_, row) => {
                    selectOne(row.id);
                }}
                rows={rows}
                selectable={true}
                selected={selected}
            />
            {!rows.length ? (
                <Box sx={{ p: 3 }}>
                    <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
                        Không tìm thấy nhà cung cấp
                    </Typography>
                </Box>
            ) : null}
        </React.Fragment>
    );
}
