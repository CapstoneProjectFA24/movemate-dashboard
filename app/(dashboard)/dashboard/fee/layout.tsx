interface FeeLayoutProps {
  children: React.ReactNode;
}

const FeeLayout = ({ children }: FeeLayoutProps) => {
  return (
    <div className="bg-gray-100 dark:bg-muted/40 min-h-screen p-4 md:p-6 rounded-md flex flex-col flex-grow flex-shrink">
      {children}
    </div>
  );
};

export default FeeLayout;
