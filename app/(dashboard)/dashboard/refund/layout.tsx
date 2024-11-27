interface SettingLayoutProps {
  children: React.ReactNode;
}

const SettingLayout = ({ children }: SettingLayoutProps) => {
  return (
    <div className="bg-gray-100 dark:bg-muted/40 min-h-screen p-4 md:p-6 rounded-md">
      {children}
    </div>
  );
};

export default SettingLayout;
