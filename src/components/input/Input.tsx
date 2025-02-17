import React from "react";
import clsx from "clsx";

type InputProps = {
  type?: "text" | "email" | "password";
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  disabled = false,
  className = "",
  errorMessage,
  ...rest
}) => {
  const baseStyles =
    "w-full px-4 py-2 rounded-xl shadow-glow transition-all duration-300 ease-in-out focus:outline-none py-3 text-base";

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          baseStyles,
          "bg-light text-secondary border border-secondary focus:ring-2 focus:ring-accent",
          disabled && disabledStyles,
          className
        )}
        id={placeholder}
        name={placeholder}
        {...rest}
      />
      <div className="h-3">
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1 m-0">{errorMessage}</p>
        )}
      </div>
    </>
  );
};

export default Input;
