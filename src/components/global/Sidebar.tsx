import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icons } from "../../assets/icons";
import { useAuthStore } from "../../stores/tokenStore";

const navSections = [
  {
    heading: "Dashboard",
    items: [
      {
        name: "Dashboard",
        icon: <Icons.Home size={20} />,
        path: "/dashboard",
      },
    ],
  },
  {
    heading: "Academics",
    items: [
      {
        name: "Sessions",
        icon: <Icons.Calender size={20} />,
        path: "/sessions",
      },
      {
        name: "Classes",
        icon: <Icons.Calender size={20} />,
        path: "/classes",
      },
      {
        name: "Sections",
        icon: <Icons.Calender size={20} />,
        path: "/sections",
      },
      {
        name: "Subjects",
        icon: <Icons.Calender size={20} />,
        path: "/subjects",
      },
      {
        name: "Assign Class Teacher",
        icon: <Icons.Calender size={20} />,
        path: "/assign-class-teacher",
      },
      {
        name: "Assign Subject",
        icon: <Icons.Calender size={20} />,
        path: "/assign-subject",
      },
    ],
  },
  {
    heading: "Students",
    items: [
      {
        name: "Students Info",
        icon: <Icons.User size={20} />,
        path: "/students",
      },
    ],
  },
  {
    heading: "Employees",
    items: [
      {
        name: "Employees Info",
        icon: <Icons.User size={20} />,
        path: "/employees",
      },
    ],
  },
];

export default function Sidebar() {
  const location = useLocation();
  const { userData } = useAuthStore();
  const navigate = useNavigate();

  return (
    <aside className="h-screen w-64 bg-primary_bg fixed left-0 top-0 flex flex-col justify-between">
      <div className="space-y-8">
        {/* Logo / App Name */}
        <div
          className="px-6 pt-4 h-20 flex items-center cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <img src="/images/newLogo.png" alt="App Logo" />
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-6 ">
          {navSections.map((section) => (
            <div key={section.heading}>
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wide">
                {section.heading}
              </h3>
              {section.items.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 text-sm transition-all ${
                    location.pathname.startsWith(item.path)
                      ? "bg-primary-100 text-primary-500 font-semibold"
                      : "text-gray-600 hover:bg-blue-100"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="px-6 h-12 border-t flex items-center border-gray-200">
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
