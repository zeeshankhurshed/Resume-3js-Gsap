import React, { useEffect, useState } from "react";
import ReadMoreReadLess from "react-read-more-read-less";
import { BASEURL } from "../utils/constants";
import { Link } from "react-router-dom";

const VideoSection = () => {
  const [fetchVideo, setFetchVideo] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await fetch(`${BASEURL}/video`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP error! status: ${res.status}, body: ${text}`);
        }
        const data = await res.json();
        setFetchVideo(data.slice(0, 3)); // Show only 3 videos
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    getVideos();
  }, []);

  return (
    <div className="p-4 my-12">
      <h2 className="font-bold text-center text-3xl mb-6">Demo Projects</h2>

      {fetchVideo.length === 0 ? (
        <p className="text-center">No videos available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto">
          {fetchVideo.map((video, index) => (
            <div key={index} className=" shadow-md rounded-lg p-2 border border-teal-600">
              <video
                controls
                className="w-full h-56 object-cover rounded-md"
              >
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <h3 className="text-lg font-semibold mt-2">{video.title}</h3>
              <p className="text-sm font-light text-gray-500">
                <ReadMoreReadLess
                  charLimit={100}
                  readMoreText={"Read More"}
                  readLessText={"Read Less"}
                >
                  {video.description}
                </ReadMoreReadLess>
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-8">
        <Link to="/videos">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-6 rounded-md transition-all duration-200">
            Visit More Work
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VideoSection;
