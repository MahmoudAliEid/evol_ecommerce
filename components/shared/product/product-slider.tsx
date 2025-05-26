"use client";

import
  {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
import { Product } from "@/lib/generated/prisma";
import ProductCard from "./product-card";

export default function ProductSlider({
  title,
  products,
  hideDetails = false,
}: {
  title?: string;
  products: Product[];
  hideDetails?: boolean;
}) {
  return (
    <div className="w-full  text-center p-4">
      <h1 className=" text-4xl text-primary mb-5">{title}</h1>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full p-3"
      >
        <CarouselContent className="p-4">
          {products.map((product) => (
            <CarouselItem
              key={product.slug}
              className={
              hideDetails
                ? "basis-5/6 sm:basis-1/2 md:basis-1/2 lg:basis-1/4 xl:basis-1/4 px-2 flex flex-col"
                : "basis-5/6 sm:basis-1/2 md:basis-1/2 lg:basis-1/4 xl:basis-1/4 px-2 flex flex-col"
              }>
              <ProductCard
              hideDetails={hideDetails}
              hideAddToCart
              product={product}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="right-0 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
}
