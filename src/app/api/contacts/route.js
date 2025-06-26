import { NextResponse } from "next/server";
import initializeDbAndModels from "@/lib/db";

export async function GET(req) {
  const db = await initializeDbAndModels();
  const User = db.User;

  const { searchParams } = new URL(req.url);
  const userId = parseInt(searchParams.get("userId"), 10); //parse the param

  if (!userId) {
    return NextResponse.json({ error: "Missing or invalid userId" }, { status: 400 });
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const contacts = await user.getContacts({
      attributes: ["id", "username"], 
    });

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}
