const ROUTES = {
  // authentication routes
  LOGIN: "/login",
  SIGNUP: "/register",
  FORGOTPASSWORD: "/forgot-password",
  SetNEWPASSWORD: "/set-password/:input",
  OTPVERIFY: "otp-verify",
  VERIFYFORGOTPASSWORDOTP: "otp-verify/:id",

  // private routes
  DASHBOARD: "/dashboard",
  CREATE_SCHOOL: "/create-school",
  LIST_SCHOOL: "/schools",
  ADD_SCHOOL: "/schools/add",
  LIST_SESSION: "/sessions",
  ADD_SESSION: "/sessions/add",
  LIST_CLASS: "/classes",
  ADD_CLASS: "/classes/add",
  LIST_SECTION: "/sections",
  ADD_SECTION: "/sections/add",
  LIST_SUBJECT: "/subjects",
  ADD_SUBJECT: "/subjects/add",
  LIST_STUDENT: "/students",
  ADD_STUDENT: "/students/add",
  LIST_EMPLOYEE: "/employees",
  ADD_EMPLOYEE: "/employees/add",

  //pages routes
  ASSIGN_CLASS_TEACHER: "/assign-class-teacher",
  CREATE_SUBJECT_GROUP: "/create-subject-group",

  // usermanagement routes
  PROFILE: "/profile",
  SETTINGS: "/settings",
  NOT_FOUND: "*",
};

export default ROUTES;
