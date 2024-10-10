import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  return (
    <section
      className="flex items-center justify-center min-h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/container-truck-ship-port-ai-generated-image_511042-612.jpg')`,
      }}
    >
      <div className="w-full max-w-4xl bg-white bg-opacity-45 rounded-3xl shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-lg">
          <div className="hidden lg:block">
            <div className="relative w-full h-full p-14">
              <Image
                src="/LoginImg.png"
                alt="Login Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center p-10">
            <div className="mt-8 space-y-4 text-center">
              <h3 className="text-4xl font-semibold text-gray-800 tracking-tight">
                Đăng nhập
              </h3>
              <p className="text-lg text-gray-600 font-bold">
                Chào mừng đến với MoveMate!
              </p>
            </div>
            <form className="mt-10 space-y-6 max-w-xl m-4 min-w-full">
              <div>
                <label
                  htmlFor="username"
                  className="block text-base font-bold text-gray-700 mb-1"
                >
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-150 ease-in-out"
                  placeholder="Nhập tên đăng nhập"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-base font-bold text-gray-700 mb-1"
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-150 ease-in-out"
                  placeholder="Nhập mật khẩu"
                />
              </div>
              <div className="mt-8 text-center space-y-4">
                <button
                  type="submit"
                  className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#F4721E] hover:bg-[#e66a1b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out"
                >
                  Đăng nhập
                </button>
                <Link
                  href="/"
                  className="inline-block text-[#F4721E] hover:text-[#e66a1b] font-medium transition duration-150 ease-in-out"
                >
                  Trang chủ
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
