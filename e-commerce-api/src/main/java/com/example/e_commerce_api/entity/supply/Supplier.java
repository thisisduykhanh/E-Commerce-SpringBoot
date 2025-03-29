package com.example.e_commerce_api.entity.supply;


import com.example.e_commerce_api.entity.user.Account;
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
@Table(name = "suppliers")

public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "supply_name")
    private String nameSupply;

    @Column(name = "supply_status_verify")
    private Boolean statusVerify;

    @Column(name = "supply_address")
    private String address;

    @Column(name = "supply_image")
    private String image;
    @Column(name = "supply_status")
    private Boolean status;
    @OneToOne
    @JoinColumn(name = "account_id")
    private Account account;
}
