import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import RouterLink from 'next/link';

import { OrderCreateForm } from '@/components/dashboard/order/order-create-form';
import { config } from '@/config';
import { paths } from '@/paths';

export const metadata = { title: `Create | Orders | Dashboard | ${config.site.name}` };

export default function Page() {
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
                <Stack spacing={3}>
                    <div>
                        <Link
                            color="text.primary"
                            component={RouterLink}
                            href={paths.dashboard.orders.list}
                            sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                            variant="subtitle2"
                        >
                            <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                            Đơn hàng
                        </Link>
                    </div>
                    <div>
                        <Typography variant="h4">Tạo đơn hàng</Typography>
                    </div>
                </Stack>
                <OrderCreateForm />
            </Stack>
        </Box>
    );
}
