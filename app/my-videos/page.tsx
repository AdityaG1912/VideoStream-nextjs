"use client";
import React, { useEffect, useState } from "react";
import VideoFeed from "../components/VideoFeed";
import { IVideo } from "@/models/Video";

const MyVideos = () => {
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

  if (loading) return <p className="text-center">Loading videos...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Videos</h1>
      <VideoFeed videos={videos} />
    </div>
  );
};

export default MyVideos;
