'use client';

import ProductList from '@/components/Product/ProductList';
import FilterSupplier from '@/components/Supplier/FilterSupplier';
import { logger } from '@/lib/default-logger';
import CloseIcon from '@mui/icons-material/Close';
import { Box, CircularProgress, Grid2 as Grid, IconButton, Modal, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getProducts } from "@/services/products";

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

export default function Search() {
  const classes = useStyles();
  const [products, setProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState('');
  const [filters, setFilters] = React.useState({
    address: '',
    ratings: [],
    priceRange: { min: 0, max: null },
    supplierId: null,
  });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('query') || '';

  React.useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await getProducts(0, 100); // Fetch a large number of products
        logger.debug("Fetched products:", data);
        setProducts(data || []);
      } catch (err) {
        logger.error('Error fetching data from API:', err);
        setError('Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  React.useEffect(() => {
    // Client-side filtering based on search query
    if (query && products.length > 0) {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = products.filter((product) =>
        product.productName?.toLowerCase().includes(lowerCaseQuery) ||
        product.description?.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [query, products]);

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
          <Typography variant="h6">{error}</Typography>
        </Box>
      ) : (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Kết quả tìm kiếm cho: "{query || 'Tất cả sản phẩm'}"
          </Typography>
          {filteredProducts.length === 0 ? (
            <Box sx={{ textAlign: 'center', marginTop: 4 }}>
              <Typography variant="h6">Không tìm thấy sản phẩm nào</Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={2}>
                <Grid item className={classes.left} size={4}>
                  <FilterSupplier onFilterChange={handleFilterChange} />
                </Grid>
                <Grid item className={classes.right} size={8}>
                  <ProductList
                    products={filteredProducts}
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