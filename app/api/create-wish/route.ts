import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const { name, email, message, uniqueLink, title } = await request.json();

  const { data, error } = await supabase
    .from("hols_wishes")
    .insert({ name, email, message, unique_link: uniqueLink, title });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    link: `${process.env.NEXT_PUBLIC_BASE_URL}/wish/${uniqueLink}`,
  });
}
