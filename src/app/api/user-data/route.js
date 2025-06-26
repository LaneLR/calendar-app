import { NextResponse } from "next/server";
import { verifyAuthToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;
  const authResult = await verifyAuthToken(token);

  if (authResult.status !== "authenticated") {
    const response = NextResponse.json(
      { message: authResult.message },
      { status: 401 }
    );

    if (authResult.status === "expired") {
      response.cookies.set("jwt_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0, //expire immediately
        path: "/",
      });
    }
    return response;
  }

  const userPayload = authResult.user;

  return NextResponse.json(
    { message: "Protected data accessed!", user: userPayload },
    { status: 200 }
  );
}
