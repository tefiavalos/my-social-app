import React from "react";
import clsx from "clsx";

type InputProps = {
  type?: "text" | "email" | "password";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled = false,
  className = "",
}) => {
  const baseStyles =
    "w-full px-4 py-2 rounded-xl shadow-glow transition-all duration-300 ease-in-out focus:outline-none py-3 text-base";

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={clsx(
        baseStyles,
        "bg-light text-secondary border border-secondary focus:ring-2 focus:ring-accent",
        disabled && disabledStyles,
        className
      )}
      id={placeholder}
      name={placeholder}
    />
  );
};

export default Input;
