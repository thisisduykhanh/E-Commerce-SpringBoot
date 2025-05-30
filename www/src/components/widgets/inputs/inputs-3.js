import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

export function Inputs3() {
    return (
        <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
                <Grid
                    size={{
                        md: 6,
                        xs: 12,
                    }}
                >
                    <Stack spacing={1}>
                        <Typography variant="subtitle2">Email verified</Typography>
                        <Typography color="text.secondary" variant="body2">
                            Disabling this will automatically send the user a verification email.
                        </Typography>
                        <Switch defaultChecked />
                    </Stack>
                </Grid>
                <Grid
                    size={{
                        md: 6,
                        xs: 12,
                    }}
                >
                    <Stack spacing={1}>
                        <Typography variant="subtitle2">Email</Typography>
                        <Typography color="text.secondary" variant="body2">
                            This will give the user discounted prices for all products.
                        </Typography>
                        <Switch />
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}
