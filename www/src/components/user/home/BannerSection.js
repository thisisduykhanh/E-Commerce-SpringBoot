import { Box } from '@mui/material';

function BannerSection({ router }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                backgroundColor: '#ffffff',
                margin: '0',
                padding: '0',
                paddingTop: '0',
                gap: '16px',
            }}
        >
            <Box
                onClick={() => router.push('/user')}
                sx={{ display: 'block', width: '70%', height: '70%', cursor: 'pointer' }}
            >
                <img
                    src="/img/image/banner/Frame 2event1.png"
                    alt="Tabpanel"
                    style={{ width: '100%', height: '400px', borderRadius: '10px' }}
                />
            </Box>
            <Box
                onClick={() => router.push('/user')}
                sx={{ display: 'block', width: '30%', height: '30%', cursor: 'pointer' }}
            >
                <img
                    src="/img/image/banner/Frame 3banner3.png"
                    alt="Tabpanel"
                    style={{ width: '100%', height: '400px', borderRadius: '10px' }}
                />
            </Box>
        </Box>
    );
}

export default BannerSection;
