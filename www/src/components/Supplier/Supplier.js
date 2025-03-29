'use client';
import { Box, Grid2 as Grid, Typography } from '@mui/material';

function Supplier({ supplier }) {
    if (!supplier) {
        return <Typography sx={{ textAlign: 'center' }}>Không có dữ liệu nhà cung cấp.</Typography>;
    }

    return (
        <Box p={2}>
            <Grid container={true} spacing={6}>
                <Grid item={true} xs={12}>
                    <Box sx={{ position: 'relative', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
                        {/* Ảnh nền (background image) */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundImage: `url('${supplier.image || 'https://res.cloudinary.com/dgts7tmnb/image/upload/v1731467999/images_yhjkxl.jpg'}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundAttachment: 'fixed',
                                borderRadius: '8px',
                            }}
                        />

                        {/* Thông tin nhà cung cấp */}
                        <Box
                            sx={{
                                position: 'relative',
                                zIndex: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#1A1A1A',
                                padding: 2,
                                flexDirection: 'column',
                                textAlign: 'center',
                            }}
                        >
                            {/* Logo, Tên công ty */}
                            <Box
                                sx={{
                                    width: '320px',
                                    height: '120px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '20px',
                                }}
                            >
                                {/* Logo nhà cung cấp */}
                                <img
                                    src={
                                        supplier.logo ||
                                        'https://res.cloudinary.com/dgts7tmnb/image/upload/v1735478087/photo_2024-12-29_20-12-26_kjerh5.jpg'
                                    }
                                    alt={`${supplier.nameSupply} logo`}
                                    style={{
                                        width: '120px',
                                        height: '120px',
                                        borderRadius: '50%',
                                        marginBottom: '20px',
                                    }}
                                />
                                {/* Tên công ty */}
                                <Box sx={{ textAlign: 'left' }}>
                                    <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 1 }}>
                                        {supplier.nameSupply}
                                    </Typography>

                                    {/* Địa chỉ nhà cung cấp */}
                                    <Typography variant="body2" sx={{ marginBottom: 2 }}>
                                        Địa chỉ: {supplier.address || 'Không có địa chỉ'}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Các thông tin bổ sung: Giao hàng và Loại sản phẩm */}
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                                <Typography variant="body2">
                                    Giao hàng:{' '}
                                    {supplier.nameDelivery && supplier.nameDelivery.length > 0
                                        ? supplier.nameDelivery.join(', ')
                                        : 'Chưa có thông tin giao hàng'}
                                </Typography>
                                <Typography variant="body2">
                                    Loại sản phẩm:{' '}
                                    {supplier.nameProductType && supplier.nameProductType.length > 0
                                        ? supplier.nameProductType.join(', ')
                                        : 'Chưa có thông tin sản phẩm'}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Supplier;
