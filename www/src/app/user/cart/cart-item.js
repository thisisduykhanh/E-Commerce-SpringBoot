import { Box, Typography, Divider, IconButton, Button } from '@mui/material';
import HouseIcon from '@mui/icons-material/House';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ShoppingCart } from "@mui/icons-material"; // Import ShoppingCart icon
import { useRouter } from "next/navigation";



function CartItem({ cartData, handleQuantityChange, handleRemoveItem }) {
    const router = useRouter();
    if (!cartData || cartData.length === 0) {
        return (
            <Box
                sx={{
                    textAlign: 'center',
                    margin: '20px auto',
                    width: '80%',
                    maxWidth: '600px',
                    padding: '20px',
                    borderRadius: '8px',
                }}
            >
                <ShoppingCart
                    sx={{
                        fontSize: '80px', // Increased size for more visibility
                        color: '#D32F2F', // Red color to make the icon stand out
                        marginBottom: '16px',
                    }}
                />
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '18px',
                        color: 'textSecondary',
                    }}
                >
                    Giỏ hàng của bạn đang trống
                </Typography>

                {/* Button to redirect to the product page */}
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        marginTop: '20px',
                        padding: '10px 15px', // Increased padding for a bigger button
                        fontSize: '18px', // Larger text size for better visibility
                        borderRadius: '50px', // Round corners for a more modern look
                        backgroundColor: '#00A6B7', // Use a vibrant orange color to attract attention
                        '&:hover': {
                            backgroundColor: '#04545c', // Darker shade when hovered
                            boxShadow: '0 6px 10px rgba(0, 0, 0, 0.3)', // Stronger shadow on hover
                        },
                    }}
                    onClick={() => router.push('/user/product')} // Redirect to product page
                >
                    Mua sắm ngay
                </Button>
            </Box>
        );
    }

    return (
        <>
            {/* Iterate over suppliers */}
            {cartData.map((supplier) => (
                <Box key={supplier.id} mb={3} sx={{ borderBottom: '2px solid #ddd', paddingBottom: 2 }}>
                    {/* Supplier information */}
                    <Box mb={2}>
                        <Box display="flex" alignItems="center">
                            <HouseIcon sx={{ marginRight: 1, color: '#00A6B7' }} />
                            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                                {supplier.supplierName}
                            </Typography>
                        </Box>
                        <Divider sx={{ margin: '1rem 0', borderColor: '#F9F9F9', borderWidth: '1px' }} />
                    </Box>

                    {/* Iterate over products */}
                    {supplier.cartDetailDTOs.map((item) => (
                        <Box
                            key={item.id}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{
                                padding: 2,
                                borderRadius: '8px',
                                flexDirection: 'row',
                                gap: 2,
                                backgroundColor: '#f9f9f9',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            {/* Product information */}
                            <Box display="flex" alignItems="center" sx={{ gap: 2 }}>
                                {/* Product image */}
                                <Box
                                    sx={{
                                        width: 120, // Tăng chiều rộng của hình ảnh
                                        height: 120, // Tăng chiều cao của hình ảnh
                                        marginRight: 2,
                                        bgcolor: '#e0e0e0',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <img
                                        src={item.image || '/placeholder.png'}
                                        alt={item.productName}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                        }}
                                    />
                                </Box>

                                {/* Product details */}
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, marginBottom: 1, fontSize: '1.5rem' }}>
                                        {item.productName}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#666', marginBottom: 1, fontSize: '1.2rem' }}>
                                        Đơn giá: {(item.unitPrice ?? 0).toLocaleString()}₫
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Quantity adjustment and total price */}
                            {handleQuantityChange && handleRemoveItem ? (
                                <Box display="flex" alignItems="center" sx={{ gap: 2, minWidth: '180px' }}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        sx={{
                                            borderRadius: '50px',
                                            gap: 1,
                                            padding: 1,
                                        }}
                                    >
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                                minWidth: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                color: '#333',
                                                border: 'none',
                                                padding: 0,
                                                ':hover': {
                                                    bgcolor: '#f0f0f0',
                                                },
                                            }}
                                            onClick={() => handleQuantityChange(item.id, -1)}
                                        >
                                            <RemoveIcon />
                                        </Button>
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
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                                minWidth: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                color: '#333',
                                                padding: 0,
                                                border: 'none',
                                                ':hover': {
                                                    bgcolor: '#f0f0f0',
                                                },
                                            }}
                                            onClick={() => handleQuantityChange(item.id, 1)}
                                        >
                                            <AddIcon />
                                        </Button>
                                    </Box>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#00A6B7' }}>
                                        {(item.totalPrice ?? 0).toLocaleString()}₫
                                    </Typography>
                                    <IconButton
                                        color="error"
                                        sx={{ marginLeft: 3 }}
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ) : null}
                        </Box>
                    ))}
                </Box>
            ))}
        </>
    );
}

export default CartItem;
