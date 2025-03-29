package com.example.e_commerce_api.dto;

import java.util.List;
import org.springframework.http.HttpStatus;
public record ApiResponse<T>(

        boolean success,
        String message,
        T data,
        List<String> errors

) {
}
