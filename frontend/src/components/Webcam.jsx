import React, { useEffect, useRef } from "react";
import * as faceapi from 'face-api.js'; // Import the library directly

const WebCam = ({ onDescriptorCaptured }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const loadModels = async () => {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      ]);
    } catch (err) {
      console.error("Error loading models:", err);
    }
  };

  const detectFace = async () => {
    try {
      const video = videoRef.current;
      if (!video || video.readyState !== 4) return;

      const result = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (result?.descriptor) {
        const descriptor = Array.from(result.descriptor);
        console.log("📸 Face descriptor:", descriptor);

        if (onDescriptorCaptured) {
          onDescriptorCaptured(descriptor);
        }
      } else {
        console.log("❌ No face detected. Please adjust your face position.");
      }
    } catch (err) {
      console.error("Error detecting face:", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        await loadModels();
        await startVideo();
        intervalRef.current = setInterval(detectFace, 2000);
      } catch (err) {
        console.error("Initialization error:", err);
      }
    };

    init();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center mx-auto">
      <video
        ref={videoRef}
        autoPlay
        muted
        width="420"
        height="340"
        className="rounded-lg"
      />
      <canvas
        ref={canvasRef}
        width="420"
        height="340"
        className="absolute top-0 left-0"
      />
    </div>
  );
};

export default WebCam;