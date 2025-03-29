import { Box, Button, Grid2 as Grid, Paper, Typography } from '@mui/material';

const ProductCards = ({ product }) => {
    return (
        <Grid item={true}>
            <Paper sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: 'white', color: 'black' }}>
                {/* Hình ảnh sản phẩm */}
                <Box sx={{ position: 'relative' }} size={{ xs: 8, sm: 4, md: 3 }}>
                    <img
                        src={product.listImage[0]?.url}
                        alt={product.nameProduct}
                        style={{
                            maxWidth: '100%',
                            height: '187px',
                            objectFit: 'cover',
                        }}
                    />
                </Box>

                {/* Tên sản phẩm */}
                <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold', color: '#333' }}>
                    {product.nameProduct}
                </Typography>

                {/* Mô tả sản phẩm */}
                <Typography variant="body2" sx={{ color: '#666', marginTop: 1 }}>
                    {product.description}
                </Typography>

                {/* Giá sản phẩm */}
                <Typography variant="h6" sx={{ color: '#000', marginTop: 2, fontWeight: 'bold' }}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                </Typography>

                {/* Giá theo số lượng */}
                <Box sx={{ marginTop: 2 }}>
                    {product.officialPriceDTO?.map((priceRange) => (
                        <Typography key={priceRange.id} variant="body2" sx={{ color: '#333' }}>
                            Từ {priceRange.minQuantity} đến {priceRange.maxQuantity} sản phẩm:{' '}
                            {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            }).format(priceRange.price)}
                        </Typography>
                    ))}
                </Box>

                {/* Nút mua sản phẩm */}
                <Box sx={{ marginTop: 2 }}>
                    <Button
                        variant="contained"
                        fullWidth={true}
                        sx={{ background: 'linear-gradient(180deg, #00A6B7 0%, #00A6B7 100%)' }}
                    >
                        Mua ngay
                    </Button>
                </Box>
            </Paper>
        </Grid>
    );
};

export default ProductCards;
