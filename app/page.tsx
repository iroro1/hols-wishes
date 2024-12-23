"use client";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  MessageSquare,
  Gift,
  HomeIcon,
  X,
  Clipboard,
  Heading,
} from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [wishCount, setWishCount] = useState(0);
  const [holidayImage, setHolidayImage] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch the count of wishes sent
    const fetchWishCount = async () => {
      const response = await fetch("/api/wish-count");
      const data = await response.json();
      setWishCount(data.count);
    };

    fetchWishCount();

    // Determine holiday image based on current date
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // Months are 0-based
    const currentDay = today.getDate();

    let image;
    if (currentMonth === 12) {
      image =
        "https://images.pexels.com/photos/3224164/pexels-photo-3224164.jpeg?auto=compress&cs=tinysrgb&w=800"; // Christmas
    } else if (currentMonth === 5 && currentDay === 27) {
      image =
        "https://images.pexels.com/photos/2660262/pexels-photo-2660262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"; // Africa Day
    } else if (currentMonth === 7 && currentDay === 4) {
      image =
        "https://images.pexels.com/photos/1051072/pexels-photo-1051072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"; // US Independence Day
    } else if (currentMonth === 3 && currentDay === 8) {
      image =
        "https://images.pexels.com/photos/5104713/pexels-photo-5104713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"; // International Women's Day
    } else {
      image =
        "https://images.pexels.com/photos/5979434/pexels-photo-5979434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"; // Default holiday image
    }

    setHolidayImage(image);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const uniqueLink = nanoid(10);

    const response = await fetch("/api/create-wish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message, uniqueLink, title }),
    });

    const data = await response.json();
    if (data.link) {
      setLink(data.link);
      setShowForm(false);
      toast.success("Message created successfully");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-red-300 to-blue-400  flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center min-h-screen text-white p-6 bg-[#000]/50 w-full relative"
      >
        <h6 className="absolute top-6 left-6 text-xl font-semibold text-white ">
          Hols
        </h6>
        <div className="mt-[20%] overflow-y-hidden flex-col flex justify-center items-center">
          <h1 className="text-4xl font-extrabold mb-6">
            🎉 Create Your Holiday Wish 🥳
          </h1>

          <p>
            Join our community of people who have shared their wish with us.
          </p>
          {wishCount > 0 && (
            <p className="text-lg">{wishCount} wishes shared so far</p>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center mx-auto mt-6 p-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-300 ease-in-out transform"
          >
            <HomeIcon className="mr-2" /> Create Your Own Wish
          </motion.button>

          {link && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-6 text-center bg-white text-[#555] p-2 rounded relative"
            >
              <button
                onClick={() => {
                  navigator.clipboard.writeText(link);
                  toast.success("Message copied to clipboard!");
                }}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <Clipboard className="w-4 h-4" />
              </button>
              <p className="mt-5">
                Your wish has been created! Share this link:
              </p>
              <Link
                href={link}
                className="text-blue-500 underline break-words hover:text-blue-700"
                target="_blank"
              >
                {link}
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>

      {showForm && (
        <div className="absolute z-10 top-0 left-0 w-full h-full flex justify-center items-center bg-[#000]/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 bg-white shadow-lg rounded-lg p-6 max-w-lg w-full relative"
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X />
            </button>
            <Image
              src={holidayImage}
              alt="Holiday Theme"
              className="rounded-md mb-4 mt-4 w-full h-40 object-cover"
              width={0}
              height={0}
              sizes="100vw"
            />
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center border rounded-lg p-2">
                <User className="mr-2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="flex-grow outline-none"
                />
              </div>
              <div className="flex items-center border rounded-lg p-2">
                <Mail className="mr-2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow outline-none"
                />
              </div>
              <div className="flex items-center border rounded-lg p-2">
                <Heading className="mr-2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Your Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="flex-grow outline-none"
                />
              </div>
              <div className="flex items-center border rounded-lg p-2">
                <MessageSquare className="mr-2 text-gray-400" />
                <textarea
                  placeholder="Your Holiday Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="flex-grow outline-none"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="flex items-center justify-center w-full p-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
              >
                <Gift className="mr-2" /> Create Wish
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}

      <p className="absolute text-white bottom-4 left-1/2 transform -translate-x-1/2">
        Created by{" "}
        <Link
          className="text-green-500"
          href={"https://www.ojigbo.pro"}
          target="_blank"
        >
          www.ojigbo.pro
        </Link>
      </p>
    </div>
  );
}
