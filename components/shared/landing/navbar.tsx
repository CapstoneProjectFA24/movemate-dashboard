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
            <a className="text-2xl font-bold text-orange-600 flex items-center">
              MoveMate
            </a>
            <Image
              src="/images/icons_favicon/icon.png"
              alt="Logo"
              width={56}
              height={56}
              className="hidden sm:block lg:hidden xl:block rounded-full"
            />
          </Link>

          <div className="h-full flex items-center space-x-8">
                <div className="flex justify-between h-16">
                  <div className="hidden md:flex items-center space-x-4">
                    {/* Navigation menu */}
                    <Link href="/about" legacyBehavior>
                      <a className="text-gray-800 dark:text-gray-200 hover:text-orange-600">
                        Về chúng tôi
                      </a>
                    </Link>
                    <Link href="/services" legacyBehavior>
                      <a className="text-gray-800 dark:text-gray-200 hover:text-orange-600">
                        Dịch vụ
                      </a>
                    </Link>
                    <Link href="/pricing" legacyBehavior>
                      <a className="text-gray-800 dark:text-gray-200 hover:text-orange-600">
                        Bảng giá
                      </a>
                    </Link>
                    <Link href="/contact" legacyBehavior>
                      <a className="text-gray-800 dark:text-gray-200 hover:text-orange-600">
                        Liên hệ
                      </a>
                    </Link>
                  </div>
                  <div className="flex items-center md:hidden">
                    {/* Mobile menu button */}
                    <button
                      type="button"
                      className="text-gray-800 dark:text-gray-200 hover:text-orange-600"
                      aria-expanded="false"
                    >
                      {/* Icon for mobile menu */}
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16m-7 6h7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
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
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
