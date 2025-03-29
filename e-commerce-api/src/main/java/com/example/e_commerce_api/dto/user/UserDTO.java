package com.example.e_commerce_api.dto.user;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
public record UserDTO (
        @NotBlank(message = "Name cannot be empty") String userName,
        @Email(message = "Invalid email format") String email,

        @NotBlank(message = "full name cannot be empty") String fullName,
        @NotBlank(message = "role cannot be empty") String role,
        @NotBlank(message = "locked cannot be empty") Boolean locked
) {}
