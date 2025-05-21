import HomeCarousel from "@/components/shared/home-carousel";
import {
  getAllCategories,
  getProductsForCard,
} from "@/lib/actions/product-actions";
import data from "@/lib/data";
import { toSlug } from "@/lib/utils";
import HomeCard from "./HomeCard";
export default async function Home() {
  const categories = (await getAllCategories()).slice(0, 4);
  const newArrivals = await getProductsForCard({
    tag: "new-arrival",
  });
  const features = await getProductsForCard({
    tag: "featured",
  });
  const bestSellers = await getProductsForCard({
    tag: "best-seller",
  });
  const cards = [
    {
      title: "Categories to explore",
      link: {
        text: "See More",
        href: "/search",
      },
      items: categories.map((categoryObj) => ({
        name: categoryObj.category,
        image: `/images/${toSlug(categoryObj.category)}.jpg`,
        href: `/search?category=${categoryObj.category}`,
      })),
    },
    {
      title: "Explore New Arrivals",
      items: newArrivals,
      link: {
        text: "View All",
        href: "/search?tag=new-arrival",
      },
    },
    {
      title: "Discover Best Sellers",
      items: bestSellers,
      link: {
        text: "View All",
        href: "/search?tag=new-arrival",
      },
    },
    {
      title: "Featured Products",
      items: features,
      link: {
        text: "Shop Now",
        href: "/search?tag=new-arrival",
      },
    },
  ];
  console.log(cards);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <HomeCarousel carousels={data.carousels} />
      <div className="md:p-4  md:space-y-4">
        <HomeCard cards={cards} />
      </div>
    </div>
  );
}
