'use client';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleIcon from '@mui/icons-material/People';
import StarRateIcon from '@mui/icons-material/StarRate';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { Box, CircularProgress, Grid2 as Grid, Link as Link2, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import Link from 'next/link';
import * as React from 'react';

function SupplierLists() {
    const [suppliers, setSuppliers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0);
    const itemsPerPage = 10;

    React.useEffect(() => {
        const fetchSuppliers = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await axios.get('http://localhost:8085/api/v1/products?supplierId=2', {
                    params: {
                        page: currentPage - 1,
                        size: itemsPerPage,
                    },
                });

                const { content, totalPages, totalElements } = data.data || {};
                setSuppliers(content || []);
                setTotalPages(totalPages || Math.ceil(totalElements / itemsPerPage));
            } catch {
                setError('Đã xảy ra lỗi khi tải dữ liệu.');
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, [currentPage]);

    const handlePageChange = (_event, pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return <CircularProgress sx={{ display: 'block', margin: 'auto', padding: 4 }} />;
    }
    if (error) {
        return <Typography color="error" sx={{ textAlign: 'center' }}>{`Lỗi: ${error}`}</Typography>;
    }
    return (
        <Box size={{ xs: 12 }}>
            <Grid container={true} spacing={2} size={{ xs: 12 }}>
                {suppliers.length === 0 ? (
                    <Typography variant="h6" color="textSecondary" sx={{ margin: 'auto' }}>
                        Không có nhà cung cấp nào.
                    </Typography>
                ) : (
                    suppliers.map((supplier) => (
                        <Grid item={true} key={supplier.id} size={{ xs: 12 }}>
                            <Box
                                border={1}
                                borderColor="grey.300"
                                borderRadius={2}
                                padding={2}
                                display="flex"
                                flexDirection="column"
                                width="100%"
                            >
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box display="flex" alignItems="center" justifyContent="flex-start">
                                        <Box flexShrink={1} marginRight={1}>
                                            <img
                                                src={
                                                    supplier.image ||
                                                    'https://res.cloudinary.com/dgts7tmnb/image/upload/v1735478087/photo_2024-12-29_20-12-26_kjerh5.jpg'
                                                }
                                                alt={supplier.nameSupply}
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    objectFit: 'contain',
                                                }}
                                            />
                                        </Box>
                                        <Box>
                                            <Link2
                                                href={`/user/supplier/${supplier.id}`}
                                                passHref={true}
                                                style={{ textDecoration: 'none', color: 'black' }}
                                            >
                                                <Typography variant="h6" fontWeight="bold" fontSize="auto">
                                                    {supplier.nameSupply || 'Tên nhà cung cấp'}{' '}
                                                    {supplier.status ? (
                                                        <CheckCircleIcon
                                                            sx={{ fontSize: 20, color: '#008D91', marginLeft: 1 }}
                                                        />
                                                    ) : null}
                                                </Typography>
                                            </Link2>

                                            <Box display="flex" alignItems="center" marginTop={1}>
                                                <Box display="flex" alignItems="center" marginRight={2}>
                                                    <PeopleIcon sx={{ fontSize: 15, color: 'gray', marginRight: 1 }} />
                                                    <Typography variant="body2" fontSize="0.875rem">
                                                        {supplier.followers || '0'} người theo dõi
                                                    </Typography>
                                                </Box>
                                                <Box display="flex" alignItems="center">
                                                    <Typography variant="body2" fontSize="0.875rem" fontWeight="bold">
                                                        {supplier.reviews
                                                            ? `${supplier.reviews} đánh giá`
                                                            : 'Chưa có đánh giá'}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box display="flex" alignItems="center" justifyContent="flex-end">
                                        <Typography variant="body2" color="#1A1A1A" fontWeight="bold">
                                            {supplier.address || 'Không có địa chỉ'}
                                        </Typography>
                                        <StarRateIcon
                                            sx={{
                                                fontSize: 20,
                                                color: 'yellow',
                                                backgroundColor: 'red',
                                                borderRadius: '50%',
                                                padding: '4px',
                                                marginLeft: 1,
                                            }}
                                        />
                                    </Box>
                                </Box>

                                <Box display="flex" flexDirection="row" justifyContent="space-between" marginTop={2}>
                                    <Box width={{ xs: '100%', sm: '45%' }}>
                                        <Typography variant="body2">
                                            <h3 style={{ color: '#000000' }}>Danh mục sản phẩm:</h3>
                                            <ul style={{ color: '#000000' }}>
                                                {supplier.nameProductType?.map((productType, index) =>
                                                    productType ? <li key={index}>{productType}</li> : null
                                                )}
                                            </ul>
                                        </Typography>
                                        <Typography variant="body2" marginTop={1}>
                                            <h3 style={{ color: '#000000' }}>Dịch vụ:</h3>
                                            <ul style={{ color: '#000000' }}>
                                                {supplier.nameDelivery?.map((deliveryMethod, index) => (
                                                    <li key={index}>{deliveryMethod}</li>
                                                ))}
                                            </ul>
                                        </Typography>
                                    </Box>

                                    <Box sx={{ position: 'relative', width: 'calc(6 / 12 * 100%)' }}>
                                        <img
                                            src="/assets/background.png"
                                            alt="Giảm giá"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: '3%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                textAlign: 'center',
                                                color: '#1A1A1A',
                                                zIndex: 1,
                                                padding: '0 10px',
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                fontWeight="bold"
                                                fontSize={{ xs: '1.2rem', sm: '1.5rem', md: '1.8rem', lg: '2rem' }}
                                            >
                                                SUMMER SALE
                                            </Typography>
                                            <Typography
                                                variant="h3"
                                                color="#1A1A1A"
                                                fontWeight="bold"
                                                fontSize={{ xs: '1.5rem', sm: '3rem', md: '4rem', lg: '5rem' }}
                                                marginTop={1}
                                                sx={{
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                75% OFF
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                marginTop={2}
                                                fontSize={{ xs: '1rem', sm: '1.2rem', md: '1.4rem', lg: '1.6rem' }}
                                            >
                                                Only Fruit & Vegetable
                                            </Typography>
                                            <Link
                                                href={`/user/supplier/${supplier.id}`}
                                                passHref={true}
                                                style={{
                                                    fontSize: '1.5rem',
                                                    color: '#1a1a1a',
                                                    fontWeight: 'bold',
                                                    textDecoration: 'underline',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                Shop Now
                                                <TrendingFlatIcon sx={{ fontSize: 30, marginLeft: 1 }} />
                                            </Link>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    ))
                )}
            </Grid>

            <Box display="flex" justifyContent="center" marginTop={2}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            borderRadius: '50%',
                            backgroundColor: '#F2F2F2',
                            color: 'gray',
                            '&:hover': {
                                backgroundColor: '#008D91',
                                color: 'white',
                            },
                            '&.Mui-selected': {
                                backgroundColor: '#008D91',
                                color: 'white',
                            },
                        },
                    }}
                />
            </Box>
        </Box>
    );
}

export default SupplierLists;
