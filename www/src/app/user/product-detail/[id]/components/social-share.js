import { Box, IconButton, Typography } from '@mui/material';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';

export function CompanyShare({ productDetail }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Typography fontWeight="bold">{productDetail?.nameSupplier}</Typography>
                <img src="/logo/company.png" alt="Company Logo" style={{ width: '50px', height: '50px' }} />
            </Box>
            <Box sx={{ display: 'flex', gap: '10px' }}>
                <Typography variant="body2" sx={{ color: '#848484', textAlign: 'center', alignContent: 'center' }}>
                    Chia sẻ
                </Typography>
                <IconButton>
                    <FacebookIcon color="primary" />
                </IconButton>
                <IconButton>
                    <TwitterIcon color="primary" />
                </IconButton>
                <IconButton>
                    <PinterestIcon sx={{ color: '#e60023' }} />
                </IconButton>
                <IconButton>
                    <InstagramIcon sx={{ color: '#d6249f' }} />
                </IconButton>
            </Box>
        </Box>
    );
}
