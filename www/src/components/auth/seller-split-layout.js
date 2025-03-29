import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export function SellerSplitLayout({ children }) {
    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 800px' }, minHeight: '100%' }}>
            <Box
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(90deg, #00A6B7 0%, #007A89 100%)',
                    display: { xs: 'none', lg: 'flex' },
                    flexDirection: 'column',
                    p: 3,
                }}
            >
                <Stack spacing={4} sx={{ maxWidth: '700px' }}>
                    <Stack spacing={1}>
                        <Typography
                            variant="h4"
                            sx={{
                                color: '#E0E0E0',
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                            }}
                        >
                            Chào mừng bạn đến với ASIZON
                        </Typography>
                        <Typography
                            sx={{
                                color: '#E0E0E0',
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
                            }}
                        >
                            Hành trình thành công dành cho Người bán!
                        </Typography>
                    </Stack>
                    <Typography
                        sx={{ color: '#E0E0E0', fontSize: '1.2rem', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}
                    >
                        Tham gia ngay hôm nay để trải nghiệm nền tảng thương mại điện tử thân thiện và hiện đại.
                    </Typography>
                    <Typography
                        sx={{ color: '#E0E0E0', fontSize: '1.1rem', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}
                    >
                        Kết nối hàng triệu khách hàng tiềm năng và xây dựng thương hiệu nổi bật.
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <ShoppingCartIcon sx={{ color: '#E0E0E0' }} />
                        <Typography
                            sx={{ color: '#E0E0E0', fontSize: '1rem', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}
                        >
                            Quản lý sản phẩm dễ dàng, cập nhật giá và tồn kho nhanh chóng.
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <BarChartIcon sx={{ color: '#E0E0E0' }} />
                        <Typography
                            sx={{ color: '#E0E0E0', fontSize: '1rem', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}
                        >
                            Công cụ phân tích dữ liệu chuyên nghiệp giúp tối ưu hóa chiến lược kinh doanh.
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <SupportAgentIcon sx={{ color: '#E0E0E0' }} />
                        <Typography
                            sx={{ color: '#E0E0E0', fontSize: '1rem', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}
                        >
                            Đội ngũ hỗ trợ tận tâm, sẵn sàng giúp bạn 24/7.
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
            <Box sx={{ boxShadow: 'var(--mui-shadows-8)', display: 'flex', flexDirection: 'column' }}>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: '1 1 auto',
                        justifyContent: 'center',
                        p: 3,
                    }}
                >
                    <Box sx={{ maxWidth: '420px', width: '100%' }}>{children}</Box>
                </Box>
            </Box>
        </Box>
    );
}
