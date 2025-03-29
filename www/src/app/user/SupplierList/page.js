'use client';

import FilterSupplier from '@/components/Supplier/FilterSupplier';
import SupplierLists from '@/components/Supplier/SupplierLists';
import { logger } from '@/lib/default-logger';
import { Box, Grid2 as Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import * as React from 'react';
import { useCallback, useMemo } from 'react';

const useStyles = makeStyles(() => ({
    left: {
        width: '300px',
    },
    right: {
        flex: '1 1 0',
    },
}));

function SupplierList() {
    const classes = useStyles();
    const [suppliers, setSuppliers] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0);

    const [_filters, setFilters] = React.useState({
        supplierId: '',
        minPrice: '',
        maxPrice: '',
        address: '',
        isProduct: true,
    });

    const filters = useMemo(
        () => ({
            supplierId: '',
            minPrice: '',
            maxPrice: '',
            address: '',
            isProduct: true,
        }),
        []
    );

    const fetchSuppliers = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/v1/products', {
                params: {
                    supplierId: filters.supplierId,
                    minPrice: filters.minPrice,
                    maxPrice: filters.maxPrice,
                    address: filters.address,
                    isProduct: filters.isProduct,
                    page: currentPage - 1,
                },
            });

            const isDataValid = response.data && response.data.data;
            if (!isDataValid) {
                setError('Dữ liệu trả về không hợp lệ.');
                setSuppliers([]);
                setTotalPages(0);
                return;
            }

            const suppliersData = response.data.data.content;
            const totalPagesFromAPI = response.data.data.totalPages;

            if (suppliersData.length < 0) {
                setError('Không có nhà cung cấp nào được tìm thấy.');
                setSuppliers([]);
                setTotalPages(0);
                return;
            }
            setSuppliers(suppliersData);
            setTotalPages(totalPagesFromAPI);
        } catch (error) {
            logger.error('Lỗi khi lấy dữ liệu từ API:', error);
            setSuppliers([]);
        }
    }, [filters, currentPage]);

    React.useEffect(() => {
        fetchSuppliers();
    }, [fetchSuppliers]);

    const handleFilterChange = (newFilter) => {
        // Reset lại trang khi thay đổi bộ lọc
        setFilters((prevFilter) => ({
            ...prevFilter,
            ...newFilter,
        }));
        setCurrentPage(1);
    };
    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container={true} spacing={2}>
                {/* Cột FilterSupplier nằm bên trái, chiếm 30% không gian */}
                <Grid item={true} className={classes.left} size={3}>
                    <FilterSupplier onFilterChange={handleFilterChange} />
                </Grid>

                {/* Cột SupplierList nằm bên phải, chiếm 70% không gian */}
                <Grid item={true} className={classes.right} size={9}>
                    <SupplierLists suppliers={suppliers} currentPage={currentPage} totalPages={totalPages} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default SupplierList;
