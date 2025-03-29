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

// export const metadata = { title: `List | Products | Dashboard | ${config.site.name}` };

export default function Page({ searchParams }) {
    const [products, setProducts] = React.useState([]);
    const { category, previewId, sortDir, sku, status } = searchParams;
    const orderedProducts = applySort(products, sortDir);
    const filteredProducts = applyFilters(orderedProducts, { category, sku, status });

    const fetchProducts = React.useCallback(async () => {
        const response = await fetch('http://localhost:8085/api/v1/products?page=0&size=10&isProduct=true');
        const data = await response.json();
        setProducts(data.data.content);
    }, []);
    React.useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

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
                                href={paths.dashboard.products.create}
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
                            <ProductsTable rows={filteredProducts} />
                        </Box>
                        <Divider />
                        <ProductsPagination count={filteredProducts.length} page={0} />
                    </Card>
                </Stack>
            </Box>
            <ProductModal open={Boolean(previewId)} />
        </React.Fragment>
    );
}

// Sorting and filtering has to be done on the server.

function applySort(row, __sortDir) {
    //   return row.sort((a, b) => {
    //     if (sortDir === 'asc') {
    //       return a.createdAt.getTime() - b.createdAt.getTime();
    //     }

    //     return b.createdAt.getTime() - a.createdAt.getTime();
    //   });
    return row;
}

function applyFilters(row, { category, status, sku }) {
    return row.filter((item) => {
        if (category) {
            if (item.category !== category) {
                return false;
            }
        }

        if (status) {
            if (item.status !== status) {
                return false;
            }
        }

        if (sku) {
            if (!item.sku?.toLowerCase().includes(sku.toLowerCase())) {
                return false;
            }
        }

        return true;
    });
}
