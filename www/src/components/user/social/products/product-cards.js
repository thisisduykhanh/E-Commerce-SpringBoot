import { Box, Button, Grid2 as Grid, Paper, Typography } from '@mui/material';

function ProductCards({ product }) {
   const formatPriceRange = (priceRange) => {
    // Kiểm tra nếu priceRange là chuỗi, nếu không ép kiểu thành chuỗi
    const formatPrice = (priceString) => {
        // Đảm bảo priceString là chuỗi
        if (typeof priceString !== 'string') {
            priceString = String(priceString);
        }
if (!priceString || priceString.trim() === "") {
            return [];
        }
        // Sử dụng biểu thức chính quy để trích xuất giá trị trước .00
        const matches = priceString.match(/(?:\d+)\.00/g);
        if (matches) {
            // Trích xuất giá trị trước .00
            const priceBeforeDot = matches.map(item => item.replace('.00', ''));

            // Định dạng tiền tệ với phân cách hàng nghìn
            const formattedPrices = priceBeforeDot.map(amount => {
                return Number(amount).toLocaleString('vi-VN');
            });

            return formattedPrices;
        }
            return [];

    };

    // Gọi hàm formatPrice để xử lý giá trị price
    const formattedPrices = formatPrice(priceRange);

    // Trả về giá đã định dạng, với dấu gạch ngang và chữ "đ" ở cuối
    if (formattedPrices.length > 0) {
        return formattedPrices.map((formattedPrice, index) => (
            `${formattedPrice} ${index < formattedPrices.length - 1 ? ' - ' : ' đ'}`
        )).join('');
    }
        return 'Không có giá trị hợp lệ.';

};
    return (
        <Grid item={true} key={product.id}>
            <Paper
                border={1}
                borderColor="grey.300"
                borderRadius={2}
                sx={{
                    boxShadow: 3,
                    backgroundColor: '#ffff',
                    color: 'black',
                    height: '530px',
                    display: 'flex',
                    justifyContent:'center',
                    alignContent:'center',
                    flexDirection: 'column',
                    width: '300px',
                    padding:2
                }}
            >
                {/* Hình ảnh sản phẩm */}
                <Box sx={{ position: 'relative', height: 270, width: '260px' }}>
                    <img
                        src={product.listImage[0]?.url}
                        alt={product.nameProduct}
                        style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                            borderRadius: '8px',

                        }}
                    />
                </Box>

                {/* Tên sản phẩm */}
                <Typography
                    variant="h6"
                    sx={{ display: 'flex', marginTop: 2, fontWeight: 'bold', flexGrow: 1, color: '#333' }}
                >
                    {product.nameProduct}
                </Typography>

                {/* Mô tả sản phẩm */}
                <Typography variant="body2" sx={{ color: '#666', marginTop: 1, flexGrow: 1 }}>
                    {product.description}
                </Typography>

                {/* Giá sản phẩm */}
                <Typography variant="h6" sx={{ color: '#1a1a1a', marginTop: 2, fontWeight: 'bold', flexGrow: 1 }}>
                   {formatPriceRange(product.price)}
                </Typography>

                {/* Giá theo số lượng */}
               <Box sx={{ marginTop: 2 }}>
                    {product.officialPriceDTO?.map((priceRange) => (
                        <Typography key={priceRange.id} variant="body2" sx={{ color: '#333' }}>
                            Từ {priceRange.minQuantity} đến {priceRange.maxQuantity} sản phẩm:{' '}
                            {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            }).format(priceRange.price)}
                        </Typography>
                    ))}
                </Box>

                {/* Nút mua sản phẩm */}
                <Box sx={{ marginTop: 'auto' }}>
                    <Button
                        variant="contained"
                        fullWidth={true}
                        sx={{ background: 'linear-gradient(180deg, #00A6B7 0%, #00A6B7 100%)', color: 'white' }}
                    >
                        Mua Ngay
                    </Button>
                </Box>
            </Paper>
        </Grid>
    );
}

export default ProductCards;
