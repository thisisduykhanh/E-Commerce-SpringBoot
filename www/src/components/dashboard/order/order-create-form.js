'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { DataTable } from '@/components/core/data-table';
import { toast } from '@/components/core/toaster';
import { fetchCart } from '@/services/cart';
import { addOrder } from '@/services/order';
import { Business } from '@mui/icons-material';
import Box from '@mui/material/Box';
import React from 'react';

const schema = zod.object({
    customer: zod.string().min(1, 'Khách hàng là bắt buộc').max(255),
    phone: zod.string().min(1, 'Số điện thoại là bắt buộc').max(20),
    billingAddress: zod.string().min(1, 'Địa chỉ là bắt buộc').max(255),
    lineItems: zod.array(
        zod.object({
            id: zod.string(),
            product: zod.string().max(255),
            quantity: zod.number().min(1, 'Số lượng phải ít nhất là 1'),
            unitPrice: zod.number().min(0, 'Giá đơn vị phải là số không âm'),
        })
    ),
});

const defaultValues = {
    customer: '',
    phone: '',
    billingAddress: '',
    lineItems: [{ id: '1', product: 'Sản phẩm mẫu', quantity: 1, unitPrice: 10 }],
};

export function OrderCreateForm() {
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues, resolver: zodResolver(schema) });

    const [cartData, setCartData] = React.useState(null);
    const [totalAmount, setTotalAmount] = React.useState(0);

    React.useEffect(() => {
        const fetchData = async () => {
            const cart = await fetchCart();
            if (cart.success) {
                setCartData(cart.data.cartSupplierDTOS);
                const total = cart.data.cartSupplierDTOS.reduce((sum, supplier) => {
                    return sum + supplier.totalPrice;
                }, 0);
                setTotalAmount(total);
            } else {
                toast.error('Không thể lấy dữ liệu giỏ hàng');
            }
        };

        fetchData();
    }, []);

    const onSubmit = async (data) => {
        console.log('onSubmit called', data);
        try {
            const lineItems = cartData.flatMap((supplier) => supplier.cartDetailDTOS.map((item) => item.id));

            const orderData = {
                fullName: data.customer,
                address: data.billingAddress,
                phone: data.phone,
                idCartDetail: lineItems,
            };

            console.log('Final payload:', JSON.stringify(orderData));

            await addOrder(orderData.fullName, orderData.address, orderData.phone, orderData.idCartDetail);

            console.log('Đơn hàng đã được tạo', orderData);
            toast.success('Đơn hàng đã được tạo');
            router.push('/order-history');
        } catch (error) {
            throw new Error(`API error: ${  error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardContent>
                    <Stack divider={<Divider />} spacing={4}>
                        <Stack spacing={3}>
                            <Typography variant="h6">Thông tin cơ bản</Typography>
                            <Grid container spacing={3}>
                                <Grid
                                    size={{
                                        md: 6,
                                        xs: 12,
                                    }}
                                >
                                    <Controller
                                        control={control}
                                        name="customer"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.customer)} fullWidth>
                                                <InputLabel>Họ tên khách hàng</InputLabel>
                                                <OutlinedInput {...field} />
                                                {errors.customer ? (
                                                    <FormHelperText>{errors.customer.message}</FormHelperText>
                                                ) : null}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid
                                    size={{
                                        md: 6,
                                        xs: 12,
                                    }}
                                >
                                    <Controller
                                        control={control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.phone)} fullWidth>
                                                <InputLabel>Số điện thoại</InputLabel>
                                                <OutlinedInput {...field} />
                                                {errors.phone ? (
                                                    <FormHelperText>{errors.phone.message}</FormHelperText>
                                                ) : null}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid
                                    size={{
                                        md: 6,
                                        xs: 12,
                                    }}
                                >
                                    <Controller
                                        control={control}
                                        name="billingAddress"
                                        render={({ field }) => (
                                            <FormControl error={Boolean(errors.billingAddress)} fullWidth>
                                                <InputLabel required>Địa chỉ</InputLabel>
                                                <OutlinedInput {...field} />
                                                {errors.billingAddress ? (
                                                    <FormHelperText>{errors.billingAddress?.message}</FormHelperText>
                                                ) : null}
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Stack>
                        <Stack spacing={3}>
                            <Typography variant="h6">Thông tin sản phẩm</Typography>
                            <Stack spacing={2}>
                                <Card sx={{ borderRadius: 1 }} variant="outlined">
                                    {cartData ? cartData.map((supplier) => (
                                            <Stack key={supplier.id} spacing={2}>
                                                <Typography
                                                    variant="h6"
                                                    sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                                                >
                                                    <Business sx={{ color: 'primary.main' }} />
                                                    {supplier.nameSupplier}
                                                </Typography>
                                                <DataTable
                                                    columns={[
                                                        {
                                                            name: 'Sản phẩm',
                                                            formatter: (row) => (
                                                                <Typography variant="body2" noWrap>
                                                                    {row.productName}
                                                                </Typography>
                                                            ),
                                                            style: {
                                                                whiteSpace: 'normal',
                                                                wordWrap: 'break-word',
                                                                width: '40%',
                                                                padding: '8px',
                                                            },
                                                        },
                                                        {
                                                            name: 'Số lượng',
                                                            formatter: (row) => (
                                                                <Typography variant="body2">{row.quantity}</Typography>
                                                            ),
                                                            style: {
                                                                width: '20%',
                                                                textAlign: 'center',
                                                                padding: '8px',
                                                            },
                                                        },
                                                        {
                                                            name: 'Giá đơn vị',
                                                            formatter: (row) => (
                                                                <Typography variant="body2">
                                                                    {new Intl.NumberFormat('vi-VN', {
                                                                        style: 'currency',
                                                                        currency: 'VND',
                                                                    }).format(row.unitPrice)}
                                                                </Typography>
                                                            ),
                                                            style: {
                                                                width: '20%',
                                                                textAlign: 'center',
                                                                padding: '8px',
                                                            },
                                                        },
                                                    ]}
                                                    rows={supplier.cartDetailDTOS}
                                                    sx={{
                                                        tableLayout: 'fixed',
                                                        width: '100%',
                                                        borderCollapse: 'collapse',
                                                    }}
                                                />
                                            </Stack>
                                        )) : null}
                                </Card>
                            </Stack>
                        </Stack>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Stack spacing={2} sx={{ width: '300px', maxWidth: '100%' }}>
                                <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between' }}>
                                    <Typography variant="subtitle1">Tổng tiền</Typography>
                                    <Typography variant="subtitle1">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                            totalAmount
                                        )}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button color="secondary">Hủy</Button>
                    <Button type="submit" variant="contained" sx={{ background: '#00A6B7' }}>
                        Tạo đơn hàng
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
}
