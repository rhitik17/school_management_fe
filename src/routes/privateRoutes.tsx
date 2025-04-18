import ROUTES from "./routes";
import CreateSchool from "../pages/setup/createSchool";
import Dashboard from "../pages/dashboard";
import ListPost from "../pages/post/listPost";
import AddPost from "../pages/post/addPost";

export const privateRoutes = [
  { path: ROUTES.DASHBOARD, element: <Dashboard /> },
  { path: ROUTES.CREATE_SCHOOL, element: <CreateSchool /> },
  { path: ROUTES.ADD_SCHOOL, element: <AddPost postType="schools" /> },
  { path: ROUTES.LIST_SCHOOL, element: <ListPost postType="schools" /> },
  { path: ROUTES.ADD_SESSION, element: <AddPost postType="sessions" /> },
  { path: ROUTES.LIST_SESSION, element: <ListPost postType="sessions" /> },
  { path: ROUTES.ADD_SECTION, element: <AddPost postType="sections" /> },
  { path: ROUTES.LIST_SECTION, element: <ListPost postType="sections" /> },
];
