'use client';
import { Box, Grid2 as Grid, Tab, Tabs, TextField, Typography, Button } from '@mui/material';
import { useState } from 'react';
import OrderCard from './OrderCard';
import Pagination from './Pagination';
import Sidebar from './Sidebar';
import { getMyOrder } from '@/services/order';
import { useEffect } from 'react';

const styles = {
    primaryColor: '#00A6B7',
    hoverColor: '#1976d2',
    tabStyle: {
        textTransform: 'none',
        fontWeight: 500,
        minWidth: 290,
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
    const [tabIndex, setTabIndex] = useState(0); // Add state for tab index

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const getOrders = async () => {
        const response = await getMyOrder();
        if (response && response.data) {
            setOrders(response.data);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    const filteredOrders = () => {
        if (tabIndex === 1) {
            return orders.filter(order => order.orderStatus.name === 'PAID');
        } else if (tabIndex === 2) {
            return orders.filter(order => order.orderStatus.name === 'CANCELLED');
        }
        return orders; // Default to all orders
    };


    return (
        <Box justifyContent="center" bgcolor="#fff">
            <Grid container={true} spacing={28}>
                <Grid item={true} xs={12} sm={2} md={2}>
                </Grid>
                <Grid item={true} xs={12} sm={10} md={10}>
                    <Box sx={{ color: '#000', p: '0 !important', mt: 4 }}>
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
                                value={tabIndex} // Bind tabIndex state
                                onChange={handleTabChange} // Handle tab change
                                aria-label="order tabs"
                                sx={{ borderBottom: '1px solid #ddd', justifyContent: 'space-between' }}
                                variant="scrollable"
                                allowScrollButtonsMobile={true}
                                TabIndicatorProps={{ style: styles.underlineStyle }}
                            >
                                <Tab label="Tất cả" sx={styles.tabStyle} />
                                <Tab label="Đã giao" sx={styles.tabStyle} />
                                <Tab label="Đã hủy" sx={styles.tabStyle} />
                            </Tabs>
                        </Box>
                        
                        {selectedMenu === 'Đơn hàng của tôi' && (
                            <OrderCard 
                                orders={filteredOrders()} 
                                
                            />
                        )}
                        
                    </Box>
                </Grid>
                <Pagination />
            </Grid>
        </Box>
    );
};

export default OrderHistory;
