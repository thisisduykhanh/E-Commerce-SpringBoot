import { CheckCircle, Group } from '@mui/icons-material';
import PeopleIcon from '@mui/icons-material/People';
import { Avatar, Box, Button, Card, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import * as React from 'react';

const CustomButton = styled(Button)(({ selected }) => ({
    fontSize: '13px',
    textTransform: 'none',
    backgroundColor: selected ? '#00A6B7' : '#EDF0F7',
    color: selected ? '#fff' : '#000',
    padding: '5px 15px',
    borderStyle: 'none',
    '&:hover': {
        backgroundColor: selected ? '#0085A1' : '#D4DDE8',
    },
}));

const badgeStyles = {
    backgroundColor: '#00A6B7',
    padding: '4px 12px',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
};

const supplierInfoStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '12px 0 20px 0',
};

const cardStyles = {
    display: 'flex',
    flexDirection: 'column',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    // padding: '16px',
    marginBottom: '16px',
    boxShadow: 'none',
    textAlign: 'left',
    height: '355px',
    backgroundColor: '#fff',
};

function Badge({ label, color }) {
    return <Box sx={{ ...badgeStyles, backgroundColor: color }}>{label}</Box>;
}

function ProductName({ name }) {
    return (
        <Typography
            variant="h4"
            sx={{
                fontWeight: 'bold',
                fontSize: '16px',
                color: 'black',
                marginTop: '8px',
                marginBottom: '8px',
                minHeight: '40px',
            }}
        >
            {name}
        </Typography>
    );
}

function SupplierInfo({ supplier, location, followers }) {
    return (
        <Box sx={supplierInfoStyles}>
            <CardMedia
                component="img"
                image="/logo/31.png"
                alt="Supplier"
                sx={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '8px' }}
            />
            <Box sx={{ flex: 1 }}>
                <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            component="span"
                            sx={{ fontSize: '14px', fontWeight: 'bold', color: 'black', marginRight: '4px' }}
                        >
                            {supplier}
                        </Typography>
                        <CheckCircle sx={{ color: '#2196f3', fontSize: '16px' }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography component="span" sx={{ fontSize: '12px', color: '#666', marginRight: '4px' }}>
                            {location}
                        </Typography>
                        <Box
                            sx={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '1px solid #fff',
                            }}
                        >
                            <img
                                src="/logo/Group.png"
                                alt="Vietnam"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Group sx={{ color: '#666', fontSize: '16px' }} />
                    <Typography component="span" sx={{ fontSize: '12px', color: '#848484' }}>
                        {followers} người theo dõi
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

function ProductPrice({ price, isPromotion }) {
  const formatPrice = (priceString) => {
        // Sử dụng biểu thức chính quy để trích xuất giá trị trước .00
        const matches = priceString.match(/(\d+)\.00/g);

        if (matches) {
            // Trích xuất giá trị trước .00
            const priceBeforeDot = matches.map(item => item.replace('.00', ''));

            // Định dạng tiền tệ (VNĐ) mà không cần "VNĐ"
            const formattedPrices = priceBeforeDot.map(amount => {
                const formattedAmount = Number(amount).toLocaleString('vi-VN');
                return formattedAmount;
            });

            return formattedPrices;
        }
            return [];

    };

    // Gọi hàm formatPrice để xử lý giá trị price
    const formattedPrices = formatPrice(price);
    return (
         <Typography
            component="div"
            sx={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: isPromotion ? '18px' : '16px',
                margin: isPromotion ? '21px 0px' : '0px 0px 4px 0px',
            }}
        >
            {formattedPrices.length > 0 ? (
                formattedPrices.map((formattedPrice, index) => (
                    <span key={index}>
                        {formattedPrice} {index < formattedPrices.length - 1 ? ' - ' : ' đ'}
                    </span>
                ))
            ) : (
                <span>Không có giá trị hợp lệ.</span>
            )}
        </Typography>
    );
}

function ProductPurchases({ count, label }) {
    return (
        <Typography component="div" sx={{ fontSize: '14px', color: 'black', marginBottom: '8px' }}>
            {count} <span style={{ color: '#666666' }}>{label}</span>
        </Typography>
    );
}

function Divider() {
    return <Box sx={{ width: '100%', height: '1px', backgroundColor: '#fff', margin: '8px 0' }} />;
}

