'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

import ProductCards from '@/components/user/social/products/product-cards';
import { logger } from '@/lib/default-logger';
import * as React from 'react';

export default function Page({ params }) {
    const [products, setProducts] = React.useState([]);
    const supplierId = params?.id || 1;
    const fetchProductsBySupplier = React.useCallback(async () => {
        const response = await fetch(`http://localhost:8085/api/v1/products?supplierId=${supplierId}&isProduct=true&minPrice=0`);
        if (response.ok) {
            const fetchedProducts = await response.json();
            setProducts(fetchedProducts.data.content);
        } else {
            logger.error('Failed to fetch products:', response.status);
        }
    }, [supplierId]);

    React.useEffect(() => {
        fetchProductsBySupplier();
    }, [fetchProductsBySupplier]);
    return (
        <div>
            <Card sx={{ backgroundColor: 'white', color: 'black' ,padding:2}}>
                <CardHeader color="#1a1a1a" title="Sản phẩm" />
                <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.1)'}}/>
                <Input
                    fullWidth
                    placeholder="Tìm kiếm sản phẩm"
                    startAdornment={
                        <InputAdornment  position="start">
                            <MagnifyingGlassIcon color="black" />
                        </InputAdornment>
                    }
                    sx={{ px: 3, py: 2 }}
                />
                <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.1)'}} />
                <Box sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                        {products.map((product) => (
                            <Grid item xs={12} sm={6} md={2.4} key={product.id}>
                                <ProductCards product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Card>
        </div>
    );
}
