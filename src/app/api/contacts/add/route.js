import initializeDbAndModels from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId, contactId } = await req.json();
  const db = await initializeDbAndModels;
  const User = db.User;

  const user = await User.findByPk(userId);
  //find contact by id
  const contact = await User.findByPk(contactId);

  if (!user || !contact) {
    return NextResponse.json(
      { message: "User or Contact not found" },
      { status: 500 }
    );
  }

  await user.addContact(contact);

  return NextResponse.json({ message: "Contact added!" }, { status: 200 });
}
