import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Briefcase as BriefcaseIcon } from '@phosphor-icons/react/dist/ssr/Briefcase';
import { EnvelopeSimple as EnvelopeSimpleIcon } from '@phosphor-icons/react/dist/ssr/EnvelopeSimple';
import { House as HouseIcon } from '@phosphor-icons/react/dist/ssr/House';
import { PhoneCall } from '@phosphor-icons/react/dist/ssr/PhoneCall';

export function About({ supplier }) {
    return (
        <Card
            sx={{
              padding:2,
                backgroundColor: '#fff',
                color: '#1a1a1a',
            }}
        >
            <CardHeader sx={{ color: '#008D91' }} title="Về Chúng Tôi" />
            <CardContent
                sx={{
                    backgroundColor: '#fff',
                    color: '#1a1a1a',
                }}
            >
                <Stack spacing={2}>
                    <Typography color="#1a1a1a" variant="subtitle2">
                        &quot; Chúng tôi luôn cung cấp dịch vụ và chất lượng tốt nhất về nông sản đến khách hàng &quot;
                    </Typography>
                    <List disablePadding sx={{ '& .MuiListItem-root': { px: 0, py: 2 } }}>
                        <ListItem divider sx={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}>
                            <ListItemIcon>
                                <BriefcaseIcon  />
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography noWrap variant="subtitle2">
                                        Sản phẩm{' '}
                                        <Link color="#1a1a1a" variant="subtitle2">
                                            của chúng tôi
                                        </Link>
                                    </Typography>
                                }
                                secondary={
                                    <Typography color="text.secondary" noWrap variant="body2">
                                        Đa phần là{' '}
                                        <Link color="text.secondary" variant="body2">
                                            Nông sản
                                        </Link>
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem divider sx={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}>
                            <ListItemIcon>
                                <PhoneCall />
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Link
                                        color="#1a1a1a"
                                        noWrap
                                        sx={{ cursor: 'pointer' }}
                                        underline="always"
                                        variant="body2"
                                    >
                                        {supplier.phone || 'Chưa có số điện thoại'}
                                    </Link>
                                }
                            />
                        </ListItem>
                        <ListItem divider sx={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}>
                            <ListItemIcon>
                                <HouseIcon />
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography noWrap variant="subtitle2">
                                        {supplier.address || 'Chưa có địa chỉ'}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <EnvelopeSimpleIcon />
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                primary={
                                    <Typography noWrap variant="subtitle2">
                                        {supplier.email || 'Chưa có email'}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </List>
                </Stack>
            </CardContent>
        </Card>
    );
}
