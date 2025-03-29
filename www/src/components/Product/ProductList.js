import apiClient from '@/services/ApiClient';
import PeopleIcon from '@mui/icons-material/People';
import { Avatar, Box, CircularProgress, Grid2 as Grid, Pagination, Rating, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import * as React from 'react';

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

// const addressStyles = {
//     fontSize: { xs: '0.2rem', sm: '0.3rem', md: '0.4rem', lg: '0.6rem' },
//     overflow: 'hidden',
//     whiteSpace: 'nowrap',
//     textOverflow: 'ellipsis',
//     maxWidth: '100%',
// };

const followerTextStyles = {
    fontSize: { xs: '0.5rem', sm: '0.5rem', md: '0.6rem' },
    color: 'gray',
};

function ProductList() {
    const classes = useStyles();
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(null);
    const productsPerPage = 12;
    const [filters] = React.useState({
        productCategory: null,
        address: null,
        priceRange: { min: null, max: null },
    });
const formatPrice = (priceString) => {
    // Sử dụng biểu thức chính quy để trích xuất giá trị trước .00
    const matches = priceString.match(/(\d+)\.00/g);

    if (matches) {
      // Trích xuất giá trị trước .00
      const priceBeforeDot = matches.map(item => item.replace('.00', ''));

      // Định dạng tiền tệ (VNĐ) mà không cần "VNĐ"
      const formattedPrices = priceBeforeDot.map(amount => {
        const formattedAmount = Number(amount).toLocaleString('vi-VN');
        return `${formattedAmount}`;
      });

      return formattedPrices;
    }
      return [];

  };
  const price = products.length > 0 ? products[0].price : '0.00';
  const formattedPrices = formatPrice(price);

    // Hàm gọi API để lấy danh sách sản phẩm
    React.useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await apiClient.get('/products', {
                    params: {
                        isProduct: true,
                        productCategory: filters.productCategory,
                        address: filters.address,
                        minPrice: filters.priceRange.min,
                        maxPrice: filters.priceRange.max,
                        page: currentPage - 1,
                        size: productsPerPage,
                    },
                });
                const isValidData = response.data.content;
                if (!isValidData) {
                    setError('Dữ liệu trả về không hợp lệ.');
                    setProducts([]);
                    setTotalPages(0);
                    return;
                }
                setProducts(response.data.content);
                setTotalPages(response.data.totalPages);
                setError(null);
            } catch (err) {
                setError('Đã xảy ra lỗi khi tải dữ liệu.', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters, currentPage]);

    // Hàm xử lý thay đổi trang
    const handlePageChange = (_event, pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Nếu đang tải, hiển thị CircularProgress
    if (loading) {
        return (
            <Box className={classes.loader}>
                <CircularProgress />
            </Box>
        );
    }

    // Nếu có lỗi khi tải, hiển thị thông báo lỗi
    if (error) {
        return (
            <Box width="100%" textAlign="center" mt={4}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    // Nếu không có sản phẩm nào
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
                {products.map((product) => (
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
                            {/* Ảnh sản phẩm */}
                            <Link href={`/user/product-detail/${product.id}`} passHref>
                                <button
                                    type="button"
                                    style={{ border: 'none', background: 'none', padding: 0, height:'260px', width: '270px', }}
                                    aria-label="Expand image"
                                >
                                    <img
                                        src={product.listImage?.[0]?.url || '/default-image.jpg'}
                                        alt={product.nameProduct}
                                        className={classes.imageThumbnail}
                                        style={{height:'260px', width: '260px'}}
                                    />
                                </button>
                            </Link>
                            {/* Tên sản phẩm */}
                            <Box display="flex" justifyContent="space-between" width="260px" mt={1} minHeight={50}>
                                <Typography variant="subtitle1" fontWeight="bold" sx={{width: '260px'}}>
                                    {product.nameProduct || 'Tên sản phẩm không có'}
                                </Typography>
                            </Box>
                            {/* Đánh giá */}
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
                                    {formattedPrices.length > 0 ? (
                                      formattedPrices.map((formattedPrice, index) => (
                                        <span key={index}>
                                          {formattedPrice} {index < formattedPrices.length - 1 ? ' - ' : ' đ'}
                                        </span>
                                      ))
                                    ) : (
                                      <span>Không có giá trị hợp lệ.</span>
                                    )}
                                </Typography>
                            </Box>
                            {/* Logo công ty và thông tin công ty */}
                            <Box display="flex" alignItems="flex-start" sx={{ paddingY: '5px' }}>
                                <Avatar
                                    src={
                                        product.logo ||
                                        'https://res.cloudinary.com/dgts7tmnb/image/upload/v1735478087/photo_2024-12-29_20-12-26_kjerh5.jpg'
                                    }
                                    alt={product.nameSupplier || 'Không có tên nhà cung cấp'}
                                    sx={avatarStyles}
                                />
                                <Box>
                                    <Typography variant="subtitle1" sx={nameStyles}>
                                        {product.nameSupplier || 'Không có tên nhà cung cấp'}
                                    </Typography>
                                    <Box display="flex" alignItems="center">
                                        <PeopleIcon sx={{ fontSize: 15, color: 'gray', mr: 1 }} />
                                        <Typography variant="body2" sx={followerTextStyles}>
                                            0 người theo dõi
                                        </Typography>
                                    </Box>
                                    {/* <Typography variant="subtitle4" sx={addressStyles}>
                                        {product.address || 'Không có địa chỉ nhà cung cấp'}
                                    </Typography> */}
                                </Box>
                                {/* <Box display="flex" flexDirection="right" sx={{ marginLeft: 'auto' }}>
                                    <StarRateIcon sx={starIconStyles} />
                                </Box> */}
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {/* Phân trang */}
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

export default ProductList;
