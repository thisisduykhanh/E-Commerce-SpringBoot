'use client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { PencilSimple as PencilIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr/Image';
import RouterLink from 'next/link';
import * as React from 'react';

import { DataTable } from '@/components/core/data-table';
import { paths } from '@/paths';

import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CancelIcon from '@mui/icons-material/Cancel';


const columns = [
    {
        formatter: (row) => (
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                {row.images ? (
                    <Box
                        sx={{
                            alignItems: 'center',
                            bgcolor: 'var(--mui-palette-background-level2)',
                            backgroundImage: `url(${row.images[0]?.url})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            borderRadius: 1,
                            display: 'flex',
                            height: '80px',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            width: '80px',
                        }}
                    />
                ) : (
                    <Box
                        sx={{
                            alignItems: 'center',
                            bgcolor: 'var(--mui-palette-background-level2)',
                            borderRadius: 1,
                            display: 'flex',
                            height: '80px',
                            justifyContent: 'center',
                            width: '80px',
                        }}
                    >
                        <ImageIcon fontSize="var(--icon-fontSize-lg)" />
                    </Box>
                )}
                <div>
                    <Link
                        color="text.primary"
                        component={RouterLink}
                        href={paths.supplier.products.preview(row.id)}
                        sx={{ whiteSpace: 'nowrap' }}
                        variant="subtitle2"
                    >
                        {row.productName}
                    </Link>
                    <Typography color="text.secondary" variant="body2">
                        {row.productTypeName}
                    </Typography>
                </div>
            </Stack>
        ),
        name: 'Tên sản phẩm',
        width: '300px',
    },
    { field: 'id', name: 'Mã sản phẩm', width: '150px' },
    //   { field: 'quantity', name: 'Stock', width: '100px' },
    {
        formatter(row) {
            // Hàm định dạng giá tiền (VNĐ)
            const formatPrice = (price) => {
                if (price == null || isNaN(price)) return "Không có giá trị hợp lệ.";
        
                return new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                    minimumFractionDigits: 0, // Không hiển thị số lẻ
                })
                    .format(price)
                    .replace("₫", "đ"); // Thay ₫ bằng đ cho đúng văn phong tiếng Việt
            };
        
            return formatPrice(row.price);
        },
        
        name: "Giá",
        width: "150px",
        
},

    {
        formatter: (row) => (
            <Stack direction="row" spacing={1} justifyContent="flex-end">
                <IconButton component={RouterLink} href={paths.supplier.products.preview(row.id)} title="Xem chi tiết">
                    <EyeIcon />
                </IconButton>
                <IconButton component={RouterLink} href={paths.supplier.products.update(row.id)} title="Chỉnh sửa">
                    <PencilIcon />
                </IconButton>
            </Stack>
        ),
        name: 'Hành động',
        width: '100px',
        align: 'right',
    },
];

export function ProductsTable({ rows = [] }) {
    return (
        <React.Fragment>
            <DataTable columns={columns} rows={rows} />
            {!rows.length ? (
                <Box sx={{ p: 3 }}>
                    <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
                        Không có sản phẩm nào
                    </Typography>
                </Box>
            ) : null}
        </React.Fragment>
    );
}
