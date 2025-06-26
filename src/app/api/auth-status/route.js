import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAuthToken } from "@/lib/auth";

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value; //safely check the value of the token

    const authResult = await verifyAuthToken(token);

    //checking for bad authentication or expired cookies
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
          maxAge: 0,
          path: "/",
        });
      }
      return response;
    }

    const userPayload = authResult.user;

    //////
    return NextResponse.json(
      { isLoggedIn: true, user: userPayload },
      { status: 200 }
    );
    //////
  } catch (error) {
    console.error("Error in /api/auth-status GET request:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}