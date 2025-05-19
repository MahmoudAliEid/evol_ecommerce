"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import data from "@/lib/data";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Search from "./Search";
import DropdownHeader from "./dropdownHeader";
import Menu from "./menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClass = isScrolled
    ? "sticky top-0 left-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
    : "bg-white dark:bg-black transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]";

  return (
    <div
      className={`${headerClass} z-50 border-b`}
      style={{
        backdropFilter: isScrolled ? "blur(8px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(8px)" : "none",
      }}>
      <header className="flex justify-between border-b items-center p-4">
        {/* LOGO */}
        <div className="flex items-center gap-2 justify-between">
          <h1 className="text-1xl font-bold">EVOL</h1>
          {/* SEARCH BAR */}
        </div>
        <Search className="hidden md:flex" />
        {/* User & Card */}
        <Menu className="hidden md:flex" />

        {/* Mobile toggle Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="md:hidden flex items-center justify-center">
            <Button
              className="md:hidden block"
              variant="outline">
              <AlignJustify className="h-4 w-4" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownHeader />
        </DropdownMenu>
      </header>

      <nav className="p-1 border-b hidden md:flex md:items-center">
        {/* MENU */}
        <NavigationMenu className="flex items-center gap-4">
          <NavigationMenuList>
            {data.headerMenus.map((category) => (
              <NavigationMenuItem
                className="border-1 rounded-md"
                key={category.name}>
                <NavigationMenuLink asChild>
                  <Link
                    href={`${category.href}`}
                    className={navigationMenuTriggerStyle()}>
                    {category.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  );
};

export default Header;
