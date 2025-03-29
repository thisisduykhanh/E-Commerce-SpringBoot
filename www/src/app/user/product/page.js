'use client';

import ProductList from '@/components/Product/ProductList';
import FilterSupplier from '@/components/Supplier/FilterSupplier';
import { logger } from '@/lib/default-logger';
import apiClient from '@/services/ApiClient';
import CloseIcon from '@mui/icons-material/Close';
import { Box, CircularProgress, Grid2 as Grid, IconButton, Modal } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';

const useStyles = makeStyles(() => ({
    left: {
        width: '350px',
    },
    right: {
        flex: '1 1 0',
    },
    loader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    modalContent: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalImage: {
        maxWidth: '90%',
        maxHeight: '90%',
    },
}));

function Product() {
    const classes = useStyles();
    const [products, setProducts] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);

    const [openModal, setOpenModal] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState('');
    const [filters, setFilters] = React.useState({
        // productCategory: '',
        address: '',
        ratings: [],
        priceRange: { min: 0, max: null },
        supplierId: null,
    });
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await apiClient.get('/products', {
                    params: {
                        isProduct: true,
                        supplierId: filters.supplierId,
                        productCategory: filters.productCategory,
                        address: filters.address,
                        minPrice: filters.priceRange.min,
                        maxPrice: filters.priceRange.max,
                        page: currentPage - 1,
                        size: 12,
                    },
                });
                const productsData = data?.content || [];
                setProducts(productsData);
            } catch (err) {
                logger.error('Error fetching data from API:', err);
                setError('Failed to load products');
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters, currentPage]);

    const handleFilterChange = (newFilter) => {
        setFilters((prevFilter) => ({
            ...prevFilter,
            ...newFilter,
        }));
        setCurrentPage(1);
    };

    const handlePageChange = (_event, pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleImageClick = (imageUrl) => {
        if (imageUrl) {
            setSelectedImage(imageUrl);
            setOpenModal(true);
        } else {
            logger.error('No image available for this product');
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedImage('');
    };

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            {loading ? (
                <Box className={classes.loader}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                    <h3>{error}</h3>
                </Box>
            ) : (
                <>
                    {products.length === 0 ? (
                        <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                            <h3>No products found</h3>
                        </Box>
                    ) : (
                        <>
                            <Grid container={true} spacing={2}>
                                <Grid item={true} className={classes.left} size={4}>
                                    <FilterSupplier onFilterChange={handleFilterChange} />
                                </Grid>

                                <Grid item={true} className={classes.right} size={8}>
                                    <ProductList
                                        products={products}
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                        onImageClick={handleImageClick}
                                        filters={filters}
                                    />
                                </Grid>
                            </Grid>

                            <Modal open={openModal} onClose={handleCloseModal}>
                                <Box className={classes.modalContent}>
                                    <IconButton
                                        onClick={handleCloseModal}
                                        sx={{ position: 'absolute', top: 20, right: 20, color: 'white' }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <img src={selectedImage} alt="Expanded" className={classes.modalImage} />
                                </Box>
                            </Modal>
                        </>
                    )}
                </>
            )}
        </Box>
    );
}

export default Product;
