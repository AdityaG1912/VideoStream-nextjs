"use client";

import { useState } from "react";
import FileUpload from "./FileUpload";
import { apiClient } from "@/lib/api-client"; // adjust path
import type { VideoFormData } from "@/lib/api-client";
import React from "react";

function VideoUploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploadedVideo, setUploadedVideo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadedVideo) {
      alert("Please upload a video first!");
      return;
    }

    const videoData: VideoFormData = {
      title,
      description,
      videoUrl: uploadedVideo.url,
      thumbnailUrl: `${uploadedVideo.url}?tr=w-300,h-400,fo-auto`,
    };

    try {
      setLoading(true);
      await apiClient.createVideo(videoData);
      alert("Video uploaded successfully!");
      setTitle("");
      setDescription("");
      setUploadedVideo(null);
      setProgress(0);
    } catch (err: any) {
      console.error("Error creating video:", err);
      alert(err.message || "Failed to save video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 rounded-2xl shadow-xl p-8 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-400">
        Upload a New Video
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-medium mb-2 text-gray-300">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter video title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-2 text-gray-300">
            Description
          </label>
          <textarea
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Write a short description..."
            rows={4}
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block font-medium mb-2 text-gray-300">
            Upload Video
          </label>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 bg-gray-800 hover:border-indigo-500 transition">
            <FileUpload
              fileType="video"
              onProgress={setProgress}
              onSuccess={(res) => setUploadedVideo(res)}
            />
          </div>
          {progress > 0 && (
            <progress
              className="progress progress-primary w-full mt-3"
              value={progress}
              max={100}
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg shadow-lg transition transform hover:-translate-y-0.5 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Video"}
        </button>
      </form>
    </div>
  );
}

export default VideoUploadForm;
