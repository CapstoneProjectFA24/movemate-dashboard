import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  className?: string;
}

export const CurrencyInput = ({
  value,
  onChange,
  placeholder = "Nhập số tiền",
  className = ""
}: CurrencyInputProps) => {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    // Cập nhật giá trị hiển thị khi value thay đổi từ bên ngoài
    setDisplayValue(value ? formatter.format(value) : "");
  }, [value]);

  return (
    <Input
      type="text"
      value={displayValue}

      onChange={(e) => {
        // Chỉ lấy số từ input
        const rawValue = e.target.value.replace(/[^0-9]/g, '');
        const numberValue = parseInt(rawValue, 10) || 0;
        
        // Cập nhật giá trị thô cho form
        onChange(numberValue);
        
        // Cập nhật giá trị hiển thị đã format
        setDisplayValue(numberValue === 0 ? '' : formatter.format(numberValue));
      }}
      onFocus={(e) => {
        // Khi focus, hiển thị giá trị số thuần túy
        setDisplayValue(value === 0 ? '' : value.toString());
      }}
      onBlur={(e) => {
        // Khi blur, format lại giá trị
        setDisplayValue(value === 0 ? '' : formatter.format(value));
      }}
      placeholder={placeholder}
      className={`text-left ${className}`}
    />
  );
};