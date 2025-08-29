const ROUTES = {
  // authentication routes
  LOGIN: "/login",
  SIGNUP: "/register",
  FORGOTPASSWORD: "/forgot-password",
  SetNEWPASSWORD: "/reset-password",
  OTPVERIFY: "otp-verify",
  VERIFYFORGOTPASSWORDOTP: "otp-verify/:id",

  // private routes
  DASHBOARD: "/dashboard",
  CREATE_SCHOOL: "/create-school",
  LIST_STUDENT: "/students",
  ADD_STUDENT: "/students/add",
  LIST_EMPLOYEE: "/employees",
  ADD_EMPLOYEE: "/employees/add",

  // Dynamic patterns
  ADD: (type: string) => `/${type}/add`,
  EDIT: (type: string) => `/${type}/:id`,
  LIST: (type: string) => `/${type}`,

  //pages routes
  ASSIGN_CLASS_TEACHER: "/assign-class-teacher",
  CREATE_SUBJECT_GROUP: "/create-subject-group",

  // usermanagement routes
  PROFILE: "/profile",
  SETTINGS: "/settings",
  NOT_FOUND: "*",
};

export default ROUTES;
