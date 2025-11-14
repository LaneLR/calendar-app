"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCalendar } from "@/context/CalendarContext";
import Button from "@/components/Button";
import Link from "next/link";
import RedirectPath from "@/components/Redirect";

// ...styles moved to _register.scss

export default function RegisterForm() {
  const { loginUser } = useCalendar();

  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  // ...existing code...
  function handleRegisterChange(e) {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  }

  function handleCreateUser(e) {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Add registration logic here (e.g., API call)
    // On success, redirect or clear form
    setError(null);
    // router.push('/login'); // Example redirect
  }

  return (
    <div className="register__wrapper">
      <div>
        <h1 className="register__title">Register</h1>
        <div className="register__form-wrapper">
          <form onSubmit={handleCreateUser} className="register__form">
            <input
              className="register__input-boxes"
              placeholder="Username"
              type="text"
              name="username"
              value={registerData.username}
              onChange={handleRegisterChange}
              required
            />
            <input
              className="register__input-boxes"
              placeholder="Password"
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
            />
            <input
              className="register__input-boxes"
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              required
            />
            <Button className="register__btn" type="submit">
              Register
            </Button>
          </form>
        </div>
        {error && <p className="register__error">{error}</p>}
        <div
          className="register__login-link"
          style={{ marginTop: "20px", width: "100%", textAlign: "center" }}
        >
          Already have an account?{" "}
          <Link href="/login">
            <u>Login!</u>
          </Link>
        </div>
      </div>
      <div />
    </div>
  );
}
