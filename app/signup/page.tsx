"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/input";
import { saveUser } from "../../utils/localStorage";
import "../../styles/Auth.css";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

// Validation Schema
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //function to Handle Signup
  const handleSignup = (values: { username: string; password: string }) => {
    saveUser(values.username, values.password);
    router.push("/login");
  };

  // Formik Setup
  const formik = useFormik({
    initialValues: { username: "", password: "", confirmPassword: "" },
    validationSchema,
    onSubmit: handleSignup,
  });

  return (
    <div className="auth-container">
      <h2 className="auth-title">Sign Up</h2>
      <form onSubmit={formik.handleSubmit}>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username && (
          <p className="auth-error">{formik.errors.username}</p>
        )}

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="auth-input password-input"
          />
          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="auth-error">{formik.errors.password}</p>
        )}
        <div className="password-container">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="auth-input password-input"
          />
          <span
            className="password-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p className="auth-error">{formik.errors.confirmPassword}</p>
        )}

        <button type="submit" className="auth-button signup">
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
