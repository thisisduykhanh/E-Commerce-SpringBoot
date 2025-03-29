'use client';
import * as React from 'react';
import PolicyContent from '@/components/PolicyContent/PolicyContent';
import PolicySidebar from '@/components/PolicySideBar/PolicySideBar';
import { Box, Drawer, Grid2 as Grid, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function PrivacyPage() {
    const title = 'CHÍNH SÁCH CHUNG VÀ ĐIỀU KIỆN MUA BÁN SẢN PHẨM';
    const content = (
        <>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Chính sách chung và Điều kiện Mua bán Sản phẩm (sau đây gọi là “Chính sách chung”) này được áp dụng đối
                với bất kỳ và tất cả các hoạt động mua bán Sản phẩm (như được định nghĩa dưới đây) giữa Quý khách (như
                được định nghĩa dưới đây) và Asizon.vn (như được định nghĩa dưới đây) thông qua Gian hàng điện tử được
                vận hành trên website thương mại điện tử https://www.asizon.vn. Chính sách chung này được soạn thảo và
                có thể được sửa đổi, bổ sung và/hoặc thay thế bởi Asizon.vn tùy từng thời điểm trên cơ sở tuân thủ các
                quy định hiện hành của pháp luật Việt Nam.
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                I. ĐỊNH NGHĨA
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                1. “Asizon.vn” hay “Chúng tôi” nghĩa là sàn thương mại điện tử Asizon.vn, một website được thiết kế và
                vận hành bởi Công ty Cổ phần Á Đông Thịnh Vượng – một công ty được thành lập và hoạt động hợp pháp theo
                Giấy chứng nhận đăng ký doanh nghiệp số ……………… do Sở Kế hoạch và Đầu tư Tp. Hồ Chí Minh cấp ngày ……………
                <br />
                2. “Quý khách” nghĩa là bất kỳ cá nhân, tổ chức nào thực hiện các giao dịch mua bán Sản phẩm trên sàn
                thương mại điện tử Asizon.vn.
                <br />
                3. Sản phẩm là bất kỳ hoặc toàn bộ sản phẩm được kinh doanh trên sàn thương mại điện tử Asizon.vn.
                <br />
                4. Sự kiện bất khả kháng: là bất kỳ sự kiện, tình huống nào nằm ngoài tầm kiểm soát hợp lý khiến cho một
                hoặc hai Bên không thể thực hiện nghĩa vụ của mình, bao gồm nhưng không giới hạn bởi lệnh cấm hoặc trì
                hoãn của Chính phủ hoặc cơ quan Nhà nước, bạo động, chiến tranh, tình trạng khẩn cấp Quốc gia (có tuyên
                bố hoặc không có tuyên bố), sự thù địch, sự hỗn loạn, đình công, hành động của người nằm trong diện nguy
                hiểm, sự tẩy chay, thừa nhận, các tranh chấp lao động khác và bãi công, dịch bệnh, hỏa hoạn, lũ lụt,
                động đất, bão, sóng thần hoặc các thiên tai….
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                II. CAM KẾT
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Bằng việc tạo đơn hàng và/hoặc tài khoản trên sàn thương mại điện tử Asizon.vn theo Chính sách chung
                này, Quý khách cam kết và đồng ý rằng:
                <br />- Quý khách luôn tuân thủ và chịu sự ràng buộc bởi Chính sách chung này trong suốt quá trình mua
                bán trên sàn thương mại điện tử Asizon.vn cũng như thực hiện các hoạt động, dịch vụ có liên quan khác.
                <br />- Quý khách có đầy đủ năng lực theo quy định pháp luật để thực thi tất cả các nghĩa vụ phát sinh
                từ các giao dịch trên sàn thương mại điện tử Asizon.vn theo Chính sách chung này bao gồm cả việc có được
                tất cả sự cho phép nội bộ và đáp ứng các quy định pháp luật hoặc của các cơ quan thẩm quyền khác (nếu
                có).
                <br />- Tất cả những thông tin Quý khách cung cấp trên nền tảng Asizon.vn là đầy đủ và chính xác.
                <br />- Việc thanh toán cho các đơn đặt hàng trên sàn thương mại điện tử Asizon.vn sẽ được thực hiện
                theo chính sách thanh toán của Asizon. Thông tin về các đơn vị cung cấp dịch vụ thanh toán sẽ được thể
                hiện trên website Asizon.vn tại bước Thanh toán và có thể được sửa đổi, bổ sung bởi Asizon tùy từng thời
                điểm.
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                III. ĐĂNG KÝ TÀI KHOẢN
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                - Quý khách có thể đăng ký tài khoản bằng cách vào mục &quot;Đăng nhập/Đăng ký&quot; ở đầu trang và chọn
                &quot;Đăng ký ngay&quot; sau đó làm theo hướng dẫn.
                <br />- Sau khi đăng ký thành công, Quý khách sẽ trở thành Thành viên của sàn thương mại điện tử
                Asizon.vn và được tận hưởng các ưu đãi đặc biệt dành riêng cho Thành viên như khuyến mại, miễn phí vận
                chuyển, tạo gian hàng miễn phí,…
                <br />- Quý khách có thể quản lý và cập nhật thông tin tài khoản của mình tại mục &quot;tài khoản của
                tôi&quot; sau khi đăng nhập.
                <br />
                Lưu ý:
                <br />- Việc bảo mật thông tin cá nhân như tài khoản đăng nhập và mật khẩu luôn được sàn thương mại điện
                tử Asizon.vn khuyến nghị nhằm hạn chế các vấn đề rò rỉ thông tin cá nhân cũng như các bất lợi có thể ảnh
                hưởng đến quyền lợi Thành viên của Quý khách.
                <br />- Sàn thương mại điện tử Asizon.vn bảo lưu quyền phong tỏa tài khoản và/hoặc hủy đơn hàng của Quý
                khách nếu Quý khách không đảm bảo được các cam kết quy định tại Chính sách chung này.
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                IV. SẢN PHẨM
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                - Các Sản phẩm được kinh doanh trên sàn thương mại điện tử Asizon.vn đều có đầy đủ giấy tờ pháp lý chứng
                minh nguồn gốc và mức độ an toàn của sản phẩm.
                <br />- Sàn thương mại điện tử Asizon.vn luôn cố gắng để các thông tin và hình ảnh về Sản phẩm được hiển
                thị chính xác nhất. Tuy nhiên, các sơ suất về thông tin cũng như sai khác về hình ảnh, màu sắc vẫn có
                thể xảy ra do thiết bị hiển thị của Quý khách hoặc các yếu tố khách quan.
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                V. GIÁ SẢN PHẨM
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                - Giá của các Sản phẩm sẽ được niêm yết trên Gian hàng của đối tác bán hàng và chỉ có hiệu lực trong
                thời gian hiển thị. Giá Sản phẩm đã bao gồm thuế GTGT. Trừ khi có quy định khác đi trong Thông báo giao
                Sản phẩm, giá niêm yết trên Gian hàng là giá đã bao gồm phí giao hàng.
                <br />- Giá của Sản phẩm có thể được cập nhật theo từng thời điểm, tuy nhiên những thay đổi này sẽ không
                được áp dụng trong trường hợp Chúng tôi đã gửi đến Quý khách “Thông báo xác nhận đặt hàng”.
                <br />- Vì có rất nhiều nhà bán, mỗi nhà bán có thể phân phối sản phẩm tương tự với nhiều mức giá khác
                nhau vào cùng một thời điểm tuỳ vào chất lượng và chiến lược bán hàng của mỗi nhà bán hàng. Quý khách
                được quyền tự do lựa chọn mức giá phù hợp nhất đang có hiệu lực áp dụng với mình.
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                VI. MUA HÀNG
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                1. Đơn đặt hàng
                <br />- Quý khách lựa chọn Sản phẩm phù hợp với nhu cầu, số lượng sản phẩm cần mua và thêm vào giỏ hàng
                <br />- Cung cấp đầy đủ và chính xác thông tin giao hàng.
                <br />- Việc thanh toán sẽ được thực hiện trực tuyến thông qua hệ thống cổng thanh toán của đơn vị cung
                cấp dịch vụ trung gian thanh toán được tích hợp ngay trên Gian hàng hoặc các hình thức thanh toán khác
                như COD, chuyển khoản ngân hàng.
                <br />- Quý khách vui lòng kiểm tra kỹ mọi thông tin liên quan đến Đơn đặt hàng trước khi Thanh toán.
                Sau khi thanh toán thành công, Đơn đặt hàng sẽ được tự động gửi vào hệ thống quản lý đơn hàng của nhà
                bán trên sàn thương mại điện tử Asizon.vn. Ngoài ra, với các hình thức thanh toán khác, sau khi bấm đặt
                đơn hàng thì nhà bán trên Asizon.vn cũng sẽ nhận được yêu cầu đặt hàng từ Quý khách.
                <br />- Đơn đặt hàng được Quý khách tạo lập và gửi cho sàn thương mại điện tử Asizon.vn theo cách thức
                trên được xem là một đề nghị giao kết hợp đồng mua bán Sản phẩm của Quý khách theo Chính sách chung này.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                2. Xác nhận đơn hàng
                <br />- Sau khi đặt hàng thành công, Quý khách sẽ nhận được thông báo xác nhận đơn hàng từ sàn thương
                mại điện tử Asizon.vn đã kèm theo số tham chiếu Đơn đặt hàng và chi tiết về Sản phẩm mà Quý khách đã
                đặt.
                <br />- Sau khi nhà bán của sàn thương mại điện tử Asizon.vn lên mã vận đơn, Quý khách sẽ không thể hủy
                đơn đặt hàng.
                <br />- Thông báo xác nhận đơn hàng được gửi cho Quý khách được xem là lời chấp nhận giao kết Hợp đồng
                mua bán Sản phẩm với Quý khách từ nhà bán của sàn thương mại điện tử Asizon.vn. Khi đó, Hợp đồng mua bán
                giữa Quý khách và nhà bán trên sàn thương mại điện tử Asizon.vn chính thức được xác lập theo các điều
                khoản và điều kiện quy định tại Chính sách chung này.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                3. Kiểm tra tình trạng đơn hàng
                <br />
                Quý khách có thể kiểm tra đơn đặt hàng bằng cách:
                <br />- Bước 1: Đăng nhập
                <br />- Bước 2: Chọn &quot;Đơn hàng của tôi&quot;
                <br />- Bước 3: Chọn &quot;Chi tiết&quot; để xem tình trạng của đơn hàng mong muốn
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                4. Hủy đơn hàng
                <br />- Quý khách chỉ có thể hủy đơn hàng trước khi vận đơn được tạo (đơn hàng còn hiển thị chức năng
                “Hủy bỏ”).
                <br />- Quý khách sẽ nhận được email thông báo hủy đơn hàng cho các đơn hàng được hủy bỏ thành công.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                5. Hoàn tiền
                <br />- Quý khách sẽ được hoàn trả toàn bộ hoặc một phần khoản thanh toán cho đơn hàng được hủy bỏ thành
                công tuỳ vào thời gian huỷ đơn hàng và tuỳ vào lý do huỷ đơn hàng
                <br />- Thời gian hoàn tiền:
                <br />+ Đối với thanh toán chuyển khoản, COD, thẻ ATM, phương thức QRcode: trong vòng 15 ngày làm việc.
                <br />+ Đối với thẻ quốc tế: trong kỳ sao kê gần nhất nhưng tối đa là 45 ngày (tùy loại thẻ và ngân hàng
                phát hành)
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                VII. HÓA ĐƠN
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                - Hóa đơn tài chính hợp pháp sẽ được xuất và gửi cho Quý khách thông qua email đăng ký trong tài khoản
                theo các thông tin Quý khách đã cung cấp.
                <br />- Sàn thương mại điện tử Asizon.vn bảo lưu quyền từ chối điều chỉnh và/hoặc xuất lại hóa đơn trong
                trường hợp Quý khách cung cấp thông tin không chính xác.
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                VIII. BẢO HÀNH
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Chính sách bảo hành sản phẩm (Nếu có) được cập nhật theo chính sách bảo hành của nhà bán, Quý khách vui
                lòng tìm hiểu kỹ chính sách từ nhà bán trước khi mua sản phẩm.
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                IX. CHÍNH SÁCH ĐỔI TRẢ
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Vui lòng tham khảo “Chính sách đổi trả” được gắn dưới chân trang của sàn thương mại điện tử Asizon.vn.
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                X. SỰ KIỆN BẤT KHẢ KHÁNG
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                - Chúng tôi không chịu trách nhiệm với bất kỳ vi phạm hay chậm trễ trong việc thực thi các nghĩa vụ của
                chúng tôi theo một Hợp đồng mua bán do một Sự kiện bất khả kháng.
                <br />- Nếu Sự kiện bất khả kháng xảy ra, ảnh hướng tới việc thực hiện các nghĩa vụ của chúng tôi theo
                Hợp đồng mua bán thì:
                <br />
                (a) Chúng tôi sẽ thông báo cho Quý khách nhanh nhất có thể;
                <br />
                (b) Các nghĩa vụ của chúng tôi theo Hợp đồng mua bán sẽ được tạm ngưng và thời gian thực hiện nghĩa vụ
                của chúng tôi sẽ được gia hạn dựa trên khoảng thời gian diễn ra Sự kiện bất khả kháng.
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                XI. PHIẾU MUA HÀNG ĐIỆN TỬ (E-VOUCHER)
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                - Quý khách có thể sử dụng phiếu mua hàng điện tử do sàn thương mại điện tử Asizon.vn phát hành để thanh
                toán cho các giao dịch được thực hiện trên Asizon.vn.
                <br />- Mỗi đơn đặt hàng có thể áp dụng chỉ một hoặc cùng lúc nhiều phiếu mua hàng, tùy vào sản phẩm và
                chương trình đang áp dụng. Tuy nhiên phiếu mua hàng có thể không có hiệu lực với các đơn hàng có chứa
                các Sản phẩm không áp dụng hình thức thanh toán bằng phiếu mua hàng.
                <br />- Trường hợp giá trị phiếu mua hàng không đủ để thanh toán cho toàn bộ giá trị đơn đặt hàng thì
                Quý khách cần thanh toán phần còn lại bằng các hình thức thanh toán được chấp nhận khác.
                <br />- Việc chuyển nhượng phiếu mua hàng hoặc sử dụng phiếu mua hàng bởi bên thứ 3 có thể được chấp
                nhận đối với các phiếu mua hàng không ghi rõ thông tin chủ sở hữu.
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
                                    fontSize: { xs: '0.8rem', sm: '1.1rem', md: '1.4rem' },
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
