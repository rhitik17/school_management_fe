import Footer from "../global/Footer";
import Header from "../global/Header";
import Sidebar from "../global/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen bg-primary_bg ">
      {/* Sidebar - Fixed Width */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 ml-64">
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 rounded-xl bg-white">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
