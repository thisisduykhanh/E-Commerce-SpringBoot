'use client';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import { ProductModal } from '@/components/dashboard/product/product-modal';
import { ProductsFilters } from '@/components/dashboard/product/products-filters';
import { ProductsPagination } from '@/components/dashboard/product/products-pagination';
import { ProductsTable } from '@/components/dashboard/product/products-table';


import { getProducts } from '@/services/products';


export default function Page({ searchParams }) {
    const [products, setProducts] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [totalElements, setTotalElements] = React.useState(0);

    const { category, previewId, sortDir, sku, status } = searchParams;
    if (searchParams.status === null) {
        searchParams.status = 'Access';
    }
    const currentStatus = searchParams.status;
    const fetchProducts = React.useCallback(async (page, size, status) => {
        const response = await getProducts(page, size);
        setProducts(response.data);

        setTotalElements(response.data.length);
    }, []);

    React.useEffect(() => {
        fetchProducts(page, rowsPerPage, currentStatus);
    }, [fetchProducts, page, rowsPerPage, currentStatus]);

    const handlePageChange = (_event, newPage) => {
        console.log('1');
        setPage(newPage);
        fetchProducts(newPage, rowsPerPage); // Fetch lại dữ liệu khi thay đổi trang
    };

    const handleRowsPerPageChange = (event) => {
        const newSize = parseInt(event.target.value, 10);
        setRowsPerPage(newSize);
        setPage(0); // Reset về trang đầu tiên
        fetchProducts(0, newSize); // Fetch lại dữ liệu khi thay đổi số hàng mỗi trang
    };

    return (
        <React.Fragment>
            <Box
                sx={{
                    maxWidth: 'var(--Content-maxWidth)',
                    m: 'var(--Content-margin)',
                    p: '20px',
                    width: 'var(--Content-width)',
                }}
            >
                <Stack spacing={4}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
                        <Box sx={{ flex: '1 1 auto' }}>
                            <Typography variant="h4">Sản phẩm </Typography>
                        </Box>
                        
                    </Stack>
                    <Card>
                        <ProductsFilters filters={{ category, sku, status }} sortDir={sortDir} />
                        <Divider />
                        <Box sx={{ overflowX: 'auto' }}>
                            <ProductsTable rows={products} />
                        </Box>
                        <Divider />
                        <ProductsPagination
                            count={totalElements} // Sử dụng tổng số phần tử từ BE
                            page={page}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            rowsPerPage={rowsPerPage}
                        />
                    </Card>
                </Stack>
            </Box>
            <ProductModal open={Boolean(previewId)} />
        </React.Fragment>
    );
}

// Sorting and filtering has to be done on the server.
