import React, { useEffect, useState } from 'react';
import { BASEURL } from '../utils/constants';
import ReadMoreReadLess from "react-read-more-read-less";

const Videos = () => {
  const [fetchVideo, setFetchVideo] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); // show 3 at a time

  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await fetch(`${BASEURL}/video`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP error! status: ${res.status}, body: ${text}`);
        }
        const data = await res.json();
        setFetchVideo(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    getVideos();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleLoadLess = () => {
    setVisibleCount((prev) => Math.max(3, prev - 3));
  };

  return (
    <div className="p-4 mt-24">
      <h2 className="font-bold text-center text-3xl mb-6">Project Details Page</h2>

      {fetchVideo.length === 0 ? (
        <p className="text-center">No videos available</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto">
            {fetchVideo.slice(0, visibleCount).map((video, index) => (
              <div key={index} className="bg-white rounded shadow p-2">
                <video width="100%" height="260" controls className="h-64 w-full object-cover rounded">
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <h3 className="text-lg font-semibold my-2 text-black">{video.title}</h3>
                <p className="text-sm font-extralight text-gray-500">
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

          <div className="flex justify-center gap-4 mt-6">
            {visibleCount > 3 && (
              <button
                onClick={handleLoadLess}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
              >
                Load Less
              </button>
            )}
            {visibleCount < fetchVideo.length && (
              <button
                onClick={handleLoadMore}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
              >
                Load More
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Videos;
