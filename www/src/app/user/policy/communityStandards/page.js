'use client';
import * as React from 'react';
import PolicyContent from '@/components/PolicyContent/PolicyContent';
import PolicySidebar from '@/components/SideBarSociety/PolicySideBar';
import { Box, Drawer, Grid2 as Grid, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function PrivacyPage() {
    const title = 'TIÊU CHUẨN CỘNG ĐỒNG CỦA HỆ SINH THÁI ASIZON';
    const content = (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
            (Dành cho các thành viên tham gia sàn thương mại điện tử B2B Asizon)
            <br />
            <br />
            <strong>Giới thiệu</strong>
            <br />
            <br />
            Chúng tôi, các thành viên tham gia Sàn thương mại điện tử Asizon, cam kết tuân thủ các tiêu chuẩn cộng đồng
            nhằm xây dựng một môi trường kinh doanh lành mạnh, an toàn và tôn trọng lẫn nhau.
            <br />
            <br />
            <strong>Tiêu chuẩn cụ thể:</strong>
            <br />
            <br />
            <strong>1. Tôn trọng lẫn nhau:</strong>
            <br />
            <br />
            a. Không sử dụng ngôn từ xúc phạm, phân biệt đối xử hoặc gây tổn thương đến người khác.
            <br />
            <br />
            b. Tôn trọng quyền riêng tư và bảo mật thông tin cá nhân của các thành viên khác.
            <br />
            <br />
            <strong>2. Hành xử trung thực và minh bạch:</strong>
            <br />
            <br />
            a. Cung cấp thông tin chính xác và đầy đủ về sản phẩm, dịch vụ và hoạt động kinh doanh.
            <br />
            <br />
            b. Không gian lận, lừa đảo hoặc thực hiện các hành vi không trung thực trong giao dịch.
            <br />
            <br />
            <strong>3. Bảo vệ quyền lợi người tiêu dùng:</strong>
            <br />
            <br />
            a. Đảm bảo chất lượng sản phẩm và dịch vụ đúng như cam kết.
            <br />
            <br />
            b. Giải quyết kịp thời và thỏa đáng các khiếu nại, phản hồi từ khách hàng.
            <br />
            <br />
            <strong>4. Hợp tác và chia sẻ:</strong>
            <br />
            <br />
            a. Hỗ trợ và hợp tác với các thành viên khác để cùng phát triển.
            <br />
            <br />
            b. Chia sẻ kiến thức, kinh nghiệm và thông tin hữu ích nhằm nâng cao chất lượng cộng đồng.
            <br />
            <br />
            <strong>Trách nhiệm chung:</strong>
            <br />
            <br />
            Các thành viên tham gia Sàn thương mại điện tử B2B Asizon cam kết thực hiện các trách nhiệm chung sau đây
            nhằm xây dựng một cộng đồng kinh doanh bền vững và thịnh vượng:
            <br />
            <br />• Tuân thủ các quy định pháp luật và tiêu chuẩn cộng đồng: Đảm bảo mọi hoạt động kinh doanh, sản xuất
            và giao dịch trên sàn Asizon tuân thủ các quy định pháp luật và tiêu chuẩn cộng đồng.
            <br />
            <br />• Chia sẻ kiến thức và kinh nghiệm: Chủ động trao đổi thông tin, sáng kiến và giải pháp về kinh doanh
            bền vững, bảo vệ quyền lợi người tiêu dùng và xây dựng cộng đồng lành mạnh với các thành viên khác trên sàn.
            <br />
            <br />• Thúc đẩy các sản phẩm và dịch vụ chất lượng: Ưu tiên kinh doanh và quảng bá các sản phẩm và dịch vụ
            chất lượng, an toàn và có nguồn gốc rõ ràng, đồng thời khuyến khích người tiêu dùng lựa chọn các sản phẩm và
            dịch vụ này.
            <br />
            <br />• Xây dựng chuỗi cung ứng bền vững: Tham gia vào các sáng kiến hoặc chương trình hợp tác trong chuỗi
            cung ứng nhằm giảm thiểu lãng phí tài nguyên, tối ưu hóa việc sử dụng năng lượng và bảo vệ môi trường.
            <br />
            <br />• Bảo vệ quyền lợi và lợi ích của cộng đồng: Thực hiện các biện pháp bảo vệ quyền lợi và lợi ích của
            cộng đồng, hạn chế xâm phạm đến các quyền lợi hợp pháp của các thành viên khác.
            <br />
            <br />• Hợp tác vì lợi ích cộng đồng: Góp phần xây dựng cộng đồng doanh nghiệp có trách nhiệm xã hội cao
            thông qua các hoạt động bảo vệ quyền lợi người tiêu dùng, hỗ trợ phát triển kinh tế bền vững và chia sẻ lợi
            ích kinh tế.
            <br />
            <br />• Thực hiện báo cáo và đánh giá: Định kỳ cung cấp báo cáo về các nỗ lực và kết quả thực hiện cam kết
            tiêu chuẩn cộng đồng, đồng thời phối hợp với Ban quản lý sàn Asizon để theo dõi, đánh giá hiệu quả của các
            cam kết này.
            <br />
            <br />
            Nhận thức rằng xây dựng một cộng đồng kinh doanh lành mạnh và bền vững là trách nhiệm chung, chúng tôi – các
            thành viên của Asizon – cùng đồng lòng và hành động để tạo nên một môi trường kinh doanh an toàn, tôn trọng
            và thịnh vượng.
            <br />
            <br />
            Bằng việc đăng ký tham gia sàn thương mại điện tử Asizon, bạn và chúng tôi cùng đồng thuận tuân thủ và triển
            khai các cam kết tiêu chuẩn cộng đồng trên trong hoạt động kinh doanh của mình. Chúng tôi tin rằng, cùng
            nhau, chúng ta có thể tạo nên một cộng đồng kinh doanh bền vững, góp phần xây dựng một tương lai tốt đẹp hơn
            cho các thế hệ sau.
            <br />
            <br />
            Chúng tôi trân trọng cam kết!
        </Typography>
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
                                whiteSpace: 'normal',
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
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
                                whiteSpace: 'normal',
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
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
                                    fontSize: { xs: '0.8rem', sm: '1.1rem', md: '1.4rem' },
                                    overflowY: 'auto',
                                    overflow: 'hidden',
                                    wordWrap: 'break-word',
                                    overflowWrap: 'break-word',
                                    lineHeight: 2,
                                }}
                            >
                                {title}
                            </Typography>
                        </Grid>
                    </Grid>
                    <PolicyContent
                        sx={{
                            whiteSpace: 'pre-line',
                            wordWrap: 'break-word',
                        }}
                        content={content}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default PrivacyPage;
