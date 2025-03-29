import { config } from '@/config';
import { SignUpForm } from '@/components/auth/seller/sign-up-form';
import { GuestGuard } from '@/components/auth/guest-guard';
import { SellerSplitLayout } from '@/components/auth/seller-split-layout';

export const metadata = { title: `Sign up | Seller | Auth | ${config.site.name}` };

export default function Page() {
    return (
        <GuestGuard>
            <SellerSplitLayout>
                <SignUpForm />
            </SellerSplitLayout>
        </GuestGuard>
    );
}
