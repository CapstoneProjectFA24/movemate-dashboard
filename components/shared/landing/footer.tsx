import Link from "next/link";
import MaxWidthWrapper from "./max-width-wrapper";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 h-20 relative">
      <MaxWidthWrapper>
        <div className="border-t border-gray-200 dark:border-gray-600" />

        <div className="h-full flex flex-col md:flex-row md:justify-between justify-center items-center">
          <div className="text-center md:text-left pb-2 md:pb-0">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              &copy; {new Date().getFullYear()} MoveMate
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex space-x-8">
              <Link
                href="#"
                className="text-sm text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400"
              >
                Điều khoản
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400"
              >
                Chính sách bảo mật
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400"
              >
                Chính sách Cookie
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
