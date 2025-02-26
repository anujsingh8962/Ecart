"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Input from "@/components/input";
import { getUser } from "@/utils/localStorage";
import "../../styles/Auth.css";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // Validation Schema
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  //function to Handle Login
  const handleLogin = (
    values: { username: string; password: string },
    setErrors: any
  ) => {
    const user = getUser(values.username);
    if (user && user.password === values.password) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/");
    } else {
      setErrors({ username: "User doesn't exist, please sign up" });
    }
  };

  // Formik for handling form
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values, { setErrors }) => {
      handleLogin(values, setErrors);
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div>
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
          </div>

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
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

          <button type="submit" className="auth-button login">
            Login
          </button>
        </form>

        <p className="auth-text">
          Don't have an account? <Link href="/signup">SignUp</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
