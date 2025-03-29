'use client';
import * as React from 'react';
import PolicyContent from '@/components/PolicyContent/PolicyContent';
import { Box, Button, Grid2 as Grid, Typography } from '@mui/material';

function A() {
    const title = 'A & Q';
    const [showMore, setShowMore] = React.useState(false);

    // Hàm để cập nhật state khi nhấn nút "Xem thêm"
    const handleShowMore = () => {
        setShowMore(true);
    };

    // Hàm để cập nhật state khi nhấn nút "Ẩn bớt"
    const handleShowLess = () => {
        setShowMore(false);
    };
    const content = (
        <>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                1. DÀNH CHO NHÀ MUA
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                a. Chính sách Bảo đảm hàng hóa
            </Typography>
            <Typography variant="body1">
                Asizon.vn đảm bảo hàng hóa đăng ký tham gia chương trình “Asizon Đảm Bảo” Để xác định được hàng hóa đạt
                điều kiện, Asizon.vn có hệ thống phân loại, xác thực và thẩm định uy tín đầu vào với các Nhà cung cấp
                đăng ký tham gia chương trình bao gồm:
                <ul>
                    <li>Yêu cầu cam kết sản phẩm đúng với mô tả</li>
                    <li>Giấy phép kinh doanh</li>
                    <li>Chứng nhận đại lý và giấy phép phân phối</li>
                    <li>Xác thực kho hàng và hệ thống kho vận</li>
                </ul>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                VỀ GIAO DỊCH ĐƠN HÀNG
            </Typography>
            <Typography variant="body1">
                Asizon.vn đảm bảo an toàn giao dịch trên mỗi đơn hàng phát sinh đồng thời cho cả Nhà cung cấp (người
                bán) và Nhà mua (người mua)
                <br />
                <br />
                Cụ thể, Asizon.vn hỗ trợ:
                <ul>
                    <li>Nhà cung cấp xác nhận đơn hàng mới phát sinh của Nhà mua trên hệ thống quản lý của Asizon</li>
                    <li>Nhận và giữ thanh toán từ Nhà mua</li>
                    <li>Cùng các đối tác vận chuyển liên kết hỗ trợ Nhà cung cấp giao hàng</li>
                    <li>Nhà mua nhận hàng</li>
                    <li>Hỗ trợ xử lý khiếu nại phát sinh (nếu có)</li>
                    <li>Đối soát đơn hàng và thanh toán cho Nhà cung cấp khi giao dịch hoàn tất an toàn</li>
                </ul>
            </Typography>
            <Typography variant="body1">
                Asizon.vn có các biện pháp hỗ trợ bảo vệ cho Nhà mua không bị tình trạng đơn hàng đã thanh toán nhưng
                không được giao, đơn hàng lỗi, hư hỏng, Nhà cung cấp lừa đảo… Nếu phát sinh lỗi từ Nhà cung cấp tham gia
                Asizon Đảm Bảo, Asizon.vn sẽ có chế tài phù hợp và hỗ trợ chi phí vận hành đơn hàng cũng như đổi trả
                linh hoạt cho Nhà mua
                <br />
                <br /> Asizon.vn có các biện pháp hỗ trợ bảo vệ cho Nhà cung cấp không bị tình trạng đơn hàng ảo, “bom
                hàng”. Nếu phát sinh lỗi từ Nhà mua có tham gia Asizon Đảm Bảo, Asizon.vn sẽ có hình thức chế tài phù
                hợp và hỗ trợ chi phí vận hành đơn hàng hoàn lại cho Nhà cung cấp.
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                b. Chính sách thành viên Asihood
            </Typography>
            <Typography variant="body1">
                Chào mừng bạn đến với Chương trình Thành viên Asizon! Khi trở thành thành viên trả phí hằng năm với mức
                phí 99 USD, bạn sẽ được tận hưởng các đặc quyền vượt trội dưới đây:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                1. Miễn phí vận chuyển trong nước
                <ul>
                    <li>
                        Thành viên sẽ được miễn phí vận chuyển toàn bộ các đơn hàng trong phạm vi lãnh thổ Việt Nam,
                        không giới hạn số lượng hay giá trị đơn hàng
                    </li>
                    <li>Áp dụng cho tất cả các phương thức vận chuyển tiêu chuẩn.</li>
                </ul>
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                2. Quyền yêu cầu đặt hàng sớm
                <ul>
                    <li>Thành viên được ưu tiên đặt trước các sản phẩm mới, hot, hoặc giới hạn số lượng</li>
                    <li>
                        Thời gian đặt hàng sớm sẽ được thông báo qua email hoặc ứng dụng Asizon, đảm bảo bạn luôn là
                        người dẫn đầu xu hướng
                    </li>
                </ul>
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                3. Ưu đãi độc quyền dành riêng cho thành viên
                <ul>
                    <li>Truy cập các chương trình khuyến mãi, giảm giá đặc biệt chỉ dành cho thành viên</li>
                    <li>
                        Nhận thông tin về các sự kiện hoặc chương trình ưu đãi trước khi chúng được công bố rộng rãi
                    </li>
                    <li>Tích lũy thêm điểm thưởng khi mua sắm để đổi lấy quà tặng hấp dẫn</li>
                </ul>
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Điều khoản và điều kiện áp dụng
            </Typography>
            <Typography variant="body1">
                1. Phí thành viên 99 USD sẽ được thanh toán hằng năm và không hoàn lại trong bất kỳ trường hợp nào.
                <br />
                <br />
                2. Quyền lợi thành viên chỉ áp dụng cho tài khoản đã đăng ký và không được chuyển nhượng.
                <br />
                <br />
                3. Chính sách miễn phí vận chuyển không áp dụng cho các đơn hàng quốc tế hoặc các đơn hàng yêu cầu dịch
                vụ vận chuyển đặc biệt.
                <br />
                <br />
                4. Asizon có quyền thay đổi hoặc điều chỉnh các lợi ích của chương trình thành viên nhưng cam kết thông
                báo trước tối thiểu 30 ngày.
                <br />
                <br />
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Làm thế nào để tham gia?
            </Typography>
            <Typography variant="body1">
                Đăng ký ngay hôm nay trên website Asizon để trở thành thành viên và trải nghiệm mua sắm đẳng cấp!
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                2. DÀNH CHO NHÀ BÁN
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                a. Các câu hỏi thường gặp khi bắt đầu bán hàng trên Asizon
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Ai có thể tạo tài khoản bán hàng trên Asizon.vn? Và làm thế nào để có thể bán hàng trên Asizon.vn?
                <ul>
                    <li>Tất cả mọi người đều có thể tạo tài khoản bán hàng và đăng bán sản phẩm trên Asizon.vn</li>
                    <li>
                        Để bán hàng trên Asizon.vn, nhà cung cấp chỉ cần tạo tài khoản bán hàng bằng cách đăng ký tại
                        Kênh Bán Hàng hoặc đăng ký như bình thường và chọn loại tài khoản Bán Sỉ.
                    </li>
                </ul>
            </Typography>
            <Typography variant="body1">Cần làm gì khi bắt đầu bán hàng trên Asizon.vn?</Typography>
            <Typography variant="body1">
                Bước 1: Đăng nhập vào Kênh Người Bán tại địa chỉ: https://banhang.asizon.vn <br />
                <br />
                Bước 2: Đăng bán sản phẩm tại Sản phẩm =&gt; Thêm sản phẩm
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Bán hàng trên Asizon.vn sẽ bao gồm những chi phí nào?
            </Typography>
            <Typography variant="body1">
                1. Đối với hình thức bán hàng thông qua giao tiếp trực tiếp (không thông qua sàn), Asizon.vn không thu
                bất cứ chi phí nào.
                <br />
                <br />
                2. Hiện tại, Asizon là một nền tảng miễn phí dành riêng cho nhà bán và khi thay đổi chính sách này thì
                chúng tôi sẽ có thông báo đến với nhà bán. Chúng tôi sẽ thu 10% với mỗi đơn hàng thành công khi giao
                dịch tại nền tảng Asizon.vn.
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Tôi sẽ nhận được lợi ích gì khi bán hàng trên Asizon.vn?
            </Typography>
            <Typography variant="body1">
                Trên Asizon.vn nhà cung cấp sẽ nhận được hiệu quả chính là những liên hệ (lead) thay vì đơn hàng do đặc
                thù mua bán sỉ. Một liên hệ được tính khi: <br />
                <br />
                1. Khách hàng bấm xem SĐT hoặc nhắn tin
                <br />
                <br />
                2. Khách hàng gửi yêu cầu hỏi mua hàng
                <br />
                <br />
                3. Khách hàng đặt hàng
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Asizon hiện không thu bất cứ chi phí nào khi có phát sinh liên hệ (lead) mới.
                <br />
                <br />
                Làm thế nào tôi biết mình có đơn đặt hàng mới?
                <ul>
                    <li>
                        Ngay khi có đơn hàng mới, bạn sẽ nhận được thông báo trên Nền tảng/Website và Email (nếu có).
                    </li>
                    <li>
                        Sau đó bạn cần phải xử lý đơn hàng trong thời gian sớm nhất có thể để tăng hiệu quả vận hành
                        gian hàng.
                    </li>
                </ul>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Tôi sẽ làm gì sau khi có đơn hàng mới?
            </Typography>
            <Typography variant="body1">
                Sau khi người mua đặt hàng, bạn sẽ cần phải xử lý đơn hàng theo quy trình sau:
                <br />
                <br />
                Bước 1: Xác nhận đơn hàng
                <br />
                <br />
                Bước 2: Chờ thanh toán nếu đơn hàng là đơn Thanh toán trước
                <br />
                <br />
                Bước 3: Đóng gói sản phẩm
                <br />
                <br />
                Bước 4: In phiếu gửi hàng và dán lên đơn hàng
                <br />
                <br />
                Bước 5: Giao hàng cho Đơn vị vận chuyển khi đơn vị vận chuyển đến lấy hàng.
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Asizon.vn hợp tác với những đơn vị vận chuyển nào để giao hàng?
            </Typography>
            <Typography variant="body1">
                Asizon hợp tác với nhiều đơn vị vận chuyển khác nhau, nhà mua sẽ được phép lựa chọn nhà vận chuyển cho
                mỗi đơn hàng của mình
                <br />
                <br />
                Ngoài ra chúng tôi còn có hình thức nhà bán tự vận chuyển, vui lòng liên hệ nếu bạn muốn giao hàng qua
                hình thức này.
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Khi nào tôi nhận được tiền bán hàng? Cách nhận thanh toán như thế nào?
            </Typography>
            <Typography variant="body1">
                Doanh thu của đơn hàng thành công sẽ được ghi nhận và đối soát trong vòng 48h làm việc (trừ T7 & CN)
                tính từ lúc khách nhận được hàng và không có khiếu nại gì.
                <br />
                <br />
                Khoản thanh toán sẽ được chuyển khoản đến bạn qua tài khoản ngân hàng khi bạn thực hiện rút tiền trong
                phần Tài chính và Thời gian xử lý đến khi nhận tiền thực tế sẽ là 15 ngày (trừ T7 & CN).
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Làm thế nào để tôi có thể bán sỉ trên Asizon.vn hiệu quả hơn?
            </Typography>
            <Typography variant="body1">
                Asizon cung cấp nhiều gói dịch vụ để giúp bạn có thể thúc đẩy hiệu quả quảng cáo trên trang, từ đó giúp
                tăng khả năng tiếp cận & thu hút khách hàng hơn.
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Quy chế hoạt động của Asizon.vn?
            </Typography>
            <Typography variant="body1">Vui lòng xem quy chế hoạt động</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Một số câu hỏi thường gặp khác trong quá trình bán hàng
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Kích thước banner, avatar
            </Typography>
            <Typography variant="body1">
                – Kích thước banner trang chủ là 1280×510, banner danh mục là 900x300
                <br />
                <br />– Kích thước avatar/logo đẹp là: 500×500
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                b. Cách xác nhận và xử lý đơn hàng Asizon
            </Typography>
            <Typography variant="body1">
                Bài viết này sẽ hướng dẫn nhà cung cấp (nhà bán hàng) cách xác nhận và xử lý đơn hàng trên Asizon
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Các bước xử lý đơn hàng
            </Typography>
            <Typography variant="body1">
                Sau khi người mua đặt hàng, nhà cung cấp sẽ cần xử lý đơn hàng theo quy trình cơ bản sau đây:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Quy trình đối với đơn hàng có hình thức thanh toán trước:
            </Typography>
            <Typography variant="body1">
                1. Xác nhận có thể xử lý đơn hàng
                <br />
                <br />
                2. Đợi người mua thanh toán
                <br />
                <br />
                3. Đóng gói sản phẩm sau khi người mua thanh toán
                <br />
                <br />
                4. In phiếu gửi hàng và dán lên đơn hàng
                <br />
                <br />
                5. Giao hàng cho Đơn vị vận chuyển
                <br />
                <br />
                6. Đối soát nhận thanh toán sau khi người mua nhận hàng & không có khiếu nại trả hàng
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Quy trình đối với đơn hàng thanh toán khi nhận hàng (COD):
            </Typography>
            <Typography variant="body1">
                1. Xác nhận có thể xử lý đơn hàng
                <br />
                <br />
                2. Đóng gói sản phẩm
                <br />
                <br />
                3. In phiếu gửi hàng và dán lên đơn hàng
                <br />
                <br />
                4. Giao hàng cho Đơn vị vận chuyển
                <br />
                <br />
                5. Đối soát nhận thanh toán sau khi người mua nhận hàng & không có khiếu nại trả hàng
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Chi tiết các bước xử lý đơn hàng
            </Typography>
            <Typography variant="body1">
                Bước 1: Xác nhận đơn hàng
                <br />
                <br />
                Bước 2: Chờ khách hàng thanh toán đối với đơn thanh toán trước, chuyển sang bước 3 đối với đơn hàng
                Thanh toán khi nhận hàng (COD)
                <br />
                <br />
                Bước 3: Xử lý sẵn sàng giao hàng cho nhà vận chuyển
                <br />
                <br />
                Bước 4: In hoặc ghi mã vận đơn lên trên đơn hàng, sau đó giao cho nhà vận chuyển khi nhà vận chuyển đến
                lấy hàng
                <br />
                <br />
                Bước 5: Sau khi khách hàng nhận hàng và không có khiếu nại (thời gian tối đa để khách hàng khiếu nại là
                trong vòng 48 giờ kể từ lúc nhận hàng). Bạn có thể gửi Yêu cầu rút tiền để được đối soát nhận thanh
                toán.
            </Typography>
            {showMore ? (
                <>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        3. ASIMONEY- CHI TIÊU DOANH NGHIỆP
                    </Typography>

                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        a. Hướng dẫn kích hoạt AsiMoney Vay Doanh nghiệp
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        AsiMoney Vay Doanh nghiệp là sản phẩm tín dụng cho vay dành riêng cho Người dùng Asizon, được
                        cung cấp bởi các Ngân hàng đối tác thông qua Sàn thương mại điện tử Asizon. Với AsiMoney Vay
                        doanh nghiệp, Người dùng sẽ có cơ hội tiếp cận nguồn tài chính xuyên suốt một cách thuận tiện
                        với mức lãi suất phải chăng thông qua ứng dụng Asizon.
                    </Typography>
                    <Typography variant="body1">
                        1. Tìm kiếm dịch vụ AsiMoney Vay doanh nghiệp trên ứng dụng Asizon
                        <br />
                        <br />
                        Người dùng có thể tìm và kích hoạt dịch vụ AsiMoney Vay doanh nghiệp bằng cách truy cập mục Tôi
                        &gt; tại mục Tài chính, và chọn 1 trong 2 cách sau:
                        <ul>
                            <li>Chọn AsiMoney Vay doanh nghiệp</li>
                            <li>Chọn AsiPayLater =&gt; Chọn biểu tượng/hình ảnh hiển thị AsiMoney Vay doanh nghiệp</li>
                        </ul>
                        Lưu ý: Hiện tại, AsiMoney Vay doanh nghiệp chỉ khả dụng trên ứng dụng Asizon và cho một số Người
                        dùng nhất định, thỏa điều kiện của Chính sách Asizon & Ngân hàng đối tác. Vì vậy, sẽ có trường
                        hợp một số Người dùng chưa thể tìm hoặc sử dụng được dịch vụ này.
                        <br />
                        <br />
                        Điều kiện: Yêu cầu bắt buộc: Là tài khoản Doanh nghiệp
                    </Typography>
                    <Typography variant="body1">
                        2. Hướng dẫn kích hoạt AsiMoney Vay doanh nghiệp
                        <br />
                        <br />
                        Để kích hoạt AsiMoney Vay doanh nghiệp, bạn hãy thao tác theo các bước sau:
                        <ul>
                            <li>
                                Bước 1: Tại trang chủ AsiMoney Vay doanh nghiệp, chọn Kích hoạt ngay &gt; Nhập Mã xác
                                minh
                            </li>
                            <li>
                                Bước 2: Chụp và tải lên hình ảnh Căn Cước Công Dân (CCCD) có gắn chíp của người đại diện
                                pháp luật hợp lệ &gt; Nhập & Kiểm tra chính xác thông tin CCCD hiển thị trên màn hình
                                &gt; Nhấn Gửi
                            </li>
                            <li>
                                Bước 3: Điền các thông tin cần thiết, đọc và hiểu rõ Điều khoản và Điều kiện của Dịch vụ
                                & Chính sách bảo mật và nhấn chọn vào ô vuông, sau đó chọn Xác nhận
                            </li>
                            <li>
                                Bước 4: Chọn Bắt đầu xác minh khuôn mặt để thực hiện xác minh khuôn mặt, hoàn tất quy
                                trình đăng ký.
                            </li>
                        </ul>
                        Trong quá trình kích hoạt, bạn cần lưu ý:
                        <ul>
                            <li>Sử dụng CCCD gắn chíp hợp lệ (không hỗ trợ CMND và CCCD không gắn chíp)</li>
                            <li>Thông tin bạn cung cấp trùng khớp với thông tin trên CCCD.</li>
                            <li>Thông tin cá nhân trên ảnh chụp CCCD không bị che, mờ.</li>
                            <li>Ảnh cá nhân trên CCCD phải cùng 01 người với ảnh nhận diện gương mặt.</li>
                            <li>Thông tin liên hệ được điền đầy đủ, kể cả thông tin liên hệ khẩn cấp.</li>
                        </ul>
                        Trường hợp bạn vẫn không thể kích hoạt được dù đã thực hiện đúng các lưu ý trên, vui lòng liên
                        hệ Bộ phận CSKH Asizon và cung cấp các thông tin đăng ký (Họ & tên, số CCCD gắn chíp & Số điện
                        thoại) cùng với hình ảnh/video quay lại vấn đề đang gặp phải để Asizon hỗ trợ bạn trong 3 - 5
                        ngày làm việc tiếp theo.
                    </Typography>
                    <Typography variant="body1">
                        3. Kết quả phê duyệt hồ sơ đăng ký AsiMoney Vay doanh nghiệp
                        <br />
                        <br />
                        Sau khi hoàn tất quá trình kích hoạt, hồ sơ đăng ký sẽ được phê duyệt bởi Asizon trong vòng 24
                        giờ. Sau thời gian này, bạn có thể nhận được 01 trong 02 kết quả phê duyệt như sau:
                        <ul>
                            <li>
                                Đăng ký thành công: kết quả này sẽ được gửi đến bạn tại mục Thông báo =&gt; Thông tin
                                Tài Chính trên Website Asizon. Bạn có thể kiểm tra Hạn mức vay AsiMoney (*) được phê
                                duyệt hiển thị trên trang chủ AsiMoney Vay doanh nghiệp và có thể tạo khoản vay (tối
                                thiểu 1.000.000 VNĐ) để được giải ngân về tài khoản ngân hàng đã liên kết.
                            </li>
                            <li>
                                Kích hoạt bị từ chối: bạn sẽ nhận được kết quả này tại trang Kết quả hồ sơ hoặc trang
                                chủ AsiMoney Vay doanh nghiệp với thông báo rằng: hồ sơ đăng ký của bạn đã bị từ chối do
                                một trong những nguyên nhân sau:
                                <ul>
                                    <li>Hồ sơ bị từ chối bởi Ngân hàng đối tác</li>
                                    <li>
                                        Thông tin đăng ký chưa chính xác, bạn vui lòng kiểm tra và chỉnh sửa lại thông
                                        tin, sau đó thực hiện kích hoạt lại.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        (*) Hạn mức AsiMoney Vay doanh nghiệp do Ngân hàng đối tác xem xét và quyết định, có thể thay
                        đổi theo từng thời kỳ dựa trên đánh giá của Ngân hàng đối tác với bạn và sẽ thông báo cho bạn
                        tại mục Thông báo =&gt; Thông tin tài chính trên Website Asizon
                    </Typography>

                    <Typography variant="body1">
                        4. Một số lưu ý quan trọng khi kích hoạt AsiMoney Vay doanh nghiệp
                        <br />
                        <br />- AsiMoney Vay doanh nghiệp chỉ dành cho doanh nghiệp và người đại diện doanh nghiệp là
                        công dân quốc tịch Việt Nam trong độ tuổi:
                        <ul>
                            <li>Nam: từ đủ 20 đến 60 tuổi</li>
                            <li>Nữ: từ đủ 20 đến 55 tuổi</li>
                        </ul>
                        - Để kích hoạt AsiMoney Vay doanh nghiệp, Người dùng cần đăng ký bằng CCCD 12 chữ số hợp lệ, có
                        gắn chíp và vẫn còn hiệu lực khi kích hoạt Dịch vụ AsiMoney Vay doanh nghiệp
                        <br />
                        <br />- Nếu đơn đăng ký AsiMoney Vay doanh nghiệp của bạn bị từ chối, bạn có thể thực hiện lại
                        việc kích hoạt theo nội dung hướng dẫn trên thông báo kết quả phê duyệt. Nếu thông tin được cập
                        nhật lại đầy đủ và chính xác, bạn có thể được xem xét phê duyệt để sử dụng dịch vụ.
                        <br />
                        <br />- Mỗi Người dùng sẽ có giới hạn về số lượt yêu cầu kích hoạt khác nhau. Tuy nhiên, trong
                        một số trường hợp, Người dùng có thể không đăng ký kích hoạt lại được. Do đó, Asizon khuyến
                        khích bạn nên hoàn thành đơn đăng ký thật chính xác ngay từ lần đăng ký đầu tiên.
                        <br />
                        <br />- Hạn mức tín dụng được phê duyệt của mỗi Người dùng sẽ khác nhau, được xác định bởi nhiều
                        yếu tố bao gồm thông tin đăng ký.
                        <br />
                        <br />- Sau khi kích hoạt thành công, doanh nghiệp có thể tạo khoản vay để giải ngân số tiền từ
                        hạn mức AsiMoney Vay doanh nghiệp
                        <br />
                        <br />- Sẽ không có phát sinh bất cứ khoản phí nào từ dịch vụ AsiMoney Vay doanh nghiệp nếu
                        Người dùng không tạo bất kỳ khoản vay nào hoặc không có dư nợ.
                        <br />
                        <br />- Bạn không thể hủy dịch vụ AsiMoney Vay doanh nghiệp sau khi đã kích hoạt thành công.
                        <br />
                        <br />- Nếu bạn cần thêm sự trợ giúp về dịch vụ, vui lòng liên hệ Bộ phận CSKH Asizon để được hỗ
                        trợ.
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        b. Lợi ích của AsiMoney Vay doanh nghiệp
                    </Typography>
                    <Typography variant="body1">
                        1. Lợi ích của AsiMoney Vay doanh nghiệp là gì?
                        <br />
                        <br />
                        AsiMoney Vay doanh nghiệp là dịch vụ cho vay dành riêng cho Người dùng được xác minh trên Nền
                        tảng Asizon, được cung cấp bởi các ngân hàng đối tác thông qua sàn thương mại điện tử Asizon.
                        Người dùng sử dụng AsiMoney Vay doanh nghiệp sẽ được hưởng các lợi ích (*) sau:
                        <ul>
                            <li>
                                Quy trình đăng ký dễ dàng và nhanh chóng, không yêu cầu chứng minh thu nhập, thẩm định
                                hồ sơ vay trong vòng 24 giờ
                            </li>
                            <li>Giải ngân nhanh chóng trực tiếp vào tài khoản ngân hàng của bạn trong vòng 01 phút</li>
                            <li>Lãi suất cạnh tranh, chỉ từ 2.5%/tháng</li>
                            <li>Không phí quản lý</li>
                            <li>Cho phép thanh toán khoản vay đa kênh một cách tự động, nhanh chóng và bảo mật</li>
                            <li>Thời hạn vay linh hoạt trong 3, 6, 9 tháng, phù hợp với nhu cầu của bạn</li>
                        </ul>
                        (*): Theo chính sách Asizon trong từng thời kỳ
                    </Typography>
                    <Typography variant="body1">
                        2. Tại sao tôi thể không tìm thấy AsiMoney Vay doanh nghiệp?
                        <br />
                        <br />
                        Hiện tại, AsiMoney Vay doanh nghiệp hiện chỉ khả dụng cho một số Người dùng thoả mãn điều kiện
                        theo Chính sách của Asizon và Ngân hàng đối tác. Vì vậy, sẽ có trường hợp một số Người dùng chưa
                        thể tìm hoặc sử dụng được dịch vụ này. Asizon xin cảm ơn bạn đã quan tâm đến AsiMoney Vay doanh
                        nghiệp và sẽ liên tục cải tiến để mở rộng phạm vi dịch vụ tới nhiều Người dùng hơn trong thời
                        gian tới.
                    </Typography>
                    <Typography variant="body1">
                        3. AsiMoney Vay doanh nghiệp được cung cấp bởi tổ chức/cá nhân nào?
                        <br />
                        <br />
                        Lưu ý: thông tin về Tổ chức tín dụng hoặc ngân hàng đối tác cung cấp dịch vụ tín dụng có thể
                        được thay đổi tại từng thời kỳ.
                    </Typography>
                    <Typography variant="body1">
                        4. AsiMoney Vay doanh nghiệp có bao nhiêu loại kỳ hạn vay?
                        <br />
                        <br />
                        Các kỳ hạn vay đang được hỗ trợ tại AsiMoney Vay doanh nghiệp: 3 tháng, 6 tháng hoặc 9 tháng
                    </Typography>
                    <Typography variant="body1">
                        5. Lãi suất AsiMoney Vay doanh nghiệp là bao nhiêu?
                        <br />
                        <br />
                        AsiMoney Vay doanh nghiệp có mức lãi suất chỉ từ 2.5%/tháng và sẽ được thể hiện trên trang Tạo
                        khoản vay để biết mức lãi suất chính xác nhất được tính cho khoản vay của bạn. Số tiền lãi bạn
                        cần thanh toán cho mỗi tháng sẽ được tính theo lãi suất trên số dư nợ gốc còn lại vào cuối mỗi
                        tháng.
                    </Typography>
                    <Typography variant="body1">
                        6. Tiền vay sẽ được giải ngân và sử dụng thế nào?
                        <br />
                        <br />
                        Sau khi tạo khoản vay thành công và được phê duyệt, tiền sẽ được giải ngân về Tài khoản ngân
                        hàng liên kết trong vòng 24 giờ (hoặc tối đa 3 - 5 ngày làm việc, không kể Thứ 7, Chủ Nhật và
                        Ngày Lễ). Bạn có thể sử dụng khoản tiền này từ Tài khoản ngân hàng liên kết của bạn cho các mục
                        đích tiêu dùng cá nhân.
                    </Typography>
                    <Typography variant="body1">
                        7. Tôi đã nhận được thông báo giải ngân thành công trên ứng dụng. Tại sao tiền chưa được chuyển
                        vào tài khoản ngân hàng của tôi?
                        <br />
                        <br />
                        Nếu bạn đã hoàn thành tất cả các bước theo yêu cầu mà không nhận được số tiền đã vay về tài
                        khoản ngân hàng liên kết trong vòng 24 giờ (hoặc tối đa 3 - 5 ngày làm việc, không kể Thứ 7, Chủ
                        Nhật và Ngày Lễ), vui lòng liên hệ với Bộ phận Chăm sóc khách hàng Asizon theo hướng dẫn.
                    </Typography>
                    <Typography variant="body1">
                        8. Thông tin của tôi có được bảo mật khi sử dụng AsiMoney Vay doanh nghiệp không? Sử dụng
                        AsiMoney Vay doanh nghiệp có an toàn không?
                        <br />
                        <br />
                        Các thông tin được cung cấp khi đăng ký và sử dụng AsiMoney Vay doanh nghiệp sẽ được bảo mật
                        theo Điều kiện và Điều khoản AsiMoney Vay doanh nghiệp và Chính sách bảo mật của các bên và đối
                        tác cung cấp dịch vụ, đảm bảo tuân thủ các quy định và pháp luật liên quan.
                        <br />
                        <br />
                        Khi sử dụng AsiMoney Vay doanh nghiệp, bạn có thể được liên hệ bởi Nhân viên của Ngân hàng đối
                        tác trong các trường hợp xác minh về đơn đăng ký khoản vay, khi khoản vay quá hạn hoặc chưa
                        thanh toán. Tất cả các cuộc gọi và tin nhắn trong trường hợp này sẽ chỉ hướng dẫn Người dùng
                        thao tác TRÊN WEBSITE Asizon.
                        <br />
                        <br />
                        Lưu ý: Nếu nhận được yêu cầu thực hiện thao tác BÊN NGOÀI ứng dụng Asizon hoặc gặp phải vấn đề
                        trong quá trình đăng ký và sử dụng AsiMoney Vay doanh nghiệp, vui lòng cẩn trọng và liên hệ Bộ
                        phận CSKH Asizon để được hỗ trợ kịp thời
                    </Typography>
                    <Typography variant="body1">
                        9. Có bất kỳ khoản phí ẩn nào khi sử dụng AsiMoney Vay doanh nghiệp không?
                        <br />
                        <br />
                        Ngoại trừ lãi suất & lãi quá hạn (lãi quá hạn chỉ phát sinh nếu bạn không thanh toán khoản vay
                        đúng hạn), sẽ không có khoản phí ẩn nào khác khi sử dụng AsiMoney Vay doanh nghiệp. Ví dụ: không
                        có phí xử lý hồ sơ, phí quản lý, phí thu hộ.
                    </Typography>
                    <Typography variant="body1">
                        10. Sử dụng AsiMoney Vay doanh nghiệp có ảnh hưởng đến lịch sử tín dụng của tôi?
                        <br />
                        <br />
                        Khi bạn tạo khoản vay với AsiMoney Vay doanh nghiệp và thanh toán khoản vay đúng hạn, khả năng
                        tài chính của bạn đã được chứng minh. Điều này có thể giúp tăng điểm tín dụng của doanh nghiệp
                        bạn, mở ra cơ hội tiếp cận các hạn mức tín dụng lớn hơn trong tương lai như vay mua nhà, vay mua
                        ô tô, v.v.
                        <br />
                        <br />
                        Khi bạn có khoản thanh toán quá hạn với AsiMoney Vay doanh nghiệp, lịch sử thanh toán khoản vay
                        của bạn sẽ được cập nhật lên Trung tâm thông tin tín dụng quốc gia Việt Nam (CIC) và có thể ảnh
                        hưởng đến lịch sử tín dụng của bạn.
                    </Typography>
                    <Typography variant="body1">
                        11. Làm thế nào để tăng hạn mức AsiMoney Vay doanh nghiệp của tôi?
                        <br />
                        <br />
                        Hạn mức tín dụng của mỗi Người dùng sẽ khác nhau và được xác định bởi nhiều yếu tố, bao gồm
                        thông tin đăng ký đã nộp. Asizon khuyến khích Người dùng sử dụng AsiMoney Vay doanh nghiệp
                        thường xuyên và trả các khoản vay đúng hạn để có lịch sử tín dụng tốt, làm cơ sở cho việc tăng
                        hạn mức tín dụng trong tương lai.
                    </Typography>
                    <Typography variant="body1">
                        12. Hạn mức khả dụng tạm thời là gì? Điều gì xảy ra nếu hạn mức này hết thời hạn sử dụng?
                        <br />
                        <br />- Hạn mức khả dụng tạm thời AsiMoney Vay doanh nghiệp là hạn mức được cấp thêm TẠM THỜI mà
                        bạn có thể dùng để tạo khoản vay bên cạnh hạn mức đang có sẵn trong một khoảng thời gian nhất
                        định
                        <br />
                        <br />- Hạn mức tạm thời sẽ được tự động áp dụng cho một số Người dùng thỏa điều kiện tại từng
                        thời điểm nhất định và sẽ được thông báo cho Người dùng tại trang chủ AsiMoney Vay doanh nghiệp
                        <br />
                        <br />- Trong thời gian hạn mức tạm thời được áp dụng, giá trị hạn mức này sẽ được cộng vào hạn
                        mức khả dụng hiển thị tại trang chủ AsiMoney Vay doanh nghiệp. Sau khi hết thời gian sử dụng,
                        giá trị hạn mức này sẽ được trừ ra khỏi hạn mức khả dụng AsiMoney Vay doanh nghiệp.
                        <br />
                        <br />- Khi bạn tạo khoản vay trong thời gian hạn mức tạm thời có hiệu lực, hạn mức này sẽ được
                        ưu tiên sử dụng để giải ngân cho khoản vay cho đến khi bạn sử dụng hết hạn mức tạm thời.
                        <br />
                        <br />- Ví dụ về hạn mức tạm thời: AsiMoney Vay doanh nghiệp của bạn đang có:
                        <ul>
                            <li>Tổng hạn mức: 8.000.000 VNĐ</li>
                            <li>Hạn mức TẠM THỜI: 1.000.000 VNĐ (Hạn sử dụng: 1/10 - 15/10)</li>
                        </ul>
                        Bạn tạo khoản vay là 1.500.000 VNĐ, khoản vay này sẽ được giải ngân như sau: 1.000.000 VNĐ từ
                        hạn mức tạm thời và 500.000 VNĐ từ Tổng hạn mức.
                        <br />
                        <br />
                        Lưu ý:
                        <ul>
                            <li>
                                Trường hợp bạn tạo khoản vay bằng hạn mức khả dụng tạm thời, bạn vẫn cần thanh toán
                                khoản vay như bình thường nếu đến hạn thanh toán. Tuy nhiên, phần hạn mức tương ứng với
                                số tiền gốc của khoản vay sẽ không được cộng về lại hạn mức khả dụng của bạn sau khi bạn
                                thanh toán Hóa đơn thành công.
                            </li>
                            <li>
                                Hạn mức TẠM THỜI chỉ có hiệu lực sử dụng trong một thời gian nhất định, vì vậy Asizon
                                khuyến khích bạn nên sử dụng càng sớm càng tốt trước khi hết hạn sử dụng.
                            </li>
                        </ul>
                    </Typography>
                    <Typography variant="body1">13. Làm cách nào để hủy đăng ký AsiMoney Vay</Typography>
                    <Typography variant="body1">
                        1. Tìm kiếm dịch vụ AsiMoney Vay doanh nghiệp trên ứng dụng Asizon
                        <br />
                        <br />
                        Người dùng có thể tìm và kích hoạt dịch vụ AsiMoney Vay doanh nghiệp bằng cách truy cập mục Tôi
                        =&gt; tại mục Tài chính, và chọn 1 trong 2 cách sau:
                        <ul>
                            <li>Chọn AsiMoney Vay doanh nghiệp</li>
                            <li>Chọn AsiPayLater =&gt; Chọn biểu tượng/hình ảnh hiển thị AsiMoney Vay doanh nghiệp</li>
                        </ul>
                        Lưu ý: Hiện tại, AsiMoney Vay doanh nghiệp chỉ khả dụng trên ứng dụng Asizon và cho một số Người
                        dùng nhất định, thỏa điều kiện của Chính sách Asizon & Ngân hàng đối tác. Vì vậy, sẽ có trường
                        hợp một số Người dùng chưa thể tìm hoặc sử dụng được dịch vụ này.
                        <br />
                        <br />
                        Điều kiện: Yêu cầu bắt buộc: Là tài khoản Doanh nghiệp
                    </Typography>
                    <Typography variant="body1">
                        2. Hướng dẫn kích hoạt AsiMoney Vay doanh nghiệp
                        <br />
                        <br />
                        Để kích hoạt AsiMoney Vay doanh nghiệp, bạn hãy thao tác theo các bước sau:
                        <ul>
                            <li>
                                Bước 1: Tại trang chủ AsiMoney Vay doanh nghiệp, chọn Kích hoạt ngay =&gt; Nhập Mã xác
                                minh
                            </li>
                            <li>
                                Bước 2: Chụp và tải lên hình ảnh Căn Cước Công Dân (CCCD) có gắn chíp của người đại diện
                                pháp luật hợp lệ =&gt; Nhập & Kiểm tra chính xác thông tin CCCD hiển thị trên màn hình
                                =&gt; Nhấn Gửi
                            </li>
                            <li>
                                Bước 3: Điền các thông tin cần thiết, đọc và hiểu rõ Điều khoản và Điều kiện của Dịch vụ
                                & Chính sách bảo mật và nhấn chọn vào ô vuông, sau đó chọn Xác nhận
                            </li>
                            <li>
                                Bước 4: Chọn Bắt đầu xác minh khuôn mặt để thực hiện xác minh khuôn mặt, hoàn tất quy
                                trình đăng ký.
                            </li>
                        </ul>
                        Trong quá trình kích hoạt, bạn cần lưu ý:
                        <ul>
                            <li>Sử dụng CCCD gắn chíp hợp lệ (không hỗ trợ CMND và CCCD không gắn chíp)</li>
                            <li>Thông tin bạn cung cấp trùng khớp với thông tin trên CCCD.</li>
                            <li>Thông tin cá nhân trên ảnh chụp CCCD không bị che, mờ.</li>
                            <li>Ảnh cá nhân trên CCCD phải cùng 01 người với ảnh nhận diện gương mặt.</li>
                            <li>Thông tin liên hệ được điền đầy đủ, kể cả thông tin liên hệ khẩn cấp.</li>
                        </ul>
                        Trường hợp bạn vẫn không thể kích hoạt được dù đã thực hiện đúng các lưu ý trên, vui lòng liên
                        hệ Bộ phận CSKH Asizon và cung cấp các thông tin đăng ký (Họ & tên, số CCCD gắn chíp & Số điện
                        thoại) cùng với hình ảnh/video quay lại vấn đề đang gặp phải để Asizon hỗ trợ bạn trong 3 - 5
                        ngày làm việc tiếp theo.
                    </Typography>
                    <Typography variant="body1">
                        3. Kết quả phê duyệt hồ sơ đăng ký AsiMoney Vay doanh nghiệp
                        <br />
                        <br />
                        Sau khi hoàn tất quá trình kích hoạt, hồ sơ đăng ký sẽ được phê duyệt bởi Asizon trong vòng 24
                        giờ. Sau thời gian này, bạn có thể nhận được 01 trong 02 kết quả phê duyệt như sau:
                        <ul>
                            <li>
                                Đăng ký thành công: kết quả này sẽ được gửi đến bạn tại mục Thông báo =&gt; Thông tin
                                Tài Chính trên Website Asizon. Bạn có thể kiểm tra Hạn mức vay AsiMoney (*) được phê
                                duyệt hiển thị trên trang chủ AsiMoney Vay doanh nghiệp và có thể tạo khoản vay (tối
                                thiểu 1.000.000 VNĐ) để được giải ngân về tài khoản ngân hàng đã liên kết.
                            </li>
                            <li>
                                Kích hoạt bị từ chối: bạn sẽ nhận được kết quả này tại trang Kết quả hồ sơ hoặc trang
                                chủ AsiMoney Vay doanh nghiệp với thông báo rằng: hồ sơ đăng ký của bạn đã bị từ chối do
                                một trong những nguyên nhân sau:
                                <ul>
                                    <li>Hồ sơ bị từ chối bởi Ngân hàng đối tác</li>
                                    <li>
                                        Thông tin đăng ký chưa chính xác, bạn vui lòng kiểm tra và chỉnh sửa lại thông
                                        tin, sau đó thực hiện kích hoạt lại.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        (*) Hạn mức AsiMoney Vay doanh nghiệp do Ngân hàng đối tác xem xét và quyết định, có thể thay
                        đổi theo từng thời kỳ dựa trên đánh giá của Ngân hàng đối tác với bạn và sẽ thông báo cho bạn
                        tại mục Thông báo =&gt; Thông tin tài chính trên Website Asizon
                    </Typography>
                    <Typography variant="body1">
                        4. Một số lưu ý quan trọng khi kích hoạt AsiMoney Vay doanh nghiệp
                        <br />
                        <br />- AsiMoney Vay doanh nghiệp chỉ dành cho doanh nghiệp và người đại diện doanh nghiệp là
                        công dân quốc tịch Việt Nam trong độ tuổi:
                        <ul>
                            <li>Nam: từ đủ 20 đến 60 tuổi</li>
                            <li>Nữ: từ đủ 20 đến 55 tuổi</li>
                        </ul>
                        - Để kích hoạt AsiMoney Vay doanh nghiệp, Người dùng cần đăng ký bằng CCCD 12 chữ số hợp lệ, có
                        gắn chíp và vẫn còn hiệu lực khi kích hoạt Dịch vụ AsiMoney Vay doanh nghiệp
                        <br />
                        <br />- Nếu đơn đăng ký AsiMoney Vay doanh nghiệp của bạn bị từ chối, bạn có thể thực hiện lại
                        việc kích hoạt theo nội dung hướng dẫn trên thông báo kết quả phê duyệt. Nếu thông tin được cập
                        nhật lại đầy đủ và chính xác, bạn có thể được xem xét phê duyệt để sử dụng dịch vụ.
                        <br />
                        <br />- Mỗi Người dùng sẽ có giới hạn về số lượt yêu cầu kích hoạt khác nhau. Tuy nhiên, trong
                        một số trường hợp, Người dùng có thể không đăng ký kích hoạt lại được. Do đó, Asizon khuyến
                        khích bạn nên hoàn thành đơn đăng ký thật chính xác ngay từ lần đăng ký đầu tiên.
                        <br />
                        <br />- Hạn mức tín dụng được phê duyệt của mỗi Người dùng sẽ khác nhau, được xác định bởi nhiều
                        yếu tố bao gồm thông tin đăng ký.
                        <br />
                        <br />- Sau khi kích hoạt thành công, doanh nghiệp có thể tạo khoản vay để giải ngân số tiền từ
                        hạn mức AsiMoney Vay doanh nghiệp
                        <br />
                        <br />- Sẽ không có phát sinh bất cứ khoản phí nào từ dịch vụ AsiMoney Vay doanh nghiệp nếu
                        Người dùng không tạo bất kỳ khoản vay nào hoặc không có dư nợ.
                        <br />
                        <br />- Bạn không thể hủy dịch vụ AsiMoney Vay doanh nghiệp sau khi đã kích hoạt thành công.
                        <br />
                        <br />- Nếu bạn cần thêm sự trợ giúp về dịch vụ, vui lòng liên hệ Bộ phận CSKH Asizon để được hỗ
                        trợ.
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        b. Lợi ích của AsiMoney Vay doanh nghiệp
                    </Typography>
                    <Typography variant="body1">
                        1. Lợi ích của AsiMoney Vay doanh nghiệp là gì?
                        <br />
                        <br />
                        AsiMoney Vay doanh nghiệp là dịch vụ cho vay dành riêng cho Người dùng được xác minh trên Nền
                        tảng Asizon, được cung cấp bởi các ngân hàng đối tác thông qua sàn thương mại điện tử Asizon.
                        Người dùng sử dụng AsiMoney Vay doanh nghiệp sẽ được hưởng các lợi ích (*) sau:
                        <ul>
                            <li>
                                Quy trình đăng ký dễ dàng và nhanh chóng, không yêu cầu chứng minh thu nhập, thẩm định
                                hồ sơ vay trong vòng 24 giờ
                            </li>
                            <li>Giải ngân nhanh chóng trực tiếp vào tài khoản ngân hàng của bạn trong vòng 01 phút</li>
                            <li>Lãi suất cạnh tranh, chỉ từ 2.5%/tháng</li>
                            <li>Không phí quản lý</li>
                            <li>Cho phép thanh toán khoản vay đa kênh một cách tự động, nhanh chóng và bảo mật</li>
                            <li>Thời hạn vay linh hoạt trong 3, 6, 9 tháng, phù hợp với nhu cầu của bạn</li>
                        </ul>
                        (*): Theo chính sách Asizon trong từng thời kỳ
                    </Typography>
                    <Typography variant="body1">
                        2. Tại sao tôi thể không tìm thấy AsiMoney Vay doanh nghiệp?
                        <br />
                        <br />
                        Hiện tại, AsiMoney Vay doanh nghiệp hiện chỉ khả dụng cho một số Người dùng thoả mãn điều kiện
                        theo Chính sách của Asizon và Ngân hàng đối tác. Vì vậy, sẽ có trường hợp một số Người dùng chưa
                        thể tìm hoặc sử dụng được dịch vụ này. Asizon xin cảm ơn bạn đã quan tâm đến AsiMoney Vay doanh
                        nghiệp và sẽ liên tục cải tiến để mở rộng phạm vi dịch vụ tới nhiều Người dùng hơn trong thời
                        gian tới.
                    </Typography>
                    <Typography variant="body1">
                        3. AsiMoney Vay doanh nghiệp được cung cấp bởi tổ chức/cá nhân nào?
                        <br />
                        <br />
                        Lưu ý: thông tin về Tổ chức tín dụng hoặc ngân hàng đối tác cung cấp dịch vụ tín dụng có thể
                        được thay đổi tại từng thời kỳ.
                    </Typography>
                    <Typography variant="body1">
                        4. AsiMoney Vay doanh nghiệp có bao nhiêu loại kỳ hạn vay?
                        <br />
                        <br />
                        Các kỳ hạn vay đang được hỗ trợ tại AsiMoney Vay doanh nghiệp: 3 tháng, 6 tháng hoặc 9 tháng
                    </Typography>
                    <Typography variant="body1">
                        5. Lãi suất AsiMoney Vay doanh nghiệp là bao nhiêu?
                        <br />
                        <br />
                        AsiMoney Vay doanh nghiệp có mức lãi suất chỉ từ 2.5%/tháng và sẽ được thể hiện trên trang Tạo
                        khoản vay để biết mức lãi suất chính xác nhất được tính cho khoản vay của bạn. Số tiền lãi bạn
                        cần thanh toán cho mỗi tháng sẽ được tính theo lãi suất trên số dư nợ gốc còn lại vào cuối mỗi
                        tháng.
                    </Typography>
                    <Typography variant="body1">
                        6. Tiền vay sẽ được giải ngân và sử dụng thế nào?
                        <br />
                        <br />
                        Sau khi tạo khoản vay thành công và được phê duyệt, tiền sẽ được giải ngân về Tài khoản ngân
                        hàng liên kết trong vòng 24 giờ (hoặc tối đa 3 - 5 ngày làm việc, không kể Thứ 7, Chủ Nhật và
                        Ngày Lễ). Bạn có thể sử dụng khoản tiền này từ Tài khoản ngân hàng liên kết của bạn cho các mục
                        đích tiêu dùng cá nhân.
                    </Typography>
                    <Typography variant="body1">
                        7. Tôi đã nhận được thông báo giải ngân thành công trên ứng dụng. Tại sao tiền chưa được chuyển
                        vào tài khoản ngân hàng của tôi?
                        <br />
                        <br />
                        Nếu bạn đã hoàn thành tất cả các bước theo yêu cầu mà không nhận được số tiền đã vay về tài
                        khoản ngân hàng liên kết trong vòng 24 giờ (hoặc tối đa 3 - 5 ngày làm việc, không kể Thứ 7, Chủ
                        Nhật và Ngày Lễ), vui lòng liên hệ với Bộ phận Chăm sóc khách hàng Asizon theo hướng dẫn.
                    </Typography>
                    <Typography variant="body1">
                        8. Thông tin của tôi có được bảo mật khi sử dụng AsiMoney Vay doanh nghiệp không? Sử dụng
                        AsiMoney Vay doanh nghiệp có an toàn không?
                        <br />
                        <br />
                        Các thông tin được cung cấp khi đăng ký và sử dụng AsiMoney Vay doanh nghiệp sẽ được bảo mật
                        theo Điều kiện và Điều khoản AsiMoney Vay doanh nghiệp và Chính sách bảo mật của các bên và đối
                        tác cung cấp dịch vụ, đảm bảo tuân thủ các quy định và pháp luật liên quan.
                        <br />
                        <br />
                        Khi sử dụng AsiMoney Vay doanh nghiệp, bạn có thể được liên hệ bởi Nhân viên của Ngân hàng đối
                        tác trong các trường hợp xác minh về đơn đăng ký khoản vay, khi khoản vay quá hạn hoặc chưa
                        thanh toán. Tất cả các cuộc gọi và tin nhắn trong trường hợp này sẽ chỉ hướng dẫn Người dùng
                        thao tác TRÊN WEBSITE Asizon.
                        <br />
                        <br />
                        Lưu ý: Nếu nhận được yêu cầu thực hiện thao tác BÊN NGOÀI ứng dụng Asizon hoặc gặp phải vấn đề
                        trong quá trình đăng ký và sử dụng AsiMoney Vay doanh nghiệp, vui lòng cẩn trọng và liên hệ Bộ
                        phận CSKH Asizon để được hỗ trợ kịp thời
                    </Typography>
                    <Typography variant="body1">
                        9. Có bất kỳ khoản phí ẩn nào khi sử dụng AsiMoney Vay doanh nghiệp không?
                        <br />
                        <br />
                        Ngoại trừ lãi suất & lãi quá hạn (lãi quá hạn chỉ phát sinh nếu bạn không thanh toán khoản vay
                        đúng hạn), sẽ không có khoản phí ẩn nào khác khi sử dụng AsiMoney Vay doanh nghiệp. Ví dụ: không
                        có phí xử lý hồ sơ, phí quản lý, phí thu hộ.
                    </Typography>
                    <Typography variant="body1">
                        10. Sử dụng AsiMoney Vay doanh nghiệp có ảnh hưởng đến lịch sử tín dụng của tôi?
                        <br />
                        <br />
                        Khi bạn tạo khoản vay với AsiMoney Vay doanh nghiệp và thanh toán khoản vay đúng hạn, khả năng
                        tài chính của bạn đã được chứng minh. Điều này có thể giúp tăng điểm tín dụng của doanh nghiệp
                        bạn, mở ra cơ hội tiếp cận các hạn mức tín dụng lớn hơn trong tương lai như vay mua nhà, vay mua
                        ô tô, v.v.
                        <br />
                        <br />
                        Khi bạn có khoản thanh toán quá hạn với AsiMoney Vay doanh nghiệp, lịch sử thanh toán khoản vay
                        của bạn sẽ được cập nhật lên Trung tâm thông tin tín dụng quốc gia Việt Nam (CIC) và có thể ảnh
                        hưởng đến lịch sử tín dụng của bạn.
                    </Typography>
                    <Typography variant="body1">
                        11. Làm thế nào để tăng hạn mức AsiMoney Vay doanh nghiệp của tôi?
                        <br />
                        <br />
                        Hạn mức tín dụng của mỗi Người dùng sẽ khác nhau và được xác định bởi nhiều yếu tố, bao gồm
                        thông tin đăng ký đã nộp. Asizon khuyến khích Người dùng sử dụng AsiMoney Vay doanh nghiệp
                        thường xuyên và trả các khoản vay đúng hạn để có lịch sử tín dụng tốt, làm cơ sở cho việc tăng
                        hạn mức tín dụng trong tương lai.
                    </Typography>
                    <Typography variant="body1">
                        12. Hạn mức khả dụng tạm thời là gì? Điều gì xảy ra nếu hạn mức này hết thời hạn sử dụng?
                        <br />
                        <br />- Hạn mức khả dụng tạm thời AsiMoney Vay doanh nghiệp là hạn mức được cấp thêm TẠM THỜI mà
                        bạn có thể dùng để tạo khoản vay bên cạnh hạn mức đang có sẵn trong một khoảng thời gian nhất
                        định
                        <br />
                        <br />- Hạn mức tạm thời sẽ được tự động áp dụng cho một số Người dùng thỏa điều kiện tại từng
                        thời điểm nhất định và sẽ được thông báo cho Người dùng tại trang chủ AsiMoney Vay doanh nghiệp
                        <br />
                        <br />- Trong thời gian hạn mức tạm thời được áp dụng, giá trị hạn mức này sẽ được cộng vào hạn
                        mức khả dụng hiển thị tại trang chủ AsiMoney Vay doanh nghiệp. Sau khi hết thời gian sử dụng,
                        giá trị hạn mức này sẽ được trừ ra khỏi hạn mức khả dụng AsiMoney Vay doanh nghiệp.
                        <br />
                        <br />- Khi bạn tạo khoản vay trong thời gian hạn mức tạm thời có hiệu lực, hạn mức này sẽ được
                        ưu tiên sử dụng để giải ngân cho khoản vay cho đến khi bạn sử dụng hết hạn mức tạm thời.
                        <br />
                        <br />- Ví dụ về hạn mức tạm thời: AsiMoney Vay doanh nghiệp của bạn đang có:
                        <ul>
                            <li>Tổng hạn mức: 8.000.000 VNĐ</li>
                            <li>Hạn mức TẠM THỜI: 1.000.000 VNĐ (Hạn sử dụng: 1/10 - 15/10)</li>
                        </ul>
                        Bạn tạo khoản vay là 1.500.000 VNĐ, khoản vay này sẽ được giải ngân như sau: 1.000.000 VNĐ từ
                        hạn mức tạm thời và 500.000 VNĐ từ Tổng hạn mức.
                        <br />
                        <br />
                        Lưu ý:
                        <ul>
                            <li>
                                Trường hợp bạn tạo khoản vay bằng hạn mức khả dụng tạm thời, bạn vẫn cần thanh toán
                                khoản vay như bình thường nếu đến hạn thanh toán. Tuy nhiên, phần hạn mức tương ứng với
                                số tiền gốc của khoản vay sẽ không được cộng về lại hạn mức khả dụng của bạn sau khi bạn
                                thanh toán Hóa đơn thành công.
                            </li>
                            <li>
                                Hạn mức TẠM THỜI chỉ có hiệu lực sử dụng trong một thời gian nhất định, vì vậy Asizon
                                khuyến khích bạn nên sử dụng càng sớm càng tốt trước khi hết hạn sử dụng.
                            </li>
                        </ul>
                    </Typography>
                    <Typography variant="body1">
                        13. Làm cách nào để hủy đăng ký AsiMoney Vay doanh nghiệp?
                        <br />
                        <br />
                        Hiện tại, tính năng hủy đăng ký AsiMoney Vay doanh nghiệp vẫn đang trong quá trình xây dựng &
                        phát triển. Sẽ không phát sinh bất cứ khoản phí nào từ AsiMoney Vay doanh nghiệp nếu Người dùng
                        không còn dư nợ. Trường hợp cần thêm thông tin, vui lòng liên hệ với Bộ phận CSKH Asizon để được
                        hỗ trợ.
                    </Typography>
                    <Typography variant="body1">
                        14. Nếu gặp các vấn đề trên trang chủ AsiMoney Vay doanh nghiệp, tôi cần làm gì?
                        <br />
                        <br />• Nếu bạn không thể giải ngân từ Hạn mức AsiMoney Vay doanh nghiệp, hãy kiểm tra lại để
                        chắc chắn rằng:
                        <ul>
                            <li>Bạn đang không có nợ quá hạn.</li>
                            <li>Tổng số tiền Khoản vay đang tạo thấp hơn số tiền vay tối thiểu là 1.000.000 VNĐ</li>
                            <li>
                                Hạn mức Tín dụng Khả dụng của tài khoản AsiMoney Vay doanh nghiệp tại thời điểm tạo
                                khoản vay thấp hơn số tiền vay tối thiểu là 1.000.000 VNĐ
                            </li>
                            <li>
                                Ứng dụng Asizon vẫn hiện nút “Kích hoạt Ngay” sau khi bạn hoàn thành quá trình kích hoạt
                                tài khoản AsiMoney Vay doanh nghiệp:
                            </li>
                            <li>
                                Bạn cần tiến hành kích hoạt lại Easy Vay doanh nghiệp với thông tin cập nhật chính xác
                                hơn để được xem xét lại.
                            </li>
                            <li>
                                Có thể đã xảy ra lỗi khi gửi đơn đăng ký của bạn tới Ngân hàng đối tác. Trong mỗi trường
                                hợp, bạn có thể tiến hành kích hoạt lại nếu không có cập nhật nào sau 01 ngày làm việc
                                tiếp theo
                            </li>
                        </ul>
                        • Nếu bạn gặp các sự cố kỹ thuật trên ứng dụng Asizon (**), bạn có thể thực hiện các cách xử lý
                        sau:
                        <ul>
                            <li>Đóng và mở lại Ứng dụng Asizon (có thể buộc đóng ứng dụng nếu cần thiết)</li>
                            <li>Xóa bộ nhớ đệm (cache) của Ứng dụng Asizon</li>
                            <li>Đăng xuất và đăng nhập lại vào tài khoản Asizon của bạn</li>
                            <li>Cập nhật Ứng dụng Asizon lên phiên bản mới nhất</li>
                            <li>Gỡ và cài lại Ứng dụng Asizon trên thiết bị di động của bạn</li>
                        </ul>
                        Nếu vấn đề vẫn không thể được giải quyết sau khi thực hiện những bước xử lý trên, vui lòng chụp
                        ảnh màn hình hoặc quay video màn hình thể hiện rõ vấn đề đang gặp phải và liên hệ Bộ phận CSKH
                        Asizon để được trợ giúp.
                        <br />
                        <br />
                        (**) Các sự cố kỹ thuật bao gồm:
                        <ul>
                            <li>Không thể truy cập vào trang chủ AsiMoney Vay doanh nghiệp</li>
                            <li>Không thể chọn vào nút Tạo khoản vay để giải ngân khoản vay</li>
                            <li>Không thể chọn nút Thanh toán ngay cho khoản vay AsiMoney Vay doanh nghiệp</li>
                            <li>
                                Không thể chọn Phương thức thanh toán để hoàn trả khoản vay AsiMoney Vay doanh nghiệp
                            </li>
                            <li>Hiển thị sai hạn mức tín dụng hoặc lịch thanh toán hiện có</li>
                            <li>Các sự cố khi tải trang</li>
                        </ul>
                    </Typography>
                </>
            ) : null}
        </>
    );
    return (
        <Box sx={{ paddingTop: 2 }}>
            <Grid container={true} spacing={3}>
                {/* Cột trái - Danh sách các chính sách
                <Grid item={true} size={{ xs: 12, md: 2 }}>
                    <PolicySidebar />
                </Grid> */}

                {/* Cột phải - Nội dung chi tiết chính sách */}
                <Grid item={true} size={{ xs: 12, md: 10 }}>
                    {/* Cột giữa cho tiêu đề */}
                    <Grid container={true} justifyContent="center">
                        <Grid item={true}>
                            <Typography
                                variant="h4"
                                sx={{

                                    fontWeight: 'bold',
                                    color: '#1a1a1a!important',
                                    textAlign: 'center',
                                }}
                            >
                                {title}
                            </Typography>
                        </Grid>
                    </Grid>
                    <PolicyContent
                        content={content}
                        sx={{ backgroundColor: 'white', color: 'black', textAlign: 'center' }}
                    />
                    {!showMore ? (
                        <Button
                            variant="contained"
                            sx={{ background: '#00A6B7', color: 'white' }}
                            onClick={handleShowMore}
                        >
                            Xem thêm
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{ background: '#00A6B7', color: 'white' }}
                            onClick={handleShowLess}
                        >
                            Ẩn bớt
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}

export default A;
