import initializeDbAndModels from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const db = await initializeDbAndModels();
    const User = db.User;

    const body = await req.json();
    let { userId, contactId } = body;

    userId = parseInt(userId);
    contactId = parseInt(contactId);
    
    if (!userId || !contactId || isNaN(userId) || isNaN(contactId)) {
      return NextResponse.json(
        { message: "Missing or invalid userId/contactId" },
        { status: 400 }
      );
    }

    const user = await User.findByPk(userId);
    const contact = await User.findByPk(contactId);

    if (!user || !contact) {
      return NextResponse.json(
        { message: "User or Contact not found" },
        { status: 404 }
      );
    }

    await user.addContact(contact);
    await contact.addContact(user);

    return NextResponse.json({ message: "Contact added!" }, { status: 200 });
  } catch (err) {
    console.error("Error with POST: ", err);
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
