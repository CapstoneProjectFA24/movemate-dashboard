import { Navbar } from "@/components/shared/navbar/navbar";
import { Sidebar } from "@/components/shared/sidebar/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
        <Sidebar />
      </div>
      <div className="lg:pl-[264px] flex flex-col w-full">
        {/* Navbar sẽ được cố định */}
        <div className="fixed top-0 left-0 right-0 lg:left-[264px] z-50">
          <Navbar />
        </div>
        {/* Tạo khoảng trống cho content sau Navbar */}
        <div className="pt-20 w-full">
          <div className="mx-auto max-w-screen-3xl h-full">
            <main className="h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
