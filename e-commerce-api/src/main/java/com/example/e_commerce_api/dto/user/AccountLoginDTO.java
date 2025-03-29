package com.example.e_commerce_api.dto.user;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record AccountLoginDTO (
       @Email(message = "Email invalid format") String email,
       @NotBlank(message = "Password is required") String password
){
}