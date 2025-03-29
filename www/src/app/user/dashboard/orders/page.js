'use client';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import { OrderModal } from '@//components/user/order/order-modal';
import { OrdersFilters } from '@/components/user/order/orders-filters';
import { OrdersPagination } from '@/components/user/order/orders-pagination';
import { OrdersTable } from '@/components/user/order/orders-table';
import { logger } from '@/lib/default-logger';
import { getMyOrder } from '@/services/order';

export default function Page({ searchParams }) {
    const [orders, setOrders] = React.useState([]);
    const [_ordersFetched, setOrdersFetched] = React.useState(false); // New state variable
    const { customer, id, previewId, sortDir, status  } = searchParams;
     const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(2);
      const [totalElements, _setTotalElements] = React.useState(0); 

    const sortedOrders = applySort(orders, sortDir);
    const _filteredOrders = applyFilters(sortedOrders, { customer, id, status });
    if (searchParams.status == null) { 
        searchParams.status = "Pending";
    
       } const currentStatus = searchParams.status;
    const fetchOrders = React.useCallback(async (page, size,status) => {
       
        try {
            const response = await getMyOrder( status,page,size);
            logger.debug('Fetched orders:', response.data.content);
            setOrders(response.data.content);
            setOrdersFetched(true); // Set ordersFetched to true after fetching
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }, []);

    React.useEffect(() => {
        fetchOrders(page, rowsPerPage,currentStatus);
    }, [fetchOrders, page, rowsPerPage,status]);
   
    
      const handlePageChange = (_event, newPage) => {
        console.log(newPage);
        setPage(newPage);
        fetchOrders(newPage, rowsPerPage); // Fetch lại dữ liệu khi thay đổi trang
      };
    
      const handleRowsPerPageChange = (event) => {
        const newSize = parseInt(event.target.value, 10);
        setRowsPerPage(newSize);
        setPage(0); // Reset về trang đầu tiên
        fetchOrders(0, newSize); // Fetch lại dữ liệu khi thay đổi số hàng mỗi trang
      };

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
                            <Typography variant="h4">Đơn hàng</Typography>
                        </Box>
                    </Stack>
                   
                        <Card>
                            <OrdersFilters filters={{ customer, id, status }} sortDir={sortDir} />
                            <Divider />
                            <Box sx={{ overflowX: 'auto' }}>
                                <OrdersTable rows={orders} status={status} />
                            </Box>
                            <Divider />
                            <OrdersPagination   count={totalElements} // Sử dụng tổng số phần tử từ BE
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange} />
                        </Card>
                    
                </Stack>
            </Box>
            <OrderModal open={Boolean(previewId)} />
        </React.Fragment>
    );
}

// Sorting and filtering has to be done on the server.

function applySort(row, _sortDir) {
    //   return row.sort((a, b) => {
    //     if (sortDir === 'asc') {
    //       return a.createdAt.getTime() - b.createdAt.getTime();
    //     }

    //     return b.createdAt.getTime() - a.createdAt.getTime();
    //   });
    return row;
}

function applyFilters(row, { customer, id, status }) {
    return row.filter((item) => {
        if (customer) {
            if (!item.customer?.name?.toLowerCase().includes(customer.toLowerCase())) {
                return false;
            }
        }

        if (id) {
            if (!item.id?.toLowerCase().includes(id.toLowerCase())) {
                return false;
            }
        }

        if (status) {
            if (item.status !== status) {
                return false;
            }
        }

        return true;
    });
}
