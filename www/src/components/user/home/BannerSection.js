import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

function BannerSection({ router }) {
    const theme = useTheme();

    // Danh sách các banner
    const banners = [
        '/img/image/banner/banner1.jpg',
        '/img/image/banner/banner2.png',
        '/img/image/banner/banner3.png',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 3000); // đổi banner sau mỗi 5 giây

        return () => clearInterval(interval); // dọn dẹp khi component bị unmount
    }, [banners.length]);

    // Style cho container chính
    const bannerContainerStyles = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.paper,
        margin: 0,
        padding: { xs: 1, md: 2 },
        gap: '16px',
        width: '100%',
        minHeight: '400px',
    };

    const bannerImageBoxStyles = {
        width: { xs: '100%', md: '70%' },
        height: '100%',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
            transform: 'scale(1.02)',
        },
        borderRadius: '10px',
        overflow: 'hidden',
    };

    const imageStyles = {
        width: '100%',
        height: '400px',
        objectFit: 'cover',
        borderRadius: '10px',
    };

    return (
        <Box sx={bannerContainerStyles}>
            <Box
                onClick={() => router.push('/user')}
                sx={bannerImageBoxStyles}
            >
                <img
                    src={banners[currentIndex]}
                    alt={`Banner ${currentIndex + 1}`}
                    style={imageStyles}
                />
            </Box>
        </Box>
    );
}

export default BannerSection;
