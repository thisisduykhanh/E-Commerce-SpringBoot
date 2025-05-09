import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2'; // Grid2 nên import từ 'Unstable_Grid2'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { config } from '@/config';
import { Stats } from '@/components/dashboard/e-commerce/stats';

export const metadata = { title: `E-commerce | Dashboard | ${config.site.name}` };

export default function Page() {
  const data = [
    { name: 'Jan 1', revenue: 3350 },
    { name: 'Jan 2', revenue: 3440 },
    { name: 'Jan 3', revenue: 3054 },
    { name: 'Jan 4', revenue: 3780 },
    { name: 'Jan 5', revenue: 3849 },
    { name: 'Jan 6', revenue: 4241 },
    { name: 'Jan 7', revenue: 4170 },
    { name: 'Jan 8', revenue: 4051 },
    { name: 'Jan 9', revenue: 4364 },
    { name: 'Jan 10', revenue: 4385 },
    { name: 'Jan 11', revenue: 4912 },
    { name: 'Jan 12', revenue: 4623 },
    { name: 'Jan 13', revenue: 4673 },
    { name: 'Jan 14', revenue: 4465 },
    { name: 'Jan 15', revenue: 4221 },
    { name: 'Jan 16', revenue: 5237 },
    { name: 'Jan 17', revenue: 5303 },
    { name: 'Jan 18', revenue: 5701 },
    { name: 'Jan 19', revenue: 5725 },
    { name: 'Jan 20', revenue: 5856 },
    { name: 'Jan 21', revenue: 6401 },
    { name: 'Jan 22', revenue: 6733 },
    { name: 'Jan 23', revenue: 6640 },
    { name: 'Jan 24', revenue: 6576 },
    { name: 'Jan 25', revenue: 7300 },
    { name: 'Jan 26', revenue: 7285 },
    { name: 'Jan 27', revenue: 7389 },
    { name: 'Jan 28', revenue: 7705 },
    { name: 'Jan 29', revenue: 8212 },
    { name: 'Jan 30', revenue: 8301 },
    { name: 'Jan 31', revenue: 8531 },
  ];

  const summaryData = {
    totalRevenue: 250000000, // tổng doanh thu
    todayRevenue: 8300000,   // doanh thu hôm nay
    totalOrders: 1864,
    completedOrders: 1720,
  };

  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
      }}
    >
      <Stack spacing={4}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">E-commerce</Typography>
          </Box>
          <div>
            <Button startIcon={<PlusIcon />} variant="contained">
              Add product
            </Button>
          </div>
        </Stack>
        <Grid container spacing={4}>
          <Grid xs={12}>
            <Stats data={data} summaryData={summaryData} />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
