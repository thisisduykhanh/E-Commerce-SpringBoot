import React, { useState } from "react";
import { addReview } from "@/services/review";
import { updateOrderViewed } from "@/services/order";
import { logger } from "@/lib/default-logger";
import {
  Button,
  Box,
  Typography,
  TextField,
  Rating,
  Snackbar,
  Alert,
  Card,
  CardContent,
} from "@mui/material";

function ReviewForm({ order, orderIdViewed }) {
  const [reviews, setReviews] = useState(
    order.map((item) => ({
      productId: item.productId,
      rating: 0,
      comment: "",
    }))
  );
  const [alertMessage, setAlertMessage] = useState(null);
  const [showForm, setShowForm] = useState(true); // Trạng thái để điều khiển hiển thị form

  const handleRatingChange = (productId, rating) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.productId === productId ? { ...review, rating } : review
      )
    );
  };

  const handleCommentChange = (productId, comment) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.productId === productId ? { ...review, comment } : review
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const review of reviews) {
        if (review.rating === 0) {
          setAlertMessage({
            text: "Please provide a rating for all products!",
            type: "error",
          });
          return;
        }

        logger.debug("Submitting review:", review);

        await addReview(review);
      }
      await updateOrderViewed(orderIdViewed);

      setAlertMessage({ text: "Reviews submitted successfully!", type: "success" });

      // Ẩn form sau khi gửi đánh giá thành công
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting reviews:", error);
      setAlertMessage({ text: "Failed to submit reviews!", type: "error" });
    }
  };

  return (
    <Box sx={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
        Nhập đánh giá cho sản phẩm
      </Typography>

      {showForm && ( // Điều kiện hiển thị form
        <form onSubmit={handleSubmit}>
          {order.map((item) => (
            <Card
              key={item.productId}
              sx={{
                marginBottom: "20px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {item.productName}
                </Typography>

                {/* Rating section */}
                <Box sx={{ marginBottom: "10px", marginTop: "10px" }}>
                  <Typography variant="body2" color="textSecondary">
                    Đánh giá:
                  </Typography>
                  <Rating
                    value={reviews.find((r) => r.productId === item.productId)?.rating || 0}
                    onChange={(event, newValue) => handleRatingChange(item.productId, newValue)}
                    sx={{ color: "#eff549" }}
                  />
                </Box>

                {/* Comment section */}
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Bạn nghĩ sao về sản phẩm ..."
                  value={reviews.find((r) => r.productId === item.productId)?.comment || ""}
                  onChange={(e) => handleCommentChange(item.productId, e.target.value)}
                  sx={{
                    marginTop: "10px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </CardContent>
            </Card>
          ))}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#00A6B7",
              "&:hover": {
                backgroundColor: "#007F86",
              },
              marginTop: "20px",
              borderRadius: "8px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Gửi đánh giá
          </Button>
        </form>
      )}

      {/* Snackbar Alert */}
      {alertMessage && (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={() => setAlertMessage(null)}
        >
          <Alert severity={alertMessage.type} sx={{ width: "100%" }}>
            {alertMessage.text}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}

export default ReviewForm;
