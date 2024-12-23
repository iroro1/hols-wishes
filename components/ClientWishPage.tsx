"use client";

import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function ClientWishPage({
  name,
  message,
  title = "Merry Christmas",
}: {
  name: string;
  message: string;
  title: string;
}) {
  const christmasVid =
    "https://videos.pexels.com/video-files/5727551/5727551-uhd_1440_2560_24fps.mp4";
  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 to-green-500 p-6 flex flex-col justify-center items-center">
      <video
        className="absolute z-0 top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src={christmasVid} type="video/mp4" />
      </video>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-h-[90%] overflow-y-auto text-center text-white x-50 space-y-6 max-w-lg mx-auto p-6 bg-black bg-opacity-50 rounded-lg shadow-lg absolute z-50"
      >
        {/* Title Section */}
        <h1 className="text-xl md:text-2xl font-extrabold mb-4 text-shadow-lg">
          {title}
        </h1>
        <h1 className="text-sm text-left opacity-80 mb-4 text-shadow-lg">
          from <span className="text-yellow-400 font-bold">{name}!</span>
        </h1>

        {/* Message Section */}
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6 text-opacity-90 ">
          {message}
        </p>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.assign("/")}
          className="flex items-center mx-auto justify-center mt-6 p-2 bg-green-600 text-white rounded-lg shadow-xl hover:bg-green-700 transition duration-300 ease-in-out transform"
        >
          <Home className="mr-3 h-4 w-4" />
          <span className="text-sm">Create Your Own Wish</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
