"use client";

import ModeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { LogInIcon, ShoppingCartIcon } from "lucide-react";

const Menu = ({ className }: { className: string }) => {
  return (
    <div className={`${className} justity-end`}>
      <nav className="flex gap-3 w-full">
        <ModeToggle />
        <Button className="text-sm bg-primary text-primary-foreground rounded-md px-4 py-2 hover:bg-primary/90">
          <LogInIcon className="h-4 w-4 dark:text-white" />
        </Button>
        <Button className="text-sm bg-primary text-primary-foreground rounded-md px-4 py-2 hover:bg-primary/90">
          <ShoppingCartIcon className="h-4 w-4  dark:text-white" />
        </Button>
      </nav>
    </div>
  );
};

export default Menu;
