import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import { margin } from '@mui/system';

function ProductCategories() {
    const theme = useTheme();

    // Danh sách danh mục
    const categories = [
        {
            name: 'Laptop',
            image: '/img/image/category/Product_5.png',
            url: '/user/products/1',
        },
        {
            name: 'Máy tính bảng',
            image: '/img/image/category/tablet.png',
            url: '/user/products/2',
        },
        {
            name: 'Điện thoại',
            image: '/img/image/category/phone.png',
            url: '/user/products/3',
        },
        {
            name: 'Tai nghe',
            image: '/img/image/category/headphone-cat.jpg',
            url: '/user/products/4',
        },
        {
            name: 'Đồng hồ thông minh',
            image: '/img/image/category/smw.png',
            url: '/user/products/5',
        }
    ];

    // Style cho container
    const containerStyles = {
        padding: { xs: '20px 10px', md: '40px 20px' },
        backgroundColor: theme.palette.background.paper,
        borderRadius: '12px',
        margin: { xs: '20px 10px', md: '40px 20px' },
        boxShadow: theme.shadows[2],
    };

    // Style cho mỗi danh mục
    const categoryStyles = {
        width: { xs: '100%', sm: '220px' },
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: theme.shadows[2],
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: theme.shadows[4],
        },
        textAlign: 'center',
        textDecoration: 'none',
        color: theme.palette.text.primary,
    };

    // Style cho hình ảnh danh mục
    const imageStyles = {
        width: '80%',
        height: '150px',
        objectFit: 'cover',
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
                Danh mục sản phẩm
            </Typography>
            <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {categories.map((category) => (
                    <Link key={category.name} href={category.url} passHref>
                        <Box sx={categoryStyles}>
                            <Box component="img" src={category.image} alt={category.name} sx={imageStyles} loading="lazy" />
                            <Typography
                                variant="h6"
                                sx={{ padding: '15px', fontSize: '16px', fontWeight: 'bold' }}
                            >
                                {category.name}
                            </Typography>
                        </Box>
                    </Link>
                ))}
            </Box>
        </Box>
    );
}

export default ProductCategories;