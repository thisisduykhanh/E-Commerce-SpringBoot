import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import ShieldCheckIcon from '@mui/icons-material/VerifiedUser';
import { Box, Button, Card, Typography } from '@mui/material';

const OrderSummary = ({ totalPrice, taxRate, shippingFee, onPayment, address }) => {
    const tax = totalPrice * taxRate;
    const total = totalPrice + tax + shippingFee;

    const isOrderDisabled = totalPrice <= 0 || (window.location.pathname === '/user/orders' && address.length === 0);

    return (
        <Card
            sx={{
                bgcolor: 'white',
                color: 'black',
                boxShadow: 3,
                borderRadius: 2,
                paddingLeft: '10px',
                paddingRight: '0',
            }}
        >
            {/* Tiêu đề */}
            <Typography
                variant="h6"
                sx={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#333',
                    marginBottom: '1.5rem',
                }}
            >
                Tóm tắt đơn hàng
            </Typography>

            {/* Tiền hàng */}
            <Box display="flex" justifyContent="space-between" my={2}>
                <Typography sx={{ fontSize: '1rem', color: '#555' }}>Tiền hàng</Typography>
                <Typography sx={{ fontWeight: 'bold', color: '#000' }}>
                    {(totalPrice ?? 0).toLocaleString()}₫
                </Typography>
            </Box>

            {/* Phí vận chuyển */}
            <Box display="flex" justifyContent="space-between" my={2}>
                <Typography sx={{ fontSize: '1rem', color: '#555' }}>Phí vận chuyển</Typography>
                <Typography sx={{ fontWeight: 'bold', color: '#000' }}>
                    {(shippingFee ?? 0).toLocaleString()}₫
                </Typography>
            </Box>

            {/* Thuế */}
            <Box display="flex" justifyContent="space-between" my={2}>
                <Typography sx={{ fontSize: '1rem', color: '#555' }}>Thuế</Typography>
                <Typography sx={{ fontWeight: 'bold', color: '#000' }}>{tax.toLocaleString()}₫</Typography>
            </Box>

            {/* Tổng tiền */}
            <Box display="flex" justifyContent="space-between" my={2} paddingTop={2} borderTop="1px solid #ccc">
                <Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>Tổng cộng</Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#D32F2F' }}>
                    {total.toLocaleString()}₫
                </Typography>
            </Box>

            {/* Nút Mua hàng */}
            <Button
                variant="contained"
                fullWidth={true}
                sx={{
                    marginTop: 3,
                    background: '#00A6B7',
                    color: '#fff',
                    padding: '12px 0',
                    fontSize: '1rem',
                    fontWeight: 700,
                    boxShadow: 'none',
                    ':hover': {
                        background: !isOrderDisabled ? '#FB8C00' : '#ccc',
                        boxShadow: 'none',
                    },
                }}
                onClick={!isOrderDisabled ? onPayment : null}
                disabled={isOrderDisabled}
            >
                {window.location.pathname === '/user/orders' ? 'Đặt hàng' : 'Mua hàng'}
            </Button>

            {/* Phần bảo vệ */}
            <Box sx={{ marginTop: 3 }}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: '#333',
                        marginBottom: '1rem',
                    }}
                >
                    Bạn được bảo vệ trên Asizon
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" alignItems="center">
                        <ShieldCheckIcon sx={{ color: '#00A6B7', marginRight: 1, fontSize: '1.8rem' }} />
                        <Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>Thanh toán an toàn</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <PublishedWithChangesIcon sx={{ color: '#00A6B7', marginRight: 1, fontSize: '1.8rem' }} />
                        <Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>Hoàn tiền và đổi trả</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <LocalShippingIcon sx={{ color: '#00A6B7', marginRight: 1, fontSize: '1.8rem' }} />
                        <Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>
                            Giao hàng bởi Asizon Logistics
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
};

export default OrderSummary;
