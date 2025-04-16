package com.example.e_commerce_api.pattern.observer;
import org.springframework.stereotype.Component;

@Component
public class CartUpdateSubject extends CartSubject {

    @Override
    public void notifyCartUpdated(Integer accountId) {
        super.notifyCartUpdated(accountId);
    }
}