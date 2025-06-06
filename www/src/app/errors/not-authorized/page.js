import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { paths } from '@/paths';

export const metadata = { title: `Not authorized | Errors | ${config.site.name}` };

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
                            alt="Not authorized"
                            component="img"
                            src="/assets/error.svg"
                            sx={{ height: 'auto', maxWidth: '100%', width: '200px' }}
                        />
                    </Box>
                    <Stack spacing={1} sx={{ textAlign: 'center' }}>
                        <Typography variant="h4">401: Authorization required</Typography>
                        <Typography color="text.secondary">
                            You either tried some shady route or you came here by mistake. Whichever it is, try using
                            the navigation.
                        </Typography>
                    </Stack>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button component={RouterLink} href={paths.home} variant="contained">
                            Back to home
                        </Button>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}
