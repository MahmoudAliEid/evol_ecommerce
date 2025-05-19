"use client";

import { Button } from "@/components/ui/button";
import { LogInIcon, ShoppingCartIcon } from "lucide-react";

const Menu = ({ className }: { className: string }) => {
  return (
    <div className={`${className} justity-end`}>
      <nav className="flex gap-3 w-full">
        <Button className="text-sm bg-primary text-primary-foreground rounded-md px-4 py-2 hover:bg-primary/90">
          <LogInIcon className="h-4 w-4" />
        </Button>
        <Button className="text-sm bg-primary text-primary-foreground rounded-md px-4 py-2 hover:bg-primary/90">
          <ShoppingCartIcon className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  );
};

export default Menu;
