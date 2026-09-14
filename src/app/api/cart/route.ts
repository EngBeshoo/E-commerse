import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json(
      { error: "unauthorized" },
      { status: 401 }
    );
  }

  const rep = await fetch(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      headers: {
        token: String(token.token),
        "Content-Type": "application/json",
      },
    }
  );

  const payload = await rep.json();

  console.log("CART RESPONSE:", payload);

  return NextResponse.json(payload);
}