import { Video } from "@imagekit/next";
import Link from "next/link";
import { IVideo } from "@/models/Video";

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] overflow-hidden">
      {/* Video */}
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        <Video
          src={video.videoUrl}
          transformation={[{ width: "1920", height: "1080" }]}
          controls={video.controls}
          className="w-full h-full object-cover rounded-t-2xl cursor-pointer"
        />
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col gap-2">
        <Link
          href={`/videos/${video._id}`}
          className="hover:underline transition-all duration-200"
        >
          <h2 className="text-lg font-semibold text-white line-clamp-2">
            {video.title}
          </h2>
        </Link>
        <p className="text-sm text-gray-300 line-clamp-3">
          {video.description}
        </p>
      </div>

      {/* Footer / Actions */}
      <div className="px-4 pb-4 flex justify-between items-center text-gray-400 text-sm">
        <span>{/* Duration or views can go here */}</span>
        <span>{/* Any action buttons can go here */}</span>
      </div>
    </div>
  );
}
