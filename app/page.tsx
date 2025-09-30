"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import VideoFeed from "./components/VideoFeed"; // adjust path
import { IVideo } from "@/models/Video";

export default function HomePage() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/videos");
        const data = await res.json();
        setVideos(data);
      } catch (error) {
        console.error("Failed to fetch videos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-500 py-32">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Video Management with AI & Next.js
          </h1>
          <p className="text-lg md:text-xl mb-8 text-indigo-100">
            Build, upload, and stream videos seamlessly using NextJS, NextAuth,
            ImageKit, and MongoDB.
          </p>
          <Link
            href="/login"
            className="inline-block bg-white text-indigo-700 font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Features of this Project
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "User Authentication",
                desc: "Secure login and registration with NextAuth. Protect your content and manage user sessions.",
                icon: "🔒",
              },
              {
                title: "Video Upload & Streaming",
                desc: "Upload videos via ImageKit and stream them with optimized performance across devices.",
                icon: "🎬",
              },
              {
                title: "Database & Management",
                desc: "All videos, metadata, and user data are securely stored in MongoDB for full-stack functionality.",
                icon: "💾",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-8 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            All Videos
          </h2>

          {loading ? (
            <p className="text-center text-gray-300">Loading videos...</p>
          ) : videos.length === 0 ? (
            <p className="text-center text-gray-300">No videos available</p>
          ) : (
            <div className="grid gap-8 grid-rows-2">
              <VideoFeed videos={videos}></VideoFeed>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-8 mt-12 text-center">
        &copy; {new Date().getFullYear()} Video with AI. All rights reserved.
      </footer>
    </div>
  );
}
