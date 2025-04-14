import { paths } from '@/paths';

export const layoutConfig = {
    navItems: [
        {
            key: 'dashboards',
            title: 'Bảng điều khiển',
            items: [
                { key: 'overview', title: 'Tổng quan', href: paths.dashboard.overview, icon: 'house' },
                { key: 'analytics', title: 'Phân tích', href: paths.dashboard.analytics, icon: 'chart-pie' },
                { key: 'ecommerce', title: 'Thương mại điện tử', href: paths.dashboard.eCommerce, icon: 'cube' },
            ],
        },
        {
            key: 'general',
            title: 'Tổng quan',
            items: [
                {
                    key: 'settings',
                    title: 'Cài đặt',
                    href: paths.dashboard.settings.account,
                    icon: 'gear',
                    matcher: { type: 'startsWith', href: '/dashboard/settings' },
                },
                {
                    key: 'customers',
                    title: 'Khách hàng',
                    icon: 'users',
                    items: [
                        { key: 'customers', title: 'Danh sách khách hàng', href: paths.dashboard.customers.list },
                        { key: 'customers:create', title: 'Tạo khách hàng', href: paths.dashboard.customers.create },
                       
                    ],
                },
                // { key: 'suppliers', title: 'Nhà cung cấp', href: paths.dashboard.suppliers.list, icon: 'suppliers' },
                {
                    key: 'suppliers',
                    title: 'Nhà cung cấp',
                    icon: 'suppliers',
                    items: [
                        { key: 'suppliers', title: 'Danh sách nhà cung cấp', href: paths.dashboard.suppliers.list },
                        { key: 'suppliers:create', title: 'Tạo nhà cung cấp', href: paths.dashboard.suppliers.create },
                        
                    ],
                },
                // { key: 'products', title: 'Sản phẩm', href: paths.supplier.products.list, icon: 'shopping-bag-open' },
                {
                    key: 'products',
                    title: 'Sản phẩm',
                    icon: 'shopping-bag-open',
                    items: [
                        { key: 'products', title: 'Danh sách sản phẩm', href: paths.dashboard.products.list },
                        { key: 'products:create', title: 'Tạo sản phẩm', href: paths.dashboard.products.create },
                        
                    ],
                },
                // { key: 'orders', title: 'Đơn hàng', href: paths.supplier.orders.list, icon: 'shopping-cart-simple' },
                {
                    key: 'orders',
                    title: 'Đơn hàng',
                    icon: 'shopping-cart-simple',
                    items: [
                        { key: 'orders', title: 'Danh sách đơn hàng', href: paths.dashboard.orders.list },                    ],
                },
                {
                    key: 'invoices',
                    title: 'Hóa đơn',
                    icon: 'receipt',
                    items: [
                        { key: 'invoices', title: 'Danh sách hóa đơn', href: paths.dashboard.invoices.list },
                        
                    ],
                },
                {
                    key: 'jobs',
                    title: 'Việc làm',
                    icon: 'read-cv-logo',
                    items: [
                        { key: 'jobs:browse', title: 'Duyệt việc làm', href: paths.dashboard.jobs.browse },
                        { key: 'jobs:create', title: 'Tạo việc làm', href: paths.dashboard.jobs.create },
                        {
                            key: 'jobs:company',
                            title: 'Chi tiết công ty',
                            href: paths.dashboard.jobs.companies.overview('1'),
                            matcher: { type: 'startsWith', href: '/dashboard/jobs/companies/1' },
                        },
                    ],
                },
                
               
                
               
                { key: 'file-storage', title: 'Lưu trữ tệp', href: paths.dashboard.fileStorage, icon: 'upload' },
                {
                    key: 'mail',
                    title: 'Thư',
                    href: paths.dashboard.mail.list('inbox'),
                    icon: 'envelope-simple',
                    matcher: { type: 'startsWith', href: '/dashboard/mail' },
                },
              
                // { key: 'calendar', title: 'Lịch', href: paths.dashboard.calendar, icon: 'calendar-check' },
                // { key: 'tasks', title: 'Nhiệm vụ', href: paths.dashboard.tasks, icon: 'kanban' },
            ],
        },
        // {
        //     key: 'other',
        //     title: 'Khác',
        //     items: [
        //         {
        //             key: 'auth',
        //             title: 'Xác thực',
        //             icon: 'lock',
        //             items: [
        //                 {
        //                     key: 'auth:sign-in',
        //                     title: 'Đăng nhập',
        //                     items: [
        //                         {
        //                             key: 'auth:sign-in:centered',
        //                             title: 'Trung tâm',
        //                             href: paths.auth.samples.signIn.centered,
        //                         },
        //                         { key: 'auth:sign-in:split', title: 'Chia đôi', href: paths.auth.samples.signIn.split },
        //                     ],
        //                 },
        //                 {
        //                     key: 'auth:sign-up',
        //                     title: 'Đăng ký',
        //                     items: [
        //                         {
        //                             key: 'auth:sign-up:centered',
        //                             title: 'Trung tâm',
        //                             href: paths.auth.samples.signUp.centered,
        //                         },
        //                         { key: 'auth:sign-up:split', title: 'Chia đôi', href: paths.auth.samples.signUp.split },
        //                     ],
        //                 },
        //                 {
        //                     key: 'auth:reset-password',
        //                     title: 'Đặt lại mật khẩu',
        //                     items: [
        //                         {
        //                             key: 'auth:reset-password:centered',
        //                             title: 'Trung tâm',
        //                             href: paths.auth.samples.resetPassword.centered,
        //                         },
        //                         {
        //                             key: 'auth:reset-password:split',
        //                             title: 'Chia đôi',
        //                             href: paths.auth.samples.resetPassword.split,
        //                         },
        //                     ],
        //                 },
        //                 {
        //                     key: 'auth:update-password',
        //                     title: 'Cập nhật mật khẩu',
        //                     items: [
        //                         {
        //                             key: 'auth:update-password:centered',
        //                             title: 'Trung tâm',
        //                             href: paths.auth.samples.updatePassword.centered,
        //                         },
        //                         {
        //                             key: 'auth:update-password:split',
        //                             title: 'Chia đôi',
        //                             href: paths.auth.samples.updatePassword.split,
        //                         },
        //                     ],
        //                 },
        //                 {
        //                     key: 'auth:verify-code',
        //                     title: 'Xác minh mã',
        //                     items: [
        //                         {
        //                             key: 'auth:verify-code:centered',
        //                             title: 'Trung tâm',
        //                             href: paths.auth.samples.verifyCode.centered,
        //                         },
        //                         {
        //                             key: 'auth:verify-code:split',
        //                             title: 'Chia đôi',
        //                             href: paths.auth.samples.verifyCode.split,
        //                         },
        //                     ],
        //                 },
        //             ],
        //         },
        //         { key: 'pricing', title: 'Giá cả', href: paths.pricing, icon: 'credit-card' },
        //         { key: 'checkout', title: 'Thanh toán', href: paths.checkout, icon: 'sign-out' },
        //         { key: 'contact', title: 'Liên hệ', href: paths.contact, icon: 'address-book' },
        //         {
        //             key: 'error',
        //             title: 'Lỗi',
        //             icon: 'file-x',
        //             items: [
        //                 { key: 'error:not-authorized', title: 'Không được phép', href: paths.notAuthorized },
        //                 { key: 'error:not-found', title: 'Không tìm thấy', href: paths.notFound },
        //                 {
        //                     key: 'error:internal-server-error',
        //                     title: 'Lỗi máy chủ nội bộ',
        //                     href: paths.internalServerError,
        //                 },
        //             ],
        //         },
        //     ],
        // },
        // {
        //     key: 'misc',
        //     title: 'Khác',
        //     items: [
        //         { key: 'i18n', title: 'Đa ngôn ngữ', href: paths.dashboard.i18n, icon: 'translate' },
        //         {
        //             key: 'levels:level-0',
        //             title: 'Cấp độ 0',
        //             icon: 'align-left',
        //             items: [
        //                 {
        //                     key: 'levels:level-1a',
        //                     title: 'Cấp độ 1a',
        //                     items: [
        //                         {
        //                             key: 'levels:level-2a',
        //                             title: 'Cấp độ 2a',
        //                             items: [
        //                                 { key: 'levels:level-3a', title: 'Cấp độ 3a' },
        //                                 { key: 'levels:level-3b', title: 'Cấp độ 3b', disabled: true },
        //                             ],
        //                         },
        //                         { key: 'levels:level-2b', title: 'Cấp độ 2b' },
        //                     ],
        //                 },
        //                 { key: 'levels:level-1b', title: 'Cấp độ 1b' },
        //             ],
        //         },
        //         { key: 'disabled', title: 'Vô hiệu hóa', disabled: true, icon: 'warning-diamond' },
        //         { key: 'label', title: 'Nhãn', icon: 'file', label: 'Mới' },
        //         { key: 'blank', title: 'Trống', href: paths.dashboard.blank, icon: 'file-dashed' },
        //         { key: 'external', title: 'Liên kết ngoài', href: 'https://devias.io', external: true, icon: 'link' },
        //     ],
        // },
    ],
};
