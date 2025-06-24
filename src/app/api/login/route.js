import initializeDbAndModels from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const db = await initializeDbAndModels();
    const User = db.User;

    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        {
          error: "Must have a username or password",
        },
        {
          status: 400,
        }
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

    const { password: _, ...userWithoutPassword } = user.toJSON();

    return NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (err) {
    {
      console.error(err);
      return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
  }
}
