import { useAuthStore } from "../../stores/tokenStore";
import Footer from "../global/Footer";
import Header from "../global/Header";
import Sidebar from "../global/Sidebar";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { userData } = useAuthStore();
  const navigate = useNavigate();

  const handleCreateSchool = () => {
    navigate("/create-school");
  };

  return (
    <div className="flex h-screen w-screen bg-primary_bg ">
      {/* Sidebar - Fixed Width */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 ml-64">
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 rounded-xl bg-white">
          {!userData?.user?.schoolId && (
            <div className="flex justify-between bg-secondary-300 items-center rounded-xl px-8 h-12">
              <h2>Please fill your school details</h2>
              <Button
                text="Create School"
                className="px-3 py-1 h-8"
                variant="primary"
                action={handleCreateSchool}
              />
            </div>
          )}
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
