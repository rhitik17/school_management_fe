import { useEffect, useState } from "react";
import {
  resendOtp,
  verifyPasswordResetOtp,
} from "../../services/endpoints/authService";
import { toast } from "react-toastify";
import { Icons } from "../../assets/icons";
import { useNavigate,  } from "react-router-dom";
import Button from "../../components/common/Button";
import { useEmailStore } from "../../stores/tokenStore";

interface OtpFormData {
  otp: string[];
}
const OtpVerify = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<OtpFormData>({
    otp: Array(6).fill(""),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(0);

  const { email } = useEmailStore();

  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [resendTimer]);

  //to handle change for otp input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    setFormData((prev) => {
      const updatedOtp = [...prev.otp];
      updatedOtp[index] = value.slice(0, 1);
      return { ...prev, otp: updatedOtp };
    });

    // Move focus to next input
    if (value !== "" && index < formData.otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && formData.otp[index] === "" && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const otp = formData.otp.join("");

    let response;

    try {
      const payload = {
        otp: otp,
        email: email,
      };

      response = await verifyPasswordResetOtp(payload);

      if (response) {
        toast.success(response.message);
        setTimeout(() => {
          navigate("/reset-password");
        }, 3000);
      }

      console.log("otp", response);
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        "Failed to verify OTP. Please try again.";
      toast.error(message);
      setError(message);
    } finally {
      setIsLoading(false);
    }

    console.log(error);
  };

  //resend otp
  const handleResendCode = async () => {
    try {
      const payload = {
        email: email,
      };
      const response = await resendOtp(payload);
      if (response?.message) {
        toast.success(response.message);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to verify OTP. Please try again.");
    }
    setResendTimer(30);
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    // @ts-ignore
    index: number
  ) => {
    const pasteData = e.clipboardData.getData("text");
    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setFormData((prev) => ({
        ...prev,
        otp: newOtp,
      }));

      // @ts-ignore
      newOtp.forEach((digit, index) => {
        document.getElementById(`otp-${index}`)?.focus();
      });
    }
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8">
      <div className="flex flex-col w-full max-w-xl gap-8 p-8 bg-white rounded-lg">
        <div className="flex flex-col gap-2 mb-3">
          <h2 className="text-2xl font-bold text-center ">Check your email</h2>
          <p className="text-center">
            We sent a verfication link to
            <p className="font-semibold text-gray-600">{email}</p>
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-center w-full space-x-2">
                {formData.otp.map((otpValue, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    name={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    autoComplete="off"
                    required
                    className="w-16 h-16 text-4xl font-bold text-center border-2 rounded-lg border-primary-800 text-primary-700 focus:outline-none"
                    value={otpValue}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={(e) => handlePaste(e, index)}
                  />
                ))}
              </div>
            </div>
            {error && (
              <div className="flex items-center justify-center text-sm text-red-500">
                {error}
              </div>
            )}
            <Button
              text="Verify OTP"
              className="w-full"
              type="submit"
              variant="primary"
              disable={isLoading}
            />

            <div className="flex items-center justify-center">
              <button
                type="button"
                className="text-sm text-gray-600 "
                onClick={handleResendCode}
                disabled={resendTimer > 0}
              >
                Didn't receive the email?
                <span className="font-semibold hover:text-gray-800">
                  {" "}
                  Click to resend
                </span>
                {resendTimer > 0 && ` (${resendTimer}s)`}
              </button>
            </div>

            <div className="flex flex-row items-center justify-center gap-2 text-sm text-gray-600">
              <a href="/login">
                <Icons.ArrowRight className="rotate-180" />
              </a>
              <span className="font-semibold"> Back to Login</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;

// import { useEffect, useState } from "react";
// import {
//   otpVerify,
//   resendOtp,
// } from "../../services/endpoints/authService";
// import { toast } from "react-toastify";
// import { Icons } from "../../assets/icons";
// import { useNavigate, useParams } from "react-router-dom";
// import { useAuthStore } from "../../stores/userStore";
// import Button from "../../components/common/Button";

// interface OtpFormData {
//   otp: string[];
// }
// const OtpVerify = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState<OtpFormData>({
//     otp: Array(4).fill(""),
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [resendTimer, setResendTimer] = useState(0);

//   const { userData, setUserData } = useAuthStore();
//   const email = userData?.email;

//   useEffect(() => {
//     if (resendTimer > 0) {
//       const timerId = setInterval(() => {
//         setResendTimer((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(timerId);
//     }
//   }, [resendTimer]);

//   //to handle change for otp input
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     const { value } = e.target;
//     setFormData((prev) => {
//       const updatedOtp = [...prev.otp];
//       updatedOtp[index] = value.slice(0, 1);
//       return { ...prev, otp: updatedOtp };
//     });

//     // Move focus to next input
//     if (value !== "" && index < formData.otp.length - 1) {
//       document.getElementById(`otp-${index + 1}`)?.focus();
//     }
//   };

//   const handleKeyDown = (
//     e: React.KeyboardEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     if (e.key === "Backspace" && formData.otp[index] === "" && index > 0) {
//       document.getElementById(`otp-${index - 1}`)?.focus();
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("hello");
//     setIsLoading(true);
//     setError(null);

//     const otp = formData.otp.join("");

//     let response;

//     try {
//       const payload = {
//         user_id: id || userData?.id,
//         otp: otp,
//       };

//       if (id) {
//         response = await otpVerify(payload);

//         if (response) {
//           setUserData(response.data);
//           toast.success(response.message);
//           setUserData({
//             id: id || null,
//             otp_verified: userData?.otp_verified ?? "",
//             user_type: userData?.user_type ?? null,
//             email: userData?.email ?? null,
//             permissions: userData?.permissions ?? [],
//             access: userData?.access ?? "",
//             refresh: userData?.refresh ?? "",
//           });

//             navigate(`/set-password/${response.otp_id}`);

//         }

//       } else {
//         response = await otpVerify(payload);

//         if (response) {
//           setUserData(response.data);
//           toast.success(response.message);
//           setTimeout(() => {
//             navigate("/create-school");
//           }, 3000);
//         }
//       }
//       console.log("otp", response);

//     } catch (err: any) {
//       const message = err?.response?.data?.detail || "Failed to verify OTP. Please try again."
//       toast.error(message)
//       setError(message);
//     } finally {
//       setIsLoading(false);
//     }

//     console.log(error);
//   };

//   //resend otp
//   const handleResendCode = async () => {
//     try {
//       const payload = {
//         userId: userData?.id,
//         otp: "",
//       };
//       const response = await resendOtp(payload);
//       if (response?.message) {
//         toast.success(response.message);
//       }
//     } catch (err: any) {
//       setError(err?.message || "Failed to verify OTP. Please try again.");
//     }
//     setResendTimer(30);
//   };

//   const handlePaste = (
//     e: React.ClipboardEvent<HTMLInputElement>,
//     // @ts-ignore
//     index: number
//   ) => {
//     const pasteData = e.clipboardData.getData("text");
//     if (/^\d{6}$/.test(pasteData)) {
//       const newOtp = pasteData.split("");
//       setFormData((prev) => ({
//         ...prev,
//         otp: newOtp,
//       }));

//       // @ts-ignore
//       newOtp.forEach((digit, index) => {
//         document.getElementById(`otp-${index}`)?.focus();
//       });
//     }
//     e.preventDefault();
//   };

//   return (
//     <div className="flex items-center justify-center h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8">
//       <div className="flex flex-col w-full max-w-xl gap-8 p-8 bg-white rounded-lg">
//         <div className="flex flex-col gap-2 mb-3">
//           <h2 className="text-2xl font-bold text-center ">Check your email</h2>
//           <p className="text-center">
//             We sent a verfication link to
//             <p className="font-semibold text-gray-600">{email}</p>
//           </p>
//         </div>
//         <div>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <div className="flex justify-center w-full space-x-2">
//                 {formData.otp.map((otpValue, index) => (
//                   <input
//                     key={index}
//                     id={`otp-${index}`}
//                     name={`otp-${index}`}
//                     type="text"
//                     maxLength={1}
//                     autoComplete="off"
//                     required
//                     className="w-16 h-16 text-4xl font-bold text-center border-2 rounded-lg border-primary-800 text-primary-700 focus:outline-none"
//                     value={otpValue}
//                     onChange={(e) => handleChange(e, index)}
//                     onKeyDown={(e) => handleKeyDown(e, index)}
//                     onPaste={(e) => handlePaste(e, index)}
//                   />
//                 ))}
//               </div>
//             </div>
//             {error && (
//               <div className="flex items-center justify-center text-sm text-red-500">
//                 {error}
//               </div>
//             )}
//             <Button
//             text="Verify OTP"
//             className="w-full"
//               type="submit"
//               variant="primary"

//               disable={isLoading}
//            / >

//             <div className="flex items-center justify-center">
//               <button
//                 type="button"
//                 className="text-sm text-gray-600 "
//                 onClick={handleResendCode}
//                 disabled={resendTimer > 0}
//               >
//                 Didn't receive the email?
//                 <span className="font-semibold hover:text-gray-800">
//                   {" "}
//                   Click to resend
//                 </span>
//                 {resendTimer > 0 && ` (${resendTimer}s)`}
//               </button>
//             </div>

//             <div className="flex flex-row items-center justify-center gap-2 text-sm text-gray-600">
//               <a href="/login">
//                 <Icons.ArrowRight className="rotate-180" />
//               </a>
//               <span className="font-semibold"> Back to Login</span>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OtpVerify;
