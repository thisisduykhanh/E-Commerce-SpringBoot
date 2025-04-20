import { Box, Typography, Button, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';

function FeaturedProducts() {
    const theme = useTheme();

    // Mock data cho sản phẩm nổi bật (đã bỏ originalPrice)
    const products = [
        {
            id: 1,
            productName: 'Laptop Dell XPS 13',
            price: '25,000,000 VNĐ',
            image: '/img/image/category/Product_5.png',
            supplierName: 'Dell Vietnam',
            isSale: true,
            salePercent: '10%',
            rating: 4,
        },
        {
            id: 2,
            productName: 'iPhone 14 Pro',
            price: '30,000,000 VNĐ',
            image: '/img/image/category/Product_5.png',
            supplierName: 'Apple Vietnam',
            isSale: false,
            salePercent: '',
            rating: 5,
        },
        {
            id: 3,
            productName: 'Tai nghe Sony',
            price: '8,500,000 VNĐ',
            image: '/img/image/category/Product_5.png',
            supplierName: 'Sony Vietnam',
            isSale: true,
            salePercent: '5%',
            rating: 3,
        },
        {
            id: 4,
            productName: 'iPad Air 2023',
            price: '15,000,000 VNĐ',
            image: '/img/image/category/Product_5.png',
            supplierName: 'Apple Vietnam',
            isSale: false,
            salePercent: '',
            rating: 0,
        },
    ];

    // Style cho container
    const containerStyles = {
        padding: { xs: '20px 10px', md: '40px 20px' },
        backgroundColor: theme.palette.background.paper,
        borderRadius: '12px',
        margin: { xs: '20px 10px', md: '40px 20px' },
        boxShadow: theme.shadows[2],
        maxWidth: '100%',
        overflowX: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
    };

    // Style cho lưới sản phẩm
    const gridStyles = {
        display: 'grid',
        gridTemplateColumns: {
            xs: 'repeat(auto-fit, minmax(260px, 1fr))',
            sm: 'repeat(auto-fit, minmax(260px, 1fr))',
            md: 'repeat(auto-fit, minmax(280px, 1fr))',
            lg: 'repeat(4, 1fr)',
        },
        gap: { xs: '10px', sm: '15px', md: '20px' },
        justifyItems: 'center',
        width: '100%',
        padding: { xs: '0 10px', md: '0 20px' },
        boxSizing: 'border-box',
    };

    // Style cho thẻ sản phẩm
    const cardStyles = {
        width: '100%',
        maxWidth: '280px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.3s ease-in-out',
        backgroundColor: '#fff',
        color: '#000',
        '&:hover': {
            boxShadow: '0px 4px 10px rgba(0, 166, 183, 0.5)',
            borderColor: '#00A6B7',
        },
        '&:hover .cart-icon': {
            backgroundColor: '#00A6B7',
            color: 'white',
        },
    };

    return (
        <Box sx={containerStyles}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: '30px',
                    color: theme.palette.text.primary,
                }}
            >
                Sản phẩm nổi bật
            </Typography>
            <Box sx={gridStyles}>
                {products.map((product) => (
                    <Card key={product.id} elevation={3} sx={cardStyles}>
                        {/* Sale Badge */}
                        {product.isSale && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '10px',
                                    backgroundColor: '#EA4B48',
                                    color: 'white',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    padding: '5px 10px',
                                    borderRadius: '30px',
                                }}
                            >
                                Sale {product.salePercent}
                            </Box>
                        )}

                        {/* Hình ảnh sản phẩm */}
                        <Link href={`/user/product-detail/${product.id}`} passHref>
                            <Button
                                sx={{
                                    borderRadius: 1,
                                    padding: 0,
                                    height: '300px',
                                    width: '100%',
                                    display: 'block',
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '300px',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={product.image || '/default-image.jpg'}
                                        alt={product.productName}
                                        sx={{
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                            },
                                        }}
                                    />
                                </Box>
                            </Button>
                        </Link>

                        <CardContent
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                padding: '10px',
                            }}
                        >
                            <Typography
                                className="product-name"
                                variant="body1"
                                color="#000000"
                                sx={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    marginBottom: '5px',
                                    fontFamily: "'Poppins', sans-serif",
                                    transition: 'color 0.3s ease',
                                }}
                            >
                                {product.productName}
                            </Typography>

                            <Typography
                                variant="subtitle1"
                                color="#4D4D4D"
                                sx={{ fontSize: '14px', marginBottom: '5px' }}
                            >
                                {product.supplierName}
                            </Typography>

                            {/* Giá */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'baseline',
                                    gap: '10px',
                                }}
                            >
                                <Typography variant="body2" color="#000" sx={{ fontWeight: '600' }}>
                                    {product.price}
                                </Typography>
                            </Box>

                            {/* Đánh giá */}
                            <Typography variant="body2" color="#FFA41B" sx={{ marginTop: '5px' }}>
                                {product.rating === 0 ? (
                                    <Typography variant="body2" color="gray">
                                        Chưa có đánh giá
                                    </Typography>
                                ) : (
                                    '★'.repeat(Math.floor(product.rating)) +
                                    '☆'.repeat(5 - Math.floor(product.rating))
                                )}
                            </Typography>
                        </CardContent>

                        {/* Biểu tượng Giỏ hàng */}
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px',
                            }}
                        >
                            <IconButton
                                className="cart-icon"
                                sx={{
                                    color: '#000',
                                    backgroundColor: '#FAFAFA',
                                    padding: '5px',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <ShoppingCartIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}

export default FeaturedProducts;