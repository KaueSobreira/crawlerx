import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="p-0 flex items-center justify-center bg-black ">
      <NavigationMenu>
        <NavigationMenuList className="flex space-x-4">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                to="/"
                className="text-xl text-white hover:text-emerald-300 focus:text-emerald-600"
              >
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                to="/script"
                className="text-xl text-white hover:text-emerald-300 focus:text-emerald-600"
              >
                Script
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                to="/api"
                className="text-xl text-white hover:text-emerald-300 focus:text-emerald-600"
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
