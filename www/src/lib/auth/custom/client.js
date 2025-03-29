'use client';
// Correct import statement
import { login, register, registerSeller } from '@/services/auth';

class AuthClient {
    async signUp(params) {
        const { fullname, phone, email, password } = params;

        try {
            const response = await register(fullname, phone, email, password);
            return response.data;
        } catch (error) {
            if (error.response?.status === 409) {
                return { error: 'Tài khoản đã tồn tại' };
            }
            return 'Đăng ký thất bại';
        }
    }

    async signUpSeller(formData) {
        const formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });

        try {
            const response = await registerSeller(formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            return response.data;
        } catch (error) {
            if (error.response?.status === 409) {
                return { error: 'Tài khoản đã tồn tại' };
            }
            return 'Đăng ký thất bại';
        }
    }

    async signInWithOAuth(_) {
        return { error: 'Social authentication not implemented' };
    }

    async signInWithPassword(params) {
        const { email, password } = params;

        try {
            const response = await login(email, password);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.errors?.[0];
            if (errorMessage === 'password not matches') {
                return { error: 'Mật khẩu không đúng' };
            } else if (errorMessage === 'Account not found') {
                return { error: 'Tài khoản không tồn tại' };
            }
            return {
                error: 'Đăng nhập thất bại',
            };
        }
    }

    async resetPassword(_) {
        return { error: 'Password reset not implemented' };
    }

    async updatePassword(_) {
        return { error: 'Update reset not implemented' };
    }

    async getUser() {
        // Get the token from sessionStorage

        const token = sessionStorage.getItem('token');
        const role = sessionStorage.getItem('role');

        if (!token) {
            return { data: null };
        }
        const user = {
            id: token,
            role: role,
        };

        return { data: user };
    }

    async signOut() {
        sessionStorage.removeItem('token');

        return {};
    }
}

export const authClient = new AuthClient();
