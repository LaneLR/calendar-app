export const runtime = "nodejs";

import initializeDbAndModels from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const db = await initializeDbAndModels();
    const User = db.User;

    const body = await req.json();
    const { username, password } = body;

    const userExists = await User.findOne({ where: { username } });
    if (userExists) {
      return NextResponse.json({ error: "User already exists" });
    }

    const createNewUser = await User.create({
      username,
      password,
    });

    //hide password when sending call
    const { password: _, ...userWithoutPassword } = createNewUser.toJSON();

    return NextResponse.json({
      message: "User was created successfully",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
