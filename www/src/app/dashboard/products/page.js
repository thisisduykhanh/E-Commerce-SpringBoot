'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import RouterLink from 'next/link';
import * as React from 'react';

import { ProductModal } from '@/components/dashboard/product/product-modal';
import { ProductsFilters } from '@/components/dashboard/product/products-filters';
import { ProductsPagination } from '@/components/dashboard/product/products-pagination';
import { ProductsTable } from '@/components/dashboard/product/products-table';
// import { config } from '@/config';
import { paths } from '@/paths';
import { getProduct } from '@/services/admin';
import { getProducts } from '@/services/products';

// export const metadata = { title: `List | Products | Dashboard | ${config.site.name}` };

// biome-ignore lint/correctness/noUnusedVariables: test case
// const products = [
//   {
//     id: 'PRD-005',
//     name: 'Soja & Co. Eucalyptus',
//     image: '/assets/product-5.png',
//     category: 'Skincare',
//     type: 'physical',
//     quantity: 10,
//     currency: 'USD',
//     price: 65.99,
//     sku: '592_LDKDI',
//     status: 'draft',
//     createdAt: dayjs().subtract(23, 'minute').toDate(),
//   },
//   {
//     id: 'PRD-004',
//     name: 'Necessaire Body Lotion',
//     image: '/assets/product-4.png',
//     category: 'Skincare',
//     type: 'physical',
//     quantity: 5,
//     currency: 'USD',
//     price: 17.99,
//     sku: '321_UWEAJT',
//     status: 'published',
//     createdAt: dayjs().subtract(5, 'minute').subtract(1, 'hour').toDate(),
//   },
//   {
//     id: 'PRD-003',
//     name: 'Ritual of Sakura',
//     image: '/assets/product-3.png',
//     category: 'Skincare',
//     type: 'physical',
//     quantity: 8,
//     currency: 'USD',
//     price: 155,
//     sku: '211_QFEXJO',
//     status: 'draft',
//     createdAt: dayjs().subtract(43, 'minute').subtract(3, 'hour').toDate(),
//   },
//   {
//     id: 'PRD-002',
//     name: 'Lancome Rouge',
//     image: '/assets/product-2.png',
//     category: 'Makeup',
//     type: 'physical',
//     quantity: 0,
//     currency: 'USD',
//     price: 95,
//     sku: '978_UBFGJC',
//     status: 'published',
//     createdAt: dayjs().subtract(15, 'minute').subtract(4, 'hour').toDate(),
//   },
//   {
//     id: 'PRD-001',
//     name: 'Erbology Aloe Vera',
//     image: '/assets/product-1.png',
//     category: 'Healthcare',
//     type: 'physical',
//     quantity: 10,
//     currency: 'USD',
//     price: 24,
//     sku: '401_1BBXBK',
//     status: 'published',
//     createdAt: dayjs().subtract(39, 'minute').subtract(7, 'hour').toDate(),
//   },
// ];

export default function Page({ searchParams }) {
    const [products, setProducts] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2);
    const [totalElements, setTotalElements] = React.useState(0); // Thêm state cho tổng số phần tử

    const { category, previewId, sortDir, sku, status } = searchParams;
    if (searchParams.status == null) {
        searchParams.status = 'Access';
    }
    const currentStatus = searchParams.status;
    const fetchProducts = React.useCallback(async (page, size, status) => {
        const response = await getProducts(status, page, size);
        console.log('data: ', response.data);
        setProducts(response.data);
        setTotalElements(response.data.totalElements); // Cập nhật tổng số phần tử
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
