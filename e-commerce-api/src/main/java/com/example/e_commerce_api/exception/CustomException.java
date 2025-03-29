package com.example.e_commerce_api.exception;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {
    private  final Error error;

    public CustomException(Error error){
        super(error.getMessage());
        this.error = error;
    }
}
