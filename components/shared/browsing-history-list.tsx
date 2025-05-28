"use client";

import useBrowsingHistory from "@/hooks/use-browing-history";
import { cn } from "@/lib/utils";
import React from "react";
import { Separator } from "../ui/separator";
import ProductSlider from "./product/product-slider";

export default function BrowsingHistoryList({
  className,
}: {
  className?: string;
}) {
  const { products } = useBrowsingHistory();
  console.log('BrowsingHistoryList: Current products', products);
  return (
    <>
      {products.length !== 0 && (
        <div className="bg-background">
          <Separator className={cn("mb-4", className)} />
          <ProductList
            title={`Related to items that you've viewed`}
            type="related"
          />
          <Separator className={"my-4"} />
          <ProductList
            title={"Your browsing history"}
            type="history"
            hideDetails
          />
        </div>
      )}
    </>
  );
}

function ProductList({
  title,
  type,
  hideDetails = false,
}: {
  title: string;
  type: "related" | "history";
  hideDetails?: boolean;
}) {
  const { products } = useBrowsingHistory();
    const [data, setData] = React.useState([]);    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Don't fetch if there are no products to fetch
                if (products.length === 0) {
                    console.log('ProductList: No products in history, skipping fetch');
                    return;
                }
                
                const response = await fetch(`/api/products/browsing-history?type=${type}&categories=${products.map(p => p.category).join(",")}&ids=${products.map(p => p.id).join(",")}`);
                
                if (!response.ok) {
                    console.error('ProductList: API error', response.status);
                    return;
                }
                
                const result = await response.json();
                console.log('ProductList: API response', result);
                setData(Array.isArray(result) ? result : (result.products || []));
            } catch (error) {
                console.error('ProductList: Error fetching products', error);
            }
        };
        fetchProducts();
    }, [products, type]);

    console.log('ProductList: Fetched products', data);
    return (
        <>
      {data.length > 0 && (
          <ProductSlider products={data}
              title={title}
              hideDetails={hideDetails}
          />)}
        </>
        )
    
}
