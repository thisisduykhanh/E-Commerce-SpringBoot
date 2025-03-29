'use client';
import * as React from 'react';
import PolicyContent from '@/components/PolicyContent/PolicyContent';
import PolicySidebar from '@/components/SideBarSell/PolicySideBar';
import { Box, Drawer, Grid2 as Grid, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Asimoney() {
    const title = 'ĐIỀU KHOẢN VÀ ĐIỀU KIỆN DỊCH VỤ ASIMONEY - VAY DOANH NGHIỆP';
    const content = (
        <>
 <Typography variant="h6" sx={{ marginTop: 2,fontWeight: 'bold' }}>
                1. Giới thiệu
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
               Chào mừng bạn đến với Dịch vụ Asizon Vay doanh nghiệp (gọi chung là &quot;Dịch vụ&quot;). Trước khi sử dụng Dịch vụ, vui lòng đọc kỹ các Điều khoản và Điều kiện này để hiểu rõ quyền lợi và nghĩa vụ hợp pháp của mình đối với Dịch vụ.<br/><br/>
Các Điều khoản và Điều kiện của Dịch vụ này là các quy định điều chỉnh việc bạn sử dụng Dịch vụ thông qua Nền tảng Asizon cũng như ràng buộc về pháp lý giữa bạn - Người dùng trên Nền tảng Asizon - với tư cách là Bên vay với bất kỳ Bên cho vay - Tổ Chức Tín Dụng được cấp giấy phép hợp pháp thông qua Dịch vụ. Các Điều khoản và Điều kiện Dịch Vụ này tạo thành một phần không thể tách rời của Tài liệu Dịch Vụ và Điều Khoản Dịch Vụ của Nền Tảng Asizon mà bạn có thể tìm thấy.<br/><br/>
Bằng việc sử dụng Dịch vụ, bạn đã chấp nhận và đồng ý bị ràng buộc về mặt pháp lý đối với Bên cho vay liên quan đến Khoản tín dụng được cấp và tuân theo các Điều khoản và Điều kiện của Dịch vụ này, đồng thời bạn đồng ý và đảm bảo đã đọc, hiểu và chấp nhận các Điều khoản và Điều kiện của Dịch vụ và rằng bạn là người trực tiếp thụ hưởng / hưởng lợi từ Dịch vụ chứ không phải vì hoặc cho lợi ích của bất kỳ người nào khác. Vui lòng không sử dụng Dịch vụ nếu bạn không đồng ý với các Điều khoản và Điều kiện của Dịch vụ hoặc nếu bạn không phải là người trực tiếp thụ hưởng/hưởng lợi từ Dịch vụ.
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 2,fontWeight: 'bold' }}>
                2. Định nghĩa và giải thích từ ngữ
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
             Ngoại trừ được quy định khác đi, các thuật ngữ được định nghĩa ở đây sẽ có nghĩa sau:<br/><br/>
2.1. “Tài liệu Dịch vụ” có nghĩa là bất kỳ tài liệu nào, bao gồm, nhưng không giới hạn ở Hợp đồng tín dụng của Bên cho vay và Điều khoản và Điều kiện liên quan, Điều khoản và Điều kiện Dịch vụ, Chính sách Bảo mật và Câu hỏi Thường gặp (FAQ) của Dịch vụ trên Nền tảng Asizon, và bất kỳ chính sách hoặc tài liệu nào khác được công bố hoặc thông báo cho Bên vay theo từng thời kỳ, có giá trị ràng buộc pháp lý với Bên vay trong việc sử dụng Khoản tín dụng được cấp và Dịch vụ.<br/><br/>
2.2. “Khoản tín dụng” có nghĩa là khoản vay mà Bên cho vay cung cấp cho bạn với tư cách là Bên vay khi sử dụng Dịch vụ, với giá trị và theo các Điều khoản và điều kiện quy định trong Thỏa thuận tín dụng liên quan.<br/><br/>
2.3. “Chúng tôi” có nghĩa là Asizon và / hoặc Bên cho vay.<br/><br/>
2.4. “Trường hợp bất khả kháng” có nghĩa là sự kiện xảy ra một cách khách quan không thể lường trước được và không thể khắc phục được mặc dù đã áp dụng mọi biện pháp cần thiết và khả năng cho phép.<br/><br/>
2.5. “Nội dung” có nghĩa là toàn bộ nội dung của Nền tảng Asizon và các Dịch vụ, toàn bộ hoặc từng phần, bao gồm nhưng không giới hạn ở bất kỳ thông tin, thiết kế, hình ảnh, âm thanh, âm nhạc, video, bài viết, cơ sở dữ liệu, ảnh, phần mềm, biểu phí, phí, đồ họa, bài viết, bất kỳ thông tin nào khác và bất kỳ lựa chọn và sắp xếp nào có liên quan.<br/><br/>
2.6. “Dịch vụ Asizon Vay doanh nghiệp” hoặc “Dịch vụ” có nghĩa là các dịch vụ và tính năng trên Nền tảng Asizon cho việc đăng ký, cấp, giải ngân và hoàn trả Khoản tín dụng giữa Bên vay với Bên cho vay trên Nền tảng Asizon.<br/><br/>
2.7. “Bên cho vay” có nghĩa là bất kỳ tổ chức tín dụng đủ điều kiện, được cấp phép để cung cấp Khoản tín dụng cho Bên vay theo Hợp đồng tín dụng. Để tránh hiểu nhầm, Bên cho vay là bên thứ ba độc lập và không phải là chi nhánh / đại lý của Asizon hoặc Bên có liên quan đến Asizon hoặc Nền tảng Asizon.<br/><br/>
2.8. “Bên vay” hoặc “bạn” có nghĩa là người dùng trên Nền tảng Asizon có nhu cầu vay vốn hợp pháp/hợp lệ và đủ điều kiện được cấp tín dụng theo quy định tại Điều khoản và Điều kiện này cũng như quy định của Bên cho vay, đã đăng ký với mục đích nhận Khoản tín dụng thông qua các Dịch vụ theo Hợp đồng tín dụng.<br/><br/>
2.9. “Hợp đồng tín dụng” có nghĩa là hợp đồng do bạn và Bên cho vay giao kết để làm cơ sở cho việc cấp Khoản tín dụng thông qua Asizon Vay doanh nghiệp, cùng với bất kỳ Phụ lục và các tài liệu nào liên quan đến Hợp đồng tín dụng (bao gồm, nhưng không giới hạn ở bất kỳ điều chỉnh, sửa đổi và chuyển giao được phép nào), tất cả sẽ tạo thành một phần không thể tách rời của Hợp đồng tín dụng. Hợp đồng tín dụng bao gồm, nhưng không giới hạn ở Hợp đồng tín dụng, hoặc Đề nghị vay vốn kiêm Hợp đồng tín dụng, và/hoặc thỏa thuận có giá trị tương đương (bao gồm cả các tài liệu có liên quan).<br/><br/>
2.10. “Nền tảng Asizon” nghĩa là Sàn Giao Dịch Thương Mại Điện Tử Asizon do Asizon vận hành và có thể truy cập thông qua https://Asizon.vn và.<br/><br/>
2.11. “Asizon” có nghĩa là CÔNG TY CỔ PHẦN Á ĐÔNG THỊNH VƯỢNG.
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 2 ,fontWeight: 'bold'}}>
                3. Sử dụng Dịch vụ
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
               3.1. Asizon và/hoặc Bên cho vay có quyền liên hệ và thông báo cho bạn (bao gồm, nhưng không giới hạn ở, những người mà bạn chỉ định hoặc cho phép Asizon và/hoặc Bên cho vay liên lạc liên quan đến việc bạn sử dụng Asizon Vay doanh nghiệp) về Asizon Vay doanh nghiệp cho các mục đích khác nhau bao gồm, nhưng không giới hạn ở, hoạt động tiếp thị, đăng ký, thanh toán đơn hàng, giải ngân, lập hóa đơn, hoàn trả khoản nợ, tình trạng khoản nợ quá hạn, nhắc nợ và kiểm soát tài khoản.<br/><br/>
