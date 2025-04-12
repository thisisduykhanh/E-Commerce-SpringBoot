package com.example.e_commerce_api.entity.user;

import com.example.e_commerce_api.entity.product.Review;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name cannot be empty")
    private String fullName;

    private String phone;

    @OneToOne
    @JoinColumn(name = "account_id")
    private Account account;

}
