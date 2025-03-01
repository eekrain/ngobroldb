import { db } from "@/db";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const currentPage = parseInt(searchParams.get("currentPage") || "1");
  const limitPerPage = parseInt(searchParams.get("limitPerPage") || "10");

  if (!currentPage || !limitPerPage) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  } else if (isNaN(currentPage) || isNaN(limitPerPage)) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const data = await db.query.mahasiswaTable.findMany({
    limit: limitPerPage,
    offset: (currentPage - 1) * limitPerPage,
  });

  return NextResponse.json(data);
}
