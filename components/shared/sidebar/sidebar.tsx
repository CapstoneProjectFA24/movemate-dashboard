import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Navigation } from "./navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-white dark:bg-gray-800 border-r flex flex-col shadow-sm dark:border-gray-600">
      <div className="p-5">
        <Link href="/" className="flex items-center gap-2 hover:opacity-75 transition">
          <Image
            src="/images/icons_favicon/icon.png"
            alt="Logo"
            width={32}
            height={32}
            className="rounded-md"
          />
          <h1 className="font-semibold text-xl text-black dark:text-white">Movemate</h1>
        </Link>
      </div>
      <Separator className="my-[7.2px] border-b-2 border-gray-300 dark:border-gray-600" />
      <ScrollArea className="flex-1 px-4">
        <Navigation />
      </ScrollArea>
      <div className="p-4 mt-auto">
        <div className="flex items-center gap-3 py-3 px-4 rounded-lg bg-neutral-50 dark:bg-gray-700 border dark:border-gray-600">
          <div className="relative w-10 h-10">
            <Image
              src="/api/placeholder/32/32"
              alt="User avatar"
              className="rounded-full object-cover"
              fill
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-black dark:text-white">John Doe</span>
            <span className="text-xs text-muted-foreground dark:text-gray-300">john@example.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
