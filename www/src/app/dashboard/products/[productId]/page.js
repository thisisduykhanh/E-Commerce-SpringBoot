'use client';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import RouterLink from 'next/link';
import React from 'react';
import { ProductEditForm } from '@/components/dashboard/product/product-edit-form';
import { paths } from '@/paths';

import {getProduct} from '@/services/products';

import { useSearchParams } from 'next/navigation';


// The page should load the product from the API based on the productId param and pass it to the form component.
// For the sake of simplicity, we are just using a static product object.

export default function Page() {

    const searchParams = useSearchParams();

    const [product, setProduct] = React.useState(null);

   

    const fetchProduct = async (productId) => {
        try {
          const data = await getProduct(productId);
          console.log("Fetched product from API:", data); // <- THÊM LOG
          setProduct(data.data);
        } catch (error) {
          console.error("Failed to fetch product:", error);
        }
      }

React.useEffect(() => {
    const previewId = searchParams.get('previewId');
    console.log('productId:', previewId);

    if (previewId) {
      console.log('Calling fetchProduct with productId:', previewId);
      fetchProduct(previewId);
    } else {
      console.warn('previewId is null or undefined');
    }
  }, [searchParams]);

  if (!product) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Loading product data...</Typography>
      </Box>
    );
  }
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
                            href={paths.dashboard.products.list}
                            sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                            variant="subtitle2"
                        >
                            <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                            Products
                        </Link>
                    </div>
                    <div>
                        <Typography variant="h4">Edit product</Typography>
                    </div>
                </Stack>
                <ProductEditForm
                    product={product} // Ensure product is passed here
                />
            </Stack>
        </Box>
    );
}
