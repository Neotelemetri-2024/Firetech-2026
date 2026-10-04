import type { ReactNode } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAdminAccess } from "../services/competition.services";

interface AdminRouteProps {
  children: ReactNode;
}

type AccessState =
  | "checking"
  | "allowed"
  | "forbidden"
  | "unauthorized"
  | "error";

export default function AdminRoute({
  children,
}: AdminRouteProps) {
  const accessToken = localStorage.getItem("accessToken");

  const [retryCount, setRetryCount] = useState(0);

  const [accessState, setAccessState] =
    useState<AccessState>(
      accessToken ? "checking" : "unauthorized"
    );

  useEffect(() => {
    if (!accessToken) {
      setAccessState("unauthorized");
      return;
    }

    let cancelled = false;

    setAccessState("checking");

    const verifyAccess = async () => {
      try {
        await checkAdminAccess();

        if (!cancelled) {
          setAccessState("allowed");
        }
      } catch (error) {
        if (cancelled) return;

        if (
          axios.isAxiosError(error) &&
          error.response?.status === 401
        ) {
          setAccessState("unauthorized");
          return;
        }

        if (
          axios.isAxiosError(error) &&
          error.response?.status === 403
        ) {
          setAccessState("forbidden");
          return;
        }

        setAccessState("error");
      }
    };

    void verifyAccess();

    return () => {
      cancelled = true;
    };
  }, [accessToken, retryCount]);

  if (accessState === "unauthorized") {
    return <Navigate to="/login" replace />;
  }

  if (accessState === "forbidden") {
    return <Navigate to="/home" replace />;
  }

  if (accessState === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p>Memeriksa akses admin...</p>
      </div>
    );
  }

  if (accessState === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 text-white">
        <p>
          Akses admin belum dapat diverifikasi.
          Periksa koneksi lalu coba lagi.
        </p>

        <button
          type="button"
          onClick={() =>
            setRetryCount((prev) => prev + 1)
          }
          className="rounded-md bg-orange-600 px-4 py-2 font-semibold hover:bg-orange-500"
        >
          Coba lagi
        </button>
      </div>
    );
  }

  return <>{children}</>;
}