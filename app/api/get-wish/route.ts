// app/api/getWish/route.ts
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const uniqueLink = searchParams.get("uniqueLink");

  if (!uniqueLink) {
    return NextResponse.json(
      { error: "uniqueLink is required" },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase
      .from("hols_wishes")
      .select("*")
      .eq("unique_link", uniqueLink)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Wish not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "An unexpected error occurred", resErr: err },
      { status: 500 }
    );
  }
}
