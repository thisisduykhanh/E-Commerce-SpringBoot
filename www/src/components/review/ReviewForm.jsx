import React, { useState, useEffect, useContext } from "react";
import { addReview, getReviews } from "@/services/review";
import  {updateOrderViewed} from "@/services/order";
import { logger } from "@/lib/default-logger";

function ReviewForm({ order, orderIdViewed }) {
  const [reviews, setReviews] = useState(
    order.map((item) => ({
      productId: item.productId,
      rating: 0,
      comment: '',
    }))
  );


  const [alertMessage, setAlertMessage] = useState(null);

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
            text: 'Please provide a rating for all products!',
            type: 'error',
          });
          return;
        }

        logger.debug('Submitting review:', review);

        await addReview(review);
      }
      await updateOrderViewed(orderIdViewed);
      

      setAlertMessage({ text: 'Reviews submitted successfully!', type: 'success' });
    } catch (error) {
      console.error('Error submitting reviews:', error);
      setAlertMessage({ text: 'Failed to submit reviews!', type: 'error' });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {order.map((item) => (
          <div key={item.productId} style={{ marginBottom: '20px' }}>
            <h3>{item.productName}</h3>
            <div>
              <p>Rating:</p>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    cursor: 'pointer',
                    color: reviews.find((r) => r.productId === item.productId)?.rating >= star ? 'gold' : 'gray',
                  }}
                  onClick={() => handleRatingChange(item.productId, star)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              placeholder="Write your review..."
              value={reviews.find((r) => r.productId === item.productId)?.comment || ''}
              onChange={(e) => handleCommentChange(item.productId, e.target.value)}
              style={{ width: '100%', height: '80px', marginTop: '10px' }}
            />
          </div>
        ))}
        <button type="submit">Submit Reviews</button>
      </form>
      {alertMessage && (
        <div style={{ color: alertMessage.type === 'success' ? 'green' : 'red' }}>
          {alertMessage.text}
        </div>
      )}
    </div>
  );
}

export default ReviewForm;
