"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCalendar } from "@/context/CalendarContext";
import Button from "@/components/Button";
import Link from "next/link";
import RedirectPath from "@/components/Redirect";

export default function RegisterForm() {
  const { loginUser } = useCalendar();

  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError(null);

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match");
      console.error(error);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: registerData.username,
          password: registerData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Registration failed");
        console.error(error);
        return;
      }

      if (data.user) {
        loginUser(data.user);
        setRegisterData({ username: "", password: "", confirmPassword: "" });
        setTimeout(() => {
          router.refresh();
          router.push("/");
        }, 100);
      }
    } catch (err) {
      setError("Something went wrong during registration");
      console.error(err);
      return;
    }
  };

  return (
    <>
      <RedirectPath />
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
          <div className="register__login-link">
            Already have an account?{" "}
            <Link href="/login">
              <u>Login!</u>
            </Link>
          </div>
        </div>
        <div />
      </div>
    </>
  );
}
