import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Product } from "@/lib/generated/prisma";
import { formatNumber } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";
import Ratting from "./Ratting";
import ImageHover from "./image-hover";
import ProductPrice from "./product-price";

const ProductCard = ({
  product,
  hideBorder = false,
  hideDetails = false,
  hideAddToCart = false,
}: {
  product: Product;
  hideDetails?: boolean;
  hideBorder?: boolean;
  hideAddToCart?: boolean;
}) => {
  const ProductImage = () => {
    return (
      <>
        {product.images.length > 1 ? (
          <ImageHover
            src={product.images[0] ? product.images[0] : "/images/jeans.png"}
            hoverSrc={
              product.images[1] ? product.images[1] : "/images/jeans.png"
            }
            alt={product.name}
          />
        ) : (
          <Image
            src={product.images[0]}
            fill
            sizes="80vw"
            alt={product.name}
            className={`object-contain transition-opacity duration-500 p-0 m-0 rounded-md `}
          />
        )}
      </>
    );
  };

  const ProductDetails = () => {
    return (
      <div className="flex-1  space-y-5">
        <Badge variant={"default"}>{product.brand}</Badge>

        <Link
          href={`/product/${product.slug}`}
          className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold hover:underline"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
          }}>
          {product.name}
        </Link>
        <div className=" flex gap-2 justify-between items-center">
          <Ratting ratting={product.avgRating} />
          <span className="text-sm text-gray-500">
            ({formatNumber(product.numReviews)}) reviews
          </span>
        </div>
        <ProductPrice
          price={product.price}
          listPrice={product.listPrice}
          className="text-lg font-semibold"
          forListing={true}
          isDeal={product.tags.includes("todays-deal")}
        />
      </div>
    );
  };

  return hideBorder ? (
    <div className="flex flex-col">
      <ProductImage />
      {!hideDetails && (
        <div className="p-3 flex-1 text-center">
          <ProductDetails />
        </div>
      )}
      {!hideAddToCart && (
        <div className="p-3">
          <Link
            href={`/product/${product.slug}`}
            className="w-full inline-block text-center bg-primary text-white py-2 rounded hover:bg-primary/90 transition-colors">
            View Product
          </Link>
        </div>
      )}
    </div>
  ) : (
    <Card className="flex  p-0 flex-col h-full border hover:shadow-2xl hover:scale-105 transition-all duration-500 ">
      <CardHeader className="p-0 m-0 relative overflow-hidden">
        <ProductImage />
      </CardHeader>
      {!hideDetails && (
        <div className="p-3 flex-1 text-center">
          <ProductDetails />
        </div>
      )}
      {!hideAddToCart && (
        <div className="p-3">
          <Link
            href={`/product/${product.slug}`}
            className="w-full inline-block text-center bg-primary text-white py-2 rounded hover:bg-primary/90 transition-colors">
            View Product
          </Link>
        </div>
      )}
    </Card>
  );
};

export default ProductCard;
