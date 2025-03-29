import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LockIcon from '@mui/icons-material/Lock';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';

export function SimilarProducts({ products }) {
    return (
        <Box sx={{ padding: '20px', backgroundColor: '#fff', color: '#000' }}>
            <Typography
                variant="h5"
                fontWeight="bold"
                textAlign="center"
                sx={{ marginBottom: '20px', backgroundColor: '#fff', color: '#000' }}
            >
                Sản phẩm tương tự
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    backgroundColor: '#fff',
                    color: '#000',
                }}
            >
                {products.map((product) => (
                    <Card
                        key={product}
                        sx={{
                            width: '300px', // Tăng chiều ngang của Card
                            border: '1px solid #fff',
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
                            '&:hover .product-name': {
                                color: '#00A6B7',
                                fontWeight: 'bold',
                            },
                            '&:hover .cart-icon': {
                                backgroundColor: '#00A6B7',
                                color: 'white',
                            },
                        }}
                    >
                        {/* Sale Badge */}
                        {product.isSale ? (
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
                        ) : null}

                        {/* Hình ảnh */}
                        <CardMedia
                            component="img"
                            image={product.image}
                            alt={product.name}
                            sx={{
                                height: '300px',
                                objectFit: 'cover',
                                width: '100%',
                            }}
                        />

                        {/* Biểu tượng Yêu Thích và Khóa */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '5px',
                            }}
                        >
                            <IconButton
                                sx={{
                                    color: '#757575',
                                    backgroundColor: '#F5F5F5',
                                    padding: '5px',
                                }}
                            >
                                <FavoriteBorderIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: '#757575',
                                    backgroundColor: '#F5F5F5',
                                    padding: '5px',
                                }}
                            >
                                <LockIcon fontSize="small" />
                            </IconButton>
                        </Box>

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
                                color="#4D4D4D"
                                sx={{
                                    marginBottom: '5px',
                                    fontFamily: "'Poppins', sans-serif",
                                    transition: 'color 0.3s ease',
                                }}
                            >
                                {product.name}
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
                                {product.originalPrice ? (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            textDecoration: 'line-through',
                                            color: '#B3B3B3',
                                            fontSize: '12px',
                                        }}
                                    >
                                        {product.originalPrice}
                                    </Typography>
                                ) : null}
                            </Box>

                            {/* Đánh giá */}
                            <Typography variant="body2" color="#FFA41B" sx={{ marginTop: '5px' }}>
                                {'★'.repeat(Math.floor(product.rating))}
                                {'☆'.repeat(5 - Math.floor(product.rating))}
                            </Typography>
                        </CardContent>

                        {/* Biểu tượng Giỏ Hàng */}
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
