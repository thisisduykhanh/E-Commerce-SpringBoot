'use client';
import * as React from 'react';
import PolicyContent from '@/components/PolicyContent/PolicyContent';
import { Box, Grid2 as Grid, Typography } from '@mui/material';

function Clausepage() {
    const title = 'QUYỀN RIÊNG TƯ';
    const content = (
        <>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
              Chúng tôi biết rằng bạn quan tâm về dữ liệu cá nhân của bạn và về việc dữ liệu cá nhân của bạn được sử dụng như thế nào, và chúng tôi muốn bạn tin rằng Asizon rất cẩn trọng trong việc sử dụng dữ liệu cá nhân của bạn. Thông báo về Quyền Riêng tư này sẽ giúp bạn hiểu về loại dữ liệu cá nhân mà chúng tôi thu thập, lý do chúng tôi thu thập dữ liệu cá nhân và những gì chúng tôi sẽ thực hiện với dữ liệu cá nhân.<br/><br/>

Khi bạn đọc Thông báo của chúng tôi, vui lòng lưu ý rằng Thông báo này được ban hành và áp dụng bởi Công ty Cổ phần Á Đông Thịnh Vượng<br/><br/>

Vui lòng dành thời gian tìm hiểu về chính sách quyền riêng tư của chúng tôi và nếu bạn có bất kỳ thắc mắc nào vui lòng gửi yêu cầu qua phần “Liên hệ” trên các trang web của chúng tôi.<br/><br/>

Chúng tôi cố gắng trình bày Thông báo này một cách đơn giản nhất có thể, nhưng nếu bạn không biết rõ về các thuật ngữ, chẳng hạn như các cookie, địa chỉ IP, và các trình duyệt, trước hết vui lòng đọc về các thuật ngữ chính này.

            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                Thuật ngữ chính
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
             Ẩn danh: Quá trình loại bỏ vĩnh viễn bất kỳ thông tin nhận dạng cá nhân nào khỏi dữ liệu cá nhân để các cá nhân mà dữ liệu mô tả thành ẩn danh. Điều này được thực hiện với mục đích bảo vệ các hoạt động riêng tư của các cá nhân trong khi duy trì tính toàn vẹn của dữ liệu được thu thập và chia sẻ.<br/><br/>

Bên Kiểm soát Dữ liệu: Là tổ chức, cá nhân quyết định mục đích và phương tiện xử lý dữ liệu cá nhân.<br/><br/>

Bên Xử lý Dữ liệu: Là tổ chức, cá nhân thực hiện việc xử lý dữ liệu thay mặt cho Bên Kiểm soát dữ liệu, thông qua một hợp đồng hoặc thỏa thuận với Bên Kiểm soát dữ liệu.<br/><br/>

Bên Kiểm soát và Xử lý Dữ liệu: Là tổ chức, cá nhân đồng thời quyết định mục đích, phương tiện và trực tiếp xử lý dữ liệu cá nhân.<br/><br/>

Bên thứ ba: Là tổ chức, cá nhân ngoài Chủ thể dữ liệu, Bên Kiểm soát dữ liệu, Bên Xử lý dữ liệu, Bên Kiểm soát và xử lý dữ liệu được phép xử lý dữ liệu cá nhân.<br/><br/>

Chủ thể dữ liệu: Là cá nhân được dữ liệu cá nhân phản ánh.<br/><br/>

Chuyển dữ liệu cá nhân ra nước ngoài: Hoạt động sử dụng không gian mạng, thiết bị, phương tiện điện tử hoặc các hình thức khác chuyển dữ liệu cá nhân của công dân Việt Nam tới một địa điểm nằm ngoài lãnh thổ của Việt Nam hoặc sử dụng một địa điểm nằm ngoài lãnh thổ của nước Việt Nam để xử lý dữ liệu cá nhân của công dân Việt Nam, bao gồm:<br/><br/>
(a) Tổ chức, doanh nghiệp, cá nhân chuyển dữ liệu cá nhân của công dân Việt Nam cho tổ chức, doanh nghiệp, bộ phận quản lý ở nước ngoài để xử lý phù hợp với mục đích đã được chủ thể dữ liệu đồng ý;<br/><br/>
(b) Xử lý dữ liệu cá nhân của công dân Việt Nam bằng các hệ thống tự động nằm ngoài lãnh thổ của nước Việt Nam của Bên Kiểm soát dữ liệu cá nhân, Bên Kiểm soát và xử lý dữ liệu cá nhân, Bên Xử lý dữ liệu cá nhân phù hợp với mục đích đã được chủ thể dữ liệu đồng ý.

Dữ liệu cá nhân: Là thông tin dưới dạng ký hiệu, chữ viết, chữ số, hình ảnh, âm thanh hoặc dạng tương tự trên môi trường điện tử gắn liền với một con người cụ thể hoặc giúp xác định một con người cụ thể. Dữ liệu cá nhân bao gồm dữ liệu cá nhân cơ bản và dữ liệu cá nhân nhạy cảm.<br/><br/>

Dữ liệu cá nhân cơ bản: Bao gồm: họ, chữ đệm và tên khai sinh, tên gọi khác (nếu có); ngày, tháng, năm sinh; ngày, tháng, năm chết hoặc mất tích; giới tính; Nơi sinh, nơi đăng ký khai sinh, nơi thường trú, nơi tạm trú, nơi ở hiện tại, quê quán, địa chỉ liên hệ; Quốc tịch; Hình ảnh của cá nhân; Số điện thoại, số chứng minh nhân dân, số định danh cá nhân, số hộ chiếu, số giấy phép lái xe, biển số xe, mã số thuế cá nhân, số bảo hiểm xã hội, số thẻ bảo hiểm y tế; Tình trạng hôn nhân; Thông tin về mối quan hệ gia đình (cha mẹ, con cái); Thông tin về tài khoản số của cá nhân; dữ liệu cá nhân phản ánh hoạt động, lịch sử hoạt động trên không gian mạng; Các thông tin khác gắn liền với một con người cụ thể hoặc giúp xác định một con người cụ thể không thuộc Dữ liệu cá nhân nhạy cảm.<br/><br/>

Dữ liệu cá nhân nhạy cảm: Quan điểm chính trị, quan đểm tôn giáo; tình trạng sức khỏe và đời tư được ghi trong hồ sơ bệnh án (không bao gồm thông tin về nhóm máu); thông tin liên quan đến nguồn gốc chủng tộc, nguồn gốc dân tộc; thông tin về đặc điểm di truyền được thừa hưởng hoặc có được của cá nhân; thông tin về thuộc tính vật lý, đặc điểm sinh học riêng của cá nhân; thông tin về đời sống tình dục, xu hướng tình dục của cá nhân; dữ liệu về tội phạm, hành vi phạm tội được thu thập, lưu trữ bởi các cơ quan thực thi pháp luật; thông tin khách hàng của tổ chức tín dụng, chi nhánh ngân hàng nước ngoài, tổ chức cung ứng dịch vụ trung gian thanh toán, các tổ chức được phép khác, gồm: thông tin định danh khách hàng theo quy định của pháp luật, thông tin về tài khoản, thông tin về tiền gửi, thông tin về tài sản gửi, thông tin về giao dịch, thông tin về tổ chức, cá nhân là bên bảo đảm tại tổ chức tín dụng, chi nhánh ngân hàng, tổ chức cung ứng dịch vụ trung gian thanh toán; dữ liệu về vị trí của cá nhân được xác định qua dịch vụ định vị; dữ liệu cá nhân khác được pháp luật quy định là đặc thù và cần có biện pháp bảo mật cần thiết.<br/><br/>

Sự đồng ý của Chủ thể dữ liệu: là việc thể hiện rõ ràng, tự nguyện, khẳng định việc cho phép xử lý dữ liệu cá nhân của Chủ thể dữ liệu.<br/><br/>

Xử lý dữ liệu: Là một hoặc nhiều hoạt động tác động tới dữ liệu cá nhân, như: thu thập, ghi, phân tích, xác nhận, lưu trữ, chỉnh sửa, công khai, kết hợp, truy cập, truy xuất, thu hồi, mã hóa, giải mã, sao chép, chia sẻ, truyền đưa, cung cấp, chuyển giao, xóa, hủy dữ liệu cá nhân hoặc các hành động khác có liên quan.<br/><br/>

Xử lý dữ liệu cá nhân tự động: Là hình thức xử lý dữ liệu cá nhân được thực hiện bằng phương tiện điện tử nhằm đánh giá, phân tích, dự đoán hoạt động của một con người cụ thể, như: thói quen, sở thích, mức độ tin cậy, hành vi, địa điểm, xu hướng, năng lực và các trường hợp khác.<br/><br/>

Cookie: Một tệp văn bản nhỏ được lưu trữ trên máy người dùng mà sau này có thể được máy chủ web truy xuất từ máy. Cookie cho phép máy chủ web theo dõi hoạt động trình duyệt của người dùng cuối và kết nối các yêu cầu web riêng lẻ vào một phiên.<br/><br/>

Cơ quan chuyên trách bảo vệ dữ liệu cá nhân: Là cơ quan trực thuộc Bộ Công an, có trách nhiệm giúp Bộ Công an thực hiện quản lý nhà nước về bảo vệ dữ liệu cá nhân.<br/><br/>

Nhân sự phụ trách bảo vệ dữ liệu cá nhân: Là nhân sự được Asizon chỉ định để thực hiện một số trách nhiệm và chức năng liên quan đến quyền riêng tư và bảo vệ dữ liệu cá nhân/Tổ chức của Asizon tại Việt Nam.<br/><br/>

Lưu trữ dữ liệu: Các chính sách và quy trình được sử dụng trong Asizon để xác định khoảng thời gian lưu trữ và cách thức lưu trữ dữ liệu cá nhân.<br/><br/>

Bảo vệ dữ liệu cá nhân: Bảo vệ dữ liệu cá nhân là hoạt động phòng ngừa, phát hiện, ngăn chặn, xử lý hành vi vi phạm liên quan đến dữ liệu cá nhân theo quy định của pháp luật<br/><br/>

Tiếp thị trực tiếp: Là hoạt động cung cấp tài liệu tiếp thị vật lý cho người tiêu dùng để truyền đạt thông tin về sản phẩm hoặc dịch vụ.<br/><br/>

Quảng cáo trực tuyến: Các trang web hoặc dịch vụ quảng cáo trực tuyến tham gia vào việc theo dõi hoặc phân tích, ví dụ: cụm từ tìm kiếm, trình duyệt hoặc hồ sơ người dùng, tùy chọn, nhân khẩu học, hoạt động trực tuyến, hoạt động ngoại tuyến, dữ liệu vị trí và cung cấp quảng cáo dựa trên việc theo dõi đó.<br/><br/>

Mã hóa: Phương pháp mà theo đó văn bản thuần túy hoặc bất kỳ loại dữ liệu nào khác được chuyển đổi từ dạng có thể đọc được sang phiên bản được mã hóa chỉ được giải mã bởi một cá nhân khác nếu họ có quyền truy cập vào khóa giải mã.<br/><br/>

Tổ chức quốc tế: Một tổ chức và các cơ quan trực thuộc của tổ chức đó được thành lập và quản lý bởi luật pháp quốc tế, hoặc bất kỳ cơ quan nào khác được thành lập bởi, hoặc dựa trên cơ sở của một thỏa thuận giữa hai hoặc nhiều quốc gia.<br/><br/>

Địa chỉ IP: Một địa chỉ duy nhất xác định một thiết bị trên Internet hoặc mạng cục bộ và cho phép một hệ thống được nhận dạng bởi các hệ thống khác được kết nối qua giao thức Internet.<br/><br/>

Vi phạm dữ liệu cá nhân: Bất kỳ hành động hoặc thiếu sót nào dẫn đến việc truy cập hay truy xuất trái phép dữ liệu cá nhân của tổ chức, cá nhân khác.<br/><br/>

Luật bảo vệ dữ liệu cá nhân: Tập hợp các luật và quy định áp dụng cho việc thu thập, sử dụng, lưu trữ, bảo vệ và xử lý dữ liệu cá nhân khác, bao gồm các luật và quy định về bảo vệ dữ liệu, quyền riêng tư, bí mật ngân hàng, liên lạc điện tử và bảo mật thông tin cũng như bất kỳ luật hoặc quy định hiện hành nào khác liên quan đến quyền riêng tư của dữ liệu cá nhân.<br/><br/>

Dữ liệu sinh trắc học: Dữ liệu cá nhân thu được từ quá trình xử lý kỹ thuật cụ thể liên quan đến các đặc điểm thể chất, sinh lý hoặc hành vi của một cá nhân, cho phép hoặc xác nhận nhận dạng duy nhất của cá nhân đó, bao gồm hình ảnh khuôn mặt hoặc dữ liệu liên quan đến mống mắt.<br/><br/>

Giám đốc Bảo vệ Dữ liệu:Cá nhân do Asizon chỉ định để thực hiện các trách nhiệm và chức năng nhất định liên quan đến quyền riêng tư và bảo vệ dữ liệu cá nhân của Asizon trên toàn cầu.


            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                 Ai Là Bên Kiểm Soát Dữ Liệu?
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>

Bất kỳ dữ liệu cá nhân nào được cung cấp cho hoặc được thu thập bởi Asizon đều chịu sự kiểm soát của Công Ty Cổ Phần Á Đông Thịnh Vượng.<br/><br/>

Thông báo về Quyền Riêng tư này áp dụng đối với dữ liệu cá nhân do Asizon thu thập liên quan đến các dịch vụ và sản phẩm mà chúng tôi cung cấp. Trong Thông báo này, dẫn chiếu đến đến “Asizon” nghĩa là Công Ty Cổ Phần Á Đông Thịnh Vượng và bất kỳ công ty nào trực tiếp hoặc gián tiếp thuộc sở hữu và/hoặc chịu kiểm soát của Công Ty Cổ Phần Á Đông Thịnh Vượng mà bạn đang tương tác với hoặc có mối quan hệ kinh doanh với.<br/><br/>

Thông báo về Quyền Riêng tư này cũng áp dụng đối với nội dung tiếp thị của Asizon, kể cả các chào bán và các mẫu quảng cáo các sản phẩm và dịch vụ của Asizon, mà chúng tôi (hoặc một nhà cung cấp dịch vụ thay mặt cho chúng tôi) gửi cho bạn trên các trang web, nền tảng và ứng dụng của bên thứ ba dựa trên thông tin sử dụng trang web của bạn. Các trang web của bên thứ ba này nói chung có Thông báo và các Điều khoản và Điều kiện về Quyền Riêng tư của riêng các trang web đó. Chúng tôi khuyến khích bạn nên đọc Thông báo và các Điều khoản và Điều kiện về Quyền Riêng tư đó trước khi sử dụng các trang web đó.


            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                Chúng Tôi Thu Thập Dữ Liệu Cá Nhân Nào?
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
             Dữ liệu cá nhân là thông tin dưới dạng ký hiệu, chữ viết, chữ số, hình ảnh, âm thanh hoặc dạng tương tự trên môi trường điện tử gắn liền với một con người cụ thể hoặc giúp xác định một con người cụ thể.<br/><br/>

Bạn không cần phải cung cấp cho Asizon dữ liệu cá nhân mà chúng tôi yêu cầu, nhưng nếu bạn lựa chọn không cung cấp, chúng tôi có thể không có khả năng cung cấp cho bạn các sản phẩm hoặc dịch vụ của chúng tôi, hoặc dịch vụ với chất lượng cao hoặc phản hồi bất kỳ thắc mắc nào mà bạn có thể có.<br/><br/>

Chúng tôi có thể thu thập dữ liệu cá nhân từ nhiều nguồn, bao gồm:<br/><br/>
<ul>
  <li>Dữ liệu cá nhân mà bạn trực tiếp cung cấp cho chúng tôi,</li>
  <li>Dữ liệu cá nhân do chúng tôi thu thập tự động, và</li>
  <li>Dữ liệu cá nhân do chúng tôi thu thập từ các nguồn hợp pháp khác.</li>
  <li>Dữ liệu cá nhân là thông tin dưới dạng ký hiệu, chữ viết, chữ số, hình ảnh, âm thanh hoặc dạng tương tự trên môi trường điện tử gắn liền với một con người cụ thể hoặc giúp xác định một con người cụ thể. Định nghĩa này bao gồm cả dữ liệu cá nhân được thu thập ngoại tuyến thông qua các Trung tâm Chăm sóc Khách hàng của chúng tôi, các chiến dịch tiếp thị trực tiếp, rút thăm trúng thưởng và các cuộc thi và thu thập trực tuyến thông qua các trang web của chúng tôi, các ứng dụng và các trang có thương hiệu trên các nền tảng và ứng dụng của bên thứ ba được truy cập hoặc sử dụng thông qua các nền tảng của bên thứ ba.</li>
</ul><br/><br/>

Bạn có thể được yêu cầu cung cấp dữ liệu cá nhân của bạn khi bạn liên hệ với chúng tôi. Asizon Việt Nam có thể chia sẻ dữ liệu cá nhân này với các công ty khác thuộc Tập đoàn Asizon và sử dụng dữ liệu cá nhân này theo cách thức phù hợp với Thông báo về Quyền Riêng tư này. Chúng tôi cũng có thể kết hợp dữ liệu cá nhân này với thông tin khác để cải tiến các sản phẩm, dịch vụ, nội dung và quảng cáo của chúng tôi.<br/><br/>

Bạn không cần phải cung cấp cho Asizon dữ liệu cá nhân mà chúng tôi yêu cầu, nhưng nếu bạn lựa chọn không cung cấp, chúng tôi có thể không có khả năng cung cấp cho bạn các sản phẩm hoặc dịch vụ của chúng tôi, hoặc dịch vụ với chất lượng cao hoặc phản hồi bất kỳ thắc mắc nào mà bạn có thể có.


            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                Cách Thức Chúng Tôi Thu Thập Dữ Liệu Cá Nhân Của Bạn
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
               Chúng tôi có thể thu thập dữ liệu cá nhân từ nhiều nguồn, bao gồm:<br/><br/>

Dữ liệu cá nhân mà bạn trực tiếp cung cấp cho chúng tôi. Chúng tôi thu thập dữ liệu về cách thức bạn sử dụng các dịch vụ và sản phẩm của chúng tôi, chẳng hạn như loại nội dung mà bạn xem hoặc có quan tâm, hoặc mức độ thường xuyên và thời gian của các hoạt động của bạn. Chúng tôi cũng thu thập dữ liệu cá nhân mà bạn cung cấp cho chúng tôi khi bạn đăng ký nhận bản tin tiếp thị, hoàn tất một khảo sát hoặc đăng ký tài khoản để mua các sản phẩm của chúng tôi. Khi thực hiện như vậy, chúng tôi có thể yêu cầu cung cấp dữ liệu cá nhân, chẳng hạn như tên, giới tính, ngày sinh, địa chỉ, địa chỉ thư điện tử, số điện thoại hoặc chi tiết thẻ tín dụng của bạn. Một số thương hiệu của Asizon có thể thu thập “các loại dữ liệu cá nhân nhạy cảm” về bạn khi có sự chấp thuận rõ ràng của bạn. Để biết thêm thông tin về các loại dữ liệu cá nhân đặc biệt mà chúng tôi thu thập và cách thức chúng tôi sử dụng các loại dữ liệu đặc biệt đó, vui lòng xem phần có liên quan dưới đây.<br/><br/>

Dữ liệu cá nhân do chúng tôi thu thập tự động. Chúng tôi cũng nhận và lưu trữ một số loại dữ liệu cá nhân mỗi khi bạn tương tác trực tuyến với chúng tôi. Ví dụ, chúng tôi sử dụng các cookie và các công nghệ theo dõi (để tìm hiểu thêm, xem các thuật ngữ chính về quyền riêng tư của chúng tôi) để thu thập dữ liệu cá nhân khi trình duyệt web của bạn truy cập các trang web hoặc các mẫu quảng cáo của chúng tôi và nội dung khác được cung cấp bởi hoặc thay mặt cho Asizon trên các trang web khác. Dữ liệu cá nhân của bạn cũng được thu thập khi bạn tìm kiếm, mua hàng, đăng bài, tham gia một cuộc thi hoặc trả lời bảng câu hỏi hoặc trao đổi với các nhóm dịch vụ khách hàng của chúng tôi. Ví dụ về các loại dữ liệu cá nhân mà chúng tôi thu thập bao gồm; địa chỉ IP để tìm hiểu thêm, xem các thuật ngữ chính về quyền riêng tư của chúng tôi, số định danh thiết bị, dữ liệu địa điểm, thông tin về máy tính và kết nối chẳng hạn như loại và phiên bản trình duyệt, thiết lập múi giờ, loại và phiên bản phần mềm hỗ trợ trình duyệt (plug-in), hệ điều hành, và lịch sử mua hàng – mà có những thời điểm Asizon tổng hợp với thông tin tương tự từ những người tiêu dùng khác. Trong thời gian bạn duyệt các trang web của Asizon, chúng tôi cũng có thể sử dụng các công cụ phần mềm để đo lường và thu thập thông tin phiên truy cập, bao gồm thời gian phản hồi của trang, lỗi tải về, thời gian và lượt truy cập một số trang nhất định, thông tin tương tác trang, và các phương thức được sử dụng để rời khỏi trang. Chúng tôi cũng có thể thu thập thông tin kỹ thuật nhằm giúp chúng tôi xác định thiết bị của bạn cho mục đích phòng chống và đánh giá gian lận.<br/><br/>

Dữ liệu cá nhân do chúng tôi thu thập từ các nguồn hợp pháp khác. Chúng tôi thu thập dữ liệu cá nhân từ các nguồn khác kể cả quan hệ đối tác đáng tin cậy giữa chúng tôi với các bên thứ ba và trong trường hợp chúng tôi vận hành các tài khoản Asizon trên các nền tảng của bên thứ ba: Ví dụ, khi bạn sử dụng chức năng “thích (like)” trên Facebook hoặc chức năng +1 trên Google+. Bên cạnh đó, chúng tôi nhận thông tin về bạn và các tương tác của người truy cập khác đối với quảng cáo của chúng tôi để đo lường hiệu quả quảng cáo của chúng tôi có phù hợp và thành công hay không. Chúng tôi cũng thu thập thông tin về bạn và các hoạt động của bạn từ một bên thứ ba khi chúng tôi cùng cung cấp các dịch vụ hoặc sản phẩm, hoặc từ các bên thứ ba cung cấp dịch vụ làm giàu dữ liệu để tìm hiểu thêm, xem các thuật ngữ chính về quyền riêng tư của chúng tôi là các bên có thể giúp Asizon thấu hiểu về dữ liệu cá nhân mà chúng tôi nắm giữ.

            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                Thời Điểm và Lý Do Chúng Tôi Thu Thập “Dữ Liệu Cá Nhân Nhạy Cảm”
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Một số loại dữ liệu cá nhân, chẳng hạn như dữ liệu về nguồn gốc chủng tộc, nguồn gốc dân tộc, quan điểm tôn giáo, tình trạng sức khỏe, đời sống tình dục hoặc thông tin sinh trắc học được phân loại là “dữ liệu cá nhân nhạy cảm” và được bảo vệ bổ sung theo pháp luật bảo vệ dữ liệu của Việt Nam và Châu Âu.<br/><br/>

Chúng tôi giới hạn các trường hợp thu thập và xử lý các dữ liệu cá nhân nhạy cảm này.<br/><br/>

Có những thời điểm Asizon thu thập dữ liệu liên quan đến tình trạng sức khỏe của bạn chẳng hạn như tình trạng dị ứng, thai nghén hoặc loại da để gửi cho bạn các quảng cáo được thiết kế cho đối tượng nhất định và các khuyến mãi liên quan. Asizon chỉ thu thập và sử dụng dữ liệu cá nhân này trong trường hợp bạn đã chấp thuận cho chúng tôi thu thập và sử dụng chúng. Trong một số trường hợp, bạn có thể đã yêu cầu các dịch vụ hoặc sản phẩm không trực tiếp đòi hỏi phải thu thập bất kỳ dữ liệu cá nhân nhạy cảm nào, nhưng có thể được ngầm hiểu hoặc ám chỉ về dữ liệu về tôn giáo, sức khỏe hoặc các loại dữ liệu nhạy cảm khác của bạn.<br/><br/>

Để minh họa các trường hợp mà Asizon thu thập và xử lý các loại dữ liệu cá nhân nhạy cảm, chúng tôi đưa ra ví dụ sau đây:<br/><br/>

Asizon thu thập dữ liệu cá nhân liên quan đến tình trạng dị ứng của người tiêu dùng để cung cấp cho người tiêu dùng các quảng cáo và khuyến mãi  sản phẩm có liên quan đến nhu cầu của người tiêu dùng.


            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                Chúng Tôi Bảo Vệ Quyền Riêng Tư Của Trẻ Em Như Thế Nào?
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
               Chúng tôi hiểu rõ tầm quan trọng của việc thực hiện các biện pháp phòng ngừa tăng cường để bảo vệ quyền riêng tư và sự an toàn của trẻ em sử dụng các sản phẩm và dịch vụ của Asizon.<br/><br/>

Hầu hết các trang web của Asizon được thiết kế dành cho người trưởng thành sử dụng. Trong trường hợp một trong số các trang web của chúng tôi là dành cho nhóm đối tượng nhỏ hơn sử dụng, chúng tôi sẽ phải có được sự đồng ý của trẻ em trong trường hợp trẻ em từ đủ 7 tuổi trở lên và có được sự đồng ý của cha, mẹ hoặc người giám hộ theo quy định trước khi chúng tôi thu thập và xử lý dữ liệu cá nhân của trẻ em.<br/><br/>

Nếu bạn là trẻ em trong độ tuổi cần phải có sự chấp thuận của cha mẹ tại quốc gia của bạn, bạn cần xem các điều khoản của Thông báo về Quyền Riêng tư này cùng với cha mẹ hoặc người giám hộ của bạn để chắc chắn là bạn hiểu và chấp nhận các điều khoản của Thông báo về Quyền Riêng tư này. Nếu chúng tôi phát hiện chúng tôi đã thu thập dữ liệu cá nhân của trẻ em mà không có sự chấp thuận của cha, mẹ hoặc người giám hộ trong trường hợp chúng tôi cần phải có sự chấp thuận như vậy, chúng tôi sẽ xóa dữ liệu cá nhân đó trong thời gian sớm nhất có thể. Nói chung, chỉ có những người sử dụng lớn hơn một độ tuổi nhất định mới được truy cập một số phần nhất định của các trang web của Asizon và/hoặc đủ điều kiện để nhận các giải thưởng, hàng mẫu hoặc các phần thưởng khác.<br/><br/>

Có những thời điểm chúng tôi sử dụng dữ liệu cá nhân của bạn để thực hiện việc kiểm tra xác minh độ tuổi và thực thi hạn chế đối với độ tuổi trẻ em nêu trên.

            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                Chúng Tôi Sử Dụng Dữ Liệu Của Bạn Cho Mục Đích Gì?
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
Chúng tôi chỉ thu thập, xử lý và tiết lộ dữ liệu cá nhân của bạn cho một số ít các mục đích cụ thể. Ví dụ, để xử lý các khoản thanh toán của bạn, để đánh giá và giải quyết bất kỳ khiếu nại nào, để phát triển và cải tiến các sản phẩm, các dịch vụ, các phương pháp truyền thông của chúng tôi và chức năng của các trang web của chúng tôi, để cung cấp các sản phẩm hoặc quà tặng, thông tin truyền thông mang tính cá nhân hóa và quảng cáo định hướng đối tượng cũng như các đề xuất sản phẩm cho bạn.<br/><br/>

Chúng tôi cũng tạo ra các hồ sơ bằng cách phân tích thông tin về hành vi lướt web, tìm kiếm thông tin và mua hàng trực tuyến của bạn và các tương tác của bạn với các truyền thông thương hiệu của chúng tôi bằng cách xây dựng các phân khúc (tạo ra các nhóm có một số đặc điểm chung) và bằng cách đưa dữ liệu cá nhân của bạn vào một hoặc nhiều phân khúc.<br/><br/>

Bên cạnh đó, Asizon cũng xử lý dữ liệu cá nhân của bạn bằng cách sử dụng các phương thức tự động. Một quyết định tự động là một quyết định được đưa ra hoàn toàn bằng phương thức tự động, trong đó không có sự tham gia của con người vào quy trình đưa ra quyết định liên quan đến dữ liệu cá nhân của bạn.<br/><br/>

Chúng tôi thu thập, xử lý và tiết lộ dữ liệu cá nhân của bạn cho các mục đích sau đây:<br/><br/>
<ul>
  <li>Để xử lý các khoản thanh toán của bạn, nếu bạn mua các sản phẩm của chúng tôi, để cung cấp cho bạn tình trạng đơn đặt hàng của bạn, xử lý các thắc mắc và yêu cầu của bạn, đánh giá và giải quyết bất kỳ khiếu nại nào;</li>
  <li>Để triển khai dịch vụ chăm sóc khách hàng, dịch vụ bảo hành sản phẩm và thực hiện các yêu cầu khác của bạn;</li>
  <li>Xử lý và trả lời các câu hỏi của bạn hoặc liên hệ với bạn để trả lời các câu hỏi và/hoặc yêu cầu của bạn;</li>
  <li>Để phát triển và cải tiến các sản phẩm, các dịch vụ, các phương pháp truyền thông của chúng tôi và chức năng của các trang web của chúng tôi;</li>
  <li>Cho mục đích của các cuộc thi hoặc các chương trình khuyến mãi mà bạn đã đăng ký;</li>
  <li>Để chuyển thông tin cho bạn và quản lý việc bạn đăng ký và/hoặc đồng ý nhận bản tin hoặc thông tin truyền thông khác của chúng tôi;</li>
  <li>Để quản lý nhu cầu hoạt động kinh doanh hàng ngày của chúng tôi liên quan đến việc bạn tham gia các cuộc thi, rút thăm trúng thưởng, các hoạt động tiếp thị, khảo sát, quảng cáo hoặc khuyến mại của chúng tôi;</li>
  <li>Để xác thực danh tính của các cá nhân liên hệ với chúng tôi qua điện thoại, phương tiện điện tử hoặc phương thức khác;</li>
  <li>Cho mục đích đào tạo nội bộ và bảo đảm chất lượng;</li>
  <li>Để thấu hiểu và đánh giá các quan tâm, mong muốn, và nhu cầu luôn thay đổi của người tiêu dùng, để cải tiến trang web của chúng tôi, các sản phẩm và dịch vụ hiện tại của chúng tôi, và/hoặc phát triển các sản phẩm và dịch vụ mới; và</li>
  <li>Để cung cấp các sản phẩm, thông tin truyền thông mang tính cá nhân hóa và quảng cáo định hướng đối tượng cũng như đề xuất sản phẩm cho bạn.
Khi chúng tôi thu thập và sử dụng dữ liệu cá nhân của bạn cho các mục đích được trình bày ở trên hoặc cho các mục đích khác, chúng tôi sẽ thông báo cho bạn trước hoặc vào thời điểm thu thập.</li>
</ul><br/><br/>

Khi thích hợp, chúng tôi sẽ xin chấp thuận của bạn để xử lý dữ liệu cá nhân. Trong trường hợp bạn đã chấp thuận đối với các hoạt động xử lý, bạn có quyền rút lại chấp thuận của bạn vào bất kỳ thời điểm nào.<br/><br/>

Chúng tôi xử lý dữ liệu cá nhân của bạn để thực hiện một hợp đồng mà bạn là hoặc sẽ là một bên tham gia. Ví dụ, chúng tôi cần xử lý dữ liệu cá nhân của bạn để chuyển giao một sản phẩm hoặc dịch vụ mà bạn đã mua, để cho phép bạn tham gia một trong số các cuộc thi của chúng tôi, hoặc để gửi cho bạn hàng mẫu mà bạn đã yêu cầu.<br/><br/>

Chúng tôi cũng xử lý dữ liệu cá nhân của bạn khi chúng tôi có nghĩa vụ thực hiện việc xử lý đó theo quy định pháp luật (ví dụ nghĩa vụ thuế hoặc an sinh xã hội). Ví dụ, một lệnh của tòa án hoặc một văn bản của cơ quan nhà nước có thẩm quyền có thể yêu cầu chúng tôi phải xử lý dữ liệu cá nhân cho một mục đích cụ thể, hoặc chúng tôi có thể bị buộc phải xử lý dữ liệu cá nhân để báo cáo các giao dịch đáng ngờ theo các quy định về chống rửa tiền.

            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                Lập hồ sơ  (profiling)
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
Asizon sử dụng dữ liệu cá nhân của bạn để lập hồ sơ khách hàng của cá nhân bạn. Dựa vào việc phân tích thông tin về hành vi lướt web, tìm kiếm và mua hàng trực tuyến của bạn và các tương tác của bạn với các trang mạng xã hội của chúng tôi, chúng tôi sẽ lập hồ sơ  nhằm mục đích cá nhân hóa các trang web và thông tin truyền thông của chúng tôi phù hợp với cá nhân bạn (chẳng hạn như thể hiện nội dung có liên quan đến bạn khi bạn truy cập trang web của chúng tôi hoặc trong một bản tin gửi đến bạn), và để hiển thị các sản phẩm và dịch vụ và các mẫu quảng cáo có liên quan từ các thương hiệu của Asizon trên các trang web của Asizon, và thông qua các trang web của bên thứ ba. Việc cá nhân hóa này cũng có thể được sử dụng cho các chiến dịch, ví dụ như chiến dịch tiếp thị, của bên thứ ba trên các trang web của Asizon.<br/><br/>

Asizon chỉ lập hồ sơ dữ liệu của bạn khi bạn đã chấp thuận cho chúng tôi thực hiện việc đó; ví dụ, chấp nhận cho các cookie được đặt vào trình duyệt trực tuyến của bạn hoặc đăng ký nhận các bản tin qua thư điện tử từ một trong số các thương hiệu của chúng tôi.<br/><br/>

Bạn có thể rút lại chấp thuận của bạn để ngăn không cho dữ liệu cá nhân của bạn được sử dụng theo cách thức này vào bất kỳ thời điểm nào bằng cách sử dụng phần quản lý cookie của Thông báo về Cookie của chúng tôi hoặc hủy đăng ký việc sử dụng địa chỉ thư điện tử của bạn nếu bạn đã đăng nhập vào một trong số các trang web của chúng tôi hoặc đã đăng ký nhận bất kỳ bản tin tiếp thị nào.<br/><br/>

Ví dụ:<br/><br/>

- Khi có chấp thuận của bạn, Asizon thu thập dữ liệu từ:<br/><br/>

Các trang web của chúng tôi về nội dung mà bạn xem và cách thức bạn tương tác với nội dung của chúng tôi;<br/><br/>

Quảng cáo hiển thị trực tuyến mà chúng tôi cung cấp cho bạn trên các nền tảng xã hội và các trang web của nhà bán quảng cáo khác; và<br/><br/>

Các biểu mẫu mà bạn điền trực tuyến và gửi cho chúng tôi về các quan tâm của bạn.<br/><br/>
- Chúng tôi cũng theo dõi các sản phẩm mà bạn mua khi bạn nhấp chuột vào một trong số các quảng cáo hiển thị của chúng tôi và tiếp tục mua hàng từ danh mục các đối tác bán lẻ của chúng tôi.<br/><br/>
- Nếu bạn đã yêu cầu nhận thông tin truyền thông qua thư điện tử hoặc tin nhắn SMS từ chúng tôi, chúng tôi theo dõi việc bạn có mở, đọc hoặc nhấp chuột vào nội dung để xem những gì mà bạn quan tâm hay không để chúng tôi có thể cung cấp cho bạn thêm nội dung mà chúng tôi nghĩ có nhiều khả năng là bạn sẽ thích.<br/><br/>
- Chúng tôi sử dụng dữ liệu này để lập hồ sơ về những gì bạn thích và không thích. Ví dụ, nếu chúng tôi biết bạn thường xuyên xem các công thức nấu ăn Vegan trên trang web “Recipedia” của chúng tôi, và bạn đã chọn nhận thư điện tử từ chúng tôi, chúng tôi có thể cung cấp cho bạn bản cập nhật về các công thức nấu ăn Vegan mới vừa được đăng lên trang web để bạn biết và tìm hiểu, hoặc chúng tôi có thể hướng nội dung web của chúng tôi khi bạn truy cập đến những điều mà chúng tôi nghĩ là bạn sẽ quan tâm nhiều nhất.<br/><br/>
- Dựa trên thông tin xây dựng mô hình đặc trưng về nhóm đối tượng mục tiêu này, chúng tôi cũng có thể cung cấp cho bạn quảng cáo mà chúng tôi nghĩ là bạn sẽ thích và muốn xem khi bạn xem nội dung từ chúng tôi hoặc từ trang mạng của các nhà cung cấp dịch vụ quảng cáo mà chúng tôi cho đăng quảng cáo. Có những thời điểm, khi có chấp thuận của bạn, chúng tôi có thể sử dụng địa điểm hiện tại của bạn để cung cấp quảng cáo cho bạn, là các quảng cáo liên quan đến các khuyến mãi hoặc sự kiện đang diễn ra gần bạn mà chúng tôi nghĩ là bạn có thể sẽ quan tâm.<br/><br/>
Chúng tôi cũng có thể sử dụng thông tin mà bạn đã cung cấp cho một số bên thứ ba chọn lọc và đã chấp thuận cho chia sẻ, như là tuổi, giới tính, giai đoạn cuộc đời, phong cách sống và các mối quan tâm rộng hơn của bạn để xác định người mà chúng tôi nghĩ là sẽ có các mối quan tâm giống như bạn và người mà chúng tôi tin là sẽ quan tâm đến quảng cáo tương tự.<br/><br/>
- Chúng tôi có thể chia sẻ thông tin nhận dạng tài khoản thông thường (như địa chỉ email, số điện thoại hoặc mã thiết bị của người dùng) hoặc dữ liệu vô danh  với các đối tác quảng cáo bên thứ ba của chúng tôi để giúp nhận dạng bạn trên các thiết bị hoặc phân phát quảng cáo cho bạn trên các trang mạng xã hội mà bạn có thể sử dụng. Chúng tôi và các đối tác bên thứ ba của chúng tôi sử dụng thông tin này để làm cho các quảng cáo bạn thấy trực tuyến phù hợp hơn với sở thích của bạn cũng như cung cấp các dịch vụ liên quan đến quảng cáo như báo cáo, phân bổ, phân tích và nghiên cứu thị trường.

            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                Đưa ra quyết định tự động
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
Trong một số trường hợp, Asizon xử lý dữ liệu cá nhân của bạn bằng cách sử dụng các phương thức tự động. Một quyết định tự động là một quyết định được đưa ra hoàn toàn bằng phương thức tự động, trong đó không có sự tham gia của con người vào quy trình đưa ra quyết định liên quan đến thông tin bạn cung cấp. Ví dụ:<br/><br/>
<ul>
  <li>Asizon sử dụng các giả lập trò chơi trong đó bao gồm các đánh giá hành vi dựa trên khoa học và các kỹ thuật khoa học dữ liệu để đánh giá người lao động tiềm năng. Các ứng viên được yêu cầu chơi một bộ trò chơi và các mẫu hành vi mà các ứng viên thể hiện trong quá trình chơi trò chơi được đánh giá bằng một thuật toán tùy chỉnh của Asizon để dự đoán tiềm năng của ứng viên cho một vai trò cụ thể. Thuật toán này được kiểm tra thường xuyên để bảo đảm duy trì sự công bằng, hiệu quả và không thiên vị.</li>
</ul><br/><br/>

Chúng tôi sẽ không đưa ra quyết định hoàn toàn dựa trên việc đưa ra quyết định tự động nếu việc đó gây ảnh hưởng đáng kể đến bạn. Nếu chúng tôi thực hiện việc đó, chúng tôi sẽ thông báo cho bạn và cung cấp cho bạn thông tin rõ ràng về việc chúng tôi quyết định dựa vào quy trình tự động đưa ra quyết định của chúng tôi và cơ sở pháp lý để chúng tôi thực hiện việc đó.<br/><br/>

Bạn có quyền không thực hiện theo một quyết định hoàn toàn dựa trên quy trình tự động. Cụ thể là, bạn có quyền:<br/><br/>
<ul>
  <li>yêu cầu có sự can thiệp của con người;</li>
  <li>thể hiện quan điểm của bạn;</li>
  <li>yêu cầu giải trình về quyết định đạt được sau khi đánh giá; và
không thừa nhận quyết định đó.</li>
</ul>
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
               Dữ Liệu Cá Nhân Của Bạn Được Chia Sẻ Với Ai?
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
Là một doanh nghiệp định hướng toàn cầu, Asizon chia sẻ dữ liệu cá nhân của bạn trong nội bộ tập đoàn và với một số bên thứ ba chọn lọc trong các trường hợp sau đây:
<br/><br/>
Các nhà cung cấp dịch vụ bên thứ ba. Để tiến hành các yêu cầu của bạn, phản hồi các câu hỏi của bạn, đáp ứng các đơn đặt hàng của bạn, chấp nhận phiếu mua hàng/phiếu quà tặng, cung cấp hàng mẫu hoặc quà tặng cho bạn, cho phép bạn tham gia rút thăm trúng thưởng hoặc cung cấp nhiều tính năng, dịch vụ và tài liệu khác cho bạn thông qua các trang web của chúng tôi, chúng tôi chia sẻ dữ liệu cá nhân của bạn với các bên thứ ba cung cấp dịch vụ thực hiện các chức năng thay mặt cho chúng tôi, chẳng hạn như các công ty: cung cấp không gian lưu trữ hoặc vận hành các trang web của Asizon, xử lý thanh toán, phân tích dữ liệu, cung cấp dịch vụ khuyến mãi, chăm sóc khách hàng, dịch vụ bưu chính hoặc chuyển phát, và các bên đối tác hoặc các bên thứ ba khác tham gia hoặc thực hiện quảng bá cho chúng tôi. Các nhà cung cấp dịch vụ bên thứ ba này có quyền tiếp cận các dữ liệu cá nhân cần thiết để thực hiện các chức năng của họ nhưng không thể sử dụng dữ liệu cá nhân cho các mục đích khác. Ngoài ra, họ phải xử lý dữ liệu cá nhân này phù hợp với Thông báo về Quyền Riêng tư này và trong phạm vi được cho phép theo các luật và quy định áp dụng về bảo vệ dữ liệu.<br/><br/>

Các bên thứ ba khác. Khi được bạn cho phép, dữ liệu cá nhân của bạn cũng sẽ được chúng tôi sử dụng hoặc chia sẻ với các nhà tài trợ, các đối tác bán lẻ, các nhà quảng cáo, các mạng quảng cáo, các máy chủ quảng cáo, các mạng truyền thông xã hội, và các công ty phân tích của chúng tôi hoặc các bên thứ ba khác liên quan đến tiếp thị, khuyến mại, làm giàu dữ liệu để tìm hiểu thêm về các thuật ngữ chính về quyền riêng tư của chúng tôi và các đề nghị khác, cũng như thông tin về sản phẩm.
<br/><br/>
Chuyển nhượng hoạt động kinh doanh. Dữ liệu cá nhân của bạn sẽ được chúng tôi sử dụng hoặc chia sẻ với Tập đoàn Asizon, chủ yếu là cho mục đích hoạt động kinh doanh và vận hành. Khi chúng tôi tiếp tục phát triển hoạt động kinh doanh của chúng tôi, chúng tôi có thể bán hoặc mua tài sản, công ty con hoặc đơn vị kinh doanh. Trong các giao dịch đó, dữ liệu cá nhân của bạn nói chung là một trong số các tài sản kinh doanh được chuyển nhượng nhưng vẫn là đối tượng của các cam kết được đưa ra trong bất kỳ Thông báo về Quyền Riêng tư nào đã tồn tại trước đó (đương nhiên, trừ khi bạn đồng ý khác đi). Nếu một tổ chức khác mua lại chúng tôi, các hoạt động kinh doanh của chúng tôi hoặc về cơ bản toàn bộ hoặc một phần trong số các tài sản của chúng tôi, hoặc các tài sản liên quan đến các trang web của Asizon, dữ liệu cá nhân của bạn sẽ được tiết lộ cho tổ chức đó như là một phần của quy trình thẩm định và sẽ được chuyển nhượng cho tổ chức đó như là một trong số các tài sản được chuyển nhượng. Đồng thời, nếu chúng tôi tiến hành hoặc bị tiến hành bất kỳ thủ tục phá sản hoặc thủ tục tổ chức lại nào, tất cả dữ liệu cá nhân đó sẽ được xem là tài sản của chúng tôi và theo đó có khả năng tất cả dữ liệu cá nhân đó sẽ được bán hoặc chuyển nhượng cho các bên thứ ba.


            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                Công bố thông tin theo quy định pháp luật.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
Chúng tôi có thể chuyển giao và tiết lộ dữ liệu cá nhân của bạn cho các bên thứ ba:<br/><br/>
Để tuân thủ một nghĩa vụ pháp lý;<br/><br/>
Khi chúng tôi trên tinh thần thiện chí tin rằng đó là theo yêu cầu của pháp luật hiện hành;<br/><br/>
Theo yêu cầu của các cơ quan chính phủ tiến hành điều tra;<br/><br/>
Để xác minh hoặc thi hành các điều khoản hoặc các chính sách áp dụng khác của chúng tôi;<br/><br/>
Để phát hiện và bảo vệ đối với hành vi gian lận, hoặc bất kỳ lỗ hổng kỹ thuật hoặc an ninh nào;<br/><br/>
Để ứng phó trường hợp khẩn cấp; hoặc trường hợp khác;<br/><br/>
Để bảo vệ các quyền, tài sản, sự an toàn, hoặc an ninh của các bên thứ ba, các khách truy cập các trang web của Asizon, Asizon hoặc công chúng.


            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
               Chúng Tôi Bảo Vệ Dữ Liệu Cá Nhân Của Bạn Như Thế Nào?
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
Asizon rất xem trọng an ninh dữ liệu cá nhân của bạn. Chúng tôi sử dụng mọi nỗ lực để bảo vệ dữ liệu cá nhân của bạn không bị lạm dụng, can thiệp, mất, truy cập trái phép, điều chỉnh hoặc tiết lộ. Tuy nhiên, vui lòng hiểu rằng mặc dù chúng tôi nỗ lực hết sức để lưu trữ dữ liệu cá nhân của bạn một cách an toàn, chúng tôi không thể đảm bảo rằng các biện pháp bảo mật của chúng tôi sẽ ngăn các bên thứ ba như tin tặc truy cập trái phép vào dữ liệu cá nhân của bạn. Trong trường hợp dữ liệu bị xâm phạm (nếu có), Asizon sẽ tuân thủ tất cả các biện pháp báo cáo và khắc phục như được quy định theo pháp luật bảo vệ dữ liệu hiện hành.<br/><br/>

Các biện pháp của chúng tôi bao gồm triển khai các biện pháp kiểm soát truy cập phù hợp, đầu tư vào Năng lực An toàn Thông tin mới nhất để bảo vệ môi trường công nghệ thông tin mà chúng tôi sử dụng, và bảo đảm chúng tôi mã hóa, ký hiệu hóa và ẩn danh hóa dữ liệu cá nhân bất kỳ khi nào có thể.<br/><br/>

Việc tiếp cận dữ liệu cá nhân của bạn chỉ được cho phép giữa các nhân viên và đại diện của chúng tôi trên cơ sở cần phải biết và tuân theo các nghĩa vụ bảo mật nghiêm ngặt theo hợp đồng khi dữ liệu được xử lý bởi các bên thứ ba.

            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                Chúng Tôi Lưu Giữ Dữ Liệu Của Bạn Trong Bao Lâu?
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
Chúng tôi sẽ lưu giữ dữ liệu cá nhân của bạn cho đến khi nào chúng tôi vẫn còn cần dữ liệu cá nhân của bạn cho mục đích mà nó đang được xử lý. Ví dụ, khi bạn mua hàng trực tuyến với chúng tôi, chúng tôi sẽ lưu giữ dữ liệu liên quan đến việc mua hàng của bạn, để chúng tôi có thể thực hiện hợp đồng cụ thể mà bạn đã ký kết và sau đó, chúng tôi sẽ lưu giữ dữ liệu cá nhân trong một khoảng thời gian cho phép chúng tôi giải quyết hoặc phản hồi bất kỳ khiếu nại, thắc mắc hoặc quan ngại nào liên quan đến việc mua hàng.<br/><br/>

Dữ liệu của bạn cũng có thể được lưu giữ để chúng tôi có thể tiếp tục cải tiến trải nghiệm của bạn với chúng tôi và để bảo đảm rằng bạn nhận được bất kỳ phần thưởng khách hàng thân thiết nào mà bạn được hưởng.<br/><br/>

Chúng tôi bảo lưu dữ liệu có thể nhận diện mà chúng tôi thu thập trực tiếp cho mục đích xác định đối tượng mục tiêu trong thời gian ít nhất có thể, sau đó chúng tôi sử dụng các biện pháp để xóa bỏ vĩnh viễn dữ liệu đó.

Chúng tôi sẽ chủ động rà soát dữ liệu cá nhân mà chúng tôi nắm giữ và bảo đảm xóa dữ liệu cá nhân đó, hoặc trong một số trường hợp, ẩn danh hóa dữ liệu cá nhân đó, khi không còn cần thiết phải lưu giữ dữ liệu cá nhân đó cho mục đích tuân thủ quy định pháp luật, mục đích kinh doanh hoặc đáp ứng nhu cầu người tiêu dùng.<br/><br/>

Thời hạn lưu trữ dữ liệu cá nhân của người tiêu dùng là 2 năm liên tiếp từ thời điểm không có hoạt động gần nhất.

            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
               Bạn Có Các Quyền Gì?
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
Khi chúng tôi xử lý dữ liệu cá nhân của bạn, bạn có một số quyền đối với cách thức xử lý dữ liệu và có thể thực hiện các quyền này vào bất kỳ thời điểm nào. Chúng tôi giới thiệu tổng quan về các quyền này dưới đây cùng với những gì mà các quyền này mang đến cho bạn. Bạn có thể thực hiện các quyền của bạn bằng cách gửi yêu cầu qua phần “Liên hệ” trên các website của nhãn hàng.<br/><br/>


Quyền được biết. Bạn có quyền được biết rõ ràng, minh bạch và dễ hiểu về cách thức chúng tôi xử lý dữ liệu cá nhân của bạn và các quyền của bạn. Do đó, chúng tôi cung cấp cho bạn thông tin trong Thông báo này.<br/><br/>

Quyền chấp thuận. Bạn có quyền chấp thuận hoặc không chấp thuận cho phép xử lý dữ liệu cá nhân của mình.<br/><br/>

Quyền truy cập và sửa đổi. Bạn có quyền truy cập, sửa đổi hoặc cập nhật dữ liệu cá nhân của bạn vào bất kỳ thời điểm nào. Chúng tôi hiểu tầm quan trọng của việc này và nếu bạn muốn thực hiện các quyền của bạn, vui lòng liên hệ với chúng tôi.<br/><br/>

Quyền xóa dữ liệu. Trong một số trường hợp, bạn có quyền xóa hoặc yêu cầu chúng tôi xóa dữ liệu của bạn. Nếu bạn muốn xóa dữ liệu cá nhân về bạn do chúng tôi nắm giữ, vui lòng thông báo cho chúng tôi và chúng tôi sẽ thực hiện các bước hợp lý để phản hồi yêu cầu của bạn theo các quy định pháp luật. Nếu dữ liệu cá nhân mà chúng tôi thu thập không còn cần thiết cho bất kỳ mục đích nào và pháp luật không yêu cầu chúng tôi phải lưu giữ dữ liệu cá nhân đó, chúng tôi sẽ thực hiện bất kỳ biện pháp nào mà chúng tôi có thể để xóa, tiêu hủy hoặc che giấu vĩnh viễn dữ liệu cá nhân đó.<br/><br/>

Quyền hạn chế xử lý dữ liệu. Trong một số trường hợp, bạn có quyền hạn chế việc xử lý dữ liệu cá nhân của bạn. Nếu bạn yêu cầu chúng tôi hạn chế xử lý dữ liệu cá nhân của bạn, chúng tôi sẽ thực hiện các bước hợp lý để phản hồi yêu cầu của bạn theo các quy định pháp luật.<br/><br/>

Quyền cung cấp dữ liệu. Bạn có quyền yêu cầu chúng tôi cung cấp cho bạn những dữ liệu cá nhân của bạn mà chúng tôi có thu thập.<br/><br/>

Quyền phản đối. Trong một số trường hợp, bạn có quyền phản đối xử lý dữ liệu cá nhân của mình nhằm ngăn chặn hoặc hạn chế tiết lộ dữ liệu cá nhân hoặc sử dụng  cho mục đích quảng cáo, tiếp thị.
<br/><br/>
Quyền khiếu nại, tố cáo, khởi kiện. Bạn có quyền khiếu nại, tố cáo hoặc khởi kiện về cách thức chúng tôi xử lý dữ liệu cá nhân của bạn theo quy định của pháp luật.
<br/><br/>
Quyền rút lại chấp thuận. Nếu bạn đã chấp thuận bất kỳ hành động nào mà chúng tôi thực hiện với dữ liệu cá nhân của bạn (cụ thể là chúng tôi dựa vào chấp thuận để làm cơ sở pháp lý cho việc xử lý dữ liệu cá nhân của bạn), bạn có quyền rút lại chấp thuận của bạn vào bất kỳ thời điểm nào (mặc dù nếu bạn rút lại chấp thuận của bạn, việc đó không có nghĩa là bất kỳ hành động nào mà chúng tôi đã thực hiện với dữ liệu cá nhân của bạn khi đã có chấp thuận của bạn tính đến thời điểm đó là bất hợp pháp). Bạn có thể rút lại chấp thuận của bạn đối với việc xử lý dữ liệu cá nhân của bạn vào bất kỳ thời điểm nào bằng cách liên hệ với chúng tôi theo các chi tiết được cung cấp dưới đây.<br/><br/>

Quyền yêu cầu bồi thường thiệt hại: Bạn có quyền yêu cầu bồi thường thiệt hại theo quy định của pháp luật khi xảy ra vi phạm quy định bảo vệ dữ liệu cá nhân của mình.<br/><br/>

Quyền tự bảo vệ. Bạn có quyền tự bảo vệ theo quy định của Bộ luật Dân sự và pháp luật hiện hành, hoặc yêu cầu cơ quan, tổ chức có thẩm quyền thực hiện các phương thức bảo vệ quyền dân sự của bạn theo quy định của Bộ luật Dân sự.<br/><br/>

Quyền liên quan đến quyết định tự động. Bạn có quyền không thực hiện theo một quyết định hoàn toàn dựa trên quy trình tự động và mang đến cho bạn các ảnh hưởng về mặt pháp lý hoặc các ảnh hưởng đáng kể khác. Cụ thể là, bạn có quyền:<br/><br/>
<ul>
  <li>yêu cầu có sự can thiệp của con người;</li>
  <li>thể hiện quan điểm của bạn;</li>
  <li>yêu cầu giải trình về quyết định đạt được sau khi đánh giá; và
không thừa nhận quyết định đó.</li>
</ul>
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                Làm Thế Nào Để Liên Hệ Với Asizon?
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
Bạn có thể liên hệ với Nhân sự phụ trách bảo vệ dữ liệu cá nhân của chúng tôi tại: Công ty Cổ phần Á Đông Thịnh Vượng.<br/><br/>
Địa chỉ:
, hoặc bằng thư điện tử (email).
<br/><br/>
Nếu bạn có bất kỳ câu hỏi hoặc quan ngại nào về Thông báo về Quyền Riêng tư hoặc việc xử lý dữ liệu của Asizon hoặc nếu bạn muốn khiếu nại về một hành vi có khả năng xảy ra vi phạm pháp luật về quyền riêng tư, vui lòng gửi email tới hi@asizon.vn hoặc gửi yêu cầu qua phần “Liên hệ” trên các trang web của chúng tôi.

            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                Chúng Tôi Cập Nhật Thông Báo Này Như Thế Nào?
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
Chúng tôi sẽ cập nhật Thông báo về Quyền Riêng tư này khi cần thiết để phản ánh phản hồi của khách hàng và các thay đổi đối với các sản phẩm và dịch vụ của chúng tôi. Khi cập nhật, nếu các thay đổi đó có tính chất đáng kể, chúng tôi sẽ cung cấp một thông báo dễ nhận thấy (bao gồm, đối với một số dịch vụ nhất định, thông báo qua thư điện tử hoặc tin nhắn về các thay đổi của Thông báo về Quyền Riêng tư) cho bạn.<br/><br/>

Chúng tôi sẽ không giảm bớt các quyền của bạn theo Thông báo về Quyền Riêng tư này nếu không có chấp thuận của bạn.

            </Typography>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
                Các Điều Khoản hoặc Thông Báo Bổ Sung về Quyền Riêng Tư
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
Bên cạnh Thông báo về Quyền Riêng tư này, có thể có các chiến dịch hoặc khuyến mãi cụ thể sẽ chịu sự điều chỉnh của các điều khoản hoặc thông báo bổ sung về quyền riêng tư. Chúng tôi khuyến khích bạn đọc các điều khoản hoặc thông báo bổ sung này trước khi tham gia bất kỳ các chiến dịch hoặc khuyến mại nào vì bạn sẽ phải tuân thủ các điều khoản hoặc thông báo bổ sung này nếu bạn tham gia. Bất kỳ các điều khoản hoặc thông báo bổ sung nào về quyền riêng tư sẽ được cung cấp cho bạn theo cách thức dễ nhận thấy.
            </Typography>

        </>
    );
    const [drawerOpen] = React.useState(false);
    const [, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 900);
        };

        handleResize(); // Gọi khi component mount

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize); // Dọn dẹp khi component unmount
    }, []);
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
                <Grid item size={{ xs: 12, md: 9 }}>
                    <Grid container justifyContent="center">
                        <Grid item>
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
        </Box>
    );
}
export default Clausepage;
