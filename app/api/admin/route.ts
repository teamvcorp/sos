import { currentUserRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const role = await currentUserRole();

    if (role === UserRole.ADMIN) {
      return new NextResponse("Access granted", { status: 200 });
    } else {
      return new NextResponse("Access denied: You must be an admin to access this resource.", { status: 403 });
    }
  } catch (error) {
    return new NextResponse(`An error occurred: `, { status: 500 });
  }
}
