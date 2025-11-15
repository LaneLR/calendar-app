"use client";

import { useCalendar } from "@/context/CalendarContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Link from "next/link";
import RedirectPath from "@/components/Redirect";

export default function LoginForm() {
  const { loginUser } = useCalendar();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginUser = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Login failed");
        console.error(error);
        return;
      }
      if (data.user) {
        loginUser(data.user);
        setLoginData({ username: "", password: "" });
        setTimeout(() => {
          router.refresh();
          router.push("/");
        });
      }
    } catch (err) {
      setError("Something went wrong during login");
      console.error(err);
    }
  };

  return (
    <>
      <RedirectPath />
      <div className="login">
        <div>
          <div>
            <h1 className="login__title">Login</h1>
            <div className="login__form-wrapper">
              <form onSubmit={handleLoginUser} className="login__form">
                <input
                  className="login__input-boxes"
                  placeholder="Username"
                  type="text"
                  name="username"
                  value={loginData.username}
                  onChange={handleLoginChange}
                  required
                />
                <input
                  className="login__input-boxes"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
                <Button className="login__btn" type="submit">
                  Login
                </Button>
              </form>
            </div>
          </div>
          {error && <p className="login__error">{error}</p>}
          <div className="login__register-link">
            Don&apos;t have an account?{" "}
            <Link href="/register">
              <u>Create one!</u>
            </Link>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
