interface PageContentProps {
  children: React.ReactNode;
}

export default function PageContent({ children }: PageContentProps) {
  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 sm:pb-6 text-white">
      {children}
    </main>
  );
}