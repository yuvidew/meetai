import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./_components/dashboard-sidebar";
import { DashboardNavbar } from "./_components/dashboard-navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider >
            {/* start to dashboard side bar */}
            <DashboardSidebar/>
            {/* end to dashboard side bar */}

            {/* start to dashboard main content */}
                <main className="flex flex-col h-screen w-screen bg-muted">
                    {/* start to dashboard navbar */}
                    <DashboardNavbar/>
                    {/* end to dashboard navbar */}
                    {children}
                </main>
            {/* end to dashboard main content */}
        </SidebarProvider>
    );
}