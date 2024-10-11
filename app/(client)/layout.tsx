interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      {children}
    </main>
  );
};

export default ClientLayout;
