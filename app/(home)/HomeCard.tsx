import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type CardItem = {
  title: string;
  link: { text: string; href: string };
  items: {
    name: string;
    items?: string[];
    image: string;
    href: string;
  }[];
};

const HomeCard = ({ cards }: { cards: CardItem[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card
          key={index}
          className="flex flex-col">
          <CardContent className="p-4 flex-1">
            <h2 className="text-2xl text-primary font-bold mb-4">
              {card.title}
            </h2>
            <div className="grid grid-col-2 sm:grid-cols-2 md:grid-cols-2 gap-4">
              {card.items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}>
                  
                    <div className="flex border rounded-md flex-col items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={120}
                        height={120}
                        className="mx-auto aspect-square object-scale-down max-w-full h-auto  mr-4 rounded"
                      />
                      <p className="text-center text-sm  max-w-[120px] truncate">
                        {item.name}
                      </p>
                    </div>
                  
                </Link>
              ))}
            </div>
          </CardContent>
          {card.link && (
            <CardFooter>
              <Link
                href={card.link.href}
                          >
                          <Button
                              variant="default"
                              className=" hover:bg-primary/90 text-sm w-full dark:text-white"
                          >
                              
                {card.link.text}
                          </Button>
              </Link>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
};

export default HomeCard;
