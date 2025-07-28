import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icons } from "../../assets/icons";

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
        path: "/academic-sessions",
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
        name: "Create Subject Group",
        icon: <Icons.Calender size={20} />,
        path: "/create-subject-group",
      },
      {
        name: "Assign Class Teacher",
        icon: <Icons.Calender size={20} />,
        path: "/assign-class-teacher",
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
  const navigate = useNavigate();

  return (
    <aside className="fixed top-0 left-0 flex flex-col justify-between w-64 h-screen bg-primary_bg">
      <div className="space-y-8">
        {/* Logo / App Name */}
        <div
          className="flex items-center h-20 px-6 pt-4 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <img src="/images/newLogo.png" alt="App Logo" />
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-6 ">
          {navSections.map((section) => (
            <div key={section.heading}>
              <h3 className="px-4 mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
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
      <div className="flex items-center h-12 px-6 border-t border-gray-200">
        <button
          className="flex items-center gap-2 text-sm text-red-500 transition-all hover:text-red-600"
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
