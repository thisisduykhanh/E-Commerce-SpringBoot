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
                {row.listImage ? (
                    <Box
                        sx={{
                            alignItems: 'center',
                            bgcolor: 'var(--mui-palette-background-level2)',
                            backgroundImage: `url(${row.listImage[0]?.url})`,
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
                        {row.nameProduct}
                    </Link>
                    <Typography color="text.secondary" variant="body2">
                        {row.nameProductType}
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
        // Hàm để xử lý chuỗi giá trị và định dạng
        const formatPrice = (priceString) => {
            // Sử dụng biểu thức chính quy để trích xuất giá trị trước .00
            const matches = priceString.match(/(\d+)\.00/g);

            if (matches) {
                // Trích xuất giá trị trước .00
                const priceBeforeDot = matches.map(item => item.replace('.00', ''));

                // Định dạng tiền tệ (VNĐ) mà không cần "VNĐ"
                const formattedPrices = priceBeforeDot.map(amount => {
                    const formattedAmount = Number(amount).toLocaleString('vi-VN');
                    return formattedAmount;
                });

                return formattedPrices;
            } 
                return [];
            
        };

        // Gọi hàm formatPrice để xử lý giá trị price
        const formattedPrices = formatPrice(row.price);

        // Trả về chuỗi đã được định dạng với dấu gạch ngang và chữ "đ" ở cuối
        if (formattedPrices.length > 0) {
            return formattedPrices.map((formattedPrice, index) => (
                `${formattedPrice} ${index < formattedPrices.length - 1 ? ' - ' : ' đ'}`
            )).join('');
        } 
            return 'Không có giá trị hợp lệ.';
        
    },
    name: 'Giá',
    width: '150px',
},
    {
        formatter: (row) => {

            const verifyMapping = {
                Pending: { label: 'Đang chờ', icon: <HourglassBottomIcon color="warning" /> },
                Access: { label: 'Đã duyệt', icon: <CheckCircleIcon color="success" /> },
                Reject: { label: 'Từ chối', icon: <CancelIcon color="error" /> },
            };

            const { label: verifyLabel, icon: verifyIcon } =
                verifyMapping[row.productStatusVerify] ?? { label: 'Không xác định', icon: null };

            return (
                <Stack direction="column" spacing={1}>
                    <Chip icon={verifyIcon} label={verifyLabel} size="small" variant="outlined" sx={{width:"50%"}}/>
                </Stack>
            );
        },
        name: 'Trạng thái',
        width: '150px',
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
