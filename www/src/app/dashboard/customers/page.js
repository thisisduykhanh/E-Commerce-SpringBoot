'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersPagination } from '@/components/dashboard/customer/customers-pagination';
import { CustomersSelectionProvider } from '@/components/dashboard/customer/customers-selection-context';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import * as React from 'react';
import {getUsers} from "@/services/users";
import {logger} from "@/lib/default-logger";


export default function Page({ searchParams }) {
     const { email, phone, sortDir, status } = searchParams;
        //   const [customers, setCustomers] = React.useState([]);
        const [user, setUser] = React.useState([]);
         const [page, setPage] = React.useState(0);
          const [rowsPerPage, setRowsPerPage] = React.useState(10);
          const [totalElements, setTotalElements] = React.useState(0);


       if (searchParams.status === null) {
         searchParams.status = "Pending";

        } const currentStatus = searchParams.status;
       const fetchUser = React.useCallback(async (page, size ) => {
         const response = await getUsers(page, size);
         logger.debug(response)
         setUser(response.data.content);
         setTotalElements(response.data.totalElements);
       }, []);

       React.useEffect(() => {
        fetchUser(page, rowsPerPage, currentStatus);
       }, [fetchUser, page, rowsPerPage, currentStatus]);


      const handlePageChange = (_event, newPage) => {
        console.log("1");
        setPage(newPage);
        fetchUser(newPage, rowsPerPage); // Fetch lại dữ liệu khi thay đổi trang
      };

      const handleRowsPerPageChange = (event) => {
        const newSize = parseInt(event.target.value, 10);
        setRowsPerPage(newSize);
        setPage(0); // Reset về trang đầu tiên
        fetchUser(0, newSize); // Fetch lại dữ liệu khi thay đổi số hàng mỗi trang
      };
    return (
        <Box
            sx={{
                maxWidth: 'var(--Content-maxWidth)',
                m: 'var(--Content-margin)',
                p: 'var(--Content-padding)',
                width: 'var(--Content-width)',
            }}
        >
            <Stack spacing={4}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
                    <Box sx={{ flex: '1 1 auto' }}>
                        <Typography variant="h4">Khách hàng</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button startIcon={<PlusIcon />} variant="contained">
                            Add
                        </Button>
                    </Box>
                </Stack>
                <CustomersSelectionProvider customers={user}>
                    <Card>
                        <CustomersFilters filters={{ email, phone, status }} sortDir={sortDir} />
                        <Divider />
                        <Box sx={{ overflowX: 'auto' }}>
                            <CustomersTable rows={user} />
                        </Box>
                        <Divider />
                        <CustomersPagination count={totalElements} // Sử dụng tổng số phần tử từ BE
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange} />
                    </Card>
                </CustomersSelectionProvider>
            </Stack>
        </Box>
    );
}

// Sorting and filtering has to be done on the server.


