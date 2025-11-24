/**
 * Mock API Service for Development
 * Replace this with real API calls when backend is ready
 * Set VITE_API_URL in .env to use real backend
 */

import type { Artist, Service, Booking, User } from "@/hooks/useApi";

// Mock data
const mockArtists: Artist[] = [
  {
    id: "1",
    name: "Thandi Mthembu",
    email: "thandi@example.com",
    businessName: "Thandi's Beauty Studio",
    specialty: "makeup",
    location: "Johannesburg, Sandton",
    experience: "8",
    bio: "Certified makeup artist with 8+ years of experience specializing in bridal, editorial, and special occasion makeup.",
    rating: 4.9,
    reviewCount: 124,
    instagram: "thandi_makeup",
  },
  {
    id: "2",
    name: "Zama Khumalo",
    email: "zama@example.com",
    businessName: "Zama Hair Design",
    specialty: "hair",
    location: "Cape Town, Camps Bay",
    experience: "6",
    bio: "Expert hair stylist specializing in natural hair care and protective styling.",
    rating: 4.8,
    reviewCount: 89,
    instagram: "zama_hair",
  },
];

const mockServices: Record<string, Service[]> = {
  "1": [
    { id: "s1", name: "Bridal Makeup", price: 2000, duration: "2 hours", currency: "R" },
    { id: "s2", name: "Glam Makeup", price: 800, duration: "1 hour", currency: "R" },
    { id: "s3", name: "Natural Makeup", price: 500, duration: "45 mins", currency: "R" },
  ],
  "2": [
    { id: "s4", name: "Blow Dry", price: 150, duration: "1 hour", currency: "R" },
    { id: "s5", name: "Hair Treatment", price: 300, duration: "2 hours", currency: "R" },
  ],
};

// Mock API functions
export const mockApi = {
  // Artists
  async getArtists(searchQuery?: string): Promise<Artist[]> {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 300));

    if (searchQuery) {
      return mockArtists.filter(
        (a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return mockArtists;
  },

  async getArtist(id: string): Promise<Artist> {
    await new Promise((r) => setTimeout(r, 200));
    const artist = mockArtists.find((a) => a.id === id);
    if (!artist) throw new Error("Artist not found");
    return artist;
  },

  // Services
  async getServices(artistId: string): Promise<Service[]> {
    await new Promise((r) => setTimeout(r, 200));
    return mockServices[artistId] || [];
  },

  // Bookings
  async getBookings(_userId: string): Promise<Booking[]> {
    await new Promise((r) => setTimeout(r, 200));
    return [
      {
        id: "b1",
        artistId: "1",
        serviceId: "s1",
        date: new Date().toISOString(),
        status: "confirmed",
        totalPrice: 2000,
      },
    ];
  },

  async createBooking(booking: Omit<Booking, "id">): Promise<Booking> {
    await new Promise((r) => setTimeout(r, 300));
    return { ...booking, id: `b${Date.now()}` };
  },

  // User
  async getCurrentUser(): Promise<User> {
    await new Promise((r) => setTimeout(r, 200));
    return {
      id: "user123",
      email: "user@example.com",
      name: "John Doe",
      role: "client",
    };
  },

  async updateProfile(profile: Partial<User>): Promise<User> {
    await new Promise((r) => setTimeout(r, 300));
    return { id: "user123", email: "user@example.com", name: "John Doe", role: "client", ...profile };
  },
};