3.2. Bạn đồng ý chỉ sử dụng Dịch vụ theo thỏa thuận trong Hợp đồng tín dụng với Bên cho vay và các mục đích khác được pháp luật và quy định hiện hành cho phép.<br/><br/>
3.3. Để có thể sử dụng Dịch vụ, bạn phải tự đăng ký trên Nền tảng Asizon và cung cấp thông tin liên quan một cách trung thực và chính xác khi được yêu cầu trên trang đăng ký.<br/><br/>
3.4. Asizon/Bên cho vay sẽ có quyền đánh giá tín dụng, thẩm định hồ sơ Bên vay và / hoặc bất kỳ hành động nào khác để đánh giá điều kiện được cấp Khoản tín dụng cũng như khả năng hoàn trả Khoản tín dụng của bạn. Và bạn đồng ý toàn bộ và cho phép Asizon / Bên cho vay được xử lý dữ liệu cá nhân của bạn để đánh giá tín dụng, thẩm định hồ sơ do bạn cung cấp cho Asizon/Bên cho vay.<br/><br/>
3.5. Trong quá trình thẩm định / cung cấp Dịch vụ, Bên cho vay và / hoặc Asizon có quyền liên hệ với bạn, cũng như bất kỳ tổ chức, công ty hoặc cá nhân có liên quan nào, để thu thập, xác minh và xác nhận bất kỳ thông tin liên quan nào do bạn cung cấp. Trừ khi được quy định pháp luật cho phép hoặc theo chấp thuận của bạn, Bên cho vay, Asizon và / hoặc bất kỳ bên thứ ba nào hợp tác với Bên cho vay sẽ không được phép tiết lộ bất kỳ thông tin hoặc tài liệu nào do bạn cung cấp cho bất kỳ bên thứ ba nào khác.<br/><br/>
3.6. Bạn sẽ chỉ được cấp Khoản tín dụng sau khi Bên cho vay, Asizon và / hoặc bất kỳ bên thứ ba nào hợp tác với Bên cho vay hoàn tất đánh giá tín dụng, thẩm định hồ sơ Bên vay, và / hoặc các hành động cần thiết khác.<br/><br/>
3.7. Quyết định của Bên cho vay đối với việc đánh giá tín dụng, thẩm định hồ sơ Bên vay và / hoặc các hành động cần thiết khác sẽ do Bên cho vay toàn quyền quyết định và là quyết định cuối cùng. Trong trường hợp Bên cho vay quyết định không cấp Khoản tín dụng cho bạn, Bên cho vay sẽ không có nghĩa vụ cung cấp thông tin hoặc giải thích lý do đưa ra quyết định đó.<br/><br/>
3.8. Khoản tín dụng tối đa mà một hoặc nhiều Bên cho vay cấp cho Bên vay sẽ do Bên cho vay quyết định trên cơ sở các đánh giá từ Asizon (nếu có).<br/><br/>
3.9. Phí và lãi suất mà bạn phải chi trả liên quan đến Khoản Tín dụng được quy định trong Hợp đồng Tín dụng.<br/><br/>
3.10. Sau khi được phê duyệt, bạn có thể sử dụng khoản tín dụng trong hạn mức tín dụng được cấp.<br/><br/>
3.11. Bạn phải thanh toán Khoản vay cùng với phí, lãi suất, các khoản phải trả khác có liên quan đúng hạn theo Hợp đồng tín dụng, với số tiền và phương thức thanh toán như được thể hiện trên Nền tảng Asizon cho Bên cho vay. Bạn đồng ý ủy quyền cho Asizon, thông qua một nhà cung cấp dịch vụ thanh toán trung gian hoặc thanh toán được cấp phép, để thu hồi, xử lý và chuyển tiếp khoản thanh toán phải trả cho Bên cho vay theo Hợp đồng tín dụng.<br/><br/>
3.12. Trong trường hợp bạn thanh toán/hoàn trả Khoản tín dụng (bao gồm các khoản phí và lãi suất có liên quan) không đúng thời hạn, bạn sẽ bị tính phí / lãi thanh toán chậm theo quy định tại Hợp đồng tín dụng. Bên cho vay có quyền thực hiện các hành động bao gồm nhưng không giới hạn ở việc liên hệ với bạn và người được bạn chỉ định có thể liên lạc trong trường hợp khẩn cấp, yêu cầu hoàn trả và bất kỳ hành động cần thiết nào trong khuôn khổ và quy định của pháp luật hiện hành để thu hồi các khoản phải trả theo Hợp đồng tín dụng.<br/><br/>
3.13. Quyền sử dụng Nền tảng Asizon và các quyền lợi đi kèm của bạn có thể bị tạm ngừng trong trường hợp bạn vi phạm Điều khoản và Điều kiện Dịch vụ này và/hoặc Hợp đồng tín dụng.<br/><br/>
3.14. Trong trường hợp Bên vay không trả nợ đúng hạn, Asizon có quyền phong tỏa các quyền lợi trên Nền tảng Asizon của Bên vay bao gồm nhưng không giới hạn ở tính năng Asizon Vay doanh nghiệp và/hoặc tài khoản Asizon của Bên vay.<br/><br/>
3.15. Bên cho vay sẽ thông báo cho bạn về bất kỳ thay đổi nào đối với điều khoản hoặc phí khác áp dụng cho Khoản tín dụng theo Hợp đồng tín dụng. Bên cho vay cũng sẽ cung cấp cho bạn thông tin liên quan đến Khoản tín dụng thông qua Nền tảng Asizon theo các luật và quy định hiện hành.<br/><br/>
3.16. Bạn hiểu, đồng ý toàn bộ, và xác nhận ủy quyền cho Asizon, Bên cho vay và / hoặc bất kỳ bên thứ ba nào hợp tác với Bên cho vay / Asizon (tùy từng trường hợp) để thực hiện bất kỳ và tất cả các hành động nào sau đây:<br/><br/>
a. Thu thập, xử lý, sử dụng, chuyển tiếp và / hoặc cung cấp bất kỳ thông tin, dữ liệu cá nhân và / hoặc bất kỳ thông tin, tài liệu nào khác do bạn cung cấp cho Bên cho vay, Asizon và / hoặc bất kỳ bên thứ ba nào hợp tác với Bên cho vay / Asizon (tùy từng trường hợp) để Bên cho vay xử lý, bao gồm nhưng không giới hạn cho hệ thống hỗ trợ Dịch vụ, hoặc cho Bên cho vay để vận hành các Dịch vụ;<br/><br/>
b. Để nhận, chuyển tiếp, sử dụng, xử lý hoặc cung cấp tất cả thông tin liên quan đến Khoản tín dụng cho Bên vay; và / hoặc<br/><br/>
c. Thực hiện bất kỳ và tất cả các hành động cần thiết để sử dụng Dịch vụ theo quy định của Hợp đồng Dịch vụ.<br/><br/>
d. Thực hiện giải ngân và hành động liên quan đến Tài khoản Asizon theo quy định ban hành bởi Asizon và các Bên cho vay theo từng thời kỳ.<br/><br/>
e. Thực hiện bất kỳ và tất cả các hành động cần thiết theo quy định của Điều khoản và Điều kiện Dịch vụ này.
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 2 ,fontWeight: 'bold'}}>
                4. Lưu ý
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              4.1. Việc cung cấp Khoản tín dụng theo Hợp đồng tín dụng là một hợp đồng song phương giữa Bên cho vay và Bên vay. Do đó, bất kỳ và tất cả các rủi ro phát sinh từ thỏa thuận đó sẽ do Bên cho vay và Bên vay tương ứng chịu.<br/><br/>
4.2. Asizon và Bên cho vay, với sự đồng ý của Bên vay tại Điều khoản và Điều kiện này, có thể xử lý dữ liệu cá nhân của Bên vay (&quot;Xử lý dữ liệu&quot;) trên hoặc trong bất kỳ vật/thiết bị điện tử nào (bao gồm điện thoại thông minh hoặc điện thoại di động ), phần cứng hoặc phần mềm, tài liệu điện tử, ứng dụng hoặc hệ thống điện tử thuộc về hoặc được sử dụng bởi Bên vay. Việc Xử lý dữ liệu cá nhân của Bạn nếu được Asizon thực hiện sẽ được thực hiện theo Chính Sách Bảo Mật và quy định pháp luật hiện hành. Bạn có thể tham khảo Chính Sách Bảo Mật của Asizon. Việc xử lý dữ liệu cá nhân của Bạn nếu được Bên cho vay xử lý sẽ được thực hiện theo chính sách của từng Bên cho vay tương ứng có hiệu lực tại từng thời điểm. Bạn nên tham khảo kỹ các Chính sách của từng Bên cho vay này.<br/><br/>
4.3. Bạn phải cân nhắc phí và lãi suất liên quan đến Khoản tín dụng dựa trên khả năng tài chính của bản thân.<br/><br/>
4.4 Bạn phải đảm bảo đã đọc, hiểu, và đồng ý hoàn toàn Điều khoản và Điều kiện Dịch vụ này trước khi quyết định trở thành Bên vay thông qua Dịch vụ.
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 2 ,fontWeight: 'bold'}}>
                5. Các tuyên bố và bảo đảm của Bên vay
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Bạn tuyên bố và đảm bảo với Asizon và Bên cho vay như sau:<br/><br/>
5.1. Bạn là công dân cư trú tại Việt Nam theo pháp luật Việt Nam.<br/><br/>
5.2. Bạn là người đại diện theo pháp luật tại doanh nghiệp mà bạn yêu cầu cấp tín dụng.<br/><br/>
5.3. Doanh nghiệp của bạn đại diện đang hoạt động theo đúng điều lệ và quy định của Hiến pháp và quy định của Pháp luật.<br/><br/>
5.4. Bạn có năng lực hành vi dân sự để tham gia và thực hiện bất kỳ cam kết nào để sử dụng Dịch vụ phù hợp với các quy định của pháp luật.<br/><br/>
5.5. Tất cả các dữ kiện, dữ liệu cá nhân, thông tin, tài liệu và giải thích do bạn cung cấp cho chúng tôi là thật và chính xác, và bất kỳ và tất cả các tài liệu được cung cấp cho chúng tôi dưới dạng bản sao hoặc dưới bất kỳ hình thức nào khác đều là bản sao đúng và chính xác từ bản gốc.<br/><br/>
5.6. Không có sự kiện nào đã xảy ra và đang tiếp tục hoặc sẽ xảy ra dẫn đến việc bạn không còn hoặc không có khả năng thanh toán khoản nợ phải trả theo bất kỳ thỏa thuận nào khác mà bạn là một bên.<br/><br/>
5.7. Bạn không, trực tiếp và / hoặc gián tiếp, tham gia vào bất kỳ mạng lưới khủng bố, tổ chức tội phạm, hoạt động rửa tiền, các tổ chức buôn người, băng đảng ma tuý / chất bị cấm, các tổ chức buôn lậu và các tổ chức tương tự.<br/><br/>
5.8. Bạn đã đọc, hiểu và đồng ý toàn bộ với Điều khoản và Điều kiện Dịch vụ này, Hợp đồng tín dụng, Điều Khoản Dịch Vụ, Chính Sách Bảo Mật, và các Chính sách/quy định của Nền Tảng Asizon.<br/><br/>
5.9. Bạn không được chuyển nhượng, chuyển giao các quyền và nghĩa vụ của mình theo Điều khoản và Điều kiện Dịch vụ này nếu không có sự chấp thuận trước bằng văn bản của Asizon.
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 2,fontWeight: 'bold' }}>
                6. Giới hạn trách nhiệm pháp lý
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
               Bạn xác nhận và đồng ý với những điều sau:
