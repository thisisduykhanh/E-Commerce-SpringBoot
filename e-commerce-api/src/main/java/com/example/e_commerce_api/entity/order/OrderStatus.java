package com.example.e_commerce_api.entity.order;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity

@Table(name = "orderStatus")
public class OrderStatus {
    @Id
    private Integer id;
    private String name;
}
