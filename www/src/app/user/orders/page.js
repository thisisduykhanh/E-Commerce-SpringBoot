'use client';

import { logger } from '@/lib/default-logger';
import { fetchCart } from '@/services/cart';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material';
import { orange } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import OrdersForm from "./create/page";
import OrdersFormEdit from "./edit/page";
import OrderSummary from "./order_summary/page";
import { addOrder } from '@/services/order';

function Orders() {
    const [open, setOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [formType, setFormType] = useState('add');


    const taxRate = 0.1; // Thuế 10%

    const [shippingData, setShippingData] = useState({
        shippingFee: 30000, // Giá gốc
        discountPercent: 20, // Giảm giá %
        discountedFee: 0, // Giá đã giảm
        discountAmount: 0, // Số tiền giảm
    });
    useEffect(() => {
        const discountedFee = shippingData.shippingFee * (1 - shippingData.discountPercent / 100);

        // Cập nhật state với giá đã giảm
        setShippingData((prevData) => ({
            ...prevData,
            discountedFee, // Cập nhật giá đã giảm
        }));
    }, [shippingData.shippingFee, shippingData.discountPercent]);

    // Giả lập fetch để cập nhật shippingData
    const fetchShippingData = async () => {
        const dataFromBackend = {
            shippingFee: 30000,
            discountPercent: 15,
        };

        // Tính toán giá đã giảm
        const discountedFee = dataFromBackend.shippingFee * (1 - dataFromBackend.discountPercent / 100);


        // Tính toán số tiền giảm
        const discountAmount = dataFromBackend.shippingFee - discountedFee;

        setShippingData({...dataFromBackend,discountedFee,discountAmount});
    };

    useEffect(() => {
        fetchShippingData();
    }, []);

    // const handleAddNewAddress = (newAddress) => {
    //     setAddresses((prev) => [...prev, newAddress]); // Cập nhật danh sách địa chỉ
    // };

    const handleAddNewAddress = (updatedAddress) => {
        logger.debug('updatedAddress:', updatedAddress);
        logger.debug('addresses:', addresses);

        setAddresses((prev) => {
            // Kiểm tra xem địa chỉ đã tồn tại trong danh sách hay chưa
            return prev.some((address) => address.id === updatedAddress.id)
                ? prev.map((address) => (address.id === updatedAddress.id ? updatedAddress : address))
                : [...prev, updatedAddress];
        });
    };



    useEffect(() => {
        const getCart = async () => {
            try {
                const response = await fetchCart();
                if (response?.data) {
                    const cartData = response.data;
                    logger.debug('cartData:', cartData);
                    setCartItems(cartData);
                    setTotalPrice(cartData.totalPrice);
                }
            } catch (error) {
                logger.error('Lỗi khi lấy giỏ hàng:', error);
            }
        };

        getCart();
    }, []);

    const handleClickOpen = () => {
        setFormType('add');
        setOpen(true);
    };

    const handleEditAddress = () => {
        setFormType('edit');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
 // Log ra idCartDetails để kiểm tra
    const idCartDetails =
        cartItems.cartSupplierDTOS?.flatMap((item) => item?.cartDetailDTOS?.map((detail) => detail.id) || []) || [];

    const handlePayment = async () => {
        const addressDetail = addresses[0]?.addressDetail || ''; // Lấy địa chỉ từ mảng addresses
        const parts = addressDetail.split(',').map((part) => part.trim());
        const address = parts.length >= 3 ? parts.slice(0, parts.length - 2).join(', ') : ''; // Lấy địa chỉ chi tiết
        const district = parts.length >= 2 ? parts[parts.length - 2] : ''; // Lấy quận/huyện
        const city = parts.length >= 1 ? parts[parts.length - 1] : ''; // Lấy tỉnh/thành phố

        const fullName = addresses[0]?.name || '';
        const phone = addresses[0]?.phone || '';
        try {
            // Gọi API để tạo đơn hàng
            const response = await addOrder(fullName, address, phone, idCartDetails,shippingData.shippingFee,taxRate,city,district);
            logger.debug('response:', response);
            window.location.href = '/user/orders/notification';
        } catch (error) {
            logger.error('Lỗi khi tạo đơn hàng:', error);
        }
    };

    logger.debug('addresses:', addresses[0]?.addressDetail);

    return (
        <Box p={2} display="flex" justifyContent="center">
            <Grid container spacing={2}>
                <Grid item xs={12} md={8} sx={{ paddingX: '0 !important' }}>
                    <Card
                        variant="outlined"
                        sx={{
                            color: 'black',
                            boxShadow: 'none !important',
                            bgcolor: '#fff',
                            border: 'none',
                            width: '100%',
                            paddingX: '0 !important',
                        }}
                    >
                        <CardContent sx={{ paddingX: '0 !important' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#000', marginBottom: '1rem' }}>
                                VẬN CHUYỂN & THANH TOÁN
                            </Typography>

                            <Box mb={4}>
                                {/* Địa chỉ giao hàng */}
                                <Typography variant="body2" color="#000" sx={{ marginBottom: '1rem', fontWeight: 700 }}>
                                    Chọn địa chỉ giao hàng có sẵn bên dưới hoặc{' '}
                                    <span
                                        onClick={addresses.length === 0 ? handleClickOpen : null}
                                        onKeyUp={(e) => {
                                            if (e.key === 'Enter' && addresses.length === 0) handleClickOpen();
                                        }}
                                        style={{
                                            color: addresses.length > 0 ? '#ccc' : orange[500],
                                            fontWeight: 700,
                                            cursor: addresses.length > 0 ? 'not-allowed' : 'pointer',
                                            opacity: addresses.length > 0 ? 0.5 : 1,
                                        }}
                                        tabIndex={0}
                                        role="button"
                                    >
                                        Thêm mới
                                    </span>
                                </Typography>
                                {addresses.length > 0 ? (
                                    addresses.map((address, index) => (
                                        <Box
                                            key={index}
                                            p={2}
                                            sx={{
                                                border: '2px dashed #FFA726',
                                                borderRadius: '8px',
                                                marginBottom: '1rem',
                                                position: 'relative',
                                                width: '50%',
                                            }}
                                        >
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                mb={1}
                                            >
                                                <Typography variant="body2" color="#000" sx={{ fontWeight: 700 }}>
                                                    {address.name}
                                                </Typography>
                                                <Typography variant="body2" color="#FF5722" sx={{ fontWeight: 700 }}>
                                                    Mặc định
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" color="#000">
                                                {address.addressDetail} - {address.phone}
                                            </Typography>
                                            <Box display="flex" gap={1} mt={1}>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        background: '#00A6B7',
                                                        color: '#fff',
                                                        fontWeight: 700,
                                                        boxShadow: 'none',
                                                        // padding: '6px 12px',
                                                        paddingY: '6px',
                                                        '&:hover': {
                                                            background: orange[700],
                                                            boxShadow: 'none',
                                                        },
                                                    }}
                                                >
                                                    Giao đến địa chỉ này
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    sx={{
                                                        color: orange[500],
                                                        borderColor: orange[500],
                                                        fontWeight: 700,
                                                        // padding: '6px 12px',
                                                        paddingY: '6px',
                                                        boxShadow: 'none',
                                                        '&:hover': {
                                                            backgroundColor: orange[50],
                                                            borderColor: orange[700],
                                                            boxShadow: 'none',
                                                        },
                                                    }}
                                                    onClick={() => handleEditAddress(address)}
                                                >
                                                    Sửa
                                                </Button>
                                            </Box>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography
                                        variant="body2"
                                        color="error"
                                        sx={{ textAlign: 'left', marginTop: '1rem' }}
                                    >
                                        Không có địa chỉ nào. Vui lòng thêm địa chỉ mới!
                                    </Typography>
                                )}

                                {/* Đơn vị vận chuyển */}
                                <Typography
                                    variant="body2"
                                    color="#000"
                                    sx={{ marginBottom: '0.5rem', marginTop: '1rem', fontWeight: 700 }}
                                >
                                    Đơn vị vận chuyển{' '}
                                    <span
                                        style={{
                                            color: orange[500],
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Thay đổi
                                    </span>
                                </Typography>
                                <Box
                                    p={2}
                                    sx={{
                                        border: '2px dashed #FFA726',
                                        borderRadius: '8px',
                                        marginBottom: '1rem',
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="#000"
                                        sx={{ fontWeight: 700, marginBottom: '0.5rem' }}
                                    >
                                        Giao Hàng Nhanh - Hàng nhẹ
                                    </Typography>
                                    <Typography variant="body2" color="#000" sx={{ marginBottom: '0.5rem' }}>
                                        Dự kiến nhận hàng trong thời gian sớm nhất
                                    </Typography>
                                    <Box display="flex" justifyContent="flex-start" alignItems="center" gap={1}>
                                        <Typography
                                            variant="body2"
                                            color="#000"
                                            sx={{ fontWeight: 700, marginRight: '0.5rem' }}
                                        >
                                            Phí vận chuyển:
                                        </Typography>
                                        <Typography variant="h6" color={orange[500]} sx={{ fontWeight: 700 }}>
                                        {shippingData.discountedFee.toLocaleString('vi-VN')}₫
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="gray"
                                            sx={{ textDecoration: 'line-through' }}
                                        >
                                            {shippingData.shippingFee.toLocaleString('vi-VN')}₫
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Ưu đãi phí vận chuyển */}
                                <Box
                                    p={2}
                                    sx={{
                                        backgroundColor: '#D4EDDA',
                                        color: '#39615B',
                                        borderRadius: 1,
                                        marginTop: '1rem',
                                    }}
                                >
                                    Bạn được ưu đãi phí vận chuyển{' '}
                                    <span style={{ color: '#4B5D26', fontWeight: 'bold' }}>{shippingData.discountAmount.toLocaleString('vi-VN')}₫</span> cho đơn hàng
                                    này{' '}
                                    <a
                                        href="https://example.com"
                                        style={{
                                            color: '#4B5D26',
                                            textDecoration: 'underline',
                                            fontWeight: 'bold',
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                        }}
                                    >
                                        Tìm hiểu thêm
                                    </a>
                                </Box>
                            </Box>

                            <Box mb={4}>
                                <Typography variant="h6" gutterBottom>
                                    CHỌN PHƯƠNG THỨC THANH TOÁN
                                </Typography>
                                <Box p={2} sx={{ backgroundColor: '#D4EDDA', color: '#39615B', borderRadius: 1 }}>
                                    Mua sắm an toàn cùng{' '}
                                    <span style={{ color: '#4B5D26', fontWeight: 'bold' }}>Asizon</span>.Số tiền bạn
                                    thanh toán sẽ được đảm bảo an toàn cho đến khi bạn nhận được sản phẩm đúng như mô tả
                                    từ Nhà Cung Cấp{' '}
                                    <a
                                        href="https://example.com"
                                        style={{ color: '#4B5D26', textDecoration: 'underline', fontWeight: 'bold' }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                        }}
                                    >
                                        Tìm hiểu thêm →
                                    </a>
                                </Box>

                                <Box mt={2}>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label={
                                            <Box display="flex" alignItems="center">
                                                <img
                                                    src="/payment/master-card.png"
                                                    alt="ngân hàng"
                                                    style={{
                                                        width: 60,
                                                        height: 40,
                                                        marginRight: 8,
                                                        objectFit: 'contain',
                                                    }}
                                                />
                                                <span style={{ fontSize: '1rem', fontWeight: 500 }}>
                                                    Chuyển khoản ngân hàng
                                                </span>
                                            </Box>
                                        }
                                        sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, marginLeft: 0 }}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox sx={{ padding: 0, marginRight: 1 }} />}
                                        label={
                                            <Box display="flex" alignItems="center">
                                                <img
                                                    src="/payment/zalo.png"
                                                    alt="ZaloPay"
                                                    style={{
                                                        width: 60,
                                                        height: 40,
                                                        marginRight: 8,
                                                        objectFit: 'contain',
                                                    }}
                                                />
                                                <span style={{ fontSize: '1rem', fontWeight: 500 }}>
                                                    Thanh toán qua ví ZaloPay (Miễn phí thanh toán)
                                                </span>
                                            </Box>
                                        }
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: 1,
                                            marginLeft: 0,
                                        }}
                                    />

                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label={
                                            <Box display="flex" alignItems="center">
                                                <img
                                                    src="/payment/visa.png"
                                                    alt="ngân hàng"
                                                    style={{
                                                        width: 60,
                                                        height: 40,
                                                        marginRight: 8,
                                                        objectFit: 'contain',
                                                    }}
                                                />
                                                <span style={{ fontSize: '1rem', fontWeight: 500 }}>
                                                    Thẻ ATM/Internet Banking (Miễn phí thanh toán)
                                                </span>
                                            </Box>
                                        }
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: 1,
                                        }}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label={
                                            <Box display="flex" alignItems="center">
                                                <img
                                                    src="/payment/visa.png"
                                                    alt="ngân hàng"
                                                    style={{
                                                        width: 60,
                                                        height: 40,
                                                        marginRight: 8,
                                                        objectFit: 'contain',
                                                    }}
                                                />{' '}
                                                <span style={{ fontSize: '1rem', fontWeight: 500 }}>
                                                    Visa, Master, JCB (Miễn phí thanh toán)
                                                </span>
                                            </Box>
                                        }
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: 1,
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box component="section">
                                <Typography
                                    component="h2"
                                    variant="h6"
                                    gutterBottom
                                    sx={{ fontWeight: 600, color: '#212121', marginBottom: 2 }}
                                >
                                    Xuất Hóa Đơn
                                </Typography>
                                <Box
                                    component="div"
                                    p={2}
                                    sx={{
                                        borderRadius: 1,
                                        border: '1px solid #DADADA',
                                        backgroundColor: '#F9FAFB',
                                        width: 'max-content',
                                    }}
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                defaultChecked={false}
                                                sx={{
                                                    color: '#4CAF50',
                                                    '&.Mui-checked': {
                                                        color: '#388E3C',
                                                    },
                                                }}
                                            />
                                        }
                                        label={
                                            <Typography
                                                component="label"
                                                htmlFor="checkbox-invoice"
                                                variant="body1"
                                                sx={{ fontWeight: 500, color: '#424242' }}
                                            >
                                                Xuất hóa đơn đỏ
                                            </Typography>
                                        }
                                        sx={{
                                            margin: 0,
                                            alignItems: 'center',
                                            display: 'flex',
                                        }}
                                    />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Tóm tắt đơn hàng */}
                {cartItems?.cartSupplierDTOS?.length > 0 && (
                    <Grid item xs={12} md={4} sx={{ paddingX: '0 !important' }}>
                        <OrderSummary
                            totalPrice={totalPrice}
                            taxRate={taxRate}
                            shippingFee={shippingData.discountedFee}
                            onPayment={handlePayment}
                            address={addresses}
                        />
                    </Grid>
                )}
            </Grid>

            {/* <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <OrdersForm
                        onCancel={handleClose}
                        idCartDetails={idCartDetails}
                        onAddNewAddress={handleAddNewAddress}
                    />
                </DialogContent>
            </Dialog>

            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <OrdersFormEdit
                        address={addresses} // Truyền địa chỉ được chỉnh sửa
                        onSave={(updatedAddress) => {
                            if (editAddress) {
                                // Chỉnh sửa địa chỉ
                                setAddresses((prev) =>
                                    prev.map((addr) => (addr.id === updatedAddress.id ? updatedAddress : addr))
                                );
                            } else {
                                // Thêm mới địa chỉ
                                handleAddNewAddress(updatedAddress);
                            }
                            setEditAddress(null);
                            handleClose();
                        }}
                    />
                </DialogContent>
            </Dialog> */}

            <Dialog open={open} onCancel={handleClose}>
                <DialogContent>
                    {formType === 'add' ? (
                        <OrdersForm
                            onCancel={handleClose}
                            onAddNewAddress={handleAddNewAddress}
                            idCartDetails={idCartDetails}
                        />
                    ) : (
                        <OrdersFormEdit
                            address={addresses}
                            onCancel={handleClose}
                            onAddNewAddress={handleAddNewAddress}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default Orders;
