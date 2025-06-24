import initializeDbAndModels from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Login route triggered");

    const db = await initializeDbAndModels();
    console.log("DB initialized");

    const User = db.User;

    const body = await req.json();
    console.log("Request body:", body);

    const { username, password } = body;

    if (!username || !password) {
      console.log("Missing username or password");
      return NextResponse.json(
        { error: "Must have a username or password" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ where: { username } });
    console.log("User found:", user ? user.id : "Not found");

    if (!user) {
      return NextResponse.json({ error: "User doesn't exist" });
    }

    const isPasswordValid = await user.validatePassword(password);
    console.log("Password valid:", isPasswordValid);

    console.log("DEBUG: This is the user:", user)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Wrong password" });
    }


    const { password: _, ...userWithoutPassword } = user.toJSON();
    console.log("DEBUG: this is the user without password", userWithoutPassword)

    return NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("Error in login route:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

