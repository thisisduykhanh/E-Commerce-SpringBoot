'use client';
import TablePagination from '@mui/material/TablePagination';

function noop() {
    return undefined;
}

export function CustomersPagination({ count, page, onPageChange, onRowsPerPageChange, rowsPerPage }) {
    // You should implement the pagination using a similar logic as the filters.
    // Note that when page change, you should keep the filter search params.

    return (
        <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={(event, newPage) => onPageChange(event, newPage)} // Đảm bảo hàm được gọi đúng
        onRowsPerPageChange={(event) => onRowsPerPageChange(event)} // Đảm bảo hàm được gọi đúng
        rowsPerPage={rowsPerPage} // Truyền giá trị hàng mỗi trang từ props
        rowsPerPageOptions={[5, 10, 25]}
        />
    );
}
