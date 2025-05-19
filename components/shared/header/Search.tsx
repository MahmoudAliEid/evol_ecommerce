import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import
    {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
    } from "@/components/ui/select";
import { APP_NAME } from "@/lib/constants";
import { SearchIcon } from "lucide-react";

const categories = ["mens", "womens", "kids", "accessories"];
const Search = () => {
    return (
      <form
        action={"/search"}
        method="GET"
        className="flex flex-col items-stretch h-10 justify-center gap-4">
        <Select name="category">
          <SelectTrigger className="w-auto flex items-center justify-center gap-2 border-r rounded-r-none rounded-l-md">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {categories.map((category) => (
              <SelectItem
                key={category}
                value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center justify-center">
          <Input
            type="text"
            placeholder={`Search for products on ${APP_NAME}`}
                    className=" border-r rounded-r-none rounded-l-md p-2 w-full max-w-xs"
          />
          <Button type="submit" className="bg-primary text-primary-foreground rounded-l-none  px-4 py-2 hover:bg-primary/90">
           <SearchIcon className="h-4 w-4" />
            <span className="sr-only font-bold">Search</span>
          </Button>
        </div>
      </form>
    );
};

export default Search;
