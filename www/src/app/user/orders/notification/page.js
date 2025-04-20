
import { Box, Typography, Card, CardContent } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ProgressBar from '../step/page';
import Link from 'next/link';


function OrderConfirm() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh',
                backgroundColor: '#F5F5F5',
                padding: '20px',
                boxShadow: 'none',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    width: { xs: '100%', md: '80%' },
                    height: 'auto',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                }}
            >
                {/* Left: Order Confirmation */}
                <Box
                    sx={{
                        flex: 2,
                        backgroundColor: '#61B672',
                        color: 'white',
                        padding: { xs: '20px', md: '40px' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Box textAlign="center">
                        <CheckCircleOutlineIcon style={{ fontSize: '80px', color: '#fff' }} />
                        <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                            Cảm ơn bạn
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" mt={2}>
                            ĐƠN HÀNG CỦA BẠN ĐÃ ĐƯỢC GHI NHẬN
                        </Typography>
                        <Typography variant="body1" mt={2}>
                            Đơn hàng của bạn đang được xử lý. Xin vui lòng đến trang {" "}
                            {/* Link to check order */}
                            <Link href="/user/order-history" passHref>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        display: 'inline',
                                        textDecoration: 'underline',
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        cursor: 'pointer',
                                        marginRight: '4px',
                                    }}
                                >
                                    kiểm tra đơn hàng 
                                </Typography>
                            </Link>
                            để tiến hành thanh toán.
                        </Typography>
                    </Box>

                    {/* Progress Line */}
                    <Box mt={4}>
                        <Card
                            sx={{
                                backgroundColor: '#fff',
                                color: 'black',
                                padding: '20px',
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <CardContent>
                                <Typography variant="body2" textAlign="center" mb={2} color="textSecondary">
                                    Đơn hàng của bạn được đặt vào <strong>{new Date().toLocaleDateString('vi-VN')}</strong> và đang trong quá
                                    trình xử lý.
                                </Typography>

                                {/* Progress Line */}
                                <Box>
                                    <ProgressBar />
                                </Box>
                            </CardContent>
                            
                        </Card>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default OrderConfirm;
