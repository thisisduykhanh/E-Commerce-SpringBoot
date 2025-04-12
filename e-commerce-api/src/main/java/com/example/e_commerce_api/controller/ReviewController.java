package com.example.e_commerce_api.controller;

import com.example.e_commerce_api.dto.ApiResponse;
import com.example.e_commerce_api.dto.cart.CartDTO;
import com.example.e_commerce_api.dto.product.ReviewCreateDTO;
import com.example.e_commerce_api.dto.product.ReviewDTO;
import com.example.e_commerce_api.dto.product.ReviewUpdateDTO;
import com.example.e_commerce_api.entity.product.Review;
import com.example.e_commerce_api.entity.user.Account;
import com.example.e_commerce_api.entity.user.User;
import com.example.e_commerce_api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

import com.example.e_commerce_api.service.product.ReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserService userService;

    // Add methods to handle HTTP requests for reviews

    @GetMapping("/product/{productId}")
    public ResponseEntity<ApiResponse<List<ReviewDTO>>> getReviewsByProductId(@PathVariable
                                                                      Integer productId) {
        // Call the reviewService to get reviews for the specified product
        List<Review> reviews = reviewService.getReviewsByProductId(productId);

        // Check if reviews are found
        if (reviews.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // Convert the reviews to ReviewDTOs
        List<ReviewDTO> reviewDTOs = reviews.stream()
                .map(review -> {
                    // Get the user's full name using the userService
                    User user = userService.findUserById(review.getUserId());
                    String userFullName = user != null ? user.getFullName() : "Unknown User";

                    return new ReviewDTO(
                            review.getId(),
                            review.getProductId(),
                            userFullName,
                            review.getDate(),
                            review.getRating(),
                            review.getComment()
                    );
                })
                .toList();


        // Return the reviews as a response (e.g., as JSON)
        ApiResponse<List<ReviewDTO>> response = new ApiResponse<List<ReviewDTO>>(

                true,
                "Fetched all cart details successfully",
                reviewDTOs,null
        );

        return ResponseEntity.ok(response);
    }

//    @GetMapping("/myreviews")
//    public ResponseEntity<ApiResponse<List<ReviewDTO>>> getMyReviews() {
//        // Call the reviewService to get reviews for the specified product
//        List<Review> reviews = reviewService.getReviewsByUserId(userId);
//        // Check if reviews are found
//        if (reviews.isEmpty()) {
        //     return ResponseEntity.notFound().build();
        // }
        // Convert the reviews to ReviewDTOs
//        List<ReviewDTO> reviewDTOs = reviews.stream()
//                .map(review -> {
//                    // Get the user's full name using the userService
//                    User user = userService.findUserById(review.getUserId());
        //            String userFullName = user != null ? user.getFullName() : "Unknown User";
//                    return new ReviewDTO(
//                            review.getId(),
//                            review.getProductId(),
//                            userFullName,
//                            review.getDate(),
//                            review.getRating(),
//                            review.getComment()
//                    );
//                })
//                .toList();
//        // Return the reviews as a response (e.g., as JSON)
//        ApiResponse<List<ReviewDTO>> response = new ApiResponse<List<ReviewDTO>>(
//
//                true,
//                "Fetched all cart details successfully",
//                reviewDTOs,null
//        );
//
//        return ResponseEntity.ok(response);
//    }


    @PostMapping()
    public ResponseEntity<ApiResponse<Boolean>> addReview(@RequestBody ReviewCreateDTO reviewDTO) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getPrincipal() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<>(false, "Người dùng chưa đăng nhập", null, null));
        }

        // Kiểm tra kiểu của principal
        if (!(authentication.getPrincipal() instanceof Account)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<>(false, "Thông tin xác thực không hợp lệ", null, null));
        }

        Account account = (Account) authentication.getPrincipal();
        User user = userService.findUserByAccount(account);

        // Call the reviewService to add a new review
        reviewService.addReview(reviewDTO, user.getId());

        // Return a success response
        ApiResponse<Boolean> response = new ApiResponse<>(
                true,
                "Review added successfully",
                Boolean.TRUE,null
        );

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{reviewId}")
    public ResponseEntity<ApiResponse<Boolean>> updateReview(@PathVariable Integer reviewId, @RequestBody ReviewUpdateDTO reviewDTO) {
        // Call the reviewService to update the review
        reviewService.updateReview(reviewId, reviewDTO);

        // Return a success response
        ApiResponse<Boolean> response = new ApiResponse<>(
                true,
                "Review updated successfully",
                Boolean.TRUE,null
        );

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<ApiResponse<Boolean>> deleteReview(@PathVariable Integer reviewId) {
        // Call the reviewService to delete the review
        reviewService.deleteReview(reviewId);

        // Return a success response
        ApiResponse<Boolean> response = new ApiResponse<>(
                true,
                "Review deleted successfully",
                Boolean.TRUE,null
        );

        return ResponseEntity.ok(response);
    }
}
