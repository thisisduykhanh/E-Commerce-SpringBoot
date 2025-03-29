package com.example.e_commerce_api.dto.user;

import jakarta.validation.constraints.Email;

public record UserCreateDTO(
        @Email(message = "Invalid email format") String email,
        String fullName,
        String phone,
        String password
) {
}
