import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function SplitLayout({ children }) {
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
                            Nền tảng mua sắm chuyên nghiệp giúp bạn trải nghiệm dịch vụ nhanh chóng, tiện lợi và đẹp
                            mắt. Bắt đầu hành trình mua sắm ngay hôm nay!
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
