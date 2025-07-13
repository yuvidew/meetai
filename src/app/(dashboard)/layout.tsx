import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./_components/dashboard-sidebar";

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
            <main className="flex flex-col h-screen w-screen bg-muted">
                {children}
            </main>
        </SidebarProvider>
    );
}