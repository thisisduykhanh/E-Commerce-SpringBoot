import { Box, Typography } from '@mui/material';

function FeaturesSection() {
    const features = [
        {
            icon: '/icons/Clip-path-group.png',
            title: 'Thanh toán linh hoạt',
            description: 'Chúng tôi hy vọng các bạn có trải nghiệm tốt khi mua nông sản tại đây',
        },
        {
            icon: '/icons/Clip-path-group-1.png',
            title: 'Chính sách mua hàng',
            description: 'Các chính sách mua hàng linh hoạt giúp khách hàng và đối tác tối ưu',
        },
        {
            icon: '/icons/Clip-path-group-2.png',
            title: 'Chính sách đảm bảo',
            description: 'Chính sách đảm bảo hàng hóa, giúp khách hàng yên tâm khi mua hàng',
        },
        {
            icon: '/icons/Clip-path-group-3.png',
            title: 'Giao hàng thân thiện',
            description: 'Hỗ trợ khách hàng và đối tác trong việc vận chuyển.',
        },
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'left',
                backgroundColor: '#ffffff',
                padding: '16px 35px',
                flexWrap: 'wrap',
                '@media (max-width: 600px)': {
                    padding: '16px 20px',
                    gap: '25px',
                },
            }}
        >
            {features.map((feature, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        alignItems: 'left',
                        maxWidth: '300px',
                        gap: '15px',
                        flex: '1 1 22%',
                        '@media (max-width: 600px)': {
                            flex: '1 1 100%',
                        },
                    }}
                >
                    <Box
                        component="img"
                        src={feature.icon}
                        alt={feature.title}
                        sx={{
                            width: '50px',
                            height: '50px',
                        }}
                    />
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: '#333333',
                                margin: 0,
                            }}
                        >
                            {feature.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: '13px',
                                color: '#666666',
                            }}
                        >
                            {feature.description}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

export default FeaturesSection;
