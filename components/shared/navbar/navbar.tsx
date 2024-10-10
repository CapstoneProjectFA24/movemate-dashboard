import { MobileSidebar } from "../sidebar/mobile-sidebar";

export const Navbar = () => {
  return (
    <nav className="bg-white  px-6 flex items-center justify-between h-20 border-b-2 my-[1px] border-gray-300 ">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-bold ">Trang quản lý</h1>
        <p className="text-muted-foreground">Vinh</p>
      </div>
      <MobileSidebar />
      <div className="flex justify-between space-x-10">
        <span>button</span>
        <span>button</span>
        <span>button</span>
      </div>
    </nav>
  );
};
