import ProductGallery from "@/components/shared/product/product-gallery";
import ProductPrice from "@/components/shared/product/product-price";
import ProductSlider from "@/components/shared/product/product-slider";
import Ratting from "@/components/shared/product/Ratting";
import SelectVariant from "@/components/shared/product/select-variant";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import
    {
        getOneProductBySlug,
        getRelatedProductsByCategory,
    } from "@/lib/actions/product-actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getOneProductBySlug(slug);
  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }
  return {
    title: `${product.name} - Product Details`,
    openGraph: {
      title: `${product.name} - Product Details`,
      description: product.description || "Explore this product's details.",
      images: product.images.map((image) => ({
        url: image,
        alt: product.name,
      })),
    },
    description: product.description || "Explore this product's details.",
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ color?: string; size?: string; page?: string }>;
}) {
  const { params, searchParams } = props;
  const { slug } = await params;
  const { color, size, page } = await searchParams;

  // Fetch product data using slug
  const product = await getOneProductBySlug(slug);
  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  const relatedProducts = await getRelatedProductsByCategory({
    category: product.category,
    productId: product.id,

    page: parseInt(page || "1", 10),
  });

  return (
    <div>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="col-span-2">
            <ProductGallery images={product.images} />
          </div>

          <div className="flex w-full flex-col gap-2 md:p-5 col-span-2">
            <div className="flex flex-col gap-3">
              <Badge className="text-md">
                Brand {product.brand} {product.category}
              </Badge>
              <h1 className="font-bold-text-lg lg:text-xl">{product.name}</h1>
              <div className="flex items-center-gap-2">
                <span className="text-sm text-gray-500">
                  {product.avgRating.toFixed(1)}
                </span>
                <Ratting ratting={product.avgRating} />
                <span className="text-sm text-gray-500">
                  ({product.numReviews} reviews)
                </span>
              </div>
              <Separator />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <ProductPrice
                    price={product.price}
                    listPrice={product.listPrice}
                    isDeal={product.tags.includes("todays-deal")}
                    forListing={false}
                  />
                </div>
              </div>
            </div>
            <div>
              <SelectVariant
                color={color || product.sizes[0]}
                size={size || product.sizes[0]}
                product={product}
              />
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-grey-600">Product Details</h3>
              <p className="text-md text-grey-500 lg:text-lg">
                {product.description}
              </p>
            </div>
          </div>
          <Card>
            <CardContent className="p-4 flex flex-col gap-4">
              <ProductPrice price={product.price} />
              {product.countInStock > 0 && product.countInStock <= 3 && (
                <Badge className="text-md bg-yellow-200 text-yellow-800">
                  Only {product.countInStock} left in stock - hurry up!
                </Badge>
              )}
              {product.countInStock !== 0 ? (
                <Badge className="text-md bg-green-200 text-green-800">
                  In Stock
                </Badge>
              ) : (
                <Badge className="text-md bg-red-200 text-red-800">
                  Out of Stock
                </Badge>
              )}
            </CardContent>
          </Card>
        </div>
          </section>
          <section className="mt-10">
              <ProductSlider
                  products={relatedProducts.products}
                  title={`Related Products in ${product.category}`}
              />
          </section>
      </div>
  );
}
