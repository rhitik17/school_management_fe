import ROUTES from "./routes";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import ForgotPassword from "../pages/authentication/ForgetPassoword";
import OtpVerify from "../pages/authentication/OtpVerify";
import SetNewPassoword from "../pages/authentication/SetNewPassword";

export const publicRoutes = [
  //   { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.LOGIN, element: <Login /> },
  { path: ROUTES.SIGNUP, element: <Register /> },
  { path: ROUTES.FORGOTPASSWORD, element: <ForgotPassword /> },
  { path: ROUTES.SetNEWPASSWORD, element: <SetNewPassoword /> },
  { path: ROUTES.OTPVERIFY, element: <OtpVerify /> },
  { path: ROUTES.VERIFYFORGOTPASSWORDOTP, element: <OtpVerify /> },
  

];
