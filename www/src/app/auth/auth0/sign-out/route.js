import { auth0 } from '@/lib/auth/auth0/server';

export const dynamic = 'force-dynamic';

export async function GET(req, ctx) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    return auth0.handleLogout(req, ctx, { returnTo: '/user' });
}
