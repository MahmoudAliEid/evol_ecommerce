"use client";

import { ShoppingCartIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';

const Menu = () => {
  return (
    <div className="flex justity-end">
          <nav className="flex gap-3 w-full">
              {/* TODO: add toggle mood button */}
        <Link
          className="text-sm bg-primary text-primary-foreground rounded-md px-4 py-2 hover:bg-primary/90"
          href={"/cart"}>
          <UserIcon className="h-8 w-8" />
          <span className="sr-only font-bold">Login</span>
        </Link>
        <Link
          href={"/cart"}
          className="text-sm bg-primary text-primary-foreground rounded-md px-4 py-2 hover:bg-primary/90">
          <ShoppingCartIcon className="h-8 w-8" />
          <span className="sr-only font-bold"> Cart</span>
        </Link>
      </nav>
    </div>
  );
}

export default Menu;