6.1. Liên quan đến Khoản tín dụng được cấp, Asizon sẽ chỉ đóng vai trò trung gian giữa bạn và Bên cho vay để vận hành Dịch vụ (bao gồm nhưng không giới hạn ở việc sử dụng và hoàn trả Khoản tín dụng theo Hợp đồng tín dụng và Điều khoản và Điều kiện Dịch vụ này).<br/><br/>
6.2. Bạn hoàn toàn chịu trách nhiệm về việc truy cập của mình vào Nền tảng Asizon, bao gồm việc bảo vệ bí mật thông tin mật khẩu, mã PIN và mã bảo mật được cung cấp cho bạn cũng như thực hiện bất kỳ hành động cần thiết nào để bảo vệ bản thân và mọi dữ liệu thông tin mà bạn cung cấp khi sử dụng Dịch vụ. Bạn sẽ không yêu cầu Bên cho vay và / hoặc Asizon chịu trách nhiệm đối với bất kỳ thiệt hại nào do sơ suất của bản thân trong việc bảo vệ thông tin tài khoản của bạn.<br/><br/>
6.3. Các thông tin về Dịch vụ liên quan đến khoản vay của bạn được hiển thị trên Nền tảng Asizon, các tin nhắn nhắc nhở lịch trả nợ mà Asizon gửi (nếu có) chỉ có giá trị tham khảo nhằm giúp bạn thực hiện các hoạt động bao gồm nhưng không giới hạn quản lý, theo dõi và thực hiện việc trả nợ được thuận tiện. Các thông tin này có thể không phải là thông tin chính xác cuối cùng mà bạn cần tuân theo. Thông tin chính xác cuối cùng luôn được xác định theo Hợp đồng tín dụng mà bạn ký kết với Bên cho vay. Trong mọi trường hợp, bạn đều phải tự chịu trách nhiệm trong việc theo dõi khoản vay, thời hạn trả nợ, lịch trả nợ đối với Bên vay theo Hợp đồng tín dụng đã ký kết.
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 2 ,fontWeight: 'bold'}}>
                7. Từ bỏ quyền
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
Không có quyền nào của Bên cho vay được coi là đã từ bỏ, trừ khi được quy định rõ ràng bằng văn bản và có chữ ký của Bên cho vay hoặc người được ủy quyền của Bên cho vay. Việc Bên cho vay không thực hiện bất kỳ quyền nào được quy định ở các Điều khoản và Điều kiện Dịch vụ này sẽ không cấu thành việc từ bỏ các quyền đó vào bất kỳ thời điểm nào.
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 2 ,fontWeight: 'bold'}}>
               8. Thay đổi đối với Điều khoản và Điều kiện của Dịch vụ
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
8.1. Asizon sẽ có toàn quyền điều chỉnh các Điều khoản và Điều kiện của Dịch vụ này vào từng thời điểm. Bất kỳ và tất cả các sửa đổi đối với các Điều khoản và Điều kiện của Dịch vụ này sẽ được thông báo cho bạn thông qua Nền tảng Asizon.<br/><br/>
8.2. Bằng việc tiếp tục sử dụng Nền tảng Asizon và các Dịch vụ, bạn hiểu và đồng ý rằng bạn bị ràng buộc bởi các Điều khoản và Điều kiện của Dịch vụ đã được sửa đổi.
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 2 ,fontWeight: 'bold'}}>
                9. Chấm dứt cung cấp Dịch vụ
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
9.1. Nếu Bên cho vay, và / hoặc Asizon tin rằng bạn đã vi phạm các Điều khoản và Điều kiện Dịch vụ này, bao gồm các quy định trong Tài liệu Dịch vụ hoặc bất kỳ luật và quy định hiện hành nào, bạn hiểu và đồng ý rằng Bên cho vay , và / hoặc Asizon sẽ có toàn quyền thực hiện bất kỳ hành động nào sau đây:<br/><br/>
a. Vào bất kỳ lúc nào, dù có thông báo trước cho bạn hay không, chấm dứt, tạm khóa hoặc ngừng quyền truy cập của bạn vào Dịch vụ và Nền tảng Asizon (hoặc bất kỳ cấu phần nào của Dịch vụ và Nền tảng Asizon);<br/><br/>
b. Gửi cảnh báo đến cho bạn;<br/><br/>
c. Thực hiện bất kỳ hành động pháp lý nào đối với bạn để được hoàn trả bất kỳ và tất cả các chi phí trên cơ sở bồi thường (bao gồm, nhưng không giới hạn ở các chi phí pháp lý và hành chính hợp lý) do bất kỳ hành vi vi phạm nào của bạn; và / hoặc<br/><br/>
d. Khởi kiện bạn.<br/><br/>
9.2. Việc chấm dứt được đề cập trong Mục 9.1 ở trên sẽ không làm giảm bớt hoặc trì hoãn bất kỳ nghĩa vụ nào đối với việc sử dụng Dịch vụ hoặc giải phóng bạn khỏi việc thanh toán bất kỳ khoản bồi thường nào (bao gồm, nhưng không giới hạn ở các chi phí pháp lý và hành chính hợp lý) mà bạn phải trả do hành vi vi phạm của bạn trong việc sử dụng Nền tảng Asizon và/hoặc các Dịch vụ.

            </Typography>
            <Typography variant="h6" sx={{ marginTop: 2,fontWeight: 'bold' }}>
               10. Hiệu lực từng phần
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
Nếu bất kỳ một hoặc nhiều điều khoản nào trong các Điều khoản và Điều kiện của Dịch vụ này được xem là không hợp lệ, bất hợp pháp hoặc không thể thi hành theo luật và quy định hiện hành, thì điều khoản đó sẽ được tách ra khỏi các Điều khoản và Điều kiện này và sẽ không ảnh hưởng tới hiệu lực cũng như tính thi hành của bất kỳ điều khoản còn lại nào cũng như không ảnh hưởng tới hiệu lực cũng như tính thi hành của điều khoản sẽ được xem xét theo luật.
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 2,fontWeight: 'bold' }}>
                11. Luật điều chỉnh và Giải quyết tranh chấp
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
Các Điều khoản và Điều kiện của Dịch vụ này và việc thực hiện các điều khoản này sẽ được áp dụng bởi luật pháp của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 2,fontWeight: 'bold' }}>
                12. Thông tin liên hệ
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
Để biết thêm thông tin, hoặc nếu bạn có bất kỳ câu hỏi hoặc khiếu nại nào về Nền tảng Asizon hoặc Dịch vụ, vui lòng liên hệ với chúng tôi qua Hotline Trung tâm Chăm Sóc Khách Hàng (0919 111 419)<br/><br/>
Điều khoản và Điều kiện của Dịch vụ này được ban hành lần đầu ngày 01/01/2025 và sẽ có hiệu lực sau 07 (bảy) ngày kể từ ngày đăng tải trên Nền tảng Asizon.
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
                                    left: '60%',
                                    textAlign: 'center',
                                    transform: 'translateX(-50%)',
                                    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1.2rem' },
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

export default Asimoney;
