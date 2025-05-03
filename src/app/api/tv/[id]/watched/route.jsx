import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
export async function POST(req, { params }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 401 });
  }
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ message: "ID not found" }, { status: 400 });
  }
  try {
    const { data: insertedData, error } = await supabase
      .from("user_watched_shows")
      .insert([
        {
          user_id: user.id,
          tv_show_id: id,
        },
      ])
      .select("*");
    if (error) {
      console.error("Error inserting data:", error);
      return NextResponse.json(
        { message: "Failed to insert data" },
        { status: 500 }
      );
    }
    return NextResponse.json({ data: insertedData }, { status: 200 });
  } catch (error) {
    console.error("Error inserting data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
