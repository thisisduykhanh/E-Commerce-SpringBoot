import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

export function Form4() {
    return (
        <Box sx={{ p: 3 }}>
            <Stack divider={<Divider />} spacing={2}>
                <Grid container spacing={3}>
                    <Grid
                        size={{
                            sm: 6,
                            xs: 12,
                        }}
                    >
                        <FormControl fullWidth>
                            <InputLabel>Password</InputLabel>
                            <OutlinedInput name="password" type="password" />
                        </FormControl>
                    </Grid>
                    <Grid
                        size={{
                            sm: 6,
                            xs: 12,
                        }}
                    >
                        <FormControl fullWidth>
                            <InputLabel>Confirm password</InputLabel>
                            <OutlinedInput name="passwordConfirm" type="password" />
                        </FormControl>
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                    <Button variant="contained">Change password</Button>
                </Box>
            </Stack>
        </Box>
    );
}
