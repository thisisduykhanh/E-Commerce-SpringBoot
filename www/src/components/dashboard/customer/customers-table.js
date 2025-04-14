'use client';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { CheckCircle as CheckCircleIcon, MinusCircle as MinusIcon } from '@phosphor-icons/react/dist/ssr';
import RouterLink from 'next/link';
import * as React from 'react';

import { DataTable } from '@/components/core/data-table';
import { paths } from '@/paths';

import { useCustomersSelection } from './customers-selection-context';

const columns = [
  {
    formatter: (row) => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Avatar src={row.avatar} />{' '}
        <div>
          <Link
            color="inherit"
            component={RouterLink}
            href={paths.dashboard.customers.details('1')}
            sx={{ whiteSpace: 'nowrap' }}
            variant="subtitle2"
          >
            {row.fullName}
          </Link>
          <Typography color="text.secondary" variant="body2">
            {row.account.email}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Họ tên',
    width: '250px',
  },
  {
    formatter: (row) => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Typography color="text.secondary" variant="body2">
          {row.phone}
        </Typography>
      </Stack>
    ),
    name: 'Số điện thoại',
    width: '150px'
  },
  {
    formatter: (row) => {
      const locked = row.account.locked;
      const { label, icon } = locked
        ? {
          label: 'Blocked',
          icon: <MinusIcon color="var(--mui-palette-error-main)" size={24} />,
        }
        : {
          label: 'Active',
          icon: <CheckCircleIcon color="var(--mui-palette-success-main)" size={24} />,
        };

      return (
        <Stack direction="row" spacing={1} alignItems="center">
          {icon}
          <Typography variant="body2">{label}</Typography>
        </Stack>
      );
    },
    name: 'Status',
    width: '150px',
  },
  {
    formatter: () => (
      <IconButton component={RouterLink} href={paths.dashboard.customers.details('1')}>
        <PencilSimpleIcon size={24} />
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
        selectable
        selected={selected}
      />
      {!rows.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
            No customers found
          </Typography>
        </Box>
      ) : null}
    </React.Fragment>
  );
}
