"use client";
import styled from "styled-components";
import { useCalendar } from "@/context/CalendarContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
`;

export default function LoginPage() {
  const { loginUser } = useCalendar();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
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
          router.push("/");
        }, 1000);
      }
    } catch (err) {
      setError("Something went wrong during login");
      console.error(err);
    }
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
      <LoginWrapper>
        <h2>Login</h2>

        {/* for error handling */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form
          onSubmit={handleLoginUser}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input
            placeholder="username"
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleLoginChange}
            required
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </LoginWrapper>

      <LoginWrapper>
        <h2>Register</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <form
          onSubmit={handleCreateUser}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input
            placeholder="username"
            type="text"
            name="username"
            value={registerData.username}
            onChange={handleRegisterChange}
            required
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={registerData.password}
            onChange={handleRegisterChange}
            required
          />
          <input
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
            value={registerData.confirmPassword}
            onChange={handleRegisterChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      </LoginWrapper>
    </>
  );
}
