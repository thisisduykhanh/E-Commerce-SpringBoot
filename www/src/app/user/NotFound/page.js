import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { paths } from '@/paths';

export const metadata = { title: `Not found | Errors | ${config.site.name}` };

export default function Page() {
    return (
        <Box
            component="main"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '100%',
                py: '64px',
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box
                            alt="Not found"
                            component="img"
                            src="/assets/404.png"
                            sx={{ height: 'auto', maxWidth: '100%', width: '800px' }}
                        />
                    </Box>
                    <Stack spacing={1} sx={{ textAlign: 'center' }}>
                        <Typography variant="h4">Oops! trang đang phát triển</Typography>
                        <Typography color="text.secondary">
                            Trang web hiện đang phát triển thêm tính năng, quý khách thông cảm cho sự bất tiện này!!
                        </Typography>
                    </Stack>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            component={RouterLink}
                            href={paths.home}
                            variant="contained"
                            sx={{ background: 'linear-gradient(180deg, #00A6B7 0%, #00A6B7 100%)' }}
                        >
                            Trở về
                        </Button>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}
