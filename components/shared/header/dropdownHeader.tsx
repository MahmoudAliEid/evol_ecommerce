import
    {
        DropdownMenuContent,
        DropdownMenuGroup,
        DropdownMenuItem,
        DropdownMenuSeparator
    } from "@/components/ui/dropdown-menu";
import data from "@/lib/data";
import Link from "next/link";
import Menu from "./menu";

const DropdownHeader = () => {
  return (
    <DropdownMenuContent align="center" className=" w-full px-4 py-2">
      <DropdownMenuGroup>
        {data.headerMenus.map((category) => (
          <DropdownMenuItem key={category.name}>
            <Link href={`${category.href}`} className="flex items-center gap-2">
              {category.name}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Menu className="flex text-white" />
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
};

export default DropdownHeader;
