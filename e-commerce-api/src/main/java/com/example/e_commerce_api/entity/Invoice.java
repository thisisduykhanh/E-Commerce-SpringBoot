package com.example.e_commerce_api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Entity
public class Invoice {
    @Id
    private Integer id;

    private Long userId;

    private Date createdAt;

    private Double totalPrice;
}