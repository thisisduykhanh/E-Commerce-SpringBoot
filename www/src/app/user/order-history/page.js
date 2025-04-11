'use client';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid2 as Grid, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import OrderCard from './OrderCard';
import Pagination from './Pagination';
import Sidebar from './Sidebar';
import { getMyOrder1 } from '@/services/users';
import { getMyOrder } from '@/services/order';
import { useEffect } from 'react';
import { logger } from '@/lib/default-logger';

const styles = {
    primaryColor: '#00A6B7',
    hoverColor: '#1976d2',
    tabStyle: {
        textTransform: 'none',
        fontWeight: 500,
        minWidth: 100,
        color: '#000',
        '&.Mui-selected': { color: '#00A6B7' },
        '&:hover': { color: '#1976d2' },
    },
    underlineStyle: {
        borderBottom: '2px solid #00A6B7',
    },
    searchField: {
        '& .MuiOutlinedInput-root': {
            color: '#000',
            '& fieldset': {
                borderColor: 'transparent',
            },
            '&:hover fieldset': {
                borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'transparent',
            },
        },
        '& .MuiInputBase-input': {
            color: '#000',
        },
    },
    searchIcon: {
        color: '#fff',
        background: '#00A6B7',
        width: 40,
        height: 33,
    },
};

const OrderHistory = () => {
    const [selectedMenu, setSelectedMenu] = useState('Đơn hàng của tôi');
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        const response = await getMyOrder();
        if (response && response.data) {
            setOrders(response.data);
            logger.debug('Orders:', response.data);
        }
    }

    useEffect(() => {
        getOrders();
    }
        , []);
    


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
        <Box justifyContent="center" bgcolor="#fff">
            <Grid container={true} spacing={2}>
                <Grid item={true} xs={12} sm={2} md={2}>
                    <Sidebar menuItems={menuItems} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
                </Grid>
                <Grid item={true} xs={12} sm={10} md={10}>
                    <Box sx={{ color: '#000', p: '0 !important' }}>
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, textAlign: 'left', color: '#000' }}>
                            Danh sách đơn hàng
                        </Typography>
                        <Box
                            sx={{
                                mb: 2,
                                bgcolor: '#fff',
                                border: '1px solid #ddd',
                                p: '0 !important',
                            }}
                        >
                            <Tabs
                                value={0}
                                aria-label="order tabs"
                                sx={{ borderBottom: '1px solid #ddd', justifyContent: 'space-between' }}
                                variant="scrollable"
                                allowScrollButtonsMobile={true}
                                TabIndicatorProps={{ style: styles.underlineStyle }}
                            >
                                <Tab label="Tất cả" sx={styles.tabStyle} />
                                <Tab label="Chờ xác nhận" sx={styles.tabStyle} />
                                <Tab label="Chờ thanh toán" sx={styles.tabStyle} />
                                <Tab label="Chờ lấy hàng" sx={styles.tabStyle} />
                                <Tab label="Đang giao" sx={styles.tabStyle} />
                                <Tab label="Đã giao" sx={styles.tabStyle} />
                                <Tab label="Đã hủy" sx={styles.tabStyle} />
                            </Tabs>
                        </Box>
                        <Box
                            sx={{
                                border: '0.1px solid #ddd',
                                mb: 2,
                                bgcolor: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <TextField
                                placeholder="Tìm kiếm theo tên shop hoặc mã đơn hàng"
                                size="small"
                                variant="outlined"
                                sx={{
                                    flexGrow: 1,
                                    ...styles.searchField,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                    },
                                }}
                            />
                            <SearchIcon sx={{ ...styles.searchIcon }} />
                        </Box>
                        {selectedMenu === 'Đơn hàng của tôi' && <OrderCard orders={orders} />}
                        {selectedMenu === 'Sản phẩm yêu thích' && (
                            <Box sx={{ bgcolor: '#fff', borderRadius: 2, boxShadow: 1, p: '0 !important' }}>
                                <Typography>Danh sách sản phẩm yêu thích</Typography>
                            </Box>
                        )}
                        {selectedMenu === 'Đã hỏi mua' && (
                            <Box sx={{ bgcolor: '#fff', borderRadius: 2, boxShadow: 1, p: '0 !important' }}>
                                <Typography>Danh sách đã hỏi mua</Typography>
                            </Box>
                        )}
                    </Box>
                </Grid>
                <Pagination />
            </Grid>
        </Box>
    );
};

export default OrderHistory;
