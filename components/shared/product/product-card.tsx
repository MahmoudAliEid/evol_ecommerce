import { Product } from "@/lib/generated/prisma";
import Image from "next/image";
import ImageHover from "./image-hover";

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
            sizes="80vw"
            fill
            alt={product.name}
            className={`object-cover transition-opacity duration-500 `}

          />
        )}
      </>
    );
  };

  return <div>ProductCard</div>;
};

export default ProductCard;
