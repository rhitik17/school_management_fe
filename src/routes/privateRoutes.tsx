import ROUTES from "./routes";
import CreateSchool from "../pages/setup/createSchool";
import Dashboard from "../pages/dashboard";
import ListPost from "../pages/post/listPost";
import AddPost from "../pages/post/addPost";
import AssignClassTeacher from "../pages/assignClassTeacher";
import CreateSubjectGroup from "../pages/createSubjectGroup";

export const privateRoutes = [
  { path: ROUTES.DASHBOARD, element: <Dashboard /> },
  { path: ROUTES.CREATE_SCHOOL, element: <CreateSchool /> },
  //Academic Routes
  { path: ROUTES.ADD_SCHOOL, element: <AddPost postType="schools" /> },
  { path: ROUTES.LIST_SCHOOL, element: <ListPost postType="schools" /> },
  { path: ROUTES.ADD_SESSION, element: <AddPost postType="sessions" /> },
  { path: ROUTES.LIST_SESSION, element: <ListPost postType="sessions" /> },
  { path: ROUTES.ADD_CLASS, element: <AddPost postType="classes" /> },
  { path: ROUTES.LIST_CLASS, element: <ListPost postType="classes" /> },
  { path: ROUTES.ADD_SECTION, element: <AddPost postType="sections" /> },
  { path: ROUTES.LIST_SECTION, element: <ListPost postType="sections" /> },
  { path: ROUTES.ADD_SUBJECT, element: <AddPost postType="subjects" /> },
  { path: ROUTES.LIST_SUBJECT, element: <ListPost postType="subjects" /> },

  //Assign Routes
  { path: ROUTES.ASSIGN_CLASS_TEACHER, element: <AssignClassTeacher /> },
  { path: ROUTES.CREATE_SUBJECT_GROUP, element: <CreateSubjectGroup /> },

  //User Management Routes
  { path: ROUTES.ADD_STUDENT, element: <AddPost postType="students" /> },
  { path: ROUTES.LIST_STUDENT, element: <ListPost postType="students" /> },
  { path: ROUTES.ADD_EMPLOYEE, element: <AddPost postType="employees" /> },
  { path: ROUTES.LIST_EMPLOYEE, element: <ListPost postType="employees" /> },
];
