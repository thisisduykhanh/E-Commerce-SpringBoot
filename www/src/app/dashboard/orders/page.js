'use client';
import { OrderModal } from '@/components/dashboard/order/order-modal';
import { OrdersFilters } from '@/components/dashboard/order/orders-filters';
import { OrdersPagination } from '@/components/dashboard/order/orders-pagination';
import { OrdersSelectionProvider } from '@/components/dashboard/order/orders-selection-context';
import { OrdersTable } from '@/components/dashboard/order/orders-table';
import { getOrderSupply } from '@/services/order'; // Import your API function
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';

// export const metadata = { title: `Quản lý đơn hàng | ${config.site.name}` };

export default function Page({ searchParams }) {
    const { customer, id, previewId, sortDir, status } = searchParams;
    const [orders, setOrders] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    // Fetch orders when component mounts
    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrderSupply(); // Pass required parameters
                setOrders(response.data);
                console.log('Fetched orders:', response.data);  
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [status]);

    const sortedOrders = applySort(orders, sortDir);
    const filteredOrders = applyFilters(sortedOrders, { customer, id, status });

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    maxWidth: 'var(--Content-maxWidth)',
                    m: 'var(--Content-margin)',
                    p: 'var(--Content-padding)',
                    width: 'var(--Content-width)',
                }}
            >
                <Stack spacing={4}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
                        <Box sx={{ flex: '1 1 auto' }}>
                            <Typography variant="h4">Đặt hàng</Typography>
                        </Box>
                       
                    </Stack>
                    <OrdersSelectionProvider orders={filteredOrders}>
                        <Card>
                            <OrdersFilters filters={{ customer, id, status }} sortDir={sortDir} orders={orders} />
                            <Divider />
                            <Box sx={{ overflowX: 'auto' }}>
                                <OrdersTable rows={filteredOrders} />
                            </Box>
                            <Divider />
                            <OrdersPagination count={filteredOrders.length} page={0} />
                        </Card>
                    </OrdersSelectionProvider>
                </Stack>
            </Box>
            <OrderModal open={Boolean(previewId)} />
        </React.Fragment>
    );
}

// Sorting and filtering has to be done on the server.

function applySort(row, sortDir) {
    return row.sort((a, b) => {
        if (sortDir === 'asc') {
            return a.createDate - b.createDate; // Use createDate for sorting
        }
        return b.createDate - a.createDate;
    });
}

function applyFilters(row, { customer, id, status }) {
    return row.filter((item) => {
        if (customer) {
            if (!item.user.userName.toLowerCase().includes(customer.toLowerCase())) {
                return false;
            }
        }

        if (id) {
            if (!item.id.toString().toLowerCase().includes(id.toLowerCase())) {
                return false;
            }
        }

        if (status) {
            if (item.orderStatus.name.toLowerCase() !== status.toLowerCase()) {
                return false;
            }
        }

        return true;
    });
}
