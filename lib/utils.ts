import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumberWithDecimal = (num: number): string => {
  const [integerPart, decimalPart] = num.toString().split(".");
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );
  return decimalPart
    ? `${formattedIntegerPart}.${decimalPart.padEnd(2, "0")}`
    : formattedIntegerPart;
};

export const toSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const formatPrice = (price: number): string => {
  return `$${formatNumberWithDecimal(price)}`;
};
const CURRENCY_FORMAT = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
export const formatCurrency = (price: number): string => {
  return CURRENCY_FORMAT.format(price);
};

const NumberFormat = new Intl.NumberFormat("en-US");

export const formatNumber = (num: number): string => {
  return NumberFormat.format(num);
};


