'use client';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';

// function noop() {
//     return undefined;
// }

// Tùy chỉnh TablePagination với styled
const StyledTablePagination = styled(TablePagination)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& .MuiTablePagination-toolbar': {
        padding: '0 16px',
    },
    '& .MuiTablePagination-select': {
        fontSize: '0.9rem',
        padding: '4px 8px',
    },
    '& .MuiTablePagination-actions': {
        marginLeft: '8px',
    },
}));

export function ProductsPagination({ count, page, onPageChange, onRowsPerPageChange, rowsPerPage }) {
    const defaultOptions = [5, 10, 25];
    const rowsPerPageOptions = Array.from(new Set([...defaultOptions, rowsPerPage])).sort((a, b) => a - b);

    const startIndex = page * rowsPerPage + 1;
    const endIndex = Math.min((page + 1) * rowsPerPage, count);

    return (
        <StyledTablePagination
            component="div"
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(event, newPage) => onPageChange(event, newPage)}
            onRowsPerPageChange={(event) => onRowsPerPageChange(event)}
            rowsPerPageOptions={rowsPerPageOptions}
            labelRowsPerPage="Số hàng mỗi trang:"
            labelDisplayedRows={() => `${startIndex}-${endIndex} trong tổng số ${count}`}
        />
    );
}
