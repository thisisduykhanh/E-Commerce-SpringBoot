'use client';
import * as React from 'react';
import PolicyContent from '@/components/PolicyContent/PolicyContent';
import PolicySidebar from '@/components/PolicySideBar/PolicySideBar';
import { Box, Drawer, Grid2 as Grid, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function PaymentPage() {
    const title = 'CHÍNH SÁCH THANH TOÁN';
    const content = (
        <>
            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                I. Quy định chung:
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Sản phẩm hàng hóa, dịch vụ tham gia giao dịch trên website: www.Asizon.vn phải được phép kinh doanh, lưu
                hành và không thuộc các trường hợp cấm kinh doanh, cấm quảng cáo theo quy định của pháp luật. Mọi hoạt
                động mua bán hàng hóa, cung cấp dịch vụ trên website: www.Asizon.vn phải được thực hiện công khai, minh
                bạch, đảm bảo quyền lợi của người tiêu dùng.
            </Typography>

            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                II. Asizon cung cấp các phương thức thanh toán nào?
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Nhằm mang đến Quý khách những trải nghiệm mua sắm trực tuyến tuyệt vời nhất, tại Asizon.com, chúng tôi
                đưa ra các phương thức thanh toán để Quý khách dễ dàng lựa chọn:
            </Typography>

            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                1. Thanh toán bằng tiền mặt khi nhận hàng (COD)
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                COD là gì?
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                COD là viết tắt của Cash On Delivery, nghĩa là thanh toán khi nhận hàng. Với phương thức thanh toán này,
                quý khách thanh toán bằng tiền mặt cho nhân viên giao hàng ngay khi nhận được đơn hàng của mình. Chúng
                tôi chấp nhận hình thức thanh toán khi nhận hàng (COD) cho hầu hết đơn hàng trên toàn quốc. Trừ một vài
                trường hợp đặc biệt được yêu cầu từ nhà bán hàng.
            </Typography>

            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                2. Thanh toán chuyển khoản trực tuyến:
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Trong quá trình đặt hàng, Quý khách không muốn thanh toán bằng tiền mặt hoặc không thể thanh toán trực
                tiếp, Quý khách có thể chọn hình thức thanh toán chuyển khoản trong phần Phương thức thanh toán. Thanh
                toán chuyển khoản trực tuyến bao gồm thanh toán bằng Thẻ ATM (Thẻ ghi nợ/thanh toán/trả trước nội địa)
                và Thẻ thanh toán quốc tế, thẻ tín dụng. Trong đó danh mục các loại Thẻ ATM, thẻ thanh toán quốc tế, thẻ
                tín dụng (sau đây được gọi chung là “Thẻ”) được chấp nhận/không được chấp nhận thanh toán trên Asizon.vn
                sẽ được Asizon.vn thông báo cho Khách Hàng bằng thông báo đăng tải trên Asizon.vn hoặc một hiển thị tại
                thời điểm Khách Hàng thực hiện việc thanh toán. Điều kiện để chọn hình thức thanh toán chuyển khoản là
                tài khoản ngân hàng của Quý khách đã được đăng ký sử dụng Internet Banking.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Quý khách thanh toán vào tài khoản:
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                CHỦ TÀI KHOẢN: ……………………………………….
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                SỐ TÀI KHOẢN:……………………………………..
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                NGÂN HÀNG …………………………………….
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                CHI NHÁNH: …………………………………….
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                * Nội dung chuyển khoản: asizon_[tên sản phẩm và khối lượng]_[tên khách hàng]
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Ví dụ: Quý khách tên Quang thanh toán chuyển khoản cho đơn hàng 6 tấn gạo ST25 đặt hàng trên website
                Asizon.vn, số điện thoại của quý khách là 0123456789, cú pháp ghi chú khi chuyển khoản là Asizon, 6 tan
                gao ST25, 0123456789.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Trường hợp chuyển khoản cho các đơn hàng đặt cọc hoặc đặt hàng trước, vui lòng ghi cú pháp:
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                đặt cọc asizon_[tên sản phẩm và khối lượng]_[SĐT Khách hàng]
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                đặt trước asizon_[tên sản phẩm và khối lượng]_[SĐT Khách hàng]
            </Typography>

            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                3. Thanh toán bằng ví điện tử VNPAY/MOMO/ZALOPAY:
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Trong quá trình đặt hàng, quý khách chọn hình thức Thanh toán bằng ví điện tử VNPAY/MOMO/ZALOPAY, quý
                khách sẽ được chuyển đến Cổng thanh toán trực tuyến bảo mật VNPAY/MOMO/ZALOPAY để thanh toán. Vui lòng
                chọn phương thức thanh toán được tích hợp để tiến hành thanh toán.
            </Typography>

            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                III. Giá trị đơn hàng là bao nhiêu thì tôi sẽ được xuất hóa đơn?
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Trong mọi trường hợp, trừ khi có yêu cầu khác đi, Quý khách hàng sẽ nhận được hoá đơn theo thông tin đã
                đăng ký khi mua hàng tại Asizon.vn.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                * Lưu ý :
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Chi phí vận chuyển tùy thuộc vào nơi gửi hàng, số lượng hàng hóa và thoả thuận của nhà bán hàng và khách
                hàng.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Thời gian vận chuyển: Tùy thuộc vào địa chỉ nhận hàng, hàng sẽ đến tận tay khách hàng trong vòng từ
                24-72 giờ làm việc.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Chúng tôi sẽ cập nhật chính sách thanh toán thường xuyên để đảm bảo phù hợp với quá trình phát triển của
                nền tảng. Vui lòng cập nhật thông tin liên tục để có thể mua sắm thuận tiện hơn.
            </Typography>
        </>
    );
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 900);
        };

        handleResize(); // Gọi khi component mount

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize); // Dọn dẹp khi component unmount
    }, []);
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };
    React.useEffect(() => {
        // Điều chỉnh overflow của body khi sidebar mở ở mobile
        if (drawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [drawerOpen]);
    return (
        <Box sx={{ paddingTop: 2 }}>
            <Grid container={true} spacing={3}>
                <Grid item={true} size={{ xs: 12, md: 3 }}>
                    <Drawer
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            width: 240,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: 240,
                                boxSizing: 'border-box',
                            },
                        }}
                        variant="temporary"
                        anchor="left"
                        open={drawerOpen}
                        onClose={toggleDrawer}
                    >
                        <PolicySidebar />
                    </Drawer>
                    <IconButton
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            position: 'absolute',
                            top: 292,
                            left: 10,
                            zIndex: 999,
                        }}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Sidebar cho desktop luôn hiển thị */}
                    <Drawer
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            width: '100%',
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                overflowY: 'auto',
                                backgroundColor: 'transparent',
                                position: 'relative',
                                marginBottom: 2,
                                border: 'none',
                                boxShadow: 'none',
                            },
                        }}
                        variant="permanent"
                        anchor="left"
                        open={drawerOpen}
                    >
                        <PolicySidebar />
                    </Drawer>
                </Grid>

                <Grid item={true} size={{ xs: 12, md: 9 }}>
                    <Grid container={true} justifyContent="center">
                        <Grid item={true}>
                            <Typography
                                variant="h6"
                                sx={{
                                  color:'#1a1a1a!important',
                                    fontWeight: 'bold',
                                    position: 'absolute',
                                    whiteSpace: 'nowrap',
                                    marginBottom: 2,
                                    top: { xs: 300, md: 'unset' },
                                    left: '55%',
                                    textAlign: 'center',
                                    transform: 'translateX(-50%)',
                                    fontSize: { xs: '1.1rem', sm: '1.1rem', md: '1.95rem' },
                                    overflowY: 'auto',
                                    overflow: 'hidden',
                                    lineHeight: 2,
                                }}
                            >
                                {title}
                            </Typography>
                        </Grid>
                    </Grid>
                    <PolicyContent sx={{ marginTop: 4 }} content={content} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default PaymentPage;
