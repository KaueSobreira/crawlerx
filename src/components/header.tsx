import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <div className="p-0 flex items-center justify-center">
      <NavigationMenu>
        <NavigationMenuList className="flex space-x-4">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                to="/"
                className={cn(
                  "text-sm font-medium text-zinc-800 dark:text-white hover:underline"
                )}
              >
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                to="/script"
                className={cn(
                  "text-sm font-medium text-zinc-800 dark:text-white hover:underline"
                )}
              >
                Script
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                to="/api"
                className={cn(
                  "text-sm font-medium text-zinc-800 dark:text-white hover:underline"
                )}
              >
                API
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Header;
