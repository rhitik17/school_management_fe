import Footer from "../global/Footer";
import Header from "../global/Header";
import Sidebar from "../global/Sidebar";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/userStore";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { userData } = useAuthStore();
  const navigate = useNavigate();

  const handleCreateSchool = () => {
    navigate("/create-school");
  };

  return (
    <div className="flex w-screen h-screen bg-primary_bg ">
      {/* Sidebar - Fixed Width */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 ml-64">
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-4 overflow-auto bg-white rounded-xl">
          {!userData && (
            <div className="flex items-center justify-between h-12 px-8 bg-secondary-300 rounded-xl">
              <h2>Please fill your school details</h2>
              <Button
                text="Create School"
                className="h-8 px-3 py-1"
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
