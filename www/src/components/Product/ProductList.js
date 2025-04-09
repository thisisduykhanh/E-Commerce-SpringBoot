import apiClient from '@/services/ApiClient';
import PeopleIcon from '@mui/icons-material/People';
import {
  Avatar,
  Box,
  CircularProgress,
  Grid2 as Grid,
  Pagination,
  Rating,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import * as React from 'react';

/**
 * @param {Object} props
 * @param {Array<Object>} props.products - List of products to display.
 * @param {number} props.currentPage - Current page number.
 * @param {function} props.onPageChange - Callback for page change.
 * @param {function} props.onImageClick - Callback when image is clicked.
 * @param {Object} props.filters - Filter object used for search.
 */
function ProductList({ products, currentPage, onPageChange, onImageClick, filters }) {
  const classes = useStyles();



  if (!products) {
    return (
      <Box className={classes.loader}>
        <CircularProgress />
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box width="100%" textAlign="center" mt={4}>
        <Typography variant="h6" color="textSecondary">
          Không có sản phẩm nào được tìm thấy.
        </Typography>
      </Box>
    );
  }

  return (
    <Box width="100%">
      <Grid container spacing={2}>
        {products.map((product) => {
          const formattedPrices = Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(product.price);
          return (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Box
                border={1}
                borderColor="grey.300"
                borderRadius={2}
                padding={1}
                display="flex"
                flexDirection="column"
                maxWidth={280}
                minHeight={367}
              >
                <Link href={`/user/product-detail/${product.id}`} passHref>
                  <button
                    type="button"
                    style={{ border: 'none', background: 'none', padding: 0, height: '260px', width: '270px' }}
                    onClick={() => onImageClick?.(product)}
                  >
                    <img
                      src={product.images?.[0]?.url || '/default-image.jpg'}
                      alt={product.productName}
                      className={classes.imageThumbnail}
                      style={{ height: '260px', width: '260px' }}
                    />
                  </button>
                </Link>

                <Box display="flex" justifyContent="space-between" width="260px" mt={1} minHeight={50}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ width: '260px' }}>
                    {product.productName || 'Tên sản phẩm không có'}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="left" width="100%" mt={1}>
                  <Rating
                    value={product.rating || 5}
                    readOnly
                    precision={0.1}
                    size="small"
                    sx={{ marginRight: 1 }}
                  />
                </Box>

                <Box display="flex" justifyContent="space-between" width="100%" mt={1}>
                  <Typography variant="h6" sx={{ color: '#1a1a1a' }}>
                    {formattedPrices || 'Không có giá trị hợp lệ.'}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="flex-start" sx={{ paddingY: '5px' }}>
                  <Avatar
                    src={
                      product.logo ||
                      'https://res.cloudinary.com/dgts7tmnb/image/upload/v1735478087/photo_2024-12-29_20-12-26_kjerh5.jpg'
                    }
                    alt={product.supplierName || 'Không có tên nhà cung cấp'}
                    sx={avatarStyles}
                  />
                  <Box>
                    <Typography variant="subtitle1" sx={nameStyles}>
                      {product.supplierName || 'Không có tên nhà cung cấp'}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <PeopleIcon sx={{ fontSize: 15, color: 'gray', mr: 1 }} />
                      <Typography variant="body2" sx={followerTextStyles}>
                        0 người theo dõi
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={Math.ceil(products.length / 12)}
          page={currentPage}
          onChange={onPageChange}
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

const useStyles = makeStyles(() => ({
  imageThumbnail: {
    cursor: 'pointer',
    width: '100%',
    height: '151px',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
}));

const avatarStyles = {
  width: { xs: 20, sm: 24 },
  height: { xs: 20, sm: 24 },
  marginRight: 1,
};

const nameStyles = {
  fontSize: { xs: '0.7rem', sm: '0.9rem', md: '0.9rem', lg: '0.9rem' },
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
};

const followerTextStyles = {
  fontSize: { xs: '0.5rem', sm: '0.5rem', md: '0.6rem' },
  color: 'gray',
};

export default ProductList;
