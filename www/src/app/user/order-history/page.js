'use client';
import { Box, Grid2 as Grid, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import OrderCard from './OrderCard';
import Pagination from './Pagination';
import { getMyOrder, updateOrderStatus, paymentOrder, createInvoice } from '@/services/order'; // Import cancelOrder service
import { useEffect } from 'react';

const styles = {
    primaryColor: '#00A6B7',
    hoverColor: '#1976d2',
    tabStyle: {
        textTransform: 'none',
        fontWeight: 500,
        minWidth: 240,
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

function OrderHistory() {
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
            console.log("Orders fetched successfully", response.data);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    const handleCancelOrder = async (orderId) => {
        try {
            console.log("Cancelling order with ID:", orderId);
            await updateOrderStatus(orderId, 3); // Call updateOrderStatus API with CANCELLED status
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId
                        ? { ...order, orderStatus: { ...order.orderStatus, name: "CANCELLED" } }
                        : order
                )
            );
        } catch (error) {
            console.error("Error cancelling order:", error);
        }
    };

    const handlePayment = async (orderId, method, items, totalPrice) => {
        try {
            console.log("Processing payment for order ID:", orderId);
            await paymentOrder(orderId, method); // Call updateOrderStatus API with PAID status

            await createInvoice(orderId, items, totalPrice);

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId
                        ? { ...order, orderStatus: { ...order.orderStatus, name: "PAID" }, paymentMethod: method }
                        : order
                )
            );
        } catch (error) {
            console.error("Error processing payment:", error);
        }
    };

    const filteredOrders = () => {
        if (tabIndex === 1) {
            return orders.filter(order => order.orderStatus.name === 'PENDING');
        } else if (tabIndex === 2) {
            return orders.filter(order => order.orderStatus.name === 'PAID');
        }
        else if (tabIndex === 3) {
            return orders.filter(order => order.orderStatus.name === 'CANCELLED');
        }
        return orders; // Default to all orders
    };


    return (
        <Box justifyContent="center" bgcolor="#fff">
            <Grid container spacing={28}>
                <Grid item xs={12} sm={2} md={2} />
                <Grid item xs={12} sm={10} md={10}>
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
                                allowScrollButtonsMobile
                                TabIndicatorProps={{ style: styles.underlineStyle }}
                            >
                                <Tab label="Tất cả" sx={styles.tabStyle} />
                                <Tab label="Chờ thanh toán" sx={styles.tabStyle} />
                                <Tab label="Đã giao" sx={styles.tabStyle} />
                                <Tab label="Đã hủy" sx={styles.tabStyle} />
                            </Tabs>
                        </Box>
                        
                        {selectedMenu === 'Đơn hàng của tôi' && (
                            <OrderCard 
                                orders={filteredOrders()} 
                                onCancelOrder={handleCancelOrder}
                                onPayment={handlePayment}
                            />
                        )}
                        
                    </Box>
                </Grid>
                <Pagination />
            </Grid>
        </Box>
    );
}

export default OrderHistory;
