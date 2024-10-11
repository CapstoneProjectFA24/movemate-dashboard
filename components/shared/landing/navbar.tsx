import Link from "next/link";
import Image from "next/image"; 
import MaxWidthWrapper from "./max-width-wrapper";
import { ModeToggle } from "../navbar/mode-toggle";

const Navbar = () => {
  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all dark:bg-gray-800 dark:border-gray-600">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200 dark:border-zinc-700">
          <Link href="/" className="flex z-40 font-semibold">
            <Image
              src="/images/icons_favicon/icon.png"
              alt="Logo"
              width={56}
              height={56}
              className="hidden sm:block lg:hidden xl:block rounded-full"
            />
          </Link>

          <div className="h-full flex items-center space-x-4">
            <span className="text-gray-800 dark:text-gray-200">
              Hotline: 0382703625
            </span>
            <ModeToggle />
            <Link href="/sign-in">
              <button className="px-4 py-2 text-white bg-orange-600 rounded-md hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600">
                Đăng nhập
              </button>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
