import HomeCarousel from "@/components/shared/home-carousel";
// import ProductPrice from "@/components/shared/product/product-price";
// import Rating from "@/components/shared/product/Ratting";
import ProductSlider from "@/components/shared/product/product-slider";
import {
  getAllCategories,
  getProductByTag,
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
  const todaysDeals = await getProductByTag({
    tag: "todays-deal",
  });

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-black ">
      <HomeCarousel carousels={data.carousels} />
      <div className="w-full px-2 md:px-4 py-4 space-y-4 flex flex-col items-center">
        <div className="w-full max-w-7xl">
          <HomeCard cards={cards} />
        </div>
        <div className="w-full max-w-7xl">
          <div className="p-2 md:p-4 flex flex-col items-center gap-3">
            <ProductSlider
              title="Today's Deals"
              products={todaysDeals}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
