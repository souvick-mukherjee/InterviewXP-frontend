"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import Container from "./ui/container";
import { Button } from "./ui/button";
import { Menu, Moon, ShoppingCart, Sun } from "lucide-react";
import ProfileButton from "./ui/ProfileButton";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { setUser, clearUser } from "@/lib/features/user/userSlice";
import { usePathname } from "next/navigation";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname(); // Get the current pathname

  const user = useSelector((state: RootState) => state.user);

  // Define the routes where the profile or login/signup should be hidden
  const hiddenRoutes = ['/register', '/login', '/forgot-password', '/reset-password', '/authenticate'];

  const shouldHideProfileOrLogin = hiddenRoutes.includes(pathname);

  const routes = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="sm:flex sm:justify-between py-3 px-4 border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 md:hidden w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {routes.map((route, i) => (
                    <Link
                      key={i}
                      href={route.href}
                      className="block px-2 py-1 text-lg"
                    >
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="ml-4 lg:ml-0">
              <h1 className="text-xl font-bold">InterviewXP</h1>
            </Link>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              className="mr-6"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle Theme</span>
            </Button>
            {!shouldHideProfileOrLogin && (
              user.id ? (
                <ProfileButton />
              ) : (
                <div className="flex gap-x-2">
                  <Button asChild><Link href='/authenticate'>Login</Link></Button>
                </div>
              )
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
