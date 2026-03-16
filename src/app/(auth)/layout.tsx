import { Sidebar, Header, PageContent } from "@/components/shared";
import { NavigationProvider } from "@/context/NavigationContext";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NavigationProvider>
      <div className="h-screen flex flex-col bg-[#0d0f14]">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <PageContent>{children}</PageContent>
        </div>
      </div>
    </NavigationProvider>
  );
}