package com.example.e_commerce_api.service.product;

import com.example.e_commerce_api.dto.ApiResponse;
import com.example.e_commerce_api.dto.product.ReviewCreateDTO;
import com.example.e_commerce_api.dto.product.ReviewUpdateDTO;
import com.example.e_commerce_api.entity.product.Review;
import com.example.e_commerce_api.entity.user.Account;
import com.example.e_commerce_api.entity.user.User;
import com.example.e_commerce_api.repository.product.ReviewRepository;
import com.example.e_commerce_api.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserService userService;

    public void addReview(ReviewCreateDTO reviewCreateDTO, Long userId) {



        // Create a new review
        Review review = new Review();
        review.setProductId(reviewCreateDTO.productId());
        review.setUserId(userId);
        review.setRating(reviewCreateDTO.rating());
        review.setComment(reviewCreateDTO.comment());
        review.setDate(new Date()); // Set the current date
        // Save the review to the database
        reviewRepository.save(review);
    }

    public void updateReview(Integer reviewId, ReviewUpdateDTO reviewUpdateDTO) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new EntityNotFoundException("Review not found with id " + reviewId));

        // Update the review details
        review.setRating(reviewUpdateDTO.rating());
        review.setComment(reviewUpdateDTO.comment());
        review.setDate(new Date()); // Update the date to the current date
        // Save the updated review
        reviewRepository.save(review);
    }

    public void deleteReview(Integer reviewId) {
        reviewRepository.deleteById(reviewId);
    }

    public List<Review> getReviewsByProductId(Integer productId) {
        return reviewRepository.findByProductId(productId);
    }

    public List<Review> getReviewsByUserId(Integer userId) {
        return reviewRepository.findByUserId(userId);
    }
}
