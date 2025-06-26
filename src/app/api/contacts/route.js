import { NextResponse } from "next/server";
import initializeDbAndModels from "@/lib/db";

export async function GET(req) {
  const db = await initializeDbAndModels();
  const User = db.User;

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const userWithContacts = await User.findByPk(userId, {
      include: [{
        model: User,
        as: "Contacts",
        attributes: ['id', 'username'],
        through: { attributes: [] }, // removes join table fields
      }],
    });

    if (!userWithContacts) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ contacts: userWithContacts.Contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}
