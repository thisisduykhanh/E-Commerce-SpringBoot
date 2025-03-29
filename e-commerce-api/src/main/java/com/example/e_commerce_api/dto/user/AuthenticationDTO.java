package com.example.e_commerce_api.dto.user;

public record AuthenticationDTO(
        String token,
        String refreshToken,
        String role
) {
    public AuthenticationDTO(String token, String refreshToken){
        this(token, refreshToken, null);
    }
}