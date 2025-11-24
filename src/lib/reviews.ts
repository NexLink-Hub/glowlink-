import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { errorLogger } from "@/lib/errorLogger";

export interface Review {
  id: string;
  artistId: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  verified: boolean; // Verified booking
  createdAt: string;
  updatedAt: string;
  helpful: number;
  notHelpful: number;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<number, number>; // { 5: 45, 4: 30, 3: 15, 2: 5, 1: 5 }
}

export interface CreateReviewInput {
  artistId: string;
  rating: number;
  title: string;
  comment: string;
}

/**
 * Fetch reviews for an artist
 */
export async function getArtistReviews(
  artistId: string,
  sortBy: "recent" | "helpful" | "rating" = "recent"
): Promise<Review[]> {
  try {
    return await apiClient.get<Review[]>(
      `/artists/${artistId}/reviews?sort=${sortBy}`
    );
  } catch (error) {
    errorLogger.error("Failed to fetch reviews", error as Error);
    throw error;
  }
}

/**
 * Fetch review statistics
 */
export async function getReviewStats(artistId: string): Promise<ReviewStats> {
  try {
    return await apiClient.get<ReviewStats>(`/artists/${artistId}/reviews/stats`);
  } catch (error) {
    errorLogger.error("Failed to fetch review stats", error as Error);
    throw error;
  }
}

/**
 * Create a new review
 */
export async function createReview(review: CreateReviewInput): Promise<Review> {
  try {
    return await apiClient.post<Review>(`/artists/${review.artistId}/reviews`, {
      rating: review.rating,
      title: review.title,
      comment: review.comment,
    });
  } catch (error) {
    errorLogger.error("Failed to create review", error as Error);
    throw error;
  }
}

/**
 * Mark review as helpful
 */
export async function markReviewHelpful(reviewId: string): Promise<Review> {
  try {
    return await apiClient.post<Review>(`/reviews/${reviewId}/helpful`);
  } catch (error) {
    errorLogger.error("Failed to mark review as helpful", error as Error);
    throw error;
  }
}

/**
 * Delete a review
 */
export async function deleteReview(reviewId: string): Promise<void> {
  try {
    await apiClient.delete(`/reviews/${reviewId}`);
  } catch (error) {
    errorLogger.error("Failed to delete review", error as Error);
    throw error;
  }
}

// React Query hooks

export function useArtistReviews(artistId: string, sortBy: "recent" | "helpful" | "rating" = "recent") {
  return useQuery({
    queryKey: ["reviews", artistId, sortBy],
    queryFn: () => getArtistReviews(artistId, sortBy),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useReviewStats(artistId: string) {
  return useQuery({
    queryKey: ["reviewStats", artistId],
    queryFn: () => getReviewStats(artistId),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useCreateReview() {
  return useMutation({
    mutationFn: (review: CreateReviewInput) => createReview(review),
    onError: (error) => {
      errorLogger.error("Failed to create review", error as Error);
    },
  });
}

export function useMarkReviewHelpful() {
  return useMutation({
    mutationFn: (reviewId: string) => markReviewHelpful(reviewId),
    onError: (error) => {
      errorLogger.error("Failed to mark review as helpful", error as Error);
    },
  });
}

export function useDeleteReview() {
  return useMutation({
    mutationFn: (reviewId: string) => deleteReview(reviewId),
    onError: (error) => {
      errorLogger.error("Failed to delete review", error as Error);
    },
  });
}
