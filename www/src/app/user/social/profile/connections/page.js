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
import axios from 'axios';
import * as React from 'react';

export default function Page() {
    const [products, setProducts] = React.useState([]);
    const [_loading, setLoading] = React.useState(true);
    const [_error, setError] = React.useState(null);

    const fetchProducts = React.useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await axios.get('http://localhost:8085/api/v1/products?supplierId=1', {
                params: {
                    page: 0,
                    size: 999999,
                    isProduct: true,
                },
            });
            const productsData = data?.data?.content || [];
            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <div>
            <Card>
                <CardHeader title="Connections" />
                <Divider />
                <Input
                    fullWidth={true}
                    placeholder="Search connections"
                    startAdornment={
                        <InputAdornment position="start">
                            <MagnifyingGlassIcon />
                        </InputAdornment>
                    }
                    sx={{ px: 3, py: 2 }}
                />
                <Divider />
                <Box sx={{ p: 3 }}>
                    <Grid container={true} spacing={3} xs={12} sm={12} md={12}>
                        <ProductCards products={products} />
                    </Grid>
                </Box>
            </Card>
        </div>
    );
}
