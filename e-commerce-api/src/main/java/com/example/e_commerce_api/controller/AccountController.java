package com.example.e_commerce_api.controller;

import com.example.e_commerce_api.dto.ApiResponse;
import com.example.e_commerce_api.dto.user.AccountLoginDTO;
import com.example.e_commerce_api.dto.user.AuthenticationDTO;
import com.example.e_commerce_api.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/signin")
    public ResponseEntity<ApiResponse<AuthenticationDTO>> signIn(@RequestBody AccountLoginDTO accountLoginDTO) {
        AuthenticationDTO authenticationDTO = accountService.signIn(accountLoginDTO);
        ApiResponse<AuthenticationDTO> response = new ApiResponse<>(true, "Login Success", authenticationDTO, null);
        return ResponseEntity.ok(response);
    }
}