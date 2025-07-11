import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function FeaturesSection() {
    const theme = useTheme();

    // Danh sách tính năng
    const features = [
        {
            icon: '/icons/Clip-path-group.png',
            title: 'Thanh toán an toàn',
            description: 'Hỗ trợ nhiều phương thức thanh toán bảo mật, nhanh chóng',
        },
        {
            icon: '/icons/Clip-path-group-1.png',
            title: 'Bảo hành chính hãng',
            description: 'Cam kết bảo hành lên đến 24 tháng cho mọi sản phẩm',
        },
        {
            icon: '/icons/Clip-path-group-2.png',
            title: 'Đổi trả dễ dàng',
            description: 'Chính sách đổi trả linh hoạt trong 30 ngày',
        },
        {
            icon: '/icons/Clip-path-group-3.png',
            title: 'Giao hàng nhanh chóng',
            description: 'Giao hàng toàn quốc trong 24-48 giờ',
        },
    ];

    // Style cho container chính
    const containerStyles = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
        padding: { xs: '20px', md: '40px' },
        flexWrap: 'wrap',
        gap: '20px',
        boxShadow: theme.shadows[2],
        borderRadius: '12px',
        margin: { xs: '20px 10px', md: '40px 20px' },
    };

    // Style cho mỗi feature
    const featureStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        flex: { xs: '1 1 100%', sm: '1 1 22%' },
        maxWidth: { xs: '100%', md: '300px' },
        padding: '20px',
        borderRadius: '8px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: theme.shadows[4],
            backgroundColor: theme.palette.grey[100],
        },
    };

    // Style cho biểu tượng
    const iconStyles = {
        width: '50px',
        height: '50px',
        objectFit: 'contain',
    };

    // Style cho tiêu đề
    const titleStyles = {
        fontSize: '16px',
        fontWeight: 'bold',
        color: theme.palette.text.primary,
        margin: 0,
    };

    // Style cho mô tả
    const descriptionStyles = {
        fontSize: '14px',
        color: theme.palette.text.secondary,
        lineHeight: 1.5,
    };

    return (
        <Box sx={containerStyles}>
            {features.map((feature, index) => (
                <Box key={index} sx={featureStyles}>
                    <Box component="img" src={feature.icon} alt={feature.title} sx={iconStyles} />
                    <Box>
                        <Typography variant="h6" sx={titleStyles}>
                            {feature.title}
                        </Typography>
                        <Typography variant="body2" sx={descriptionStyles}>
                            {feature.description}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

export default FeaturesSection;