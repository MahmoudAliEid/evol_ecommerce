import Prisma from "@/prisma/client";


// ** Get all categories form products

export const getAllCategories = async () =>
{
    const categories = await Prisma.product.findMany({
        where: {
            isPublished: true,
        },
        select: {
            category: true,
        },
        distinct: ['category'],
    });
    return categories
}

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
  return products;
};

