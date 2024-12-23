import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { count, error } = await supabase
    .from("hols_wishes")
    .select("*", { count: "exact" });

  console.log(count, "99");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    count,
  });
}
