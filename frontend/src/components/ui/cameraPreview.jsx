import { useEffect, useRef, useState } from "react";

export default function CameraPreview({ onCameraStart }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState("");

  // 🎥 Start Camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      console.log("✅ Camera stream received");

      setStream(mediaStream);

    } catch (err) {
      console.error("🚨 REAL CAMERA ERROR:", err);

      if (err.name === "NotReadableError") {
        setError("Camera already in use ❌");
      } else if (err.name === "NotAllowedError") {
        setError("Permission denied ❌");
      } else {
        setError("Error: " + err.message);
      }
    }
  };

  // 🔥 Attach stream after render
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;

      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();

        console.log("🎥 Camera visible");

        // 🎯 Start interview after camera ON
        setTimeout(() => {
          onCameraStart && onCameraStart();
        }, 500);
      };
    }
  }, [stream]);

  return (
    <div className="">

      {/* ❌ ERROR */}
      {error && (
        <div className="absolute top-5 text-red-500 font-semibold">
          {error}
        </div>
      )}

      {/* ▶️ BUTTON */}
      {!stream && (
        <button
          onClick={startCamera}
          className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          Start Camera 🎥
        </button>
      )}

      {/* 🎥 VIDEO */}
      {stream && (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      )}

    </div>
  );
}