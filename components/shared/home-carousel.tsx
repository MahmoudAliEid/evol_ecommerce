'use client';
import
  {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
  } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "../ui/button";
const HomeCarousel = (
  { carousels }: {
    carousels: {
      title: string;
      buttonCaption: string;
      image: string;
      url: string;
      isPublished?: boolean;
    }[];
  }
) =>
{
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full  min-h-[220px] sm:min-h-[260px] md:min-h-[320px] lg:min-h-[400px] xl:min-h-[480px] 2xl:min-h-[600px] p-0 m-0 "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}>
      <CarouselContent className="w-full p-0 m-0">
        {carousels.map((item) => (
          <CarouselItem key={item.title}>
            <Link href={item.url}>
              <div className="flex aspect-[16/6] p-6 items-center justify-center relative w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="object-cover"
                  priority
                  fill
                />
                <div className="absolute -translate-y-1/2 left-16 md:left-32 top-1/2 w-1/3 flex -m-1 items-center justify-center">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold md:text-6xl text-primary">
                      {item.title}
                    </h1>
                    <Button
                      variant="default"
                      className=" w-30 dark:text-white hidden md:block ">
                      {item.buttonCaption}
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className=" md:left-12 dark:bg-gray-400 dark:hover:bg-gray-400/70" />
      <CarouselNext className=" md:right-12 dark:bg-gray-400 dark:hover:bg-gray-400/70" />
    </Carousel>
  );
}

export default HomeCarousel
