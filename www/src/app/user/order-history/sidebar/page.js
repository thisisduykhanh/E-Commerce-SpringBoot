import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const Sidebar = () => {
    const menuItems = [
        'Thông tin tài khoản',
        'Đơn hàng của tôi',
        'Đã hỏi mua',
        'Sản phẩm yêu thích',
        'NCC yêu thích',
        'Sản phẩm đã xem',
        'Yêu cầu đã đăng',
        'Báo giá đã nhận',
        'Sản phẩm dành cho bạn',
    ];

    return (
        <Box sx={{ bgcolor: '#f5f5f5', height: '100vh', p: 2 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
                Wendy
            </Typography>
            <List>
                {menuItems.map((item, index) => (
                    <ListItem button={true} key={index}>
                        <ListItemText primary={item} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Sidebar;
