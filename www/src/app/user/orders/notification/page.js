
import { Box, Typography, Card, CardContent } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ProgressBar from '../step/page';


const OrderConfirm = () => {
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
                            Đơn hàng của bạn đang được xử lý. Xin vui lòng chờ nhà cung cấp xác nhận trong thời gian sớm
                            nhất.
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
                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'left',
                                    mt: 2,
                                }}
                            >
                                <Typography variant="body2" color="textSecondary" sx={{ marginRight: 2 }}>
                                    Ngày giao hàng dự kiến: <strong style={{ color: '#000' }}>16 Tháng 1, 2021</strong>
                                </Typography>

                                <Typography
                                    variant="body2"
                     sx={{
                                        color: '#1976d2',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                    }}
                                >
                                    Theo dõi đơn hàng
                                </Typography>
                            </Box> */}
                        </Card>
                    </Box>
                </Box>

                {/* Right: Order Details */}
                {/* <Box
                    sx={{
                        flex: 1,
                        color: '#000',
                        padding: '0px',
                        backgroundColor: '#F4F4F8',
                        boxShadow: 'none !important',
                    }}
                >
                    <Container sx={{ boxShadow: 'none !important', padding: '0px !important' }}>
                        <Grid container spacing={3}>
                            {/* Order Header */}
                {/* <Grid item xs={12}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: 2,
                                        padding: 2,
                                    }}
                                >
                                    <Box>
                                        <Typography variant="h6">Chi tiết đơn hàng</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            #2059666
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: 1,
                                            flexDirection: 'column',
                                            color: '#000',
                                            fontSize: '14px',
                                        }}
                                    >
                                        <Typography>Pay with PayPal</Typography>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                borderColor: '#000',
                                                color: '#000',
                                                padding: '0px 10px',
                                            }}
                                        >
                                            Download Invoice
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid> */}

                {/* Địa chỉ giao hàng */}
                {/* <Grid item sx={{ width: '100%', paddingTop: '0px !important' }}>
                                <Card
                                    sx={{
                                        padding: 0,
                                        boxShadow: 'none !important',
                                        bgcolor: '#fff',
                                        borderRadius: 'unset',
                                        color: '#000',
                                        marginBottom: '10px',
                                    }}
                                >
                                    <CardContent sx={{ boxShadow: 'none' }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                boxShadow: 'none',
                                            }}
                                        >
                                            <Typography variant="h6">Địa chỉ giao hàng</Typography>
                                        </Box>
                                        <Divider sx={{ padding: '2px 0px' }} />
                                        <Typography variant="body2" mt={2}>
                                            VVIP Address, Raj Nagar Extension Road <br />
                                            Ghaziabad, London 201001, India
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid> */}

                {/* Địa chỉ thanh toán */}
                {/* <Grid item sx={{ width: '100%', paddingTop: '0px !important' }}>
                                <Card
                                    sx={{
                                        marginBottom: '10px',
                                        padding: 0,
                                        boxShadow: 'none !important',
                                        bgcolor: '#fff',
                                        borderRadius: 'unset',
                                        color: '#000',
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6">Địa chỉ thanh toán</Typography>
                                        <Divider sx={{ padding: '2px 0px' }} />
                                        <Typography variant="body2" mt={2}>
                                            VVIP Address, Raj Nagar Extension Road <br />
                                            Ghaziabad, London 201001, India
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid> */}

                {/* Chi tiết liên hệ */}
                {/* <Grid item sx={{ width: '100%', paddingTop: '0px !important' }}>
                                <Card
                                    sx={{
                                        padding: 0,
                                        marginBottom: '10px',
                                        boxShadow: 'none !important',
                                        bgcolor: '#fff',
                                        borderRadius: 'unset',
                                        color: '#000',
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6">Chi tiết liên hệ</Typography>
                                        <Divider sx={{ padding: '2px 0px' }} />
                                        <Typography variant="body2" mt={2}>
                                            Email: example@company.com <br />
                                            Phone: +91-987 000 0000 <br />
                                            Phone: +91-987 000 000
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid> */}

                {/* Order Summary */}
                {/* <Grid item sx={{ width: '100%', paddingTop: '0px !important' }}>
                                <Card
                                    sx={{
                                        padding: 0,
                                        boxShadow: 'none !important',
                                        bgcolor: '#F4F4F8',
                                        borderRadius: 'unset',
                                        color: '#000',
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" sx={{ bgcolor: '#fff', padding: 2 }}>
                                            Order Summary (3)
                                        </Typography>
                                        <Typography variant="body2" mt={2} sx={{ fontWeight: 'bold' }}>
                                            Sub Total: <span style={{ float: 'right' }}>£15.00</span> <br />
                                            Delivery: <span style={{ float: 'right' }}>£16.00</span> <br />
                                            <Divider
                                                style={{ borderColor: '#D6D5DA', height: '2px', margin: '8px 0' }}
                                            />
                                            <strong>
                                                Total: <span style={{ float: 'right' }}>£31.00</span>
                                            </strong>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid> */}
                {/* </Grid>
                    </Container> */}
                {/* </Box>  */}
            </Box>
        </Box>
    );
};

export default OrderConfirm;
