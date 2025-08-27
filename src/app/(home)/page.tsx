'use client';

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import StudentDashboard from "./StudentDashboard";
import ManagementDashboard from "./ManagementDashboard";
import LectureDashboard from "./LectureDashboard";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return <div>Redirecting to login...</div>;

  switch (user.role) {
    case 'dosen':
      return <LectureDashboard />;
    case 'mahasiswa':
      return <StudentDashboard />;
    case 'management':
      return <ManagementDashboard />;
    default:
      return <div>Role tidak valid.</div>;
  }
}
