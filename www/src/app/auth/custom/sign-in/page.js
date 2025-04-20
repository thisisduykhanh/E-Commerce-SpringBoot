import { config } from '@/config';
import { SignInForm } from '@/components/auth/custom/sign-in-form';
import { GuestGuard } from '@/components/auth/guest-guard';
import { SplitLayout } from '@/components/auth/split-layout';

export const metadata = { title: `Sign in | Custom | Auth | ${config.site.name}` };

export default function Page() {
    return (
        <GuestGuard>
            <div style={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '90vh', 
                margin: '5vh 0' // Cách đều lề trên và dưới
            }}>
                <SplitLayout>
                    <SignInForm />
                </SplitLayout>
            </div>
        </GuestGuard>
    );
}
