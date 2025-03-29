package com.example.e_commerce_api.controller;

import com.example.e_commerce_api.dto.ApiResponse;
import com.example.e_commerce_api.dto.user.UserCreateDTO;
import com.example.e_commerce_api.dto.user.UserUpdateDTO;
import com.example.e_commerce_api.entity.user.Account;
import com.example.e_commerce_api.entity.user.User;
import com.example.e_commerce_api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> createUser(@RequestBody UserCreateDTO userCreateDTO) {
        User user = userService.createUser(userCreateDTO);
        ApiResponse<User> response = new ApiResponse<>( true, "Create user successfully", user, null);
        return ResponseEntity.ok(response);
    }

    @PutMapping()
    public ResponseEntity<ApiResponse<?>> updateUser(@RequestParam Integer id, @RequestBody UserUpdateDTO userUpdateDTO) {
        User user = userService.updateUser(id, userUpdateDTO);
        ApiResponse<User> response = new ApiResponse<>( true, "Update user successfully", user, null);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        ApiResponse<String> response = new ApiResponse<>(true, "Xóa người dùng thành công", "true", null);
        return ResponseEntity.ok(response);
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<Page<User>>> getAllUsers(@RequestParam int page, @RequestParam int size) {
        Page<User> users = userService.findAllUsers(page, size);
        ApiResponse<Page<User>> response = new ApiResponse<>( true, "Lấy danh sách người dùng thành công", users, null);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getCurrentUser")
    public ResponseEntity<ApiResponse<User>> getUsersByAccount() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Account account = (Account) authentication.getPrincipal();

        User users = userService.findUserByAccount(account);
        ApiResponse<User> response = new ApiResponse<>( true, "Tìm kiếm người dùng theo tài khoản thành công", users, null);
        return ResponseEntity.ok(response);
    }

}
