import Prisma from "@/prisma/client";
import { NUMBER_PAGES } from "../constants";

// ** Get all categories form products

export const getAllCategories = async () => {
  const categories = await Prisma.product.findMany({
    where: {
      isPublished: true,
    },
    select: {
      category: true,
    },
    distinct: ["category"],
  });
  return categories;
};

// Get products for card by tag and limit
export const getProductsForCard = async ({
  tag,
  limit = 4,
}: {
  tag: string;
  limit?: number;
}) => {
  const products = await Prisma.product.findMany({
    where: {
      tags: { has: tag },
      isPublished: true,
    },
    select: {
      name: true,
      slug: true,
      images: true,
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  // Map to card format: name, href, image
  return products.map((product) => ({
    name: product.name,
    href: `/product/${product.slug}`,
    image: product.images[0] || "",
  }));
};

export const getProductByTag = async ({
  tag,
  limit,
}: {
  tag: string;
  limit?: number;
}) => {
  const products = await Prisma.product.findMany({
    where: {
      tags: { has: tag },
      isPublished: true,
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  if (!products || products.length === 0) {
    throw new Error(`No products found with tag "${tag}"`);
  }
  return products;
};

export const getOneProductBySlug = async (slug: string) => {
  const product = await Prisma.product.findUnique({
    where: {
      slug,
    },
  });
  if (!product) {
    throw new Error(`Product with slug "${slug}" not found`);
  }
  return product;
};

export const getProductsByCategory = async (category: string) => {
  const products = await Prisma.product.findMany({
    where: {
      category,
      isPublished: true,
    },
  });
  if (!products || products.length === 0) {
    throw new Error(`No products found in category "${category}"`);
  }
  return products;
};

export const getRelatedProductsByCategory = async ({
  category,
  productId,
  limit = NUMBER_PAGES,
  page = 1,
}: {
  category: string;
  productId?: string;
  limit?: number;
  page?: number;
}) => {
  const products = await Prisma.product.findMany({
    where: {
      category,
      isPublished: true,
      id: { not: productId }, // Exclude the current product
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
  });
  if (!products || products.length === 0) {
    throw new Error(`No related products found in category "${category}"`);
  }
  const totalProducts = await Prisma.product.count({
    where: {
      category,
      isPublished: true,
      id: { not: productId }, // Exclude the current product
    },
  });
  return {
    products,
    total: totalProducts,
    totalPages: Math.ceil(totalProducts / limit),
  };
};

export const getProductsBySearch = async (search: string) => {
  const products = await Prisma.product.findMany({
    where: {
      isPublished: true,
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    },
  });
  if (!products || products.length === 0) {
    throw new Error(`No products found for search "${search}"`);
  }
  return products;
};
