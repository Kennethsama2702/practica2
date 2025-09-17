"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi, type User } from "@/lib/api";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const authToken = localStorage.getItem("authToken");
      const isAuth = localStorage.getItem("isAuthenticated") === "true";

      if (authToken && isAuth) {
        try {
          // Verificar token con el servidor
          const userData = await authApi.me();
          setIsAuthenticated(true);
          setUser(userData);
        } catch (error) {
          // Token inválido, limpiar localStorage
          localStorage.removeItem("authToken");
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("userEmail");
          setIsAuthenticated(false);
          setUser(null);
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authApi.login(email, password);

      // Guardar en localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("userEmail", response.user.email);

      // Actualizar estado
      setIsAuthenticated(true);
      setUser(response.user);

      return true;
    } catch (error: any) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Limpiar localStorage y estado
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userEmail");

      setIsAuthenticated(false);
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
