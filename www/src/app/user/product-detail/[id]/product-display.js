import {
    Add as AddIcon,
    ArrowDropDown as ArrowDropDownIcon,
    ArrowDropUp as ArrowDropUpIcon,
} from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import RemoveIcon from '@mui/icons-material/Remove';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Button, CardMedia, Divider, IconButton, Rating, TextField, Typography } from '@mui/material';

const handleScrollUp = () => {
    setActiveImageIndex((prev) => {
        const totalImages = productDetail?.listImage?.length || 0;
        return prev > 0 ? prev - 1 : totalImages - 1;
    });
};

const handleScrollDown = () => {
    setActiveImageIndex((prev) => {
        const totalImages = productDetail?.listImage?.length || 0;
        return prev < totalImages - 1 ? prev + 1 : 0;
    });
};

const handleAddToCart = async () => {
    const token = sessionStorage.getItem('token');

    if (!token) {
        setError('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.');
        return;
    }
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
        const response = await addToCart(id, quantity);

        if (response.success === true) {
            setSuccessMessage('Thêm sản phẩm vào giỏ hàng thành công.');
            window.location.href = '/user/cart';
        }
    } catch (error) {
        logger.error('Error adding to cart:', error);
    } finally {
        setIsLoading(false);
    }
};

export function ProductDisplay({
    productDetail,
    minPrice,
    maxPrice,
    quantity,
    isLoading,
    successMessage,
    error,
    activeImageIndex,
}) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '20px',
                marginBottom: '40px',
            }}
        >
            {/* Bên trái - Danh sách ảnh */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    border: 'none',
                }}
            >
                {/* Nút cuộn lên */}
                <Button
                    onClick={handleScrollUp}
                    variant="outlined"
                    sx={{
                        color: '#333333',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        '&:hover': {
                            color: '#1976d2',
                        },
                        border: 'none',
                        backgroundColor: 'transparent',
                    }}
                >
                    <ArrowDropUpIcon fontSize="small" />
                </Button>

                {/* Danh sách hình ảnh */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        alignItems: 'center',
                    }}
                >
                    {productDetail?.listImage?.map((image, index) => (
                        <CardMedia
                            key={image.id}
                            component="img"
                            image={image.url}
                            alt={`Thumbnail ${index}`}
                            onClick={() => handleImageClick(index)} // Truyền index thay vì ID
                            sx={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                border: activeImageIndex === index ? '2px solid #00A6B7' : '1px solid #fff',
                                objectFit: 'cover',
                            }}
                        />
                    ))}
                </Box>

                {/* Nút cuộn xuống */}
                <Button
                    onClick={handleScrollDown}
                    variant="outlined"
                    sx={{
                        color: '#333333',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        '&:hover': {
                            color: '#1976d2',
                        },
                        border: 'none',
                        backgroundColor: 'transparent',
                    }}
                >
                    <ArrowDropDownIcon fontSize="small" />
                </Button>
            </Box>

            {/* Hình ảnh chính */}
            <CardMedia
                component="img"
                image={productDetail?.listImage?.[activeImageIndex]?.url} // Ảnh chính
                alt="Main Product Image"
                sx={{
                    width: '500px',
                    height: '500px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    transition: 'opacity 0.3s ease-in-out', // Hiệu ứng chuyển ảnh mượt mà
                }}
            />

            {/* Bên phải - Nội dung sản phẩm */}
            <Box sx={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                {/* Tên sản phẩm và trạng thái */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h4" fontWeight="bold">
                        {productDetail?.nameProduct}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            backgroundColor: 'rgba(0, 166, 183, 0.2)',
                            color: '#00A6B7',
                            borderRadius: '5px',
                            padding: '5px 10px',
                            marginLeft: '10px',
                        }}
                    >
                        Còn hàng
                    </Typography>
                </Box>

                {/* Đánh giá và ngôi sao */}
                <Box sx={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <Rating value={5} readOnly={true} precision={0.5} size="small" />
                    <Typography variant="body2" sx={{ marginLeft: '10px', color: 'gray' }}>
                        4 đánh giá
                    </Typography>
                    <Typography variant="body2" sx={{ marginLeft: '20px', color: 'gray' }}>
                        SKU: 2,51,594
                    </Typography>
                </Box>

                {/* Giá sản phẩm */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '20px',
                        marginBottom: '20px',
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{ textDecoration: 'line-through', color: '#B3B3B3', marginRight: '10px' }}
                    >
                        {productDetail?.price?.toLocaleString()} VND
                    </Typography>
                    {minPrice !== null && maxPrice !== null && (
                        <Typography variant="h5" color="#00A6B7" fontWeight="bold" sx={{ marginRight: '10px' }}>
                            {minPrice.toLocaleString()} VNĐ - {maxPrice.toLocaleString()} VNĐ
                        </Typography>
                    )}
                    <Typography
                        variant="body2"
                        color="orange"
                        sx={{
                            backgroundColor: 'rgba(234, 75, 72, 0.1)',
                            padding: '5px 10px',
                            borderRadius: '30px',
                            color: '#EA4B48',
                        }}
                    >
                        64% OFF
                    </Typography>
                </Box>

                <Divider
                    sx={{
                        margin: '20px 0',
                        backgroundColor: '#fff',
                        width: '100%',
                    }}
                />

                {/* Số lượng tối thiểu */}
                <Box sx={{ marginBottom: '20px' }}>
                    <Typography variant="body1" marginBottom="20px">
                        Số lượng đặt tối thiểu:{' '}
                        <span style={{ fontWeight: 'bold' }}>
                            {Math.min(...(productDetail?.officialPriceDTO.map((price) => price.minQuantity) || []))}
                        </span>
                    </Typography>

                    <Box sx={{ display: 'flex', gap: '20px', textAlign: 'left' }}>
                        {productDetail?.officialPriceDTO.map((price) => (
                            <Box key={price?.id}>
                                <Typography
                                    variant="body2"
                                    sx={{ marginBottom: '10px', color: '#848484', fontSize: '15px' }}
                                >
                                    {price.minQuantity}kg - {price.maxQuantity}kg
                                </Typography>
                                <Typography fontWeight="bold" sx={{ fontSize: '25px' }}>
                                    {price.price.toLocaleString()} VND
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Công ty và chia sẻ */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Typography fontWeight="bold">{productDetail?.nameSupplier}</Typography>
                        <img src="/logo/company.png" alt="Company Logo" style={{ width: '50px', height: '50px' }} />
                    </Box>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <Typography
                            variant="body2"
                            sx={{ color: '#848484', textAlign: 'center', alignContent: 'center' }}
                        >
                            Chia sẻ
                        </Typography>
                        <IconButton>
                            <FacebookIcon color="primary" />
                        </IconButton>
                        <IconButton>
                            <TwitterIcon color="primary" />
                        </IconButton>
                        <IconButton>
                            <PinterestIcon sx={{ color: '#e60023' }} />
                        </IconButton>
                        <IconButton>
                            <InstagramIcon sx={{ color: '#d6249f' }} />
                        </IconButton>
                    </Box>
                </Box>

                {/* Mô tả sản phẩm */}
                <Typography variant="body1" marginBottom="20px" color="#808080" width="80%" fontSize="16px">
                    Mô tả : {productDetail?.description}
                </Typography>

                <Divider
                    sx={{
                        margin: '20px 0',
                        backgroundColor: '#fff',
                        width: '80%',
                    }}
                />

                {/* Số lượng và nút thêm vào giỏ hàng */}
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', width: '80%' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid #fff',
                                borderRadius: '30px',
                                padding: '5px',
                            }}
                        >
                            <IconButton
                                onClick={() => handleQuantityChange('decrement')}
                                disabled={quantity <= 1}
                                sx={{
                                    padding: '10px',
                                    borderRadius: '30px',
                                    backgroundColor: '#FAFAFA !important',
                                    color: quantity <= 1 ? '#BDBDBD' : '#757575',
                                }}
                            >
                                <RemoveIcon />
                            </IconButton>
                            <TextField
                                value={`${quantity} kg`}
                                slotProps={{
                                    input: {
                                        readOnly: true,
                                        style: {
                                            width: '50px',
                                            padding: '0',
                                            height: '40px',
                                            lineHeight: '40px',
                                        },
                                    },
                                }}
                                variant="standard"
                                sx={{
                                    margin: '0 10px',
                                    '& .MuiInputBase-root': {
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    },
                                    '& .MuiInputBase-input': {
                                        textAlign: 'center',
                                    },
                                    '& .MuiInput-underline:before': {
                                        borderBottom: 'none',
                                    },
                                    '& .MuiInput-underline:after': {
                                        borderBottom: 'none',
                                    },
                                }}
                            />
                            <IconButton
                                onClick={() => handleQuantityChange('increment')}
                                sx={{
                                    padding: '10px',
                                    borderRadius: '30px',
                                    backgroundColor: '#FAFAFA !important',
                                    color: '#757575',
                                }}
                            >
                                <AddIcon />
                            </IconButton>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                padding: '10px 20px',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                borderRadius: '30px',
                                width: '100%',
                                background: '#00A6B7',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                            }}
                            onClick={handleAddToCart}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Adding...' : 'Thêm vào giỏ hàng'}
                            <img src="/icons/Rectangle.png" alt="Cart" style={{ width: '15px', height: '15px' }} />
                        </Button>
                    </Box>
                    {/* Success or Error Messages */}
                    {successMessage && (
                        <Typography variant="body2" color="primary" sx={{ marginTop: '10px' }}>
                            {successMessage}
                        </Typography>
                    )}
                    {error && (
                        <Typography variant="body2" color="error" sx={{ marginTop: '10px' }}>
                            {error}
                        </Typography>
                    )}
                </Box>

                <Divider
                    sx={{
                        margin: '20px 0',
                        backgroundColor: '#fff',
                        width: '80%',
                    }}
                />

                {/* Thông tin sản phẩm */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {/* Danh mục */}
                    <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            Danh mục:
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#808080' }}>
                            {productDetail?.nameProductType}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
