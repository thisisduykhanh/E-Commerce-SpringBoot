'use client';
import * as React from 'react';
import PolicyContent from '@/components/PolicyContent/PolicyContent';
import PolicySidebar from '@/components/PolicySideBar/PolicySideBar';
import { Box, Drawer, Grid2 as Grid, IconButton, Link, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function ShippingPage() {
    const title = 'CHÍNH SÁCH VẬN CHUYỂN';
    const content = (
        <>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Bằng việc sử dụng dịch vụ vận chuyển trên Trang Asizon.vn, Bạn thừa nhận và đồng ý với các điều kiện,
                quy định, yêu cầu dưới đây:
            </Typography>

            {/* Các mục chính sách */}
            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                1. QUY ĐỊNH VỀ HÀNG HOÁ CẤM BÁN HOẶC BỊ GIỚI HẠN BỞI ASIZON.VN
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Asizon.vn không hỗ trợ vận chuyển các loại hàng hóa được quy định và không chịu trách nhiệm nếu hàng hóa
                loại này bị thu giữ, tiêu hủy hay hư hỏng trong quá trình vận chuyển. Nhà cung cấp hoàn toàn chịu trách
                nhiệm trước Asizon.vn và pháp luật nếu vi phạm.
            </Typography>

            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                2. KHỐI LƯỢNG BƯU GỬI - CƯỚC VẬN CHUYỂN
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Theo quy định của đơn vị vận chuyển, cước vận chuyển sẽ dựa trên khối lượng tính phí. Ghi chú: Khối
                lượng có giá trị lớn hơn khi so sánh giữa “khối lượng thực (gram)” và “khối lượng quy đổi (cm3=&gt;
                gram)” của hàng hóa.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Ví dụ: sản phẩm rổ nhựa 3 ngăn có khối lượng thực là 400gr, chiều dài x chiều rộng x chiều cao là
                30cmx30cmx10cm
            </Typography>
            <ul>
                <li>Khối lượng quy đổi = (30x30x10)/5000 = 1.8kg</li>
                <li>Khối lượng quy đổi (1.8kg) &gt; Khối lượng thực (400gr)</li>
                <li>Cước vận chuyển được tính theo giá trị 1.8kg</li>
            </ul>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Để hạn chế việc đơn hàng bị hủy, Nhà cung cấp cần nhập đầy đủ cân nặng sau khi đóng gói và kích thước 3
                chiều của bưu kiện để hệ thống tính được khối lượng quy đổi chính xác. Với đơn hàng có khối lượng nhập
                thấp hơn thực tế, đơn vị vận chuyển có quyền từ chối nhận hàng hoặc Nhà cung cấp sẽ phải chịu phần phí
                vận chuyển phát sinh thêm.
            </Typography>
            {/* Section 3: Quy định về khuyến nại */}
            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                3. QUY ĐỊNH VỀ KHUYẾN NẠI
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2, fontWeight: 'bold' }}>
                3.1 Đối tượng áp dụng và thời hạn khiếu nại
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Người Dùng không nhận được hàng: trong vòng 24h sau khi Asizon.vn nhận được thông báo đơn hàng đã giao
                thành công cho Bên mua hoặc đơn hàng chuyển hoàn thành công cho Nhà cung cấp.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Hàng hóa hư hại: trong vòng 24h sau khi nhận được thông báo đơn hàng đã giao thành công cho Bên mua hoặc
                chuyển hoàn.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Nhà cung cấp phải chịu chi phí vận chuyển phát sinh dẫn đến Tiền Ký Quỹ Đơn Hàng bị khấu trừ: trong vòng
                7 ngày kể từ khi nhận được Tiền Ký Quỹ Đơn Hàng.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Chúng tôi sẽ không chia sẻ, bán, hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba mà không có sự
                đồng ý trước của bạn, trừ khi:
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2, fontWeight: 'bold' }}>
                3.2 Kênh tiếp nhận <br /> <br />
                Email:{' '}
                <Link color="#008489" href="mailto:support@asizon.vn">
                    support@asizon.vn
                </Link>
                <br />
                Tổng đài:{' '}
                <Link color="#008489" href="tel:19006074">
                    19006074
                </Link>
                <br />
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2, fontWeight: 'bold' }}>
                3.3 Nội dung khiếu nại
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Khi gửi khiếu nại, Người Dùng cần cung cấp một trong các loại hình ảnh, bằng chứng hoặc giấy tờ sau cho
                Asizon.vn (tùy vào trường hợp)
            </Typography>
            <ul>
                <li>Mã đơn hàng/mã vận đơn</li>
                <li>Ảnh/Video của hàng hóa khi được giao tới Bên mua hoặc chuyển trả về cho Nhà cung cấp</li>
                <li>Ảnh/Video của hàng hóa khi được Nhà cung cấp giao đi</li>
                <li>
                    Ảnh/Video ghi lại phần hư hại của hàng hóa bên trong khiến cho sản phẩm không thể bán lại hoặc sử
                    dụng được
                </li>
                <li>Ảnh/Video quá trình đóng gói hàng hoặc mở hàng/kiểm tra hàng</li>
                <li>Các bằng chứng khác liên quan</li>
            </ul>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Thời hạn cung cấp bằng chứng: 24h kể từ khi Người Dùng nhận được yêu cầu từ Asizon.vn
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Thời hạn xử lý khiếu nại vận chuyển: tối thiểu 4 ngày làm việc
            </Typography>
            {/* Section 4: Bảo mật thông tin */}
            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                4. QUY ĐỊNH VỀ BỒI THƯỜNG
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Nếu xảy ra các sự cố trong quá trình vận chuyển Nhà cung cấp sẽ được bồi thường theo chính sách của Nhà
                vận chuyển tương ứng.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Lưu ý: Trong trường hợp hàng hóa trên đường vận chuyển bị kiểm tra bởi các cơ quan chức năng, Nhà cung
                cấp có trách nhiệm cung cấp đầy đủ hóa đơn, chứng từ chứng minh trong vòng 24 (hai mươi bốn) giờ theo
                thời gian yêu cầu của cơ quan chức năng. Quá thời gian trên Nhà cung cấp không cung cấp đầy đủ giấy tờ
                cần thiết theo yêu cầu dẫn đến hàng hóa bị tịch thu và phạt tiền, Nhà cung cấp sẽ hoàn toàn chịu trách
                nhiệm với các rủi ro và chi phí phát sinh liên quan.
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

export default ShippingPage;
