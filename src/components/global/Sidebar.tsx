import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icons } from "../../assets/icons";
import { useAuthStore } from "../../stores/tokenStore";

const navItems = [
  { name: "Dashboard", icon: <Icons.Home size={20} />, path: "/dashboard" },
  { name: "Schools", icon: <Icons.School size={20} />, path: "/schools" },
  { name: "Sessions", icon: <Icons.Calender size={20} />, path: "/sessions" },
  { name: "Classes", icon: <Icons.Calender size={20} />, path: "/classes" },
  // { name: "Sections", icon: <Icons.User size={20} />, path: "/sections" },
  { name: "Students", icon: <Icons.User size={20} />, path: "/students" },
  { name: "Employees", icon: <Icons.User size={20} />, path: "/employees" },


];

export default function Sidebar() {
  const location = useLocation();
  const { userData } = useAuthStore();
  const navigate = useNavigate();

  return (
    <aside className="h-screen w-64 bg-primary_bg  fixed left-0 top-0 flex flex-col  justify-between">
      <div className="space-y-8">
        {/* Logo / App Name */}
        <div className="px-6 pt-4 h-20 flex items-center cursor-pointer" onClick={()=>navigate("/dashboard")} >
          <img src="/images/newLogo.png" alt="" />
          {/* <h1 className="text-2xl font-bold text-blue-600">
            {userData?.user.role}
          </h1> */}
        </div>

        {/* Navigation Links */}
        <nav className=" space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium hover:bg-blue-100 transition-all ${
                location.pathname.startsWith(item.path)
                  ? "bg-primary-100 text-primary-500 font-semibold"
                  : "text-gray-600"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="px-6 h-10 border-t flex items-center border-gray-200">
        <button
          className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-all"
          onClick={() => {
            // Handle logout logic here
          }}
        >
          <Icons.FileUpload size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
