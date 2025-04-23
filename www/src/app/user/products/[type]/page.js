'use client';

import ProductList from '@/components/Product/ProductList';
import FilterSupplier from '@/components/Supplier/FilterSupplier';
import { logger } from '@/lib/default-logger';
import CloseIcon from '@mui/icons-material/Close';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Box, Button, CircularProgress, Grid2 as Grid, IconButton, Modal, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { getProductsByType } from '@/services/products';

// Ánh xạ type sang tên danh mục
const categoryMap = {
  1: 'Laptop',
  2: 'Máy tính bảng',
  3: 'Điện thoại',
  4: 'Tai nghe',
  5: 'Đồng hồ thông minh',
};

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
  title: {
    marginBottom: '18px',
    padding: '12px 24px',
    color: 'black',
    borderRadius: '8px',
    display: 'inline-block',
    textAlign: 'left',
  },
  noProductsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    textAlign: 'center',
    padding: '24px',
    borderRadius: '12px',
  },
  noProductsIcon: {
    fontSize: '64px',
    color: '#757575',
    marginBottom: '16px',
  },
  noProductsButton: {
    marginTop: '16px',
    padding: '12px 24px',
    fontSize: '16px',
  },
}));

export default function ProductsByTypePage({ params }) {
  const classes = useStyles();
  const router = useRouter();
  const { type } = params;
  const [products, setProducts] = React.useState([]);
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

  React.useEffect(() => {
    const fetchProducts = async () => {
      if (!type) return;
      setLoading(true);
      setError(null);
      try {
        const response = await getProductsByType(type, currentPage - 1, 12);
        const { data } = response;
        logger.debug('Products by type:', data);
        setProducts(data || []);
      } catch (err) {
        logger.error('Error fetching products by type:', err);
        setError('Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [type, filters, currentPage]);

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

  // Lấy tên danh mục từ type
  const categoryName = categoryMap[type] || 'Danh mục không xác định';

  return (
    <Box sx={{ flexGrow: 1, padding: 2, minHeight: '85vh' }}>
      {/* Tiêu đề danh mục */}
      <Typography variant="h4" className={classes.title}>
        Danh mục: {categoryName}
      </Typography>

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
            <Box className={classes.noProductsContainer}>
              <SearchOffIcon className={classes.noProductsIcon} />
              <Typography variant="h5" sx={{ marginBottom: '8px', color: '#424242' }}>
                Hiện tại chưa có mặt hàng trong danh mục {categoryName}
              </Typography>
              <Typography variant="body1" sx={{ color: '#757575', marginBottom: '16px' }}>
                Hãy thử tìm kiếm các sản phẩm khác nhé!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={classes.noProductsButton}
                onClick={() => router.push('/user/product')}
              >
                Xem tất cả sản phẩm
              </Button>
            </Box>
          ) : (
            <>
              <Grid container spacing={2}>
                <Grid item className={classes.left} size={4}>
                  <FilterSupplier onFilterChange={handleFilterChange} />
                </Grid>
                <Grid item className={classes.right} size={8}>
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