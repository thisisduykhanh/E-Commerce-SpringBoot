'use client';

import * as React from 'react';
import { logger } from '@/lib/default-logger';
import StarRateIcon from '@mui/icons-material/StarRate';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  Grid2,
  Typography
} from '@mui/material';
import axios from 'axios';

function FilterSupplier({ onFilterChange }) {
    const [filters, setFilters] = React.useState({
        locationExpanded: false,
        locations: [],
        ratings: [], // Lưu trữ các rating đã chọn
        certifications: {
            ISO: false,
            BSCI: false,
            BRC: false,
            FSC: false,
            IATF: false,
            SEDEX: false,
            HACCP: false,
            additional: false,
        },
        priceRange: [0, 1000000],
        verified: false,
        productTypeId: 1, // Giả sử giá trị cho productTypeId là 1
        isProduct: true, // Đánh dấu là sản phẩm
    });

    // Hàm menu khu vực
    const handleLocationToggle = () => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            locationExpanded: !prevFilters.locationExpanded, // Đảo ngược trạng thái mở/đóng
        }));
    };

    // Hàm xử lý khu vực
    const handleLocationChange = (event) => {
        const { name, checked } = event.target;
        setFilters((prevFilters) => {
            const updatedLocations = checked
                ? [...prevFilters.locations, name]
                : prevFilters.locations.filter((location) => location !== name);

            // Cập nhật ngay sau khi thay đổi
            onFilterChange({ locations: updatedLocations });
            return { ...prevFilters, locations: updatedLocations };
        });
    };




    const handleCertificationChange = (event) => {
        const { name, checked } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            certifications: {
                ...prevFilters.certifications,
                [name]: checked,
            },
        }));
    };

    // Hàm xử lý thay đổi bộ lọc
    const handleFilterChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value,
        }));
        onFilterChange({ [name]: type === 'checkbox' ? checked : value });
    };

    // Hàm xử lý thay đổi checkbox của rating
    const handleRatingChange = (event, star) => {
        const { checked } = event.target;
        setFilters((prevFilters) => {
            const newRatings = checked
                ? [...prevFilters.ratings, star]
                : prevFilters.ratings.filter((rating) => rating !== star);

            // Cập nhật ngay sau khi thay đổi
            onFilterChange({ ratings: newRatings });
            return { ...prevFilters, ratings: newRatings };
        });
    };

    // Hàm gọi API để tìm kiếm sản phẩm hoặc nhà cung cấp
    const fetchFilteredData = async () => {
        try {
            const params = {
                productTypeId: filters.productTypeId,
                minPrice: filters.priceRange[0],
                maxPrice: filters.priceRange[1],
                page: 0, // Ví dụ: trang 0
                size: 5, // Số lượng kết quả trên mỗi trang
                isProduct: filters.isProduct,
            };

            // Nếu bạn cần tìm kiếm theo supplierId
            if (filters.locations.length > 0) {
                params.supplierId = filters.locations.join(','); // Thêm supplierId vào tham số nếu cần
            }

            if (filters.ratings.length > 0) {
                params.ratings = filters.ratings.join(','); // Thêm ratings vào tham số nếu cần
            }

            // Gọi API với tham số đã xây dựng
            const response = await axios.get('http://localhost:8085/api/v1/products', { params });

            // Xử lý kết quả trả về từ API
            logger.debug(response.data); // Ví dụ: Bạn có thể cập nhật dữ liệu vào state ở đây

            // Cập nhật dữ liệu sản phẩm cho component
            // onFilterChange({ products: response.data }); // Giả sử bạn cần cập nhật dữ liệu cho component cha
        } catch (error) {
            logger.error('Lỗi khi gọi API:', error);
        }
    };

    // biome-ignore lint/correctness/useExhaustiveDependencies: Prevent infinite loop
    React.useEffect(() => {
        fetchFilteredData(); // Gọi API khi component render hoặc khi bộ lọc thay đổi
    }, [filters]);

    return (
        <Box width="100%" padding={2} boxShadow={2} borderRadius={2}>
            <Grid2 container direction="column" spacing={2}>
              <Grid2 item>
                    <Typography fontSize={18} fontWeight="bold" color="#00A6B7">
                        Sắp xếp theo giá
                    </Typography>
                    <FormControl fullWidth size="small" sx={{ marginTop: 2 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.priceSort === 'asc'}
                                    onChange={(e) => setFilters({ ...filters, priceSort: e.target.checked ? 'asc' : 'desc' })}
                                    name="priceSort"
                                />
                            }
                            label="Giá từ thấp đến cao"
                            sx={{ color: '#1a1a1a' }}
                        />
                    </FormControl>
                    <FormControl fullWidth size="small" sx={{ marginTop: 2 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.priceSort === 'desc'}
                                    onChange={(e) => setFilters({ ...filters, priceSort: e.target.checked ? 'desc' : 'asc' })}
                                    name="priceSort"
                                />
                            }
                            label="Giá từ cao đến thấp"
                            sx={{ color: '#1a1a1a' }}
                        />
                    </FormControl>
                </Grid2>
                

                {/*Đánh giá */}
                <Grid2 item xs={12}>
                    <Typography fontSize={18} fontWeight="bold" sx={{ color: '#00A6B7' }}>
                        Đánh giá sao
                    </Typography>
                </Grid2>
                {/* Các checkbox cho các sao đánh giá */}
                <Grid2 container direction="column" padding={2} spacing={1}>
                    {[5, 4, 3, 2, 1].map((star) => (
                        <Grid2 item key={star}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={filters.ratings.includes(star)}
                                        onChange={(e) => handleRatingChange(e, star)}
                                        name={`rating-${star}`}
                                    />
                                }
                                label={Array.from({ length: star }, (index) => (
                                    <StarRateIcon
                                        key={index}
                                        sx={{
                                            color: filters.ratings.includes(star) ? '#FFD700' : '#FFD700',
                                        }}
                                    />
                                ))}
                            />
                        </Grid2>
                    ))}
                </Grid2>

                <Grid2 item xs={12} display="flex" justifyContent="center">
                    <Button
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(180deg, #00A6B7 0%, #00A6B7 100%)',
                            borderRadius: '20px',
                            width: '200px',
                            fontWeight: 'bold',
                            color: 'white',
                            '&:hover': {
                                background: 'linear-gradient(180deg, #00A6B7 0%, #00A6B7 100%)',
                            },
                        }}
                    >
                        Chọn
                    </Button>
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default FilterSupplier;