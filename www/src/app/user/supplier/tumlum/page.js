'use client';

import Supplier from '@/components/Supplier/Supplier';
import { Box, Button, CircularProgress, Grid2 as Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Product from '../../product/page';

// Tham số id sẽ được Next.js truyền vào như một phần của props
function SupplierPage({ params }) {
    const { id } = params; // Lấy tham số id từ params

    const [supplier, setSupplier] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!id) return;

        const fetchSupplier = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:8085/api/v1/supplier?id=${id}`);
                if (response.data && response.data.success) {
                    setSupplier(response.data.data);
                } else {
                    setError('Không tìm thấy dữ liệu nhà cung cấp.');
                }
                // biome-ignore lint/correctness/noUnusedVariables: <explanation>
            } catch (err) {
                setError('Đã xảy ra lỗi khi tải dữ liệu.');
            } finally {
                setLoading(false);
            }
        };

        fetchSupplier();
    }, [id]); // Chạy lại khi id thay đổi

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `http://localhost:8085/api/v1/products?supplierId=${id}&isProduct=true`
                );
                if (response.data && response.data.success) {
                    setProduct(response.data.data.content || []);
                } else {
                    setError('Không tìm thấy dữ liệu nhà cung cấp.');
                }
                // biome-ignore lint/correctness/noUnusedVariables: <explanation>
            } catch (err) {
                setError('Đã xảy ra lỗi khi tải dữ liệu.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]); // Chạy lại khi id thay đổi

    if (!isMounted) {
        return null; // or a loading spinner
    }

    if (loading) {
        return <CircularProgress sx={{ display: 'block', margin: 'auto', padding: 4 }} />;
    }

    if (error) {
        return <Typography color="error" sx={{ textAlign: 'center' }}>{`Lỗi: ${error}`}</Typography>;
    }

    if (!supplier) {
        return <Typography sx={{ textAlign: 'center' }}>Không có dữ liệu nhà cung cấp.</Typography>;
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Grid container={true} spacing={2}>
                <Grid item={true} size={{ xs: 12, md: 4 }}>
                    {/* Cột trái - Thông tin nhà cung cấp */}
                    <Supplier id={id} supplier={supplier} />
                </Grid>

                <Grid item={true} size={{ xs: 12, md: 8 }}>
                    <Grid container={true} spacing={9}>
                        {/* Nhóm bên trái */}
                        <Grid item={true} size={{ xs: 12, md: 6 }}>
                            <Typography variant="body2" sx={{ marginTop: 2 }}>
                                <strong>Tổng sản phẩm:</strong> {supplier.totalProducts || '5'}
                            </Typography>
                            <Typography variant="body2" sx={{ marginTop: 4 }}>
                                <strong>Người theo dõi:</strong> {supplier.followers || 'Chưa có người theo dõi'}
                            </Typography>
                            {/* <Typography variant="body2" sx={{ marginTop: 4 }}>
                                <strong>Ngày tạo:</strong> {supplier.createdAt || 'Chưa có ngày tạo'}
                            </Typography> */}
                        </Grid>

                        {/* Nhóm bên phải */}
                        <Grid item={true} size={{ xs: 12, md: 6 }}>
                            <Typography variant="body2" sx={{ marginTop: 2 }}>
                                <strong>Địa chỉ:</strong> {supplier.address || 'Không có địa chỉ'}
                            </Typography>
                            <Typography variant="body2" sx={{ marginTop: 4 }}>
                                <strong>Đánh giá:</strong> {supplier.rating || 'Chưa có đánh giá'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* Hàng 2: Danh sách sản phẩm */}
            <Grid container={true} spacing={4} sx={{ marginTop: 3 }}>
                <Grid item={true} size={{ xs: 12 }}>
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: 'bold', fontSize: '2.5rem', color: '#00A6B7', marginBottom: 2 }}
                    >
                        Danh sách sản phẩm
                    </Typography>
                </Grid>
                {Array.isArray(product) && product.length > 0 ? (
                    product.map((prod) => (
                        <Grid item={true} xs={12} sm={6} md={4} key={prod.id}>
                            <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}>
                                {/* Hình ảnh sản phẩm */}
                                <Box sx={{ position: 'relative', height: 250, width: '100%' }}>
                                    <img
                                        src={prod.listImage[0]?.url}
                                        alt={prod.nameProduct}
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '8px',
                                        }}
                                    />
                                </Box>

                                {/* Tên sản phẩm */}
                                <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold', color: '#333' }}>
                                    {prod.nameProduct}
                                </Typography>

                                {/* Mô tả sản phẩm */}
                                <Typography variant="body2" sx={{ color: '#666', marginTop: 1 }}>
                                    {prod.description}
                                </Typography>

                                {/* Giá sản phẩm */}
                                <Typography variant="h6" sx={{ color: '#000', marginTop: 2, fontWeight: 'bold' }}>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        prod.price
                                    )}
                                </Typography>

                                {/* Giá theo số lượng */}
                                <Box sx={{ marginTop: 2 }}>
                                    {prod.officialPriceDTO?.map((priceRange) => (
                                        <Typography key={priceRange.id} variant="body2" sx={{ color: '#333' }}>
                                            Từ {priceRange.minQuantity} đến {priceRange.maxQuantity} sản phẩm:{' '}
                                            {new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(priceRange.price)}
                                        </Typography>
                                    ))}
                                </Box>

                                {/* Nút mua sản phẩm */}
                                <Box sx={{ marginTop: 2 }}>
                                    <Button
                                        variant="contained"
                                        fullWidth={true}
                                        sx={{ background: 'linear-gradient(180deg, #00A6B7 0%, #00A6B7 100%)' }}
                                    >
                                        Mua ngay
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    ))
                ) : (
                    <Typography sx={{ textAlign: 'center', width: '100%' }}>Không có sản phẩm nào.</Typography>
                )}
            </Grid>
            <Grid
                sx={{
                    marginTop: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '2.5rem',
                        color: '#00A6B7',
                        marginBottom: 3,
                        textalign: 'center',
                        marginTop: '20px',
                    }}
                >
                    CÁC SẢN PHẨM KHÁC
                </Typography>
                {isMounted && <Product product={Product} />}
            </Grid>
        </Box>
    );
}

export default SupplierPage;
