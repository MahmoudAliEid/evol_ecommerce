"use client";
import { cn, formatCurrency } from "@/lib/utils";

const round2 = (num: number) =>
{
    return Math.round(num * 100) / 100;
}
    

const ProductPrice = ({
  price,
  className,
  listPrice = 0,
  isDeal = false,
  forListing = true,
  plain = false,
}: {
  price: number;
  isDeal?: boolean;
  listPrice?: number;
  className?: string;
  forListing?: boolean;
  plain?: boolean;
}) => {

    const convertedPrice = round2(price);
    const convertedListPrice = round2(listPrice);

  const discountPercent = Math.round(
    100 - (convertedPrice / convertedListPrice) * 100
  );
  const stringValue = convertedPrice.toString();
  const [intValue, floatValue] = stringValue.includes(".")
    ? stringValue.split(".")
    : [stringValue, ""];

  return plain ? (
    formatCurrency(convertedPrice)
  ) : convertedListPrice == 0 ? (
    <div className={cn("text-3xl", className)}>
      <span className="text-xs align-super">$</span>
      {intValue}
      <span className="text-xs align-super">{floatValue}</span>
    </div>
  ) : isDeal ? (
    <div className="space-y-2">
      <div className="flex justify-center items-center gap-2">
        <span className="bg-red-700 rounded-md p-1 text-white text-sm font-semibold">
          {discountPercent}% Off
        </span>
        <span className="text-red-700 text-xs font-bold">
          Limited time deal
        </span>
      </div>
      <div
        className={`flex ${forListing && "justify-center"} items-center gap-2`}>
        <div className={cn("text-3xl", className)}>
          <span className="text-xs align-super">$</span>
          {intValue}
          <span className="text-xs align-super">{floatValue}</span>
        </div>
        <div className="text-muted-foreground text-xs py-2">
          Was:{" "}
          <span className="line-through">
            {formatCurrency(convertedListPrice)}
          </span>
        </div>
      </div>
    </div>
  ) : (
    <div className="">
      <div className="flex justify-center gap-3">
        <div className="text-3xl text-orange-700">-{discountPercent}%</div>
        <div className={cn("text-3xl", className)}>
          <span className="text-xs align-super">$</span>
          {intValue}
          <span className="text-xs align-super">{floatValue}</span>
        </div>
      </div>
      <div className="text-muted-foreground text-xs py-2">
        List price:{" "}
        <span className="line-through">
            {formatCurrency(convertedListPrice)}
        </span>
      </div>
    </div>
  );
};

export default ProductPrice;
