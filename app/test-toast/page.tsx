'use client'
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


const HomePage = () => {
    const handleClick = () => {
      console.log("test")
        toast.error('Đây là một thông báo toast!');
      };
  return (
    <div>
      <h1>Trang Chính</h1>
      <Button onClick={handleClick}>
      Hiển thị Toast
    </Button>
    </div>
  );
};

export default HomePage;
