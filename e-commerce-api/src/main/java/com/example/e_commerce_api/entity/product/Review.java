package com.example.e_commerce_api.entity.product;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Integer id;

    private  Integer rating;

    private String comment;

    private Date date;

    private Integer productId;

    private Long userId;

//    private Integer orderId;
}
