import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';

const OrderCard = ({orders}) => {
    return (
        orders.map((order, index) => (
        <Card sx={{ bgcolor: '#fff', mb: 2, boxShadow: 1, color: '#000' }}>
            <CardContent>
                <Grid container={true} spacing={2} flexDirection="column" alignItems="left" sx={{ maxWidth: 1200 }}>
                    <Grid item={true} sx={{ width: '100%', maxWidth: '100%' }}>
                        <Grid
                            container={true}
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ color: '#000', maxWidth: '100%' }}
                        >
                            <Grid item={true}>
                                <Grid container={true} spacing={1} alignItems="center">
                                    <Grid item={true}>
                                        <Typography variant="body1" fontWeight="bold">
                                            {order.id}
                                        </Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="body2" color="text.secondary">
                                            đặt lúc {Intl.DateTimeFormat('vi-VN', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            }).format(new Date(order.createDate))}
                                        </Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Box
                                            component="img"
                                            src={order.supplier.image ? order.supplier.image : "https://via.placeholder.com/24"}
                                            alt="Avatar"
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                borderRadius: '100%',
                                                border: '1px solid #e0e0e0',
                                            }}
                                        />
                                    </Grid>
                                    <Grid item={true} sx={{ maxWidth: 120 }}>
                                        <Typography
                                            variant="body2"
                                            color="text.dark"
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {order.supplier.nameSupply}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item={true}>
                                <Typography variant="body2" color="error" sx={{ fontWeight: 'bold' }}>
                                    {order.orderStatus.name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item={true} xs={12} container={true} spacing={2} alignItems="center">
                        <Grid item={true} xs={2}>
                            <Box
                                component="img"
                                src="https://via.placeholder.com/80"
                                alt="Product"
                                sx={{
                                    width: '100%',
                                    borderRadius: '4px',
                                    border: '1px solid #e0e0e0',
                                }}
                            />
                        </Grid>
                        <Grid item={true} xs={8}>
                            <Typography variant="body1">áo MANTO dáng Hàn. chất đũi mịn</Typography>
                            <Typography variant="body2" color="text.secondary">
                                x 50
                            </Typography>
                        </Grid>
                        <Grid item={true} xs={2} textAlign="center">
                            <Typography variant="body1" color="error">
                                186.480₫
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        item={true}
                        xs={12}
                        container={true}
                        alignItems="flex-end"
                        flexDirection="column"
                        sx={{ height: '100%' }}
                    >
                        <Grid item={true}>
                            <Typography variant="body1" fontWeight="bold" color="text.dark">
                                Tổng số tiền: 9.461.600₫
                            </Typography>
                        </Grid>
                        <Grid item={true} sx={{ mt: 1 }}>
                            <Button variant="outlined" size="small">
                                Xem chi tiết
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
    ))
};

export default OrderCard;
