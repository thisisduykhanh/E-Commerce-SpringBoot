import { Box, Typography, Divider, IconButton, Button } from '@mui/material';
import HouseIcon from '@mui/icons-material/House';
import DeleteIcon from '@mui/icons-material/Delete';

function CartItem({ cartData, handleQuantityChange, handleRemoveItem }) {
    // Kiểm tra nếu không có nhà cung cấp hoặc danh sách sản phẩm
    if (!cartData?.cartSupplierDTOS?.length) {
        return (
            <Typography
                variant="body1"
                align="center"
                color="textSecondary"
                style={{
                    fontWeight: 'bold',
                    fontSize: '18px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    margin: '20px auto',
                    width: '80%',
                    maxWidth: '600px',
                }}
            >
                Không có sản phẩm trong giỏ hàng
            </Typography>
        );
    }

    return (
        <>
            {/* Lặp qua từng nhà cung cấp */}
            {cartData.cartSupplierDTOS.map((supplier) => (
                <Box key={supplier.id} mb={3}>
                    {/* Hiển thị thông tin nhà cung cấp */}
                    <Box mb={2}>
                        <Box display="flex" alignItems="center">
                            <HouseIcon sx={{ marginRight: 1, color: '#000' }} />
                            <Typography variant="h6">{supplier.nameSupplier}</Typography>
                        </Box>
                        <Divider sx={{ margin: '1rem 0', borderColor: '#F9F9F9', borderWidth: '1px' }} />
                    </Box>

                    {/* Hiển thị danh sách sản phẩm của nhà cung cấp */}
                    {supplier.cartDetailDTOS.map((item) => (
                        <Box
                            key={item.id}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{
                                padding: 2,
                                borderRadius: '8px',
                                flexDirection: 'row', // Đảm bảo hướng là ngang
                                gap: 2, // Thêm khoảng cách giữa các phần tử
                            }}
                        >
                            {/* Thông tin sản phẩm */}
                            <Box display="flex" alignItems="center" sx={{ gap: 2 }}>
                                {/* Hình ảnh sản phẩm */}
                                <Box
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        marginRight: 2,
                                        bgcolor: '#e0e0e0',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <img
                                        src={supplier.image}
                                        alt={item.productName}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>

                                {/* Thông tin sản phẩm */}
                                <Box sx={{ flex: 1 }}>
                                    {/* Tên sản phẩm */}
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, marginBottom: 1 }}>
                                        {item.productName}
                                    </Typography>

                                    {/* Đơn giá */}
                                    <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
                                        Đơn giá: {(item.unitPrice ?? 0).toLocaleString()}₫
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Điều chỉnh số lượng và tổng giá */}
                            <Box display="flex" alignItems="center" sx={{ gap: 2, minWidth: '180px' }}>
                                {/* Điều chỉnh số lượng */}
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{
                                        border: '1px solid #ccc',
                                        borderRadius: '50px',
                                        gap: 1,
                                        bgcolor: '#f9f9f9',
                                    }}
                                >
                                    {/* Nút giảm */}
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            minWidth: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            border: '1px solid #ccc',
                                            color: '#333',
                                            padding: 0,
                                            ':hover': {
                                                bgcolor: '#f0f0f0',
                                            },
                                        }}
                                        onClick={() => handleQuantityChange(item.id, -1)}
                                    >
                                        -
                                    </Button>

                                    {/* Hiển thị số lượng */}
                                    <Typography
                                        sx={{
                                            width: 30,
                                            textAlign: 'center',
                                            fontSize: '1.2rem',
                                            color: '#333',
                                        }}
                                    >
                                        {item.quantity}
                                    </Typography>

                                    {/* Nút tăng */}
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            minWidth: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            border: '1px solid #ccc',
                                            color: '#333',
                                            padding: 0,
                                            ':hover': {
                                                bgcolor: '#f0f0f0',
                                            },
                                        }}
                                        onClick={() => handleQuantityChange(item.id, 1)}
                                    >
                                        +
                                    </Button>
                                </Box>

                                {/* Tổng giá */}
                                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#00A6B7' }}>
                                    {(item.unitPrice * item.quantity).toLocaleString()}₫
                                </Typography>

                                {/* Nút xóa */}
                                <IconButton color="error" sx={{ marginLeft: 3 }} onClick={() => handleRemoveItem(item.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                </Box>
            ))}
        </>
    );
}

export default CartItem;
