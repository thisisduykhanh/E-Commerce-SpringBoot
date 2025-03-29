package com.example.e_commerce_api.exception;

import org.springframework.security.core.AuthenticationException;

// TODO: Lỗi này dùng cho trường hợp các JWT Token bị hết hạn sử dụng
public class TokenExpiredException extends AuthenticationException {
    public TokenExpiredException(String msg) {
        super(msg);
    }
}