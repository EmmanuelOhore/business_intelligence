// src/components/ProtectedRoute.jsx
"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (!storedUser) {
      router.push("/");
    }
  }, [router]);

  return user ? children : null;
}
