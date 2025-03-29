import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

import { Option } from '@/components/core/option';

export function Form1() {
    return (
        <Stack spacing={2} sx={{ p: 3 }}>
            <Grid container={true} spacing={3}>
                <Grid
                    size={{
                        md: 6,
                        xs: 12,
                    }}
                >
                    <FormControl fullWidth={true}>
                        <InputLabel required={true}>Full name</InputLabel>
                        <OutlinedInput defaultValue="Miron Vitold" name="name" />
                    </FormControl>
                </Grid>
                <Grid
                    size={{
                        md: 6,
                        xs: 12,
                    }}
                >
                    <FormControl fullWidth={true}>
                        <InputLabel required={true}>Email address</InputLabel>
                        <OutlinedInput defaultValue="miron.vitold@domain.com" name="email" type="email" />
                    </FormControl>
                </Grid>
                <Grid
                    size={{
                        md: 6,
                        xs: 12,
                    }}
                >
                    <FormControl fullWidth={true}>
                        <InputLabel>Phone number</InputLabel>
                        <OutlinedInput defaultValue="(425) 434-5535" name="phone" />
                    </FormControl>
                </Grid>
                <Grid
                    size={{
                        md: 6,
                        xs: 12,
                    }}
                >
                    <FormControl fullWidth={true}>
                        <InputLabel>Country</InputLabel>
                        <Select defaultValue="us" name="country">
                            <Option value="us">United States</Option>
                            <Option value="de">Germany</Option>
                            <Option value="es">Spain</Option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    size={{
                        md: 6,
                        xs: 12,
                    }}
                >
                    <FormControl fullWidth={true}>
                        <InputLabel required={true}>State</InputLabel>
                        <OutlinedInput defaultValue="Michigan" name="state" />
                    </FormControl>
                </Grid>
                <Grid
                    size={{
                        md: 6,
                        xs: 12,
                    }}
                >
                    <FormControl fullWidth={true}>
                        <InputLabel required={true}>City</InputLabel>
                        <OutlinedInput defaultValue="Southfield" name="city" />
                    </FormControl>
                </Grid>
                <Grid
                    size={{
                        md: 6,
                        xs: 12,
                    }}
                >
                    <FormControl fullWidth={true}>
                        <InputLabel required={true}>Street line 1</InputLabel>
                        <OutlinedInput defaultValue="1721 Bartlett Avenue" name="line1" />
                    </FormControl>
                </Grid>
                <Grid
                    size={{
                        md: 6,
                        xs: 12,
                    }}
                >
                    <FormControl fullWidth={true}>
                        <InputLabel>Street line 2</InputLabel>
                        <OutlinedInput defaultValue="" name="line2" />
                    </FormControl>
                </Grid>
                <Grid
                    size={{
                        md: 6,
                        xs: 12,
                    }}
                >
                    <Stack spacing={1}>
                        <Typography variant="subtitle2">Email verified</Typography>
                        <Typography color="text.secondary" variant="body2">
                            Disabling this will automatically send the user a verification email
                        </Typography>
                        <Switch defaultChecked={true} name="isVerified" />
                    </Stack>
                </Grid>
                <Grid
                    size={{
                        md: 6,
                        xs: 12,
                    }}
                >
                    <Stack spacing={1}>
                        <Typography variant="subtitle2">Discounted prices</Typography>
                        <Typography color="text.secondary" variant="body2">
                            This will give the user discounted prices for all products
                        </Typography>
                        <Switch color="primary" name="hasDiscount" />
                    </Stack>
                </Grid>
            </Grid>
            <div>
                <Button variant="contained">Update customer</Button>
            </div>
        </Stack>
    );
}
