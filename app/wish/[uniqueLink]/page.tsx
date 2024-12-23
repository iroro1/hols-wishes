"use client";
// app/wish/[uniqueLink]/page.tsx
import ClientWishPage from "@/components/ClientWishPage";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import useParams from next/navigation

export default function WishPage() {
  const { uniqueLink } = useParams(); // Use useParams to get dynamic route params
  const [wishData, setWishData] = useState<{
    name: string;
    message: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (uniqueLink) {
      fetchWishData(uniqueLink.toString());
    }
  }, [uniqueLink]);

  const fetchWishData = async (link: string) => {
    try {
      const response = await fetch(`/api/get-wish?uniqueLink=${link}`);
      const data = await response.json();
      console.log(data, "******");

      if (response.ok) {
        setWishData(data);
      } else {
        setError(data.error || "An unknown error occurred");
      }
    } catch (err) {
      setError("An error occurred while fetching the data.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle loading, error, and success states
  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  // Render the page with the fetched data
  return (
    <ClientWishPage
      name={wishData?.name.toString() || ""}
      message={wishData?.message?.toString() || ""}
    />
  );
}
