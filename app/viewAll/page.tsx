"use client";
import React, { useEffect, useState } from "react";

const View = () => {
  const [lastWishes, setLastWishes] = useState([]);
  useEffect(() => {
    // Fetch the count of wishes sent
    loadLastWishes();
  }, []);
  const loadLastWishes = async () => {
    const response = await fetch("/api/get-all-wishes");
    const data = await response.json();
    setLastWishes(data?.data);
  };

  console.log(lastWishes);

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    return date.toLocaleString("en-US", options);
  };
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-r from-red-500 to-green-500 p-6 flex flex-col justify-center items-center">
        <div className="max-h-[90%] overflow-y-auto text-center text-white x-50 space-y-6 max-w-lg mx-auto p-6 bg-black bg-opacity-50 rounded-lg shadow-lg absolute z-50">
          <h1 className="text-xl md:text-2xl font-extrabold mb-4 text-shadow-lg">
            All wishes <span>({lastWishes.length})</span>
          </h1>
          {lastWishes.map((wish: any, index: number) => (
            <div
              key={index}
              className="bg-white text-black p-4 rounded-lg shadow-md mb-4"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {wish.title}
              </h2>
              <div className="text-sm text-gray-500 mb-2 flex items-center gap-2 flex-wrap">
                <span>{wish?.email}</span> <span>|</span>
                <span>{wish?.name}</span> <span>|</span>
                <span>{wish?.unique_link}</span> <span>|</span>
                <span>{formatDateTime(wish?.created_at)}</span>
              </div>
              <p className="text-gray-600">{wish.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default View;
