'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import * as React from 'react';

import { CustomersFilters } from '@/components/dashboard/supplier/customers-filters';
import { CustomersPagination } from '@/components/dashboard/supplier/customers-pagination';
import { CustomersSelectionProvider } from '@/components/dashboard/supplier/customers-selection-context';
import { CustomersTable } from '@/components/dashboard/supplier/supplier-table';
import{getSupplier} from '@/services/admin'

/* const customers = [
    {
        id: 'USR-005',
        name: 'Fran Perez',
        avatar: '/assets/avatar-5.png',
        email: 'fran.perez@domain.com',
        phone: '(815) 704-0045',
        quota: 50,
        status: 'active',
        createdAt: dayjs().subtract(1, 'hour').toDate(),
    },
    {
        id: 'USR-004',
        name: 'Penjani Inyene',
        avatar: '/assets/avatar-4.png',
        // email: 'penjani.inyene@domain.com',
        phone: '(803) 937-8925',
        quota: 100,
        status: 'active',
        createdAt: dayjs().subtract(3, 'hour').toDate(),
    },
    {
        id: 'USR-003',
        name: 'Carson Darrin',
        avatar: '/assets/avatar-3.png',
        email: 'carson.darrin@domain.com',
        phone: '(715) 278-5041',
        quota: 10.2,
        status: 'blocked',
        createdAt: dayjs().subtract(1, 'hour').subtract(1, 'day').toDate(),
    },
    {
        id: 'USR-002',
        name: 'Siegbert Gottfried',
        avatar: '/assets/avatar-2.png',
        email: 'siegbert.gottfried@domain.com',
        phone: '(603) 766-0431',
        quota: 0,
        status: 'pending',
        createdAt: dayjs().subtract(7, 'hour').subtract(1, 'day').toDate(),
    },
    {
        id: 'USR-001',
        name: 'Miron Vitold',
        avatar: '/assets/avatar-1.png',
        email: 'miron.vitold@domain.com',
        phone: '(425) 434-5535',
        quota: 50,
        status: 'active',
        createdAt: dayjs().subtract(2, 'hour').subtract(2, 'day').toDate(),
    },
]; */

export default function Page({ searchParams }) {
    const { email, phone, sortDir, status } = searchParams;
    //   const [customers, setCustomers] = React.useState([]);
    const [supplier, setSupplier] = React.useState([]);
     const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(2);
      const [totalElements, setTotalElements] = React.useState(0);
  


   if (searchParams.status == null) { 
     searchParams.status = "Pending";
 
    } const currentStatus = searchParams.status;
   const fetchSupplier = React.useCallback(async () => {
     const response = await getSupplier();
     console.log("data: ", response.data);
     setSupplier(response.data); // Cập nhật danh sách nhà cung cấp
     setTotalElements(response.data.length); // Cập nhật tổng số phần tử
   }, []);
 
   React.useEffect(() => {
    fetchSupplier();
   }, [fetchSupplier]);
   

  const handlePageChange = (_event, newPage) => {
    console.log("1");
    setPage(newPage);
    fetchSupplier(); // Fetch lại dữ liệu khi thay đổi trang
  };

  const handleRowsPerPageChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setRowsPerPage(newSize);
    setPage(0); // Reset về trang đầu tiên
    fetchSupplier(); // Fetch lại dữ liệu khi thay đổi số hàng mỗi trang
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
                        <Typography variant="h4">Nhà cung cấp</Typography>
                    </Box>
                    
                </Stack>
              
 
                <CustomersSelectionProvider customers={supplier}>
                    <Card>
                        <CustomersFilters filters={{ email, phone, status }} sortDir={sortDir} />
                        <Divider />
                        <Box sx={{ overflowX: 'auto' }}>
                            <CustomersTable rows={supplier} />
                        </Box>
                        <Divider />
                        <CustomersPagination  
                        count={totalElements} // Sử dụng tổng số phần tử từ BE
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

function applySort(row, _sortDir) {
    //   return row.sort((a, b) => {
    //     if (sortDir === 'asc') {
    //       return a.createdAt.getTime() - b.createdAt.getTime();
    //     }

    //     return b.createdAt.getTime() - a.createdAt.getTime();
    //   });
    return row;
}

function applyFilters(row, { email, phone, status }) {
    return row.filter((item) => {
        if (email) {
            if (!item.email?.toLowerCase().includes(email.toLowerCase())) {
                return false;
            }
        }

        if (phone) {
            if (!item.phone?.toLowerCase().includes(phone.toLowerCase())) {
                return false;
            }
        }

        if (status) {
            if (item.status !== status) {
                return false;
            }
        }

        return true;
    });
}
