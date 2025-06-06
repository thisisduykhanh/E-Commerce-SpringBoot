import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Check as CheckIcon } from '@phosphor-icons/react/dist/ssr/Check';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { Receipt as ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';

export function InvoicesStats() {
    return (
        <Grid container spacing={4}>
            <Grid
                size={{
                    md: 6,
                    xl: 4,
                    xs: 12,
                }}
            >
                <Card>
                    <CardContent>
                        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                            <Avatar
                                sx={{
                                    '--Avatar-size': '48px',
                                    bgcolor: 'var(--mui-palette-background-paper)',
                                    boxShadow: 'var(--mui-shadows-8)',
                                    color: 'var(--mui-palette-text-primary)',
                                }}
                            >
                                <ReceiptIcon fontSize="var(--icon-fontSize-lg)" />
                            </Avatar>
                            <div>
                                <Typography color="text.secondary" variant="body2">
                                    Total
                                </Typography>
                                <Typography variant="h6">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        5300
                                    )}
                                </Typography>
                                <Typography color="text.secondary" variant="body2">
                                    from {new Intl.NumberFormat('vi-VN').format(12)} invoices
                                </Typography>
                            </div>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
            <Grid
                size={{
                    md: 6,
                    xl: 4,
                    xs: 12,
                }}
            >
                <Card>
                    <CardContent>
                        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                            <Avatar
                                sx={{
                                    '--Avatar-size': '48px',
                                    bgcolor: 'var(--mui-palette-background-paper)',
                                    boxShadow: 'var(--mui-shadows-8)',
                                    color: 'var(--mui-palette-text-primary)',
                                }}
                            >
                                <CheckIcon fontSize="var(--icon-fontSize-lg)" />
                            </Avatar>
                            <div>
                                <Typography color="text.secondary" variant="body2">
                                    Paid
                                </Typography>
                                <Typography variant="h6">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        3860.4
                                    )}
                                </Typography>
                                <Typography color="text.secondary" variant="body2">
                                    from {new Intl.NumberFormat('vi-VN').format(3)} invoices
                                </Typography>
                            </div>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
            <Grid
                size={{
                    md: 6,
                    xl: 4,
                    xs: 12,
                }}
            >
                <Card>
                    <CardContent>
                        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                            <Avatar
                                sx={{
                                    '--Avatar-size': '48px',
                                    bgcolor: 'var(--mui-palette-background-paper)',
                                    boxShadow: 'var(--mui-shadows-8)',
                                    color: 'var(--mui-palette-text-primary)',
                                }}
                            >
                                <ClockIcon fontSize="var(--icon-fontSize-lg)" />
                            </Avatar>
                            <div>
                                <Typography color="text.secondary" variant="body2">
                                    Pending
                                </Typography>
                                <Typography variant="h6">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        1439.6
                                    )}
                                </Typography>
                                <Typography color="text.secondary" variant="body2">
                                    from {new Intl.NumberFormat('vi-VN').format(2)} invoices
                                </Typography>
                            </div>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
