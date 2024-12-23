// app/wish/[uniqueLink]/page.tsx
import ClientWishPage from "@/components/ClientWishPage";
import { supabase } from "@/lib/supabase";

// This is an async function that generates the static parameters for the dynamic route.
export async function generateStaticParams() {
  const { data } = await supabase.from("hols_wishes").select("unique_link");
  // Map the data to return a list of paths for static generation.
  return (
    data?.map((wish) => ({
      uniqueLink: wish.unique_link,
    })) || []
  );
}

// This is the main page component that receives the params object.
export default async function WishPage({
  params,
}: {
  params: { uniqueLink: string }; // The params object should be passed correctly.
}) {
  const { data, error } = await supabase
    .from("hols_wishes")
    .select("*")
    .eq("unique_link", params.uniqueLink)
    .single();

  // Handle case where no wish was found for the given uniqueLink.
  if (error || !data) {
    return <div className="text-center p-4">Wish not found! or expired</div>;
  }

  // Pass the fetched data to the client component.
  return <ClientWishPage name={data.name} message={data.message} />;
}
