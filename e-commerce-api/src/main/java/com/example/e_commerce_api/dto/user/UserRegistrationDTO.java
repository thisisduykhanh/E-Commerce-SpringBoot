package com.example.e_commerce_api.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserRegistrationDTO(
        String username,
        @Email(message = "Invalid email format") String email,
        @NotBlank(message = "password cannot empty") String password,
        String fullName,
        String role
) {
}
