
interface CreateServicesLayoutProps {
  children: React.ReactNode;
}

const CreateServicesLayout = ({ children }: CreateServicesLayoutProps) => {
  return (
    <div className="space-y-2">
      <div className="bg-gray-100 dark:bg-muted/40 min-h-screen p-4 md:p-6 rounded-md min-w-full">
        {children}
      </div>
    </div>
  );
};

export default CreateServicesLayout;
