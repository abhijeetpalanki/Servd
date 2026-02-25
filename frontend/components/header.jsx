import { Cookie, Refrigerator } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import UserDropdown from "./user-dropdown";
import { checkUser } from "@/lib/check-user";

const Header = async () => {
  const user = await checkUser();

  return (
    <header className="fixed top-0 w-full border-b border-stone-200 bg-stone-50/80 backdrop-blur-md z-50 supports-backdrop-blur:bg-stone-50/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={user ? "/dashboard" : "/"}>
          <Image src="/logo.png" alt="Servd Logo" width={50} height={50} />
        </Link>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-stone-600">
          <Link
            href="/recipes"
            className="hover:text-red-600 transition-colors flex gap-1.5 items-center"
          >
            <Cookie className="w-4 h-4" />
            My Recipes
          </Link>
          <Link
            href="/pantry"
            className="hover:text-red-600 transition-colors flex gap-1.5 items-center"
          >
            <Refrigerator className="w-4 h-4" />
            My Pantry
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <SignedIn>
            {/* How to Cook? */}
            <UserDropdown />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className="text-stone-600 hover:text-red-600 hover:bg-red-50 font-medium cursor-pointer"
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button
                variant="primary"
                className="rounded-full px-6 cursor-pointer"
              >
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;
