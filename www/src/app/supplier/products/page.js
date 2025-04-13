'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import RouterLink from 'next/link';


import { ProductModal } from '@/components/dashboard/product/product-modal';
import { ProductsFilters } from '@/components/dashboard/product/products-filters';
import { ProductsPagination } from '@/components/dashboard/product/products-pagination';
import { ProductsTable } from '@/components/dashboard/product/products-table';
// import { config } from '@/config';
import { paths } from '@/paths';
import { getProduct } from '@/services/supplier';


export default function Page({ searchParams }) {
    const [products, setProducts] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2);

    const { category, previewId, sortDir, sku, status } = searchParams;
    if (searchParams.status == null) {
        searchParams.status = 'Access';
    }

    const [totalElementsByStatus, setTotalElementsByStatus] = React.useState({
        Pending: 0,
        Access: 0,
    });

    const fetchProductsByStatus = async () => {
        const statuses = ['Pending', 'Access'];
        const results = {};

        for (const status of statuses) {
            try {
                const response = await getProduct(status, 0, rowsPerPage);
                results[status] = response.data.totalElements || 0;
            } catch (error) {
                console.error(`Error fetching products for status ${status}:`, error);
                results[status] = 0;
            }
        }

        setTotalElementsByStatus(results);
    };

    React.useEffect(() => {
        fetchProductsByStatus();
    }, [rowsPerPage]);

    const totalElements = totalElementsByStatus[status] || 0;

    const currentStatus = searchParams.status;
    const fetchProducts = React.useCallback(async (page, size, status) => {
        const response = await getProduct(status, page, size);
        setProducts(response.data.content);
    }, []);

    React.useEffect(() => {
        fetchProducts(page, rowsPerPage, currentStatus);
    }, [fetchProducts, page, rowsPerPage, currentStatus]);

    const handlePageChange = (_event, newPage) => {
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
                    p: 'var(--Content-padding)',
                    width: 'var(--Content-width)',
                }}
            >
                <Stack spacing={4}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
                        <Box sx={{ flex: '1 1 auto' }}>
                            <Typography variant="h4">Sản phẩm</Typography>
                        </Box>
                        <div>
                            <Button
                                component={RouterLink}
                                href={paths.supplier.products.create}
                                startIcon={<PlusIcon />}
                                variant="contained"
                            >
                                Thêm
                            </Button>
                        </div>
                    </Stack>
                    <Card>
                        <ProductsFilters filters={{ category, sku, status, totalElementsByStatus }} sortDir={sortDir} />
                        <Divider />
                        <Box sx={{ overflowX: 'auto' }}>
                            <ProductsTable rows={products} />
                        </Box>
                        <Divider />
                        <ProductsPagination
                            count={totalElements} // Sử dụng tổng số phần tử từ BE
                            page={page} 
                            rowsPerPage={rowsPerPage}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                        />
                    </Card>
                </Stack>
            </Box>
            <ProductModal open={Boolean(previewId)} />
        </React.Fragment>
    );
}

// Sorting and filtering has to be done on the server.

// function applySort(rows, _sortDir) {
//     return rows;
// }

// function applyFilters(rows, { category, status, sku }) {
//     return rows.filter((item) => {
//         if (category && item.category !== category) {
//             return false;
//         }
//         if (status && item.status !== status) {
//             return false;
//         }
//         if (sku && !item.sku?.toLowerCase().includes(sku.toLowerCase())) {
//             return false;
//         }
//         return true;
//     });
// }
