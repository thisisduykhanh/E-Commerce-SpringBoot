"use client"
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

import { config } from '@/config';
import * as React from 'react';
import { paths } from '@/paths';
import { ProductEditForm } from '@/components/dashboard/product/product-edit-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchProduct } from '@/services/supplier';


// export const metadata = { title: `Details | Products | Dashboard | ${config.site.name}` };

// The page should load the product from the API based on the productId param and pass it to the form component.
// For the sake of simplicity, we are just using a static product object.
export default function Page() {
    const _router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('previewId');
    console.log('previewId:', id);

    const [productsDetail, setProductsDetail] = React.useState([]);

    const fetchProductsDetailAsync = React.useCallback(async () => {
        try {
            const response = await fetchProduct(id);
            console.log('data', response);
            setProductsDetail(response.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }, [id]);
    React.useEffect(() => {
        fetchProductsDetailAsync();
    }, []);
    return (
        <Box
            sx={{
                maxWidth: 'var(--Content-maxWidth)',
                m: 'var(--Content-margin)',
                p: 'var(--Content-padding)',
                width: 'var(--Content-width)',
            }}
        >
            <Stack spacing={4}>
                <Stack spacing={3}>
                    <div>
                        <Link
                            color="text.primary"
                            component={RouterLink}
                            href={paths.supplier.products.list}
                            sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                            variant="subtitle2"
                        >
                            <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                            Quay lại
                        </Link>
                    </div>
                    <div>
                        <Typography variant="h4">Sửa sản phẩm</Typography>
                    </div>
                </Stack>
                <ProductEditForm product={{ productsDetail }} />
            </Stack>
        </Box>
    );
}
