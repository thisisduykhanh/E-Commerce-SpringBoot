'use client';

import Footer from '@/components/user/common/Footer';
import Header from '@/components/user/common/Header';
import React from 'react';

function Layout({ children }) {
    return (
        <React.Fragment>
            {/* here */}
            <div lang="en" data-locale="vi" className="dark">
                <div className="layout-container">
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </div>
            </div>
        </React.Fragment>
    );
}

export default Layout;
