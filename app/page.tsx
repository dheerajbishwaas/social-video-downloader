"use client";
import { useState } from "react";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  const handleDownload = async () => {
    if (!videoUrl.trim()) return alert("Please paste a video link!");
    setLoading(true);
    setDownloadUrl("");

    try {
      const res = await fetch(`/api/download?url=${encodeURIComponent(videoUrl)}`);
      const data = await res.json();

      if (data.downloadUrl) {
        setTitle(data.title);
        setDownloadUrl(data.downloadUrl);
      } else {
        alert("Failed to fetch download link");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">🎬 Social Video Downloader</h1>

      <input
        type="text"
        placeholder="Paste YouTube / Reels / X link here..."
        className="w-80 p-2 border border-gray-300 rounded mb-4"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />

      <button
        onClick={handleDownload}
        disabled={loading}
        className={`px-6 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Fetching..." : "Get Download Link"}
      </button>

      {downloadUrl && (
        <div className="mt-6 text-center">
          <p className="font-semibold mb-2">{title}</p>
          <a
            href={downloadUrl}
            download
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            ⬇️ Download Video
          </a>
        </div>
      )}

      <p className="text-gray-500 text-sm mt-6">
        Supports: YouTube Shorts, Instagram Reels, X, Facebook, TikTok
      </p>
    </div>
  );
}
