package com.example.e_commerce_api.exception;

import com.example.e_commerce_api.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
@RestController
public class CustomizedResponseEntityExceptionHandler {
    @ExceptionHandler(BadRequestException.class)
    public final ResponseEntity<ApiResponse<Object>> handleBadRequestException(BadRequestException ex, WebRequest request) {

        ApiResponse<Object> response = new ApiResponse<>(
                false,
                ex.getMessage(),
                null,
                Collections.singletonList(ex.getMessage())
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public final ResponseEntity<ApiResponse<Object>> handleValidationExceptions(MethodArgumentNotValidException ex, WebRequest request) {
        List<String> errors = ex.getBindingResult().getAllErrors().stream()
                .map(error -> ((FieldError) error).getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.toList());

        ApiResponse<Object> response = new ApiResponse<>(
                false,
                "Validation failed",
                null,
                errors
        );

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CustomException.class)
    public final ResponseEntity<ApiResponse<Object>> handleCustomException(CustomException cx, WebRequest request) {
        ApiResponse<Object> response = new ApiResponse<>(
                false,
                "An unexpected error occurred",
                null,
                Collections.singletonList(cx.getMessage())
        );
        return new ResponseEntity<>(response, cx.getError().getStatusCode());
    }

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ApiResponse<Object>> handleAllException(Exception e, WebRequest request) {

        ApiResponse<Object> response = new ApiResponse<>(
                false,
                "An unexpected error occurred",
                null,
                Collections.singletonList(e.getMessage())
        );
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}