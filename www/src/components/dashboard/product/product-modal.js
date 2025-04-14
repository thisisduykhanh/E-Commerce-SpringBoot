'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { useRouter , useSearchParams } from 'next/navigation';
import * as React from 'react';

import { DataTable } from '@/components/core/data-table';
import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';
import { paths } from '@/paths';
import { fetchProductDetail } from '@/services/category-service';



export function ProductModal({ open }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('previewId');
    console.log('previewId1:', id);

    const [productsDetail, setProductsDetail] = React.useState([]);

    const fetchProductsDetail = React.useCallback(async () => {
        try {
            const response = await fetchProductDetail(id);
            console.log('data', response);
            setProductsDetail(response.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }, [id]);

    const imageRows =
        productsDetail?.images?.map((image, index) => ({
            id: index,
            url: image.url,
            fileName: `Image ${index + 1}`,
            primary: index === 0, // Giả sử hình đầu tiên là chính
        })) || [];

    React.useEffect(() => {
        fetchProductsDetail();
    }, [fetchProductsDetail]);

    const handleClose = React.useCallback(() => {
        router.push(paths.dashboard.products.list);
    }, [router]);

    // const productStatusMessage =
    //     productsDetail?.productStatusActivity === 'Active' ? 'Đang bán' : productsDetail?.productStatusActivity;

    return (
        <Dialog
            maxWidth="sm"
            onClose={handleClose}
            open={open}
            sx={{
                '& .MuiDialog-container': { justifyContent: 'flex-end' },
                '& .MuiDialog-paper': { height: '100%', width: '100%' },
            }}
        >
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
                <Stack direction="row" sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between' }}>
                    <Typography variant="h6"> Mã sản phẩm : {productsDetail?.id}</Typography>
                    <IconButton onClick={handleClose}>
                        <XIcon />
                    </IconButton>
                </Stack>
                <Stack spacing={3} sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            spacing={3}
                            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
                        >
                            <Typography variant="h6">Chi tiết</Typography>
                           
                        </Stack>
                        <Card sx={{ borderRadius: 1 }} variant="outlined">
                            <PropertyList divider={<Divider />} sx={{ '--PropertyItem-padding': '12px 24px' }}>
                                {[
                                    { key: 'Tên sản phẩm', value: productsDetail?.productName || 'Không có' },
                                    { key: 'Loại sản phẩm', value: productsDetail?.productTypeName || 'Không có' },
                                    {
                                        key: 'Giá',
                                        value: new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(productsDetail?.price || 0),
                                    },
                                    { key: 'Mô tả', value: productsDetail?.description || 'Không có' },
                                    { key: 'Nhà cung cấp', value: productsDetail?.supplierName || 'Không có' },
                                    
                                    
                                ].map((item) => (
                                    <PropertyItem key={item.key} name={item.key} value={item.value} />
                                ))}
                            </PropertyList>
                        </Card>
                        <Stack spacing={3}>
                            <Typography variant="h6">Ảnh</Typography>
                            <Card sx={{ borderRadius: 1 }} variant="outlined">
                                <Box sx={{ overflowX: 'auto' }}>
                                    <DataTable
                                        columns={[
                                            {
                                                formatter: (row) => {
                                                    return (
                                                        <Box
                                                            sx={{
                                                                backgroundImage: `url(${row.url})`,
                                                                backgroundPosition: 'center',
                                                                backgroundSize: 'cover',
                                                                bgcolor: 'var(--mui-palette-background-level2)',
                                                                borderRadius: 1,
                                                                flex: '0 0 auto',
                                                                height: '60px',
                                                                width: '60px',
                                                            }}
                                                        />
                                                    );
                                                },
                                                name: 'Hình ảnh',
                                                width: '80px', 
                                                align: 'left', 
                                            },
                                            {
                                                field: 'fileName',
                                                name: 'Tên hình ảnh',
                                                width: '220px', 
                                                formatter: (row) => (
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            display: 'block',
                                                            wordWrap: 'break-word',
                                                            whiteSpace: 'normal',
                                                            textAlign: 'left',
                                                            paddingLeft: 1, 
                                                        }}
                                                    >
                                                        {`Hình ${row.id + 1}`} 
                                                    </Typography>
                                                ),
                                            },
                                        ]}
                                        rows={imageRows}
                                    />
                                </Box>
                            </Card>
                        </Stack>
                        
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}
