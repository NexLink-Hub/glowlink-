import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { errorLogger } from "@/lib/errorLogger";

// Types for API responses
export interface Artist {
  id: string;
  name: string;
  email: string;
  businessName: string;
  specialty: string;
  location: string;
  experience: string;
  bio: string;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  instagram?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  currency: string;
}

export interface Booking {
  id: string;
  artistId: string;
  serviceId: string;
  date: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  totalPrice: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

// Query Keys for cache management
export const queryKeys = {
  artists: {
    all: ["artists"],
    search: (query: string) => [...queryKeys.artists.all, "search", query],
    detail: (id: string) => [...queryKeys.artists.all, "detail", id],
  },
  services: {
    all: ["services"],
    byArtist: (artistId: string) => [...queryKeys.services.all, "byArtist", artistId],
  },
  bookings: {
    all: ["bookings"],
    byUser: (userId: string) => [...queryKeys.bookings.all, "byUser", userId],
  },
  user: {
    current: ["user", "current"],
  },
};

// Artist Hooks
export function useArtists(searchQuery?: string) {
  return useQuery({
    queryKey: searchQuery ? queryKeys.artists.search(searchQuery) : queryKeys.artists.all,
    queryFn: async () => {
      const path = searchQuery ? `/artists?search=${encodeURIComponent(searchQuery)}` : "/artists";
      return apiClient.get<Artist[]>(path);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useArtist(id: string) {
  return useQuery({
    queryKey: queryKeys.artists.detail(id),
    queryFn: () => apiClient.get<Artist>(`/artists/${id}`),
    staleTime: 5 * 60 * 1000,
  });
}

// Service Hooks
export function useServices(artistId: string) {
  return useQuery({
    queryKey: queryKeys.services.byArtist(artistId),
    queryFn: () => apiClient.get<Service[]>(`/artists/${artistId}/services`),
    staleTime: 5 * 60 * 1000,
  });
}

// Booking Hooks
export function useBookings(userId: string) {
  return useQuery({
    queryKey: queryKeys.bookings.byUser(userId),
    queryFn: () => apiClient.get<Booking[]>(`/users/${userId}/bookings`),
    staleTime: 60 * 1000, // 1 minute (bookings update more frequently)
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (booking: Omit<Booking, "id" | "status">) =>
      apiClient.post<Booking>("/bookings", booking),
    onSuccess: (_, variables) => {
      // Invalidate bookings cache for the user
      queryClient.invalidateQueries({
        queryKey: queryKeys.bookings.byUser(variables.artistId), // Will need to adjust based on actual user context
      });
    },
    onError: (error) => {
      errorLogger.error("Booking creation failed", error as Error);
    },
  });
}

// User Hooks
export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.user.current,
    queryFn: () => apiClient.get<User>("/users/me"),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profile: Partial<User>) =>
      apiClient.put<User>("/users/me", profile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.current });
    },
    onError: (error) => {
      errorLogger.error("Profile update failed", error as Error);
    },
  });
}
