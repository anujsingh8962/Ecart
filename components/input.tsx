"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // ✅ Use correct icons
import "../styles/Input.css";

interface InputProps {
  className?: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = ({
  className = "",
  type,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  return (
    <div className="input-wrapper">
      <input
        type={isPasswordField && !showPassword ? "password" : "text"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange} // ✅ Properly forwarding Formik handlers
        onBlur={onBlur}
        className={`auth-input ${className}`}
      />
      {isPasswordField && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="password-toggle"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
};

export default Input;
