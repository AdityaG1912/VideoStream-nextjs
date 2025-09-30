"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import VideoUploadForm from "../components/VideoUploadForm";
import { useEffect } from "react";

export default function VideoUploadPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Upload New Reel</h1>
        {session && <VideoUploadForm />}
      </div>
    </div>
  );
}
