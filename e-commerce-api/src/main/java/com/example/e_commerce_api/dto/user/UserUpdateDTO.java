package com.example.e_commerce_api.dto.user;

import jakarta.validation.constraints.Email;

public record UserUpdateDTO(
    String fullName,
    @Email(message = "Email invalid format") String email,
    String password,
    String phone,

    Boolean locked
) {
}
