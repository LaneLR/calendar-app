export const runtime = "nodejs";

import initializeDbAndModels from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    console.log("Login route triggered");

    const db = await initializeDbAndModels();
    const User = db.User;

    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Must have a username or password" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return NextResponse.json({ error: "User doesn't exist" });
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Wrong password" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables!");
      return NextResponse.json(
        { error: "Server error: JWT_SECRET missing" },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const { password: _, ...userWithoutPassword } = user.toJSON();

    console.log("Returning success response");
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: userWithoutPassword,
      },
      {
        status: 200,
      }
    );

    response.cookies.set("jwt_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1, // 1 hour
      path: "/", // root or main  page
    });

    return response; //return the response with the cookies set
  } catch (err) {
    console.error("Error in login route:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
