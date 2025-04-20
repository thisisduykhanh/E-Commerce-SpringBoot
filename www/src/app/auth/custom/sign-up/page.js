import { config } from '@/config';
import { SignUpForm } from '@/components/auth/custom/sign-up-form';
import { GuestGuard } from '@/components/auth/guest-guard';
import { SplitLayout } from '@/components/auth/split-layout';

export const metadata = { title: `Sign up | Custom | Auth | ${config.site.name}` };

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
                    <SignUpForm />
                </SplitLayout>
            </div>
        </GuestGuard>
    );
}
