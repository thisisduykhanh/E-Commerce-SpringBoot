package com.example.e_commerce_api.dto.user;


import jakarta.validation.constraints.NotBlank;

public record RefreshToken(
        @NotBlank(message = "token is require") String token
) {
}