function PromotionDetails({ promotionDescription, promotionEnd }) {
    return (
        promotionDescription && (
            <Box sx={{ backgroundColor: '#F9F1E4', borderRadius: '8px', padding: '8px', marginTop: '8px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/logo/gift.png" alt="Gift" style={{ marginRight: '8px' }} />
                    <Box>
                        {promotionDescription.map((desc) => (
                            <Typography
                                key={desc}
                                component="div"
                                sx={{
                                    fontSize: '15px',
                                    color: 'black',
                                    marginBottom: '4px',
                                    marginLeft: '20px',
                                }}
                            >
                                • {desc}
                            </Typography>
                        ))}
                        <Typography
                            component="div"
                            sx={{ fontSize: '12px', color: '#666666', marginTop: '25px', marginLeft: '20px' }}
                        >
                            Khuyến mãi sẽ hết hạn trong: {promotionEnd}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        )
    );
}

function CategoryList({ category, products, selectedSubCategory, onSubCategoryClick }) {
    const [isDragging, setIsDragging] = React.useState(false);
    const [startX, setStartX] = React.useState(0);
    const [scrollLeft, setScrollLeft] = React.useState(0);
    const containerRef = React.useRef(null);

    // Move the check for empty products array here
    if (products.length === 0) {
        return null;
    }

    const startDrag = (e) => {
        setIsDragging(true);
        setStartX(e.clientX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const drag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.clientX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const stopDrag = () => {
        setIsDragging(false);
    };

    const startTouch = (e) => {
        setIsDragging(true);
        setStartX(e.touches[0].clientX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const touchMove = (e) => {
        if (!isDragging) return;
        const x = e.touches[0].clientX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const productName = category[0];
    const promotionalProducts = [
        {
            id: 1,
            name: 'KOBOO Stroller 3 In 1 Madrid Dark Grey Melange 2022',
            price: '100.000 VNĐ - 97.000 VNĐ',
            image: '/img/image/prod11.jpg.png',
            imageProduct: '/img/image/prod12.jpg.png',
            nameSupplier: 'Công ty A',
            isPromotion: true,
            rating: 5,
            reviewCount: 25,
            purchases: { count: 902, label: 'Lượt mua' },
            promotionDescription: ['Mua càng nhiều, càng có lợi', 'Món quà từ nông nghiệp'],
            promotionEnd: '9:00pm, 25/5/2025',
        },
    ];

    const allProducts = [...promotionalProducts, ...products];

    return (
        <Box key={category.id}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}
            >
                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', fontSize: '28px' }}>
                    <span style={{ color: '#00A6B7', fontWeight: 'bold' }}>{productName?.productGroup?.name}</span>
                    <span style={{ color: '#000', fontWeight: 'bold', marginLeft: '5px' }}>{category.name}</span>
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: '#666666',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                    }}
                >
                    Xem thêm
                </Typography>
            </Box>

            {/* Hiển thị các loại sản phẩm */}
            <Box
                sx={{
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '20px',
                    overflowX: 'auto',
                    cursor: isDragging ? 'grabbing' : 'grab',
                }}
                ref={containerRef}
                onMouseDown={startDrag}
                onMouseMove={drag}
                onMouseUp={stopDrag}
                onMouseLeave={stopDrag}
                onTouchStart={startTouch}
                onTouchMove={touchMove}
                onTouchEnd={stopDrag}
            >
                {category.productTypeDTOList.length > 0 &&
                    category.productTypeDTOList.slice(0, 5).map((subCategory, index) => {
                        return (
                            <CustomButton
                                key={index}
                                selected={selectedSubCategory === subCategory.id}
                                onClick={() => onSubCategoryClick(subCategory.id)}
                            >
                                {subCategory.nameProductType}
                            </CustomButton>
                        );
                    })}
            </Box>

            {/* Hiển thị sản phẩm */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    gap: '20px',
                    textAlign: 'left',
                    overflowX: 'hidden',
                    cursor: 'grab',
                }}
                ref={containerRef}
                onMouseDown={startDrag}
                onMouseMove={drag}
                onMouseUp={stopDrag}
                onMouseLeave={stopDrag}
                onTouchStart={startTouch}
                onTouchMove={touchMove}
                onTouchEnd={stopDrag}
            >
                {allProducts
                    .sort((a, b) => b.isPromotion - a.isPromotion)
                    .map((product) => (
                        <Link
                            key={product.id}
                            href={`user/product-detail/${product.id}`}
                            passHref
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <Card sx={{ ...cardStyles, width: product.isPromotion ? '520px' : '320px' ,padding:2}}>
                                {/* Top Section: Image, Badges and Content */}
                                {product.isPromotion ? <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            marginBottom: '16px',
                                            position: 'relative',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '8px',
                                                left: '8px',
                                                display: 'flex',
                                                gap: '8px',
                                                zIndex: 2,

                                            }}
                                        >
                                            <Badge label="NEW" color="#000" />
                                            <Badge label="GIFT" color="#00A6B7" />
                                        </Box>
                                        <CardMedia
                                            component="img"
                                            image={product?.imageProduct}
                                            alt={product.name}
                                            sx={{
                                                width: '150px',
                                                objectFit: 'contain',
                                                borderRadius: '8px',
                                                marginRight: '16px',
                                            }}
                                        />
                                        <Box sx={{ flex: 1 }}>
                                            <ProductName name={product.name} sx={{ textAlign: 'left' }} />

                                            <SupplierInfo
                                                supplier={product.nameSupplier}
                                                location="Bình Thuận"
                                                followers={30000}
                                            />

                                            <ProductPurchases
                                                count={product.purchases?.count}
                                                label={product.purchases?.label}
                                            />
                                        </Box>
                                        <Typography> </Typography>
                                    </Box> : null}

                                {/* Card Content */}
                                {!product.isPromotion && (
                                    <CardContent
                                        sx={{
                                            flex: 1,
                                            // padding: '5px',
                                          width:'320px',
                                            height: '355px',
                                            textAlign: 'left',
                                            color: 'black',
                                        }}
                                    >
                                        <CardMedia
                                                component="img"
                                                image={product.listImage?.[0]?.url}
                                                alt={product.nameProduct}
                                                sx={{
                                                    width: '260px',
                                                    height: '160px',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        <ProductName name={product.nameProduct} />
                                        <ProductPrice price={product.price} isPromotion={product.isPromotion} />
                                        <Box
                                            display="flex"
                                            justifyContent="left"
                                            width="100%"
                                            mt={1}
                                            sx={{
                                                color: 'black',
                                                alignItems: 'center',
                                                justifyContent: 'left',
                                                paddingBottom: '10px',
                                            }}
                                        >
                                            <Rating
                                                value={product.rating || 5}
                                                readOnly
                                                precision={0.1}
                                                size="small"
                                                color="yellow"
                                                sx={{ marginRight: 1 }}
                                            />
                                        </Box>

                                        <Box display="flex" mb={2}>
                                            <Avatar
                                                src={
                                                    product.logo ||
                                                    'https://res.cloudinary.com/dgts7tmnb/image/upload/v1735478087/photo_2024-12-29_20-12-26_kjerh5.jpg'
                                                }
                                                alt={product.nameSupplier || 'Không có tên nhà cung cấp'}
                                                sx={{
                                                    width: 24,
                                                    height: 24,
                                                    marginRight: 1,
                                                    color: 'black !important',
                                                }}
                                            />
                                            <Box>
                                                <Typography
                                                    variant="subtitle1"
                                                    fontWeight="bold"
                                                    sx={{
                                                        fontSize: {
                                                            xs: '0.7rem',
                                                            sm: '0.9rem',
                                                            md: '0.9rem',
                                                            lg: '0.9rem',
                                                        },
                                                    }}
                                                >
                                                    {product.nameSupplier || 'Không có tên nhà cung cấp'}
                                                </Typography>
                                                <Box display="flex" alignItems="center">
                                                    <PeopleIcon sx={{ fontSize: 15, color: 'gray' }} />
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontSize: {
                                                                xs: '0.5rem',
                                                                sm: '0.5rem',
                                                                md: '0.6rem',
                                                            },
                                                        }}
                                                    >
                                                        0 người theo dõi
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            {/* <Box display="flex" flexDirection="right" ml="auto">
                                                <Typography
                                                    variant="subtitle1"
                                                    fontWeight="bold"
                                                    sx={{
                                                        fontSize: {
                                                            xs: '0.4rem',
                                                            sm: '0.6rem',
                                                            md: '0.7rem',
                                                            lg: '0.8rem',
                                                        },
                                                    }}
                                                >
                                                    {product.address || 'Không có tên nhà cung cấp'}
                                                </Typography>
                                                <StarRateIcon
                                                    sx={{
                                                        fontSize: 20,
                                                        color: 'yellow',
                                                        backgroundColor: 'red',
                                                        borderRadius: '50%',
                                                        padding: '4px',
                                                        marginLeft: 1,
                                                    }}
                                                />
                                            </Box> */}
                                        </Box>
                                    </CardContent>
                                )}

                                {/* Divider */}
                                {product.isPromotion ? <Divider /> : null}

                                {/* Promotion Section */}
                                {product.isPromotion ? <PromotionDetails
                                        promotionDescription={product?.promotionDescription}
                                        promotionEnd="25/02/2025"
                                    /> : null}
                            </Card>
                        </Link>
                    ))}
            </Box>
        </Box>
    );
}

export default CategoryList;
