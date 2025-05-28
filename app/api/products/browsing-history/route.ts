import Prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "history"; // Default to 'history' if not provided
  const categories = searchParams.get("categories") || "";
  const ids = searchParams.get("ids") || "";

  if (!type) {
    return new Response("Missing type parameter", { status: 400 });
  }
  
  // Return empty products array if no ids are provided
  if (!ids) {
    return NextResponse.json({ products: [] });
  }

  const productIds = ids.split(",").map((id) => id.trim());
  const categoryIds = categories.split(",").map((id) => id.trim());
  const filter =
    type === "history"
      ? { id: { in: productIds } }
            : { category: { in: categoryIds }, id: { in: productIds } };
    
  const products = await Prisma.product.findMany({
    where: filter,
    orderBy: {
      updatedAt: "desc",
    },
  });    if (type === "history") { 
        return NextResponse.json({
            products: products.sort((a, b) => {
                return productIds.indexOf(a.id) - productIds.indexOf(b.id);
            }),
        });
    }
    
    return NextResponse.json({
        products: products
    });
}
