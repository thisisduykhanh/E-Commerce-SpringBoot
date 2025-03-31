'use client';

import { logger } from '@/lib/default-logger';
import { deleteProductInCart, fetchCart, updateCart } from '@/services/cart';
import { Alert, Box, Card, Grid, Snackbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ConfirmationDialog from '../ConfirmationDialog/page';
import CartItem from "./cart-item";
import OrderSummary from '../orders/order_summary/page';

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState({ open: false, itemId: null });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const taxRate = 0.1; // Thuế 10%
    const shippingFee = 30000; // Phí vận chuyển

    useEffect(() => {
        const getCart = async () => {
            try {
                const response = await fetchCart();
                if (response?.data) {
                    const cartData = response.data;
                    setCartItems(cartData);
                    setTotalPrice(cartData.totalPrice);
                }
            } catch (error) {
                logger.error('Lỗi khi lấy giỏ hàng:', error);
            }
        };

        getCart();
    }, []);

 const handleQuantityChange = async (id, delta) => {
    // Tìm item cần thay đổi trong giỏ hàng
    const item = cartItems.cartSupplierDTOS
        .flatMap((supplier) => supplier.cartDetailDTOS)
        .find((item) => item.id === id);

    if (!item) return;

    const newQuantity = Math.max(item.quantity + delta, 1); // Đảm bảo số lượng không nhỏ hơn 1

    // Cập nhật trực tiếp giỏ hàng trong state (không cần gọi API ngay lập tức)
    const updatedCartItems = {
        ...cartItems,
        cartSupplierDTOS: cartItems.cartSupplierDTOS.map((supplier) => ({
            ...supplier,
            cartDetailDTOS: supplier.cartDetailDTOS.map((cartItem) =>
                cartItem.id === id ? { ...cartItem, quantity: newQuantity } : cartItem
            ),
        })),
    };

    setCartItems(updatedCartItems); // Cập nhật giỏ hàng trong state

    // Tính lại tổng giá trị giỏ hàng sau khi cập nhật số lượng
    const newTotalPrice = updatedCartItems.cartSupplierDTOS.reduce((total, supplier) => {
        const supplierTotal = supplier.cartDetailDTOS.reduce(
            (sum, cartItem) => sum + cartItem.unitPrice * cartItem.quantity,
            0
        );
        return total + supplierTotal;
    }, 0);

    setTotalPrice(newTotalPrice); // Cập nhật lại tổng giá trị giỏ hàng

    try {
        const response = await updateCart(id, newQuantity);

        if (response.success) {
            // Chỉ cập nhật giỏ hàng và tổng giá trị nếu cập nhật thành công
            // Không cần làm gì thêm
        } else {
            // Nếu API trả về lỗi, hiển thị thông báo lỗi
            logger.error('API trả về lỗi:', response.message);
            setSnackbarMessage('Không thể cập nhật số lượng sản phẩm.');
            setOpenSnackbar(true);
        }
    } catch (error) {
        // Nếu có lỗi trong quá trình gọi API, hiển thị thông báo lỗi
        logger.error('Lỗi khi cập nhật giỏ hàng:', error);
        setSnackbarMessage('Không thể cập nhật số lượng sản phẩm.');
        setOpenSnackbar(true);
    }
};





    // const handleChangeInput = (e, item) => {
    //     const newQuantity = parseInt(e.target.value, 10);
    //     if (!isNaN(newQuantity) && newQuantity > 0) {
    //         const updatedItems = cartItems.map((supplier) => ({
    //             ...supplier,
    //             cartDetailDTOS: supplier.cartDetailDTOS.map((i) =>
    //                 i.idProduct === item.idProduct ? { ...i, quantity: newQuantity } : i
    //             ),
    //         }));
    //         setCartItems(updatedItems);
    //     }
    // };

    // const handleBlur = async (e, item) => {
    //     const newQuantity = parseInt(e.target.value, 10);
    //     if (newQuantity >= 1 && newQuantity !== item.quantity) {
    //         await updateCart(item.idProduct, newQuantity);
    //     }
    // };

    const handleRemoveItem = async (id) => {
        try {
            const response = await deleteProductInCart(id);
            if (response.success) {
                // Nếu xóa thành công, gọi lại API để lấy lại giỏ hàng mới
                const updatedCartResponse = await fetchCart();

                if (updatedCartResponse?.data) {
                    // Cập nhật lại cartItems và tổng giá trị
                    setCartItems(updatedCartResponse.data);
                    setTotalPrice(updatedCartResponse.data.totalPrice);
                }

                // Đóng dialog và hiển thị thông báo
                setConfirmDialog({ open: false, itemId: null });
                setSnackbarMessage('Sản phẩm đã được xóa thành công');
                setOpenSnackbar(true);
            } else {
                console.error('Lỗi khi xóa sản phẩm:', response.message);
            }
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
        }
    };

    const confirmDeletion = async () => {
        if (confirmDialog.itemId) {
            await handleRemoveItem(confirmDialog.itemId);
        }
        logger.debug('Đóng dialog xác nhận');
        setConfirmDialog({ open: false, itemId: null });
    };

    const handlePayment = () => {
        window.location.href = '/user/orders';
    };

    logger.debug('cartItems:', cartItems?.cartSupplierDTOS);

    return (
        <Box p={2} display="flex" justifyContent="center" paddingX={0}>
            <Grid container={true} spacing={2} paddingX={0}>
                {/* Tựa đề và Danh sách sản phẩm */}
                <Grid item={true} xs={12} md={8} paddingX={0}>
                    <Card
                        sx={{
                            color: 'black',
                            boxShadow: 'none !important',
                            marginBottom: 2,
                            // padding: '16px 64px',
                            // bgcolor: '#f9f9f9',
                            width: '100%',
                        }}
                    >
                        {/* Tựa đề "Giỏ mua hàng" */}
                        <Card
                            sx={{
                                bgcolor: 'white',
                                color: 'black',
                                boxShadow: 'none !important',
                                marginBottom: 2,
                                // padding: '16px 32px',
                                paddingY: '16px',
                                width: '100%',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    color: '#000',
                                    marginBottom: '1rem',
                                }}
                            >
                                Giỏ mua hàng
                            </Typography>
                        </Card>

                        {/* Danh sách sản phẩm */}
                        <Card
                            sx={{
                                bgcolor: 'white',
                                color: 'black',
                                boxShadow: 'none !important',
                                marginBottom: 2,
                                // padding: 2,
                                width: '100%',
                            }}
                        >
                            <CartItem
                                cartData={cartItems}
                                handleQuantityChange={handleQuantityChange}
                                handleRemoveItem={(id) => setConfirmDialog({ open: true, itemId: id })}
                            />
                        </Card>
                    </Card>
                </Grid>

                {/* Tóm tắt đơn hàng */}
                {cartItems?.cartSupplierDTOS?.length > 0 && (
                    <Grid item={true} xs={12} md={4}>
                        <OrderSummary
                            totalPrice={totalPrice}
                            taxRate={taxRate}
                            shippingFee={shippingFee}
                            onPayment={handlePayment}
                        />
                    </Grid>
                )}
            </Grid>

            <ConfirmationDialog
                open={confirmDialog.open}
                onClose={() => setConfirmDialog({ open: false, itemId: null })}
                onConfirm={confirmDeletion}
                title="Xóa sản phẩm"
                message="Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?"
            />
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default CartPage;
