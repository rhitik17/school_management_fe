import ROUTES from "./routes";
import CreateSchool from "../pages/setup/createSchool";
import Dashboard from "../pages/dashboard";
import ListPost from "../pages/post/listPost";
import AddPost from "../pages/post/addPost";
import { PostType } from "../types/postType";
import AssignClassTeacher from "../pages/class-teacher/assignClassTeacher";
import ListClassTeacher from "../pages/class-teacher/listClassTeacher";

const generateCrudRoutes = (postType: PostType) => [
  { path: ROUTES.ADD(postType), element: <AddPost postType={postType} /> },
  { path: ROUTES.EDIT(postType), element: <AddPost postType={postType} /> },
  { path: ROUTES.LIST(postType), element: <ListPost postType={postType} /> },
];

export const privateRoutes = [
  { path: ROUTES.DASHBOARD, element: <Dashboard /> },
  { path: ROUTES.CREATE_SCHOOL, element: <CreateSchool /> },
  //Academic Routes
  ...generateCrudRoutes("schools"),
  ...generateCrudRoutes("academic-sessions"),
  ...generateCrudRoutes("classes"),
  ...generateCrudRoutes("sections"),
  ...generateCrudRoutes("subjects"),
  ...generateCrudRoutes("subject-groups"),
  ...generateCrudRoutes("students"),
  ...generateCrudRoutes("employees"),




  //Assign Routes
  { path: ROUTES.ASSIGN_CLASS_TEACHER, element: <AssignClassTeacher /> },
  { path: ROUTES.LIST_CLASS_TEACHER, element: <ListClassTeacher /> },



  //User Management Routes
];
