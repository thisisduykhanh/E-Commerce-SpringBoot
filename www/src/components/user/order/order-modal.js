'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';
import { fetchOrderDetail } from '@/services/supplier';

import { LineItemsTable } from './line-items-table';

const lineItems = [
    {
        id: 'LI-001',
        product: 'Erbology Aloe Vera',
        image: '/assets/product-1.png',
        quantity: 1,
        currency: 'USD',
        unitAmount: 24,
        totalAmount: 24,
    },
    {
        id: 'LI-002',
        product: 'Lancome Rouge',
        image: '/assets/product-2.png',
        quantity: 1,
        currency: 'USD',
        unitAmount: 35,
        totalAmount: 35,
    },
];

export function OrderModal({ open }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('previewId');

    const [orderDetail, setOrderDetail] = React.useState({
        id: '',
        user: {
            userId: '',
            fullname: '',
            phone: '',
            email: ''
        },
        orderStatus: '',
        quantity: 0,
        totalPrice: 0,
        createDate: '',
        fullname: '',
        address: '',
        phone: '',
        orderProductDTOS: [],
        taxFee:'',
        shippingFee:'',
        city:'',
        district:'',
    });
    

    const get = React.useCallback(async () => {
        try {
            const response = await fetchOrderDetail(id);
            console.log('data', response);
            setOrderDetail(response.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }, [id]);
       React.useEffect(() => {
        get();
        }, [get]);
    


    // This component should load the order from the API based on the orderId prop.
    // For the sake of simplicity, we are just using a static order object.

    const handleClose = React.useCallback(() => {
        router.push(paths.supplier.orders.list);
    }, [router]);

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
            <Typography variant="h6">Mã đơn hàng : {orderDetail.id}</Typography>
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
                    {/* <Button
                        color="secondary"
                        component={RouterLink}
                        href={paths.supplier.orders.details(orderDetail.id)}
                        startIcon={<PencilSimpleIcon />}
                    >
                        Edit
                    </Button> */}
                </Stack>
                <Card sx={{ borderRadius: 1 }} variant="outlined">
                    <PropertyList divider={<Divider />} sx={{ '--PropertyItem-padding': '12px 24px' }}>
                        {[
                            { key: 'Tên khách hàng', value: <Link variant="subtitle2">{orderDetail.user.fullname}</Link> },
                            {
                                key: 'Thành phố',
                                value: (
                                    <Typography variant="subtitle2">
                                        {orderDetail.city}
                                    </Typography>
                                ),
                            },
                            {
                                key: 'Quận',
                                value: (
                                    <Typography variant="subtitle2">
                                        {orderDetail.district}
                                    </Typography>
                                ),
                            },
                            {
                                key: 'Địa chỉ',
                                value: (
                                    <Typography variant="subtitle2">
                                        {orderDetail.address}
                                    </Typography>
                                ),
                            },
                            { key: 'Số điện thoại',value: <Typography variant="subtitle2">{orderDetail.phone}</Typography>},
                            { key: 'Ngày đặt hàng', value: dayjs(orderDetail.createDate).format('MMMM D, YYYY hh:mm A') },
                            {
                                key: 'Trạng thái',
                                value: (
                                    <Chip
                                        icon={
                                            orderDetail.orderStatus === 'Pending' ? (
                                                <HourglassBottomIcon color="warning" />
                                            ) : orderDetail.orderStatus === 'Reject' ? (
                                                <CancelIcon color="error" />
                                            ) : (
                                                <CheckCircleIcon color="success" />
                                            )
                                        }
                                        label={
                                            orderDetail.orderStatus === 'Pending'
                                                ? 'Đang chờ'
                                                : orderDetail.orderStatus === 'Reject'
                                                ? 'Từ chối'
                                                : 'Đã giao'
                                        }
                                        size="small"
                                        variant="outlined"
                                    />
                                ),
                            },  
                            { key: 'Phương thức thanh toán', value: 'Không có' }
                        ].map((item) => (
                            <PropertyItem key={item.key} name={item.key} value={item.value} />
                        ))}
                    </PropertyList>
                </Card>
            </Stack>
            <Stack spacing={3}>
                <Typography variant="h6">Sản phẩm</Typography>
                <Card sx={{ borderRadius: 1 }} variant="outlined">
                    <Box sx={{ overflowX: 'auto' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tên sản phẩm</TableCell>
                                    <TableCell>Số lượng</TableCell>
                                    <TableCell>Giá</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderDetail.orderProductDTOS.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <img
                                                    src={product.image}
                                                    alt={product.nameProduct}
                                                    style={{ width: 50, height: 50, marginRight: 10 }}
                                                />
                                                {product.nameProduct}
                                            </Box>
                                        </TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                        <TableCell>{new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(product.price)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 3 }}>
                        <Stack spacing={2} sx={{ width: '300px', maxWidth: '100%' }}>
                            <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between' }}>
                                <Typography variant="body2">Thành tiền</Typography>
                                <Typography variant="body2">
                                    {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    }).format(orderDetail.totalPrice )}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between' }}>
                                <Typography variant="body2">Giảm giá</Typography>
                                <Typography variant="body2">-</Typography>
                            </Stack>
                            <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between' }}>
                                <Typography variant="body2">Phí vận chuyển</Typography>
                                <Typography variant="body2">
                                    {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    }).format(orderDetail.shippingFee)}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between' }}>
                                <Typography variant="body2">Thuế</Typography>
                                <Typography variant="body2">
                                    {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    }).format(orderDetail.taxFee)}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between' }}>
                                <Typography variant="subtitle1">Tổng tiền</Typography>
                                <Typography variant="subtitle1">
                                    {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    }).format(orderDetail.totalPrice)}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Card>
            </Stack>
        </Stack>
    </DialogContent>
</Dialog>

    );
}
