'use client';
import * as React from 'react';
import PolicyContent from '@/components/PolicyContent/PolicyContent';
import PolicySidebar from '@/components/PolicySideBar/PolicySideBar';
import { Box, Drawer, Grid2 as Grid, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function PrivacyPage() {
    const title = 'THỎA THUẬN VỀ ĐIỀU KIỆN LÀM VIỆC VÀ CHÍNH SÁCH CHỐNG LAO ĐỘNG CƯỠNG BỨC';
    const content = (
        <>
            <Typography
                variant="h5"
                sx={{
                    marginTop: 2,
                    fontFamily:
                        '"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
                }}
            >
                THỎA THUẬN VỀ ĐIỀU KIỆN LÀM VIỆC VÀ CHÍNH SÁCH CHỐNG LAO ĐỘNG CƯỠNG BỨC
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    marginTop: 2,
                    fontFamily:
                        '"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
                }}
            >
                (Dành cho các thành viên tham gia sàn thương mại điện tử B2B Asizon)
                <br />
                Bằng việc đăng ký tham gia sàn thương mại điện tử Asizon, bạn và chúng tôi cùng đồng thuận tuân thủ và
                triển khai các cam kết đảm bảo các tiêu chuẩn về điều kiện làm việc và loại bỏ hoàn toàn lao động cưỡng
                bức trong tất cả các hoạt động kinh doanh trong hoạt động kinh doanh của mình. Chúng tôi tin rằng, cùng
                nhau, chúng ta có thể tạo nên một cộng đồng tốt đẹp, Nhằm thúc đẩy một môi trường kinh doanh bền vững và
                trách nhiệm, các thành viên tham gia sàn thương mại điện tử Asizon cam kết đảm bảo các tiêu chuẩn về
                điều kiện làm việc và loại bỏ hoàn toàn lao động cưỡng bức trong tất cả các hoạt động kinh doanh.
                <br />
                1. Điều kiện làm việc
                <br />
                1.1 Môi trường làm việc an toàn và lành mạnh:
                <br />• Đảm bảo nơi làm việc đáp ứng các tiêu chuẩn an toàn lao động, bao gồm việc cung cấp đầy đủ trang
                thiết bị bảo hộ và đào tạo về an toàn lao động cho người lao động.
                <br />• Chủ động xác định, đánh giá và xử lý các nguy cơ tiềm ẩn có thể ảnh hưởng đến sức khỏe thể chất
                hoặc tinh thần của nhân viên.
                <br />
                1.2 Chính sách giờ làm việc và nghỉ ngơi:
                <br />• Tuân thủ các quy định pháp luật về giờ làm việc tối đa, giờ nghỉ giữa ca và thời gian nghỉ phép
                của người lao động.
                <br />• Đảm bảo không áp đặt giờ làm việc vượt quá mức hợp lý, trừ các trường hợp có thỏa thuận tự
                nguyện và được bù đắp thỏa đáng.
                <br />
                1.3 Tiền lương và phúc lợi:
                <br />• Đảm bảo mức lương ít nhất bằng hoặc cao hơn mức lương tối thiểu do pháp luật địa phương quy
                định, đồng thời thanh toán đầy đủ và đúng hạn.
                <br />• Cung cấp các chế độ phúc lợi cơ bản như bảo hiểm xã hội, bảo hiểm y tế và các phúc lợi khác theo
                quy định pháp luật.
                <br />
                1.4 Quyền tự do lao động:
                <br />• Tôn trọng quyền tự do tham gia hoặc không tham gia vào các tổ chức đại diện lao động và quyền
                thương lượng tập thể của nhân viên.
                <br />
                2. Chính sách chống lao động cưỡng bức
                <br />
                2.1 Cấm lao động cưỡng bức dưới mọi hình thức:
                <br />• Cam kết không sử dụng bất kỳ hình thức lao động cưỡng bức, ép buộc, hoặc bắt buộc nào, bao gồm
                nhưng không giới hạn ở lao động bằng cách đe dọa, bạo lực, giữ giấy tờ tùy thân, hoặc giam giữ bất hợp
                pháp.
                <br />
                2.2 Cấm giữ giấy tờ tùy thân và tài sản cá nhân:
                <br />• Không giữ giấy tờ tùy thân, tiền lương, hoặc tài sản cá nhân của người lao động như một cách để
                ép buộc họ làm việc.
                <br />
                2.3 Tự do chấm dứt hợp đồng:
                <br />• Tôn trọng quyền của người lao động được tự do chấm dứt hợp đồng lao động, với điều kiện tuân thủ
                các quy định pháp luật và hợp đồng lao động đã ký kết.
                <br />
                2.4 Hệ thống khiếu nại:
                <br />• Đảm bảo người lao động có quyền khiếu nại hoặc báo cáo các hành vi cưỡng bức lao động hoặc vi
                phạm quyền mà không phải chịu bất kỳ sự trả thù hoặc trừng phạt nào.
                <br />• Thiết lập kênh liên lạc minh bạch để người lao động có thể báo cáo các trường hợp vi phạm và đảm
                bảo các báo cáo này được xử lý công bằng.
                <br />
                Trách nhiệm và giám sát
                <br />• Các thành viên của sàn Asizon đồng ý tuân thủ các cam kết trên trong toàn bộ hoạt động kinh
                doanh.
                <br />• Ban quản lý sàn Asizon có quyền kiểm tra và giám sát định kỳ hoặc bất kỳ lúc nào phát hiện dấu
                hiệu vi phạm các điều khoản thỏa thuận này.
                <br />• Các thành viên vi phạm sẽ phải chịu các biện pháp xử lý theo quy định của pháp luật và chính
                sách của sàn Asizon, bao gồm việc chấm dứt tư cách thành viên trên sàn.
                <br />
                Chúng tôi tin tưởng rằng việc duy trì điều kiện làm việc tốt và loại bỏ lao động cưỡng bức không chỉ bảo
                vệ quyền lợi của người lao động mà còn tạo nền tảng phát triển bền vững và minh bạch cho cộng đồng kinh
                doanh trên sàn Asizon.
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
export default PrivacyPage;
