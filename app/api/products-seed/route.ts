// import data from "@/lib/data";
import { ProductInputSchema } from "@/lib/vaildator";
import Prisma from "@/prisma/client";
import { NextResponse } from "next/server";
export async function POST() {
  try
  {
    const productData  = {
      name: "Test Product : By Mahmoud",
      slug: "test-product",
      category: "T-Shirts",
      images: ["/images/p11-1.jpg"],
      brand: "TestBrand",
      description: "A test product for validation.",
      isPublished: true,
      price: 19.99,
      listPrice: 24.99,
      countInStock: 10,
      tags: ["test", "sample"],
      sizes: ["M", "L"],
      colors: ["Red", "Blue"],
      avgRating: 4.5,
      numReviews: 3,
      reviews: ["review1", "review2", "review3"],
      numSales: 5,
      ratingDistribution: [
        { rating: 1, count: 0 },
        { rating: 2, count: 0 },
        { rating: 3, count: 1 },
        { rating: 4, count: 1 },
        { rating: 5, count: 1 },
      ],
    };

    // Validate the product data
    const parsedData = ProductInputSchema.safeParse(productData)
    if (parsedData.error) {
      return NextResponse.json(
        {
          error: "Validation failed", details: parsedData.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
        })) },
        { status: 400 }
      );
    }
    else
    {
      const product = await Prisma.product.create({
        data: productData,
      });
      return NextResponse.json({ response: product, message:'Product Added successfully' }, { status: 200 });
    }

    // const products = await Prisma.product.createMany({
      
    //   data: data.products
    // });
  
    // return NextResponse.json({ count: products.count }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error seeding products", details: error },
      { status: 500 }
    );
  }
}


