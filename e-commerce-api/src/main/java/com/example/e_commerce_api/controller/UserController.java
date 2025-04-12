package com.example.e_commerce_api.controller;

import com.example.e_commerce_api.dto.ApiResponse;
import com.example.e_commerce_api.dto.user.AccountLoginDTO;
import com.example.e_commerce_api.dto.user.AuthenticationDTO;
import com.example.e_commerce_api.dto.user.UserCreateDTO;
import com.example.e_commerce_api.dto.user.UserUpdateDTO;
import com.example.e_commerce_api.entity.user.Account;
import com.example.e_commerce_api.entity.user.User;
import com.example.e_commerce_api.service.AccountService;
import com.example.e_commerce_api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private AccountService accountService;

    @PostMapping("/signin")
    public ResponseEntity<ApiResponse<AuthenticationDTO>> signIn(@RequestBody AccountLoginDTO accountLoginDTO) {
        AuthenticationDTO authenticationDTO = accountService.signIn(accountLoginDTO);
        ApiResponse<AuthenticationDTO> response = new ApiResponse<>(true, "Login Success", authenticationDTO, null);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> createUser(@RequestBody UserCreateDTO userCreateDTO) {
        User user = userService.createUser(userCreateDTO);
        ApiResponse<User> response = new ApiResponse<>( true, "Create user successfully", user, null);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateUser(@PathVariable Long id, @RequestBody UserUpdateDTO userUpdateDTO) {
        User user = userService.updateUser(id, userUpdateDTO);
        ApiResponse<User> response = new ApiResponse<>( true, "Update user successfully", user, null);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        ApiResponse<String> response = new ApiResponse<>(true, "Xóa người dùng thành công", "true", null);
        return ResponseEntity.ok(response);
    }

    @GetMapping()
    public ResponseEntity<?> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<User> users = userService.findAllUsers(page, size);
            ApiResponse<Page<User>> response = new ApiResponse<>(true, "Lấy danh sách người dùng thành công", users, null);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "Lỗi server: " + e.getMessage(), null, null));
        }
    }

    @GetMapping("/getCurrentUser")
    public ResponseEntity<ApiResponse<User>> getUsersByAccount() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null || authentication.getPrincipal() == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ApiResponse<>(false, "Người dùng chưa đăng nhập", null, null));
            }

            // Kiểm tra kiểu của principal
            if (!(authentication.getPrincipal() instanceof Account)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ApiResponse<>(false, "Thông tin xác thực không hợp lệ", null, null));
            }

            Account account = (Account) authentication.getPrincipal();
            User user = userService.findUserByAccount(account);

            ApiResponse<User> response = new ApiResponse<>(true, "Tìm kiếm người dùng theo tài khoản thành công", user, null);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "Lỗi hệ thống: " + e.getMessage(), null, List.of(e.getClass().getName())));
        }
    }


}
