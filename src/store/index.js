import { create } from "zustand";
import { getStorage, clearStorages } from "@/lib/storage";
import { get } from "@/lib/services";
import { cl } from "@/lib/logger";

export const useUserStore = create((set) => ({
  users: {}, // Data user
  isLoading: false, // Status loading
  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      // Ambil token dari storage
      const token = getStorage("accessToken");

      // Jika token tidak ada, redirect ke halaman login
      if (!token) {
        throw new Error("No token found");
      }

      // Validasi token dengan API backend
      const { data } = await get(
        "user-management/internal/authentication/me",
        null,
        { Authorization: `Bearer ${token}` }
      );

      // Jika token tidak valid, redirect ke halaman login
      if (data?.code !== 200) {
        throw new Error("Invalid token");
      }

      set({ users: data?.data, isLoading: false });
      return true;
    } catch (error) {
      cl(error.message);
      clearStorages(["accessToken", "refreshToken"]);
      set({ isLoading: false });
      return false;
    }
  },
}));
