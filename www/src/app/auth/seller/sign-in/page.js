import { GuestGuard } from '@/components/auth/guest-guard';
import { SellerSplitLayout } from '@/components/auth/seller-split-layout';
import { SignInForm } from '@/components/auth/seller/sign-in-form';
import { config } from '@/config';

export const metadata = { title: `Sign in | Seller | Auth | ${config.site.name}` };

export default function Page() {
    return (
        <GuestGuard>
            <SellerSplitLayout>
                <SignInForm />
            </SellerSplitLayout>
        </GuestGuard>
    );
}
