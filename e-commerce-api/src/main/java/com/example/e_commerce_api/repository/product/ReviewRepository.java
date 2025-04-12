package com.example.e_commerce_api.repository.product;

import com.example.e_commerce_api.entity.product.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findByProductId(Integer productId);
    List<Review> findByUserId(Integer userId);
}
