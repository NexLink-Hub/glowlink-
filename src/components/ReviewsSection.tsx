import { useState } from "react";
import { Star, ThumbsUp, Trash2 } from "lucide-react";
import { useArtistReviews, useReviewStats, useCreateReview } from "@/lib/reviews";
import { SkeletonCard } from "@/components/SkeletonLoader";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ReviewsProps {
  artistId: string;
}

export function ReviewsSection({ artistId }: ReviewsProps) {
  const { data: reviews, isLoading: reviewsLoading, error: reviewsError } = useArtistReviews(artistId);
  const { data: stats, isLoading: statsLoading } = useReviewStats(artistId);
  const { mutate: createReview, isPending: isCreating } = useCreateReview();

  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "rating">("recent");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !comment.trim()) {
      alert("Please fill in all fields");
      return;
    }

    createReview(
      { artistId, rating, title, comment },
      {
        onSuccess: () => {
          setTitle("");
          setComment("");
          setRating(5);
        },
      }
    );
  };

  const renderStars = (count: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={16}
            className={i <= count ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      {statsLoading ? (
        <SkeletonCard />
      ) : stats ? (
        <div className="glass-panel p-6 rounded-3xl">
          <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-500">{stats.averageRating.toFixed(1)}</div>
              <div className="flex justify-center mt-2">{renderStars(Math.round(stats.averageRating))}</div>
              <p className="text-sm text-gray-600 mt-2">{stats.totalReviews} reviews</p>
            </div>

            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-sm font-medium">{star}★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{
                        // Dynamic width based on rating distribution
                        width: `${
                          stats.totalReviews > 0
                            ? ((stats.ratingDistribution[star] || 0) / stats.totalReviews) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">
                    {stats.ratingDistribution[star] || 0}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* Write Review Form */}
      <div className="glass-panel p-6 rounded-3xl">
        <h4 className="text-xl font-bold mb-4">Write a Review</h4>
        {reviewsError && (
          <Alert className="mb-4 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">Failed to load reviews.</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i)}
                  className="focus:outline-none"
                  aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
                >
                  <Star
                    size={32}
                    className={`cursor-pointer transition-colors ${
                      i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="review-title" className="block text-sm font-medium mb-2">
              Review Title
            </label>
            <input
              id="review-title"
              type="text"
              placeholder="Summarize your experience"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
              maxLength={100}
            />
          </div>

          <div>
            <label htmlFor="review-comment" className="block text-sm font-medium mb-2">
              Review Comment
            </label>
            <textarea
              id="review-comment"
              placeholder="Share your experience with this artist..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
              maxLength={500}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isCreating}
            className="w-full bg-pink-500 text-white font-medium py-2 rounded-lg hover:bg-pink-600 disabled:opacity-50 transition-colors"
          >
            {isCreating ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="glass-panel p-6 rounded-3xl">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xl font-bold">All Reviews</h4>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
            aria-label="Sort reviews"
          >
            <option value="recent">Most Recent</option>
            <option value="helpful">Most Helpful</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {reviewsLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      {renderStars(review.rating)}
                      {review.verified && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Verified</span>}
                    </div>
                    <h5 className="font-semibold text-gray-900 mt-2">{review.title}</h5>
                    <p className="text-gray-600 text-sm mt-1">{review.comment}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-gray-500">{review.userName}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button title="Delete review" className="text-gray-400 hover:text-red-500" aria-label="Delete review">
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-pink-500">
                    <ThumbsUp size={16} />
                    <span>Helpful ({review.helpful})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 py-8">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
}
