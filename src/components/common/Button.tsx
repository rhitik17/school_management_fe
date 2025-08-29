"use client";
import { motion } from "framer-motion";
import { SpinningLoader2 } from "./loading/SpinningLoader";

export type ButtonVariant = "primary" | "secondary" | "custom";

export type ButtonProps = {
  action?: (e: React.FormEvent) => void;
  text?: string | React.ReactNode;
  icon?: React.ReactNode | string;
  className?: string;
  style?: React.CSSProperties;
  loading?: boolean;
  loadingPosition?: "front" | "back";
  iconPosition?: "front" | "back";
  loadingText?: string;
  disable?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  variant?: ButtonVariant;
};

function Button({
  style,
  action,
  type,
  text,
  icon,
  iconPosition = "front",
  className = "",
  loading = false,
  loadingPosition = "back",
  disable = false,
  loadingText = "Loading...",
  variant = "custom",
}: ButtonProps) {
  const getVariantClass = () => {
    switch (variant) {
      case "primary":
        return `bg-primary-500 rounded-lg shadow border border-primary-600 hover:bg-primary-600 text-white text-base font-semibold`;
      case "secondary":
        return `bg-white rounded-lg shadow border border-zinc-300 text-gray-700 text-base font-semibold hover:bg-gray-50`;
      case "custom":
      default:
        return "";
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.9 }}
      animate={{ opacity: disable || loading ? 0.6 : 1 }}
      disabled={disable || loading}
      style={style}
      className={`flex items-center justify-center gap-2 px-4 py-2 transition-all duration-150 cursor-pointer ${getVariantClass()} ${className}`}
      onClick={action}
      type={type}
    >
      {loading && loadingPosition === "front" && <SpinningLoader2 />}
      {icon &&
        iconPosition === "front" &&
        (typeof icon === "string" ? (
          <img src={icon} alt="icon" className="h-5 w-5" />
        ) : (
          <span className="icon-wrapper">{icon}</span>
        ))}
      {loading ? loadingText : text}
      {icon &&
        iconPosition === "back" &&
        (typeof icon === "string" ? (
          <img src={icon} alt="icon" className="h-5 w-5" />
        ) : (
          <span className="icon-wrapper">{icon}</span>
        ))}
      {loading && loadingPosition === "back" && <SpinningLoader2 />}
    </motion.button>
  );
}

export default Button;
