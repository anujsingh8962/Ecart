"use client";

import React, { useState } from "react";
import "../styles/Input.css";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange?: (e: { target: { value: string } }) => void;
  onBlur: (e: { target: { value: string } }) => void;
}

const Input = ({
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
        onChange={onChange}
        onBlur={onBlur}
        className="input-field"
      />
      {isPasswordField && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="password-toggle"
        >
          {/* {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />} */}
        </button>
      )}
    </div>
  );
};
export default Input;
