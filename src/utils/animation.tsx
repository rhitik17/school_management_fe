import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimationProps {
  children: ReactNode | null;
  keyProp?: string;
  className?:string;
}

export const FadeAnimation = ({ children, keyProp, className }: AnimationProps) => {
  return (
    <motion.div
      key={keyProp}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
