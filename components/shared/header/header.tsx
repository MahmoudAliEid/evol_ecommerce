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
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClass = isScrolled
    ? " bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-xl"
    : "bg-white dark:bg-black ";

  return (
    <div
      className={`fixed  top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${headerClass}`}>
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
