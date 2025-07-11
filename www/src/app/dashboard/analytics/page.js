import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { config } from '@/config';
import { ProductsPurchasedByCategory } from '@/components/dashboard/analytics/channel-sessions-vs-bounce-rate';
import OrderDashboard from '@/components/dashboard/analytics/order-dashboard';

import { Summary } from '@/components/dashboard/analytics/summary';

export const metadata = { title: `Analytics | Dashboard | ${config.site.name}` };

export default function Page() {
    return (
        <Box
            sx={{
                maxWidth: 'var(--Content-maxWidth)',
                m: 'var(--Content-margin)',
                p: '20px',
                width: 'var(--Content-width)',
            }}
        >
            <Stack spacing={4}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
                    <Box sx={{ flex: '1 1 auto' }}>
                        <Typography variant="h4">Tổng quan</Typography>
                    </Box>
                    <div>
                        <Button startIcon={<PlusIcon />} variant="contained">
                            Add metrics
                        </Button>
                    </div>
                </Stack>
                <Grid container spacing={4}>
                    <Grid size={12}>
                        <Summary />
                    </Grid>
                    <Grid
                        size={{
                            lg: 6,
                            xs: 12,
                        }}
                    >
                        <OrderDashboard />
                    </Grid>

                    <Grid
                        size={{
                            lg: 6,
                            xs: 12,
                        }}
                    >
                        <ProductsPurchasedByCategory />
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    );
}
