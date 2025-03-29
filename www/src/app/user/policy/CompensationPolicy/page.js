'use client';
import * as React from 'react';
import PolicyContent from '@/components/PolicyContent/PolicyContent';
import PolicySidebar from '@/components/PolicySideBar/PolicySideBar';
import { Box, Drawer, Grid2 as Grid, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function CompensationPage() {
    const title = 'CHÍNH SÁCH ĐỔI - TRẢ - YÊU CẦU BỒI THƯỜNG HÀNG HÓA';
    const content = (
        <>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Tại Asizon.vn, chúng tôi tập trung vào các cam kết và bảo vệ Người Dùng bằng cách:
            </Typography>
            <ul>
                <li>
                    Yêu cầu Nhà cung cấp gửi hàng hóa đúng với thông tin mô tả và hình ảnh được đăng tải trên Trang
                    Asizon.vn.
                </li>
                <li>
                    Yêu cầu Nhà cung cấp gửi kèm các sản phẩm khuyến mãi, quà tặng, voucher và thực hiện các chính sách
                    đã cam kết.
                </li>
                <li>
                    Yêu cầu Bên mua chuyển trả hàng hóa về cho Nhà cung cấp (nếu có khiếu nại) theo đúng hiện trạng ban
                    đầu.
                </li>
            </ul>
            {/* Các mục chính sách */}
            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                1. ĐIỀU KIỆN ĐỔI - TRẢ HÀNG HOÁ (DÀNH CHO BÊN MUA)
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Bên mua (Người mua) có thể gửi yêu cầu đổi - trả lại một phần hoặc toàn bộ sản phẩm trong đơn hàng đặt
                trên Trang Asizon.vn trong vòng tối đa 48h kể từ khi nhận hàng thành công (trừ thứ 7, chủ nhật).
                <br />
                <br />
                Nguyên nhân đổi - trả cần nằm trong các trường hợp sau:
            </Typography>
            <ul>
                <li>Hàng hóa bị lỗi hoặc hư hại trong quá trình vận chuyển.</li>
                <li>Hàng hóa nhận được không đúng với hình ảnh và mô tả sản phẩm.</li>
                <li>Hàng hóa nhận được sai với yêu cầu đặt hàng (về màu sắc, kích thước, …).</li>
                <li>Hàng hóa nhận được có lỗi ngoại quan hoặc lỗi kỹ thuật.</li>
            </ul>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Hàng hóa đổi - trả cần thoả các điều kiện sau:
            </Typography>
            <ul>
                <li>
                    Hàng hóa không có dấu hiệu đã qua sử dụng, còn nguyên tem, mác hoặc niêm phong của nhà sản xuất.
                </li>
                <li>
                    Hàng hóa còn đầy đủ phụ kiện, giấy hướng dẫn sử dụng, phiếu bảo hành và/hoặc quà tặng kèm theo (nếu
                    có).
                </li>
                <li>Sản phẩm không nằm trong danh mục hàng hóa cấm bán.</li>
                <li>Sản phẩm điện tử cần nguyên vẹn về mặt dữ liệu (chưa bị kích hoạt hoặc sao ghi).</li>
                <li>Sản phẩm voucher, e-voucher cần còn hạn sử dụng.</li>
            </ul>
            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                2. ĐIỀU KIỆN YÊU CẦU BỒI THƯỜNG HÀNG HOÁ (DÀNH CHO NHÀ CUNG CẤP)
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Nhà cung cấp (Người bán) có thể gửi yêu cầu bồi thường một phần hoặc toàn bộ sản phẩm đổi - trả trong
                vòng tối đa 48h kể từ khi nhận hàng thành công (trừ thứ 7, chủ nhật).
                <br />
                <br />
                Nguyên nhân của việc yêu cầu bồi thường cần nằm trong các trường hợp sau:
            </Typography>
            <ul>
                <li>Hàng hóa đổi - trả bị lỗi hoặc hư hại trong quá trình vận chuyển</li>
                <li>Hàng hóa đổi - trả khi nhận về không đúng với hiện trạng ban đầu</li>
            </ul>

            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                3. PHƯƠNG THỨC VÀ CHI PHÍ XỬ LÝ
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Người Dùng chủ động trao đổi, xử lý các yêu cầu đổi - trả - bồi thường bao gồm nhưng không giới hạn việc
                xác định thông tin sản phẩm, ngày giờ tạo vận đơn, thời gian nhận hàng đổi - trả, nhận tiền bồi thường
                và có trách nhiệm thông báo lại cho Asizon.vn.
                <br />
                <br />
                Trong một số trường hợp, Asizon.vn sẽ hỗ trợ hai bên xử lý yêu cầu đổi - trả - bồi thường hàng hóa.
                Trong trường hợp đó, Asizon.vn sẽ tính toán và ghi nhận các chi phí liên quan cho Nhà cung cấp hoặc Bên
                mua (tùy theo trường hợp và tùy theo việc Asizon.vn xác định được lỗi phát sinh liên quan đến bên nào)
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 4, fontWeight: 'bold' }}>
                4. SỐ TIỀN HOÀN LẠI VÀ HÌNH THỨC THANH TOÁN
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Asizon.vn sẽ hoàn lại một phần hoặc toàn bộ các khoản tiền (nằm trong danh sách dưới đây) vào tài khoản
                mà Người Dùng đã đăng ký với Asizon.vn sau khi đã khấu trừ các chi phí liên quan:
            </Typography>
            <ul>
                <li>Tiền hàng</li>
                <li>Phí vận chuyển</li>
                <li>Tiền đền bù (từ bên có lỗi)</li>
            </ul>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Lưu ý: Asizon.vn không hoàn lại hoặc xử lý các khiếu nại liên quan tới phí chuyển khoản
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2, fontWeight: 'bold' }}>
                Mọi vấn đề liên quan cần được hỗ trợ vui lòng liên hệ:
            </Typography>
            <ul>
                <li>Email: support@asizon.vn</li>
                <li>Tổng đài: 19006074</li>
                <li>Địa chỉ văn phòng: 72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, TP. HCM</li>
            </ul>
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
                                    fontSize: { xs: '0.8rem', sm: '1rem', md: '1.2rem' },
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
export default CompensationPage;
