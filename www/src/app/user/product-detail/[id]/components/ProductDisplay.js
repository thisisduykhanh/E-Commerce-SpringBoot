import { useState } from 'react';
import { Box, Button, CardMedia, Divider, IconButton, TextField, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ShoppingBag } from '@phosphor-icons/react';
import { CompanyShare } from './social-share';

export const ProductDisplay = ({
    productDetail,
    minPrice,
    maxPrice,
    quantity,
    setQuantity,
    isLoading,
    successMessage,
    error,
    handleAddToCart,
}) => {
    const [activeImageIndex, setActiveImageIndex] = useState(1);

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

    const handleImageClick = (index) => {
        if (productDetail?.listImage?.[index]) {
            setActiveImageIndex(index);
        }
    };

    const handleQuantityChange = (type) => {
        if (type === 'increment') {
            setQuantity((prev) => prev + 1);
        } else if (type === 'decrement' && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', marginBottom: '40px' }}>
                <Box
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', border: 'none' }}
                >
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
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                        {productDetail?.listImage?.map((image, index) => (
                            <CardMedia
                                key={image.id}
                                component="img"
                                image={image.url}
                                alt={`Thumbnail ${index}`}
                                onClick={() => handleImageClick(index)}
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
                <CardMedia
                    component="img"
                    image={productDetail?.listImage?.[activeImageIndex]?.url}
                    alt="Main Product Image"
                    sx={{
                        width: '500px',
                        height: '500px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        transition: 'opacity 0.3s ease-in-out',
                    }}
                />
                <Box sx={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
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
                    <Box sx={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                        <Rating value={5} readOnly={true} precision={0.5} size="small" />
                        <Typography variant="body2" sx={{ marginLeft: '10px', color: 'gray' }}>
                            4 đánh giá
                        </Typography>
                        <Typography variant="body2" sx={{ marginLeft: '20px', color: 'gray' }}>
                            SKU: 2,51,594
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px', marginBottom: '20px' }}>
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
                    <Divider sx={{ margin: '20px 0', backgroundColor: '#fff', width: '100%' }} />
                    <Box sx={{ marginBottom: '20px' }}>
                        <Typography variant="body1" marginBottom="20px">
                            Số lượng đặt tối thiểu:{' '}
                            <span style={{ fontWeight: 'bold' }}>
                                {Math.min(...(productDetail?.officialPriceDTO.map((price) => price.minQuantity) || []))}
                            </span>
                        </Typography>
                        <Box sx={{ display: 'flex', gap: '20px', textAlign: 'left', color: 'black !important' }}>
                            {productDetail?.officialPriceDTO.map((price) => (
                                <Box key={price?.id}>
                                    <Typography
                                        variant="body2"
                                        sx={{ marginBottom: '10px', color: '#848484', fontSize: '15px' }}
                                        color="black !important"
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
                    <CompanyShare productDetail={productDetail} />
                    <Typography variant="body1" marginBottom="20px" color="#808080" width="80%" fontSize="16px">
                        Mô tả : {productDetail?.description}
                    </Typography>
                    <Divider sx={{ margin: '20px 0', backgroundColor: '#fff', width: '80%' }} />
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px',
                                width: '80%',
                                backgroundColor: '#fff',
                                color: 'black !important',
                            }}
                        >
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
                                    hidden={quantity <= 1}
                                >
                                    <RemoveIcon />
                                </IconButton>
                                <TextField
                                    value={`${quantity} kg`}
                                    disabled={true}
                                    aria-readonly={true}
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                            style: {
                                                width: '50px',
                                                padding: '0',
                                                height: '40px',
                                                lineHeight: '40px',
                                                color: 'black !important',
                                                backgroundColor: '#FFF',
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
                                        color: 'black !important',
                                        backgroundColor: '#FFF',
                                        ':read-only': {
                                            backgroundColor: '#FFF',
                                            color: 'black !important',
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
                                    color: '#fff',
                                    borderColor: '#00A6B7',
                                }}
                                onClick={handleAddToCart}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
                                <ShoppingBag />
                            </Button>
                        </Box>
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
                    <Divider sx={{ margin: '20px 0', backgroundColor: '#fff', width: '80%' }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
        </Box>
    );
};